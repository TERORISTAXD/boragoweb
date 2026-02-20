'use client'

import { PageBackground } from '@/components/PageBackground'
import { useLanguage } from '@/contexts/LanguageContext'
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect } from 'react'

export default function AboutPage() {
  const { t } = useLanguage()

  useEffect(() => {
    if (window.location.hash === '#contact') {
      setTimeout(() => {
        const element = document.getElementById('contact')
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 80
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 300)
    }
  }, [])

  return (
    <div className="min-h-screen relative">
      <PageBackground variant="default" />

      {/* Hero Section */}
      <div className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            {t('about.hero.title')}
          </h1>
          <p className="text-lg leading-8 text-gray-300">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Team Section */}
      <section className="relative py-16 sm:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            {t('team.title')}
          </h2>
          <p className="font-light text-gray-400 text-lg sm:text-xl mb-12">
            {t('team.subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-12 max-w-4xl mx-auto">
            {[
              {
                name: "Nikola Dimitrov",
                role: "Founder",
                img: "/team/member-1.jpg",
                facebook: "https://www.facebook.com/profile.php?id=100039307809130",
                instagram: "https://www.instagram.com/ndimitrov923",
              },
              {
                name: "Stanislav Nikolov",
                role: "Co-founder",
                img: "/team/member-2.jpg",
                facebook: "https://www.facebook.com/profile.php?id=100018871830678",
                instagram: "https://www.instagram.com/s.nikolov17",
              },
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center bg-white/5 backdrop-blur-xl rounded-2xl p-6 ring-1 ring-white/10 hover:ring-[#4ade80]/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={144}
                    height={144}
                    className="w-36 h-36 rounded-full object-cover ring-2 ring-[#4ade80]/20"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold tracking-tight text-white">
                  {member.name}
                </h3>
                <p className="text-gray-400 mb-4">{member.role}</p>

                <ul className="flex justify-center mt-4 space-x-4">
                  {member.facebook && (
                    <li>
                      <a
                        href={member.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#4ade80] transition-colors"
                        aria-label={`${member.name} Facebook`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          />
                        </svg>
                      </a>
                    </li>
                  )}
                  {member.instagram && (
                    <li>
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#4ade80] transition-colors"
                        aria-label={`${member.name} Instagram`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          />
                        </svg>
                      </a>
                    </li>
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <div className="relative py-16 sm:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
            {t('about.story.title')}
          </h2>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-6 text-lg/8">
            <p>{t('about.story.p1')}</p>
            <p>{t('about.story.p2')}</p>
            <p>{t('about.story.p3')}</p>
          </div>
        </div>
      </div>

      {/* Approach Section */}
      <div className="relative py-16 sm:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
            {t('about.approach.title')}
          </h2>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-6 text-lg/8">
            <p>{t('about.approach.p1')}</p>
            <p>{t('about.approach.p2')}</p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="relative py-16 sm:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-12 text-center">
            {t('about.values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-semibold text-[#22c55e] mb-4">{t('about.values.quality.title')}</h3>
              <p className="text-gray-300 leading-relaxed">{t('about.values.quality.desc')}</p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-semibold text-[#22c55e] mb-4">{t('about.values.people.title')}</h3>
              <p className="text-gray-300 leading-relaxed">{t('about.values.people.desc')}</p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-semibold text-[#22c55e] mb-4">{t('about.values.transparency.title')}</h3>
              <p className="text-gray-300 leading-relaxed">{t('about.values.transparency.desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="relative py-16 sm:py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
            {t('about.expertise.title')}
          </h2>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-6 text-lg/8">
            <p>{t('about.expertise.p1')}</p>
            <p>{t('about.expertise.p2')}</p>
          </div>
        </div>
      </div>

      {/* Contact Section (Existing) */}
      <div className="relative py-24 sm:py-32 px-6 lg:px-8" id="contact">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">{t('about.cta.title')}</h2>
          <p className="text-lg text-gray-400">{t('about.cta.subtitle')}</p>
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-semibold tracking-tight text-white">{t('contact.title')}</h3>
          <p className="mt-2 text-lg/8 text-gray-400">{t('contact.subtitle')}</p>
        </div>

        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm/6 font-semibold text-white">
                {t('contact.firstName')}
              </label>
              <div className="mt-2.5">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#22c55e]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm/6 font-semibold text-white">
                {t('contact.lastName')}
              </label>
              <div className="mt-2.5">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#22c55e]"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm/6 font-semibold text-white">
                {t('contact.company')}
              </label>
              <div className="mt-2.5">
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#22c55e]"
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#22c55e]"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm/6 font-semibold text-white">
                {t('contact.message')}
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#22c55e]"
                  defaultValue={''}
                />
              </div>
            </div>
            <div className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <div className="group relative inline-flex w-8 shrink-0 rounded-full bg-white/5 p-px ring-1 ring-inset ring-white/10 transition-colors duration-200 ease-in-out has-[:checked]:bg-[#22c55e] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#22c55e]">
                  <span className="size-4 rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-[:checked]:translate-x-3.5" />
                  <input
                    id="agree-to-policies"
                    name="agree-to-policies"
                    type="checkbox"
                    aria-label="Agree to policies"
                    className="absolute inset-0 appearance-none focus:outline-none"
                  />
                </div>
              </div>
              <label htmlFor="agree-to-policies" className="text-sm/6 text-gray-400">
                {t('contact.agreeToPolicy')}{' '}
                <a href="/terms" className="font-semibold whitespace-nowrap text-[#22c55e]">
                  {t('contact.privacyPolicy')}
                </a>
                .
              </label>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-[#22c55e] px-3.5 py-2.5 text-center text-sm font-semibold text-black shadow-sm hover:bg-[#4ade80] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22c55e]"
            >
              {t('contact.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
