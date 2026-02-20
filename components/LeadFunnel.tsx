'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useMeasure from 'react-use-measure'
import { useLanguage } from '@/contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'

type Step = 1 | 2 | 3 | 4 | 5

export function LeadFunnel() {
    const { t } = useLanguage()
    const router = useRouter()

    const [isMounted, setIsMounted] = useState(false)
    const [ref, { height }] = useMeasure()
    const [step, setStep] = useState<Step>(1)
    const [progress, setProgress] = useState(0)
    const [isCalculating, setIsCalculating] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Form State
    const [pathChoice, setPathChoice] = useState<'A' | 'B' | 'C' | null>(null)
    const [automationArea, setAutomationArea] = useState<string | null>(null)
    const [webPresence, setWebPresence] = useState<string | null>(null)
    const [urgency, setUrgency] = useState<string | null>(null)

    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Handlers
    const handleStep1 = (choice: 'A' | 'B' | 'C') => {
        setPathChoice(choice)
        setProgress(33)
        setStep(2)
    }

    const handleStep2 = (choice: string) => {
        if (pathChoice === 'B') {
            setAutomationArea(choice)
        } else {
            setWebPresence(choice)
        }
        setProgress(66)
        setStep(3)
    }

    const handleStep3 = (choice: string) => {
        setUrgency(choice)
        setProgress(90)
        setIsCalculating(true)

        // Simulate calculation loading state
        setTimeout(() => {
            setIsCalculating(false)
            setStep(4)
        }, 1500)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call for lead capture
        await new Promise(resolve => setTimeout(resolve, 800))

        setProgress(100)
        setStep(5)

        // Redirect after success message
        setTimeout(() => {
            router.push('/about#contact')
        }, 2000)
    }

    const handleBack = () => {
        if (step === 2) {
            setStep(1)
            setProgress(0)
        } else if (step === 3) {
            setStep(2)
            setProgress(33)
        } else if (step === 4) {
            setStep(3)
            setProgress(66)
        }
    }

    const slideVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
    }

    return (
        <section className="section relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -m-32 w-96 h-96 bg-accent rounded-full opacity-5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -m-32 w-96 h-96 bg-accent rounded-full opacity-5 blur-3xl pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Progress Bar Container */}
                    {step < 5 && (
                        <div className="mb-12">
                            <div className="h-1.5 w-full bg-background-elevated rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent transition-all duration-700 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-right text-xs text-foreground-subtle mt-2 font-medium">
                                {progress}%
                            </p>
                        </div>
                    )}

                    {/* Card Container */}
                    <motion.div
                        animate={{ height: height > 0 ? height : "auto" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="card shadow-2xl backdrop-blur-sm bg-background-elevated/80 w-full overflow-hidden relative"
                    >
                        <div ref={ref}>
                            {isMounted && (
                                <AnimatePresence mode="wait" initial={false}>
                                    {/* STEP 1 */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            variants={slideVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="space-y-8 w-full p-6 md:p-10"
                                        >
                                            <div className="text-center space-y-3">
                                                <h2 className="heading-3">{t('funnel.step1.headline')}</h2>
                                                <p className="text-foreground-muted">{t('funnel.step1.subheadline')}</p>
                                            </div>

                                            <div className="grid gap-4">
                                                <button
                                                    onClick={() => handleStep1('A')}
                                                    className="text-left p-5 rounded-xl border border-white/10 hover:border-accent hover:bg-white/5 transition-all group flex items-center justify-between"
                                                >
                                                    <span className="font-medium text-lg">{t('funnel.step1.cardA')}</span>
                                                    <ChevronRight className="w-5 h-5 text-foreground-subtle group-hover:text-accent transition-colors" />
                                                </button>
                                                <button
                                                    onClick={() => handleStep1('B')}
                                                    className="text-left p-5 rounded-xl border border-white/10 hover:border-accent hover:bg-white/5 transition-all group flex items-center justify-between"
                                                >
                                                    <span className="font-medium text-lg">{t('funnel.step1.cardB')}</span>
                                                    <ChevronRight className="w-5 h-5 text-foreground-subtle group-hover:text-accent transition-colors" />
                                                </button>
                                                <button
                                                    onClick={() => handleStep1('C')}
                                                    className="text-left p-5 rounded-xl border border-white/10 hover:border-accent hover:bg-white/5 transition-all group flex items-center justify-between"
                                                >
                                                    <span className="font-medium text-lg">{t('funnel.step1.cardC')}</span>
                                                    <ChevronRight className="w-5 h-5 text-foreground-subtle group-hover:text-accent transition-colors" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 2 */}
                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            variants={slideVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="space-y-8 w-full p-6 md:p-10"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 text-left">
                                                <button
                                                    onClick={handleBack}
                                                    className="w-max shrink-0 flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-foreground-subtle bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white hover:border-white/20 transition-all group"
                                                >
                                                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                                    {t('funnel.back')}
                                                </button>
                                                <h2 className="heading-3 !mb-0">
                                                    {pathChoice === 'B'
                                                        ? t('funnel.step2.condB.headline')
                                                        : t('funnel.step2.condA.headline')}
                                                </h2>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {pathChoice === 'B' ? (
                                                    <>
                                                        {[
                                                            t('funnel.step2.condB.btn1'),
                                                            t('funnel.step2.condB.btn2'),
                                                            t('funnel.step2.condB.btn3'),
                                                            t('funnel.step2.condB.btn4')
                                                        ].map((btnText, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleStep2(btnText)}
                                                                className="p-4 rounded-xl border border-white/10 hover:border-accent hover:bg-white/5 transition-all text-center font-medium"
                                                            >
                                                                {btnText}
                                                            </button>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <>
                                                        {[
                                                            t('funnel.step2.condA.btn1'),
                                                            t('funnel.step2.condA.btn2'),
                                                            t('funnel.step2.condA.btn3'),
                                                            t('funnel.step2.condA.btn4')
                                                        ].map((btnText, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleStep2(btnText)}
                                                                className="p-4 rounded-xl border border-white/10 hover:border-accent hover:bg-white/5 transition-all text-center font-medium"
                                                            >
                                                                {btnText}
                                                            </button>
                                                        ))}
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STEP 3 */}
                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            variants={slideVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="space-y-8 w-full p-6 md:p-10"
                                        >
                                            {isCalculating ? (
                                                <div className="py-12 flex flex-col items-center justify-center space-y-6">
                                                    <Loader2 className="w-12 h-12 text-accent animate-spin" />
                                                    <p className="text-lg font-medium animate-pulse text-center">
                                                        {t('funnel.loading')}
                                                    </p>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 text-left">
                                                        <button
                                                            onClick={handleBack}
                                                            className="w-max shrink-0 flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-foreground-subtle bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white hover:border-white/20 transition-all group"
                                                        >
                                                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                                            {t('funnel.back')}
                                                        </button>
                                                        <h2 className="heading-3 !mb-0">{t('funnel.step3.headline')}</h2>
                                                    </div>
                                                    <div className="grid gap-4">
                                                        {[
                                                            t('funnel.step3.btn1'),
                                                            t('funnel.step3.btn2'),
                                                            t('funnel.step3.btn3')
                                                        ].map((btnText, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleStep3(btnText)}
                                                                className="p-4 rounded-xl border border-white/10 hover:border-accent hover:bg-white/5 transition-all text-center font-medium"
                                                            >
                                                                {btnText}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* STEP 4 */}
                                    {step === 4 && (
                                        <motion.div
                                            key="step4"
                                            variants={slideVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            className="space-y-8 w-full p-6 md:p-10"
                                        >
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 text-left">
                                                <div>
                                                    <h2 className="heading-3 text-gradient !mb-2">{t('funnel.step4.headline')}</h2>
                                                    <p className="text-foreground-muted">{t('funnel.step4.subheadline')}</p>
                                                </div>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto">
                                                <div>
                                                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground-subtle mb-1.5">
                                                        {t('funnel.firstName')}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="firstName"
                                                        required
                                                        className="input"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        placeholder="John"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block text-sm font-medium text-foreground-subtle mb-1.5">
                                                        {t('funnel.workEmail')}
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        required
                                                        className="input"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="john@company.com"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="btn-primary w-full py-3.5 text-lg mt-4 flex items-center justify-center gap-2 group"
                                                >
                                                    {isSubmitting ? (
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                    ) : (
                                                        <>
                                                            {t('funnel.submit')}
                                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* STEP 5 - SUCCESS */}
                                    {step === 5 && (
                                        <motion.div
                                            key="step5"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="py-12 text-center flex flex-col items-center justify-center space-y-6 w-full p-6 md:p-10"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", bounce: 0.5 }}
                                            >
                                                <CheckCircle2 className="w-20 h-20 text-accent" />
                                            </motion.div>
                                            <h2 className="heading-3">{t('funnel.success')}</h2>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
