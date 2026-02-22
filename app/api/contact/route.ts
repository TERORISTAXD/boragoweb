import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createSupabaseServiceClient } from '@/lib/supabase/server'

// Validation schema for incoming contact submissions
const contactSchema = z.object({
    firstName: z.string().min(1, 'First name is required').max(100),
    lastName: z.string().min(1, 'Last name is required').max(100),
    company: z.string().optional(),
    email: z.string().email('Invalid email address').max(255),
    message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
    honeypot: z.string().max(0, 'Bot detected').optional(), // Anti-spam
})

export async function POST(request: Request) {
    try {
        // 1. Parse JSON body
        const body = await request.json()

        // 2. Validate using Zod
        const result = contactSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: result.error.flatten() },
                { status: 400 }
            )
        }

        const { firstName, lastName, company, email, message, honeypot } = result.data

        // 3. Honeypot check (Bots often fill hidden fields; real users won't see it)
        if (honeypot && honeypot.length > 0) {
            // Return 200 to trick the bot into thinking it succeeded, but don't save.
            console.warn('Bot submission blocked via honeypot.')
            return NextResponse.json({ success: true, fake: true }, { status: 200 })
        }

        // 4. Initialize Supabase Service Role client to bypass RLS for insertions
        const supabase = await createSupabaseServiceClient()

        // Assuming the table `contact_submissions` matches the format from implementation plan
        // We concatenate first and last name into 'subject' if that was the chosen schema,
        // or we adapt it to the existing About UI fields.
        // Based on the UI in page.tsx: firstName, lastName, company, email, message.

        // We map the UI fields to the schema we defined: email, subject, message.
        // Subject = "Contact from [FirstName] [LastName] at [Company]"
        const subject = `Contact from ${firstName} ${lastName}${company ? ` (${company})` : ''}`

        // 5. Insert into Database
        const { error: dbError } = await supabase
            .from('contact_submissions')
            .insert([
                {
                    email,
                    subject,
                    message,
                }
            ] as any)

        if (dbError) {
            console.error('Supabase Insertion Error:', dbError)
            return NextResponse.json(
                { error: 'Failed to save submission to database' },
                { status: 500 }
            )
        }

        // 6. Respond Success
        return NextResponse.json({ success: true }, { status: 201 })

    } catch (err) {
        console.error('Contact Form Error:', err)
        return NextResponse.json(
            { error: 'An unexpected error occurred processing your request' },
            { status: 500 }
        )
    }
}
