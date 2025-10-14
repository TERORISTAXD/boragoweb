"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageBackground } from "@/components/PageBackground";

// Note: Metadata must be exported from a Server Component
// For now, add this in a separate layout.tsx or move to Server Component wrapper

export default function TeamPage() {
  const { t } = useLanguage();

  const team = [
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
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <PageBackground variant="team" />

      <section className="py-16 px-4 mx-auto max-w-screen-xl text-center lg:py-24 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-screen-sm lg:mb-16"
        >
          <h2 className="mb-4 text-4xl md:text-5xl tracking-tight font-bold text-white">
            {t('team.title')}
          </h2>
          <p className="font-light text-gray-400 text-lg sm:text-xl">
            {t('team.subtitle')}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-12 max-w-4xl mx-auto">
          {team.map((member, i) => (
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
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
