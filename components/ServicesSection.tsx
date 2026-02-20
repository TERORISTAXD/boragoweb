'use client'

import { Globe, ShoppingCart, Zap, Wrench, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const services = [
    {
        icon: Globe,
        titleKey: 'service.webDev.title',
        descriptionKey: 'service.webDev.desc',
        tagKey: 'service.webDev.tag',
        color: '#3b82f6', // Blue
    },
    {
        icon: ShoppingCart,
        titleKey: 'service.ecommerce.title',
        descriptionKey: 'service.ecommerce.desc',
        tagKey: 'service.ecommerce.tag',
        color: '#22c55e', // Green
    },
    {
        icon: Zap,
        titleKey: 'service.automation.title',
        descriptionKey: 'service.automation.desc',
        tagKey: 'service.automation.tag',
        color: '#eab308', // Yellow
    },
    {
        icon: Wrench,
        titleKey: 'service.custom.title',
        descriptionKey: 'service.custom.desc',
        tagKey: 'service.custom.tag',
        color: '#a855f7', // Purple
    },
]

export function ServicesSection() {
    const { t } = useLanguage()

    return (
        <section id="services" className="py-24 sm:py-32 relative">
            <div className="container-custom relative z-10">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                        {t('services.title')} <span className="text-[#4ade80]">Borago Web</span>
                    </h2>
                    <p className="text-lg leading-8 text-gray-400">
                        {t('services.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl hover:shadow-[#4ade80]/10 hover:ring-[#4ade80]/50"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`p-3 rounded-2xl bg-white/5 group-hover:bg-[#4ade80]/10 transition-colors`}>
                                    <service.icon className={`w-8 h-8 text-gray-400 group-hover:text-[#4ade80] transition-colors`} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center rounded-full bg-[#4ade80]/10 px-3 py-1 text-xs font-medium text-[#4ade80] ring-1 ring-inset ring-[#4ade80]/20">
                                        {t(service.tagKey)}
                                    </span>
                                    <div className="p-2 rounded-full border border-white/10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        <ArrowRight className="w-4 h-4 text-[#4ade80]" />
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#4ade80] transition-colors">
                                {t(service.titleKey)}
                            </h3>

                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                {t(service.descriptionKey)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
