'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
    {
        textKey: 'clients.testimonial1.text',
        authorKey: 'clients.testimonial1.author',
        companyKey: 'clients.testimonial1.company',
        image: '/testimonials/medtrans.jpg',
    },
    {
        textKey: 'clients.testimonial2.text',
        authorKey: 'clients.testimonial2.author',
        companyKey: 'clients.testimonial2.company',
        image: '/testimonials/borago.png',
    },
]

export function TestimonialsSection() {
    const { t } = useLanguage()

    return (
        <section className="relative py-16 lg:py-24">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#4ade80]/30 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Quote className="w-8 h-8 text-[#4ade80] mb-4 opacity-50" />
                            <p className="text-lg text-gray-300 mb-6 italic leading-relaxed">
                                "{t(testimonial.textKey)}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#22c55e]/20">
                                    {t(testimonial.authorKey).charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">{t(testimonial.authorKey)}</h4>
                                    <p className="text-gray-400 text-sm">{t(testimonial.companyKey)}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
