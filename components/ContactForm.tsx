'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

const formSchema = z.object({
    firstName: z.string().min(1, 'Първото име е задължително / First name is required'),
    lastName: z.string().min(1, 'Фамилията е задължителна / Last name is required'),
    company: z.string().optional(),
    email: z.string().email('Невалиден имейл / Invalid email'),
    message: z.string().min(10, 'Съобщението трябва да е поне 10 символа / Message must be at least 10 chars'),
    honeypot: z.string().max(0, 'Bot detected').optional(),
    agreeToPolicies: z.boolean().refine(val => val === true, 'Трябва да се съгласите с политиката / You must agree to the privacy policy')
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {
    const { t } = useLanguage()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            agreeToPolicies: false,
            honeypot: ''
        }
    })

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit form')
            }

            toast.success(t('contact.success') || 'Message sent successfully!', {
                style: {
                    background: '#1A1A1A',
                    color: '#E6E6E6',
                    border: '1px solid #22c55e',
                },
                iconTheme: {
                    primary: '#22c55e',
                    secondary: '#0A0A0A',
                }
            })
            reset()
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || 'There was an error sending your message.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {/* Anti-spam field hidden from screen readers and visual users */}
                <div style={{ display: 'none', visibility: 'hidden' }}>
                    <input type="text" {...register('honeypot')} tabIndex={-1} aria-hidden="true" />
                </div>

                <div>
                    <label htmlFor="firstName" className="block text-sm/6 font-semibold text-white">
                        {t('contact.firstName')}
                    </label>
                    <div className="mt-2.5">
                        <input
                            id="firstName"
                            type="text"
                            autoComplete="given-name"
                            disabled={isSubmitting}
                            className={`block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 transition-colors ${errors.firstName ? 'outline-red-500 focus:outline-red-500' : 'outline-white/10 focus:outline-[#22c55e]'
                                }`}
                            {...register('firstName')}
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm/6 font-semibold text-white">
                        {t('contact.lastName')}
                    </label>
                    <div className="mt-2.5">
                        <input
                            id="lastName"
                            type="text"
                            autoComplete="family-name"
                            disabled={isSubmitting}
                            className={`block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 transition-colors ${errors.lastName ? 'outline-red-500 focus:outline-red-500' : 'outline-white/10 focus:outline-[#22c55e]'
                                }`}
                            {...register('lastName')}
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm/6 font-semibold text-white">
                        {t('contact.company')} <span className="text-gray-500 font-normal">(Optional)</span>
                    </label>
                    <div className="mt-2.5">
                        <input
                            id="company"
                            type="text"
                            autoComplete="organization"
                            disabled={isSubmitting}
                            className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#22c55e] transition-colors"
                            {...register('company')}
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm/6 font-semibold text-white">
                        {t('contact.email')}
                    </label>
                    <div className="mt-2.5">
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            disabled={isSubmitting}
                            className={`block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 transition-colors ${errors.email ? 'outline-red-500 focus:outline-red-500' : 'outline-white/10 focus:outline-[#22c55e]'
                                }`}
                            {...register('email')}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm/6 font-semibold text-white">
                        {t('contact.message')}
                    </label>
                    <div className="mt-2.5">
                        <textarea
                            id="message"
                            rows={4}
                            disabled={isSubmitting}
                            className={`block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 transition-colors ${errors.message ? 'outline-red-500 focus:outline-red-500' : 'outline-white/10 focus:outline-[#22c55e]'
                                }`}
                            {...register('message')}
                        />
                        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                    </div>
                </div>

                <div className="flex gap-x-4 sm:col-span-2">
                    <div className="flex h-6 items-center">
                        <label className={`cursor-pointer group relative inline-flex w-8 shrink-0 rounded-full bg-white/5 p-px ring-1 ring-inset ring-white/10 transition-colors duration-200 ease-in-out has-[:checked]:bg-[#22c55e] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#22c55e] ${errors.agreeToPolicies ? 'ring-red-500' : ''}`}>
                            <span className="size-4 rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-[:checked]:translate-x-3.5" />
                            <input
                                id="agreeToPolicies"
                                type="checkbox"
                                disabled={isSubmitting}
                                className="sr-only"
                                {...register('agreeToPolicies')}
                            />
                        </label>
                    </div>
                    <div className="text-sm/6 text-gray-400">
                        <label htmlFor="agreeToPolicies" className="cursor-pointer">
                            {t('contact.agreeToPolicy')}{' '}
                        </label>
                        <Link href="/terms" className="font-semibold whitespace-nowrap text-[#22c55e] hover:text-[#4ade80] transition-colors">
                            {t('contact.privacyPolicy')}
                        </Link>
                        .
                        {errors.agreeToPolicies && <p className="mt-1 text-xs text-red-500 block">{errors.agreeToPolicies.message}</p>}
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex w-full justify-center rounded-md bg-[#22c55e] px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm hover:bg-[#4ade80] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22c55e] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 overflow-hidden"
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Изпращане...</span>
                        </div>
                    ) : (
                        <span className="flex items-center space-x-2">
                            {t('contact.submit')}
                        </span>
                    )}
                </button>
            </div>
        </form>
    )
}
