'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'bg' | 'en'

interface Translations {
  [key: string]: {
    bg: string
    en: string
  }
}

export const translations: Translations = {
  // Navigation
  'nav.home': { bg: 'Начало', en: 'Home' },
  'nav.team': { bg: 'Екип', en: 'Team' },
  'nav.shop': { bg: 'Магазин', en: 'Shop' },
  'nav.blog': { bg: 'Блог', en: 'Blog' },
  'nav.about': { bg: 'За нас', en: 'About' },
  'nav.signin': { bg: 'Вход', en: 'Sign In' },
  'nav.signout': { bg: 'Изход', en: 'Sign Out' },
  'nav.admin': { bg: 'Админ', en: 'Admin' },
  'nav.cart': { bg: 'Количка', en: 'Cart' },
  'nav.services': { bg: 'Услуги', en: 'Services' },
  'nav.contact': { bg: 'Контакти', en: 'Contact' },

  // Hero Section
  'hero.title': { bg: 'Създаваме уеб решения', en: 'We Create Web Solutions' },
  'hero.headline': { bg: 'Превърнете уебсайта си във вашия най-добър служител', en: 'Turn Your Website Into Your Best Employee' },
  'hero.subheadline': { bg: 'Изпреварете конкуренцията с модерни уеб решения и AI инструменти, които работят денонощно за вашия бизнес.', en: 'Stay ahead of the competition with modern web solutions and AI tools that work 24/7 for your business.' },
  'hero.ctaPrimary': { bg: 'Нашите Услуги', en: 'Our Services' },
  'hero.bookConsultation': { bg: 'Резервирайте консултация', en: 'Book a Consultation' },
  'hero.badge': { bg: 'Водещи AI и уеб дизайнери за прогресивни бизнеси', en: 'Leading AI and Web Designers for Progressive Businesses' },

  // Pricing Section
  'pricing.title': { bg: 'Цени', en: 'Pricing' },
  'pricing.subtitle': { bg: 'Изберете правилната услуга за вас', en: 'Choose the right plan for you' },
  'pricing.description': { bg: 'Изберете достъпна услуга, която е пълна с най-добрите функции за ангажиране на вашата аудитория, създаване на лоялност на клиентите и стимулиране на продажбите.', en: 'Choose an affordable plan that\'s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.' },
  'pricing.cta': { bg: 'Започнете днес', en: 'Get started today' },
  'pricing.oneTime': { bg: 'еднократно', en: 'one-time' },

  // Pricing Tiers
  'tier.consultation': { bg: 'Консултация', en: 'Consultation' },
  'tier.onlineStore': { bg: 'Онлайн магазин', en: 'Online store' },
  'tier.staticWebsite': { bg: 'Статичен уебсайт', en: 'Static website' },

  // Pricing Descriptions
  'pricing.consultationDesc': { bg: 'Безплатна констултация за вас или вашият бизнес.', en: 'Free consultation for you or your business.' },
  'pricing.onlineStoreDesc': { bg: 'Специална поддръжка и инфраструктура за вашата компания.', en: 'Dedicated support and infrastructure for your company.' },
  'pricing.staticWebsiteDesc': { bg: 'Перфектната услуга, ако току-що започвате с нашия продукт.', en: 'The perfect plan if you\'re just getting started with our product.' },

  // Features
  'feature.individualConsultation': { bg: 'Индивидуална консултация', en: 'Individual consultation' },
  'feature.businessStrategies': { bg: 'Стратегии за бизнес развитие', en: 'Strategies for business development' },
  'feature.salesTips': { bg: 'Ефективни съвети за растеж на продажбите', en: 'Effective tips for sales growth' },
  'feature.businessAdvice': { bg: 'Ценни съвети за вашия бизнес', en: 'Valuable advice for your business' },
  'feature.unlimitedProducts': { bg: 'Персонален и уникален дизайн', en: 'Personal and unique design' },
  'feature.unlimitedSubscribers': { bg: 'Кратки срокове за изработка', en: 'Short development deadlines' },
  'feature.advancedAnalytics': { bg: 'Бързина на сайта', en: 'Website speed' },
  'feature.dedicatedSupport': { bg: 'Базова SEO оптимизация', en: 'Basic SEO optimization' },
  'feature.marketingAutomations': { bg: 'Админ панел', en: 'Admin panel' },
  'feature.customIntegrations': { bg: 'Ще можете автоматично да добавяте снимки и контент', en: 'You will be able to automatically add photos and content' },
  'feature.uniqueDesign': { bg: 'Личен и уникален дизайн', en: 'Personal and unique design' },
  'feature.shortDeadlines': { bg: 'Кратки срокове за разработка', en: 'Short development deadlines' },
  'feature.websiteSpeed': { bg: 'Скорост на уебсайта', en: 'Website speed' },
  'feature.basicSEO': { bg: 'Основна SEO оптимизация', en: 'Basic SEO optimization' },
  'feature.support247': { bg: 'Поддръжка 24/7', en: '24/7 Support' },


  // WIO Section (Updated Copy)
  'wio.whatIs': { bg: 'Кои сме ние?', en: 'Who we are?' },
  'wio.title': { bg: 'Вашият личен технологичен експерт – без излишни разходи', en: 'Your Personal Tech Expert – Without Unnecessary Costs' },
  'wio.description': { bg: 'Представете си, че имате опитен IT директор в екипа си, но без да плащате скъпата му заплата. Ние помагаме да намерите правилните решения, да спестите време и да развиете бизнеса си по-умно.', en: 'Our WIO-as-a-Service offers you the expertise of a Web Intelligence Officer without the overhead. From website development to AI integration, we provide end-to-end digital solutions tailored to your business, ensuring long-term growth, efficiency, and innovation.' },

  // Benefits (Updated Copy)
  'benefit.strategicPlanning': { bg: 'Ясен план за бъдещето', en: 'Strategic Planning' },
  'benefit.strategicPlanningDesc': { bg: 'Край на хаоса. Създаваме проста и работеща стратегия, която следва вашите цели и гарантира развитие стъпка по стъпка.', en: 'Develop and execute a technology roadmap aligned with your business goals to ensure sustainable growth.' },
  'benefit.security': { bg: 'Спокойствие за вашия бизнес', en: 'Security & Compliance' },
  'benefit.securityDesc': { bg: 'Ние се грижим данните ви да са защитени, а системите да работят без прекъсване, за да спите спокойно.', en: 'Implement advanced security measures and ensure compliance with industry standards to protect your business.' },
  'benefit.customSolutions': { bg: 'Решения точно за вас', en: 'Custom Solutions' },
  'benefit.customSolutionsDesc': { bg: 'Не ви предлагаме излишни неща. Разработваме точно това, от което имате нужда – от автоматизация до нови системи.', en: 'Tailor-made software solutions addressing your specific needs, from billing and automation to integration and operations.' },
  'benefit.efficiency': { bg: 'По-лесна работа всеки ден', en: 'Operational Efficiency' },
  'benefit.efficiencyDesc': { bg: 'Премахваме досадните ръчни задачи и правим процесите по-бързи, за да имате време за наистина важните неща.', en: 'Streamline your operations with effective technology solutions and automation to boost productivity.' },
  'benefit.innovation': { bg: 'Винаги крачка напред', en: 'Innovation & Growth' },
  'benefit.innovationDesc': { bg: 'Внедряваме полезни иновации и AI инструменти, които ви дават реално предимство пред конкуренцията.', en: 'Drive innovation and sustainable growth through strategic technology implementation and digital transformation.' },
  'benefit.leadership': { bg: 'Експертно рамо до вас', en: 'Expert Leadership' },
  'benefit.leadershipDesc': { bg: 'Имате кого да попитате за всичко технологично. Ние сме вашият навигатор в света на дигиталните услуги.', en: 'Access experienced WIO-level expertise without the overhead of a full-time executive hire.' },

  // Clients Section
  'clients.title': { bg: 'Нашите клиенти', en: 'Our Clients' },
  'clients.subtitle': { bg: 'Доверени от водещи компании', en: 'Trusted by leading companies' },
  'clients.testimonial1.text': { bg: 'Изключителен професионализъм. BoragoWeb донесе реални резултати и модернизира бизнеса ни.', en: 'Exceptional professionalism. BoragoWeb delivered real results and modernized our business.' },
  'clients.testimonial1.author': { bg: 'Ивайло Лазаров', en: 'Ivaylo Lazarov' },
  'clients.testimonial1.company': { bg: 'Medtrans', en: 'Medtrans' },
  'clients.testimonial2.text': { bg: 'Благодарение на BoragoWeb, клиентите ни се увеличиха значително. Препоръчвам горещо!', en: 'Thanks to BoragoWeb, our customers increased significantly. Highly recommended!' },
  'clients.testimonial2.author': { bg: 'Ваня Димитрова', en: 'Vanya Dimitrova' },
  'clients.testimonial2.company': { bg: 'Cafe Borago', en: 'Cafe Borago' },

  // Team Section
  'team.title': { bg: 'Нашият екип', en: 'Our Team' },
  'team.subtitle': { bg: 'Запознайте се с талантливите хора зад нашия успех', en: 'Meet the talented people behind our success' },

  // Home Page
  'home.featuredWork': { bg: 'Избрани проекти', en: 'Featured Work' },
  'home.featuredWorkDesc': { bg: 'Разгледайте нашите най-нови проекти и творчески начинания', en: 'Explore our latest projects and creative endeavors' },
  'home.viewAll': { bg: 'Виж всички', en: 'View All' },
  'home.viewAllProjects': { bg: 'Виж всички проекти', en: 'View All Projects' },
  'home.shopProducts': { bg: 'Магазин за дигитални продукти', en: 'Shop Digital Products' },
  'home.shopProductsDesc': { bg: 'Премиум инструменти и ресурси за създатели', en: 'Premium tools and resources for creators' },
  'home.viewAllProducts': { bg: 'Виж всички продукти', en: 'View All Products' },
  'home.ctaTitle': { bg: 'Готови ли сте да работим заедно?', en: 'Ready to Work Together?' },
  'home.ctaDesc': { bg: 'Нека създадем нещо невероятно. Свържете се с нас, за да обсъдим вашия проект.', en: 'Let\'s create something amazing. Get in touch to discuss your project.' },
  'home.getInTouch': { bg: 'Свържете се с нас', en: 'Get in Touch' },

  // Common
  'common.loading': { bg: 'Зареждане...', en: 'Loading...' },
  'common.error': { bg: 'Грешка', en: 'Error' },
  'common.an': { bg: '', en: 'an' },
  'common.a': { bg: '', en: 'a' },

  // Cookie Consent
  'cookie.title': { bg: 'Използваме бисквитки', en: 'We Use Cookies' },
  'cookie.description': { bg: 'Използваме бисквитки, за да подобрим вашето изживяване на нашия уебсайт. Продължавайки да използвате този сайт, вие се съгласявате с нашата политика за бисквитки.', en: 'We use cookies to enhance your experience on our website. By continuing to use this site, you agree to our cookie policy.' },
  'cookie.accept': { bg: 'Приемам', en: 'Accept' },
  'cookie.decline': { bg: 'Отказвам', en: 'Decline' },
  'cookie.settings': { bg: 'Настройки за бисквитки', en: 'Cookie Settings' },
  'cookie.settingsDescription': { bg: 'Използваме бисквитки, за да подобрим вашето изживяване на нашия уебсайт. Моля, изберете какви бисквитки желаете да разрешите:', en: 'We use cookies to improve your experience on our website. Please choose which cookies you would like to allow:' },
  'cookie.necessary': { bg: 'Необходими бисквитки', en: 'Necessary Cookies' },
  'cookie.necessaryDesc': { bg: 'Тези бисквитки са необходими за правилното функциониране на уебсайта и не могат да бъдат изключени.', en: 'These cookies are necessary for the proper functioning of the website and cannot be disabled.' },
  'cookie.functional': { bg: 'Функционални бисквитки', en: 'Functional Cookies' },
  'cookie.functionalDesc': { bg: 'Тези бисквитки позволяват на уебсайта да запомня вашите предпочитания (като език и регион).', en: 'These cookies allow the website to remember your preferences (such as language and region).' },
  'cookie.analytical': { bg: 'Аналитични бисквитки', en: 'Analytical Cookies' },
  'cookie.analyticalDesc': { bg: 'Тези бисквитки ни помагат да разберем как посетителите използват уебсайта, за да го подобрим.', en: 'These cookies help us understand how visitors use the website, so we can improve it.' },
  'cookie.required': { bg: 'Задължителни', en: 'Required' },
  'cookie.savePreferences': { bg: 'Запази избраните', en: 'Save Preferences' },
  'cookie.acceptAll': { bg: 'Приемам всички', en: 'Accept All' },

  // Pricing Actions
  'pricing.makeRequest': { bg: 'Направете запитване', en: 'Make Request' },

  // Services Section
  'services.title': { bg: 'Нашите услуги', en: 'Our Services' },
  'services.subtitle': { bg: 'Комплексни дигитални решения за вашия бизнес', en: 'Comprehensive digital solutions for your business' },

  'service.webDev.title': { bg: 'Уеб разработка', en: 'Web Development' },
  'service.webDev.desc': { bg: 'Вашият уебсайт работи безупречно на телефон, таблет и компютър. Клиентите ви намират лесно през Google. Вие управлявате съдържанието сами – без да викате програмист всеки път.', en: 'Your website works flawlessly on phones, tablets, and computers. Customers find you easily on Google. You manage content yourself—no need to call a programmer every time.' },
  'service.webDev.tag': { bg: 'Повече клиенти от Google', en: 'More customers from Google' },

  'service.ecommerce.title': { bg: 'Електронна търговия', en: 'E-commerce Solutions' },
  'service.ecommerce.desc': { bg: 'Продавайте онлайн 24/7, дори докато спите. Клиентите поръчват за минути, а вие управлявате продуктите и цените с няколко клика. Предлагаме плащания с карта, кеш при доставка и всичко необходимо за първата продажба.', en: 'Sell online 24/7, even while you sleep. Customers order in minutes, and you manage products and prices with a few clicks. We provide card payments, cash on delivery, and everything needed for your first sale.' },
  'service.ecommerce.tag': { bg: 'Продавайте денонощно', en: 'Sell around the clock' },

  'service.automation.title': { bg: 'Автоматизация', en: 'Automation' },
  'service.automation.desc': { bg: 'Спестете часове всяка седмица от досадни повтарящи се задачи. Автоматично изпращане на имейли, свързване на вашите инструменти да работят заедно, AI асистент който отговаря на често задавани въпроси вместо вас.', en: 'Save hours every week on tedious repetitive tasks. Automatic email sending, connecting your tools to work together, AI assistant that answers common questions instead of you.' },
  'service.automation.tag': { bg: 'Спестете време', en: 'Save time' },

  'service.custom.title': { bg: 'Индивидуални решения', en: 'Custom Solutions' },
  'service.custom.desc': { bg: 'Имате уникален начин на работа, който стандартните програми не поддържат? Създаваме точно това, от което се нуждаете – от специални калкулатори и системи за резервации до табла за управление и свързване с вашите съществуващи системи.', en: 'Have a unique way of working that standard software doesn\'t support? We create exactly what you need—from custom calculators and booking systems to management dashboards and connections with your existing systems.' },
  'service.custom.tag': { bg: 'Решение точно за вас', en: 'Made for you' },

  // About Us Page
  'about.hero.title': { bg: 'Повече от просто код – ние сме вашите дигитални партньори.', en: 'More Than Just Code—We’re Your Digital Partners.' },
  'about.hero.subtitle': { bg: 'Създаването на уебсайтове е нашият занаят, но изграждането на доверие е нашата страст.', en: 'Building websites is our craft, but building relationships is our passion.' },

  'about.story.title': { bg: 'Нашата история', en: 'Our Story' },
  'about.story.p1': { bg: 'Всичко започна съвсем просто: двама приятели, един лаптоп и една идея. Огледахме се в дигиталния свят и видяхме много шум – безлични агенции, еднакви шаблони и клиенти, които се чувстват като поредния номер в системата.', en: 'It started simply enough: two friends, a shared laptop, and a realization. We looked around at the digital landscape and saw a lot of noise—impersonal agencies, cookie-cutter templates, and clients feeling like just another ticket number.' },
  'about.story.p2': { bg: 'Знаехме, че можем по-добре. Преди две години решихме да превърнем нашите късни вечери на програмиране и безкрайни чаши кафе в BoragoWeb. Това, което ни мотивира, не беше просто желанието да правим красиви сайтове (въпреки че обожаваме тази част), а стремежът да създадем нещо, което наистина помага на хората да развиват бизнеса си.', en: 'We knew we could do better. Two years ago, we decided to turn our late-night coding sessions and endless cups of coffee into BoragoWeb. What drove us wasn\'t just the desire to build beautiful websites (though we love that part), but the drive to create something that actually helps people grow their businesses.' },
  'about.story.p3': { bg: 'Искахме да бъдем техническите партньори, които самите ние бихме искали да наемем: надеждни, честни и истински загрижени за вашия успех.', en: 'We wanted to be the technical partners we\'d want to hire ourselves: reliable, honest, and actually invested in your success.' },

  'about.approach.title': { bg: 'Нашият подход: Малък екип, голямо въздействие', en: 'Our Approach: Small Team, Big Impact' },
  'about.approach.p1': { bg: 'Ние не сме гигантска агенция със сложни управленски нива и бавни процеси. И честно казано? Смятаме, че това е нашата суперсила. Когато работите с BoragoWeb, вие работите директно с нас – хората, които реално изграждат вашия сайт.', en: 'We’re not a giant agency with layers of management and prolonged timelines. And honestly? We think that’s our superpower. When you work with BoragoWeb, you work directly with us—the people actually building your site.' },
  'about.approach.p2': { bg: 'Няма "развален телефон". Това означава, че въпросите ви получават по-бърз отговор, визията ви се разбира по-ясно, а проектът върви по-гладко. Ние се отнасяме към всеки проект така, сякаш е за нашия собствен бизнес.', en: 'There’s no "middleman" lost in translation. This means your questions get answered faster, your vision is understood clearer, and your project moves smoother. We treat every project as if it were for our own business.' },

  'about.values.title': { bg: 'Нашите ценности', en: 'Our Values' },
  'about.values.quality.title': { bg: 'Качество пред количество', en: 'Quality Over Quantity' },
  'about.values.quality.desc': { bg: 'Поемаме ограничен брой проекти, за да можем да дадем на всеки един вниманието, което заслужава. Използване на готови, банални шаблони? Това не е нашият стил.', en: 'We take on a limited number of projects so we can give each one the attention it deserves. Use generic templates? Not our style.' },
  'about.values.people.title': { bg: 'Хората на първо място', en: 'People First' },
  'about.values.people.desc': { bg: 'Технологиите са страхотни, но хората са тези, които имат значение. Ценим връзката, която изграждаме с вас, толкова, колкото и кода, който пишем.', en: 'Technology is cool, but people are what matter. We value the relationship we build with you as much as the code we write.' },
  'about.values.transparency.title': { bg: 'Пълна прозрачност', en: 'Radical Transparency' },
  'about.values.transparency.desc': { bg: 'Без скрити такси, без сложен технически жаргон, целящ да ви обърка. Само ясна комуникация и честни съвети.', en: 'No hidden fees, no tech jargon designed to confuse you. Just clear communication and honest advice.' },

  'about.expertise.title': { bg: 'Нашият опит', en: 'Our Expertise' },
  'about.expertise.p1': { bg: 'През последните две години имахме привилегията да помагаме на бизнеси от различни индустрии да изградят своето дигитално присъствие. От интуитивни онлайн магазини до елегантни портфолио сайтове – научихме какво работи и какво не.', en: 'Over the last two years, we’ve had the privilege of helping businesses across various industries establish their digital presence. From intuitive e-commerce platforms to sleek portfolio sites, we’ve learned what works and what doesn\'t.' },
  'about.expertise.p2': { bg: 'Може да сме млада компания, но това само означава, че сме амбициозни, гъвкави и в крак с абсолютно най-новите тенденции в уеб технологиите. Не лежим на стари лаври и "как винаги се е правило" – ние търсим "как трябва да се прави днес".', en: 'We might be young as a company, but that just means we’re hungry, adaptable, and up-to-date with the absolute latest in web technology. We don’t rest on "how it’s always been done"—we look for "how it should be done today."' },

  'about.cta.title': { bg: 'Готови ли сте да създадем нещо страхотно заедно?', en: 'Ready to build something great together?' },
  'about.cta.subtitle': { bg: 'Независимо дали имате готов план или само бегла идея, ще се радваме да чуем вашата история и да видим как можем да бъдем част от нея.', en: 'Whether you have a full roadmap or just a rough idea, we’d love to hear your story and see how we can be a part of it.' },

  // About/Contact Page
  'contact.title': { bg: 'Свържете се с нас', en: 'Contact sales' },
  'contact.subtitle': { bg: 'Свържете се с нашия екип за продажби', en: 'Get in touch with our sales team' },
  'contact.firstName': { bg: 'Име', en: 'First name' },
  'contact.lastName': { bg: 'Фамилия', en: 'Last name' },
  'contact.company': { bg: 'Компания', en: 'Company' },
  'contact.email': { bg: 'Имейл', en: 'Email' },
  'contact.message': { bg: 'Съобщение', en: 'Message' },
  'contact.agreeToPolicy': { bg: 'Като избирате това, вие се съгласявате с нашата', en: 'By selecting this, you agree to our' },
  'contact.privacyPolicy': { bg: 'политика за поверителност', en: 'privacy policy' },
  'contact.submit': { bg: 'Да поговорим', en: 'Let\'s talk' },

  // Portfolio Page
  'portfolio.title': { bg: 'Портфолио', en: 'Portfolio' },
  'portfolio.subtitle': { bg: 'Витрина на нашата творческа работа, иновативни решения и успешни проекти. Всяка част разказва уникална история на сътрудничество и съвършенство.', en: 'A showcase of our creative work, innovative solutions, and successful projects. Each piece tells a unique story of collaboration and excellence.' },
  'portfolio.filteredBy': { bg: 'Филтрирано по:', en: 'Filtered by:' },
  'portfolio.noProjects': { bg: 'Не са намерени проекти.', en: 'No projects found.' },

  // Blog Page
  'blog.title': { bg: 'Блог', en: 'Blog' },
  'blog.subtitle': { bg: 'Прозрения, уроци и актуализации от нашия екип. Бъдете в крак с най-новото в дизайна, разработката и творческите технологии.', en: 'Insights, tutorials, and updates from our team. Stay up to date with the latest in design, development, and creative technology.' },
  'blog.noPosts': { bg: 'Все още няма публикации в блога. Проверете отново скоро!', en: 'No blog posts yet. Check back soon!' },

  // Cart Page
  'cart.title': { bg: 'Количка за пазаруване', en: 'Shopping Cart' },
  'cart.empty': { bg: 'Вашата количка е празна', en: 'Your cart is empty' },
  'cart.emptyDesc': { bg: 'Добавете продукти в количката си, за да започнете.', en: 'Add some products to your cart to get started.' },
  'cart.browseProducts': { bg: 'Разгледайте продуктите', en: 'Browse Products' },
  'cart.orderSummary': { bg: 'Обобщение на поръчката', en: 'Order Summary' },
  'cart.items': { bg: 'Артикули', en: 'Items' },
  'cart.shipping': { bg: 'Доставка', en: 'Shipping' },
  'cart.free': { bg: 'Безплатна', en: 'Free' },
  'cart.total': { bg: 'Общо', en: 'Total' },
  'cart.checkout': { bg: 'Продължете към плащане', en: 'Proceed to Checkout' },
  'cart.continueShopping': { bg: 'Продължете пазаруването', en: 'Continue Shopping' },
  'cart.noImage': { bg: 'Няма изображение', en: 'No image' },
  'cart.decreaseQuantity': { bg: 'Намалете количеството', en: 'Decrease quantity' },
  'cart.increaseQuantity': { bg: 'Увеличете количеството', en: 'Increase quantity' },
  'cart.removeItem': { bg: 'Премахнете артикул', en: 'Remove item' },

  // Shop Page
  'shop.title': { bg: 'Магазин', en: 'Shop' },
  'shop.subtitle': { bg: 'Разгледайте нашата колекция от премиум дигитални продукти', en: 'Browse our collection of premium digital products' },

  // Footer
  'footer.description': { bg: 'Креативни уеб дизайни и дигитални продукти. Изграждаме красиви изживявания за модерния уеб.', en: 'Creative web designs and digital products. Building beautiful experiences for the modern web.' },
  'footer.company': { bg: 'Компания', en: 'Company' },
  'footer.shop': { bg: 'Магазин', en: 'Shop' },
  'footer.legal': { bg: 'Правна информация', en: 'Legal' },
  'footer.about': { bg: 'За нас', en: 'About' },
  'footer.team': { bg: 'Екип', en: 'Team' },
  'footer.blog': { bg: 'Блог', en: 'Blog' },
  'footer.allProducts': { bg: 'Всички продукти', en: 'All Products' },
  'footer.cart': { bg: 'Количка', en: 'Cart' },
  'footer.privacyPolicy': { bg: 'Политика за поверителност', en: 'Privacy Policy' },
  'footer.termsOfService': { bg: 'Условия за ползване', en: 'Terms of Service' },
  'footer.rights': { bg: 'Всички права запазени.', en: 'All rights reserved.' },

  // Terms Page
  'terms.title': { bg: 'Условия за ползване', en: 'Terms & Services' },
  'terms.lastUpdated': { bg: 'Последна актуализация: 12 октомври 2025', en: 'Last updated: October 12, 2025' },
  'terms.section1.title': { bg: '1. Приемане на условията', en: '1. Acceptance of Terms' },
  'terms.section1.content': { bg: 'Чрез достъп и използване на услугите на Borago Web, вие приемате и се съгласявате да бъдете обвързани от условията и разпоредбите на това споразумение. Ако не се съгласявате с горепосоченото, моля не използвайте тази услуга.', en: 'By accessing and using Borago Web services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.' },
  'terms.section2.title': { bg: '2. Описание на услугите', en: '2. Services Description' },
  'terms.section2.content': { bg: 'Borago Web действа като ваш посветен технологичен партньор, предоставящ цялостни дигитални решения. Нашите услуги включват, но не се ограничават до:', en: 'Borago Web acts as your dedicated technology partner, providing comprehensive digital solutions. Our services include but are not limited to:' },
  'terms.section2.item1': { bg: 'Изработка на уебсайтове и електронни магазини по поръчка', en: 'Custom website and e-commerce development' },
  'terms.section2.item2': { bg: 'Внедряване на AI асистенти и автоматизация на процесите', en: 'AI assistants integration and workflow automation' },
  'terms.section2.item3': { bg: 'Цялостен дигитален мениджмънт (WIO-as-a-Service)', en: 'Comprehensive digital management (WIO-as-a-Service)' },
  'terms.section2.item4': { bg: 'Стратегически технологични консултации', en: 'Strategic technology consulting' },
  'terms.section2.item5': { bg: 'Непрекъсната поддръжка, сигурност и оптимизация', en: 'Continuous maintenance, security, and optimization' },
  'terms.section3.title': { bg: '3. Финансови условия и плащания', en: '3. Financial Terms and Payments' },
  'terms.section3.content': { bg: 'Ние вярваме в пълната прозрачност без скрити такси. Нашите условия за плащане са структурирани по следния начин:', en: 'We believe in radical transparency with no hidden fees. Our payment terms are structured as follows:' },
  'terms.section3.item1': { bg: 'За еднократни проекти плащането се извършва на предварително уговорени етапи', en: 'For one-off projects, payments are tied to predetermined milestones' },
  'terms.section3.item2': { bg: 'За абонаментни услуги (WIO) плащането се извършва в началото на всеки месец', en: 'For subscription/retainer services (WIO), payments are due at the start of each billing cycle' },
  'terms.section3.item3': { bg: 'Всички фактури подлежат на плащане в рамките на 14 дни от издаването', en: 'All invoices are payable within 14 days of issuance' },
  'terms.section3.item4': { bg: 'Всички такси са невъзстановими след започване на фазата на разработка', en: 'All fees are non-refundable once the active development phase has commenced' },
  'terms.section4.title': { bg: '4. Интелектуална собственост', en: '4. Intellectual Property' },
  'terms.section4.content': { bg: 'След пълно плащане, цялата персонализирана работа, създадена специално за клиента, става собственост на клиента. Въпреки това, Borago Web запазва правото да използва работата в нашето портфолио и маркетингови материали. Предварително съществуващ код, рамки и компоненти на трети страни остават собственост на съответните им собственици.', en: 'Upon full payment, all custom work created specifically for the client becomes the property of the client. However, Borago Web retains the right to use the work in our portfolio and marketing materials. Pre-existing code, frameworks, and third-party components remain the property of their respective owners.' },
  'terms.section5.title': { bg: '5. Срокове на проекта', en: '5. Project Timeline' },
  'terms.section5.content': { bg: 'Сроковете на проекта са приблизителни и могат да бъдат променени въз основа на сложността на проекта, обратната връзка от клиента и непредвидени обстоятелства. Забавяния, причинени от клиента (като забавена доставка на съдържание или обратна връзка), могат да удължат съответно срока на проекта.', en: 'Project timelines are estimates and may be subject to change based on project complexity, client feedback, and unforeseen circumstances. Delays caused by the client (such as delayed content delivery or feedback) may extend the project timeline accordingly.' },
  'terms.section6.title': { bg: '6. Отговорности на клиента', en: '6. Client Responsibilities' },
  'terms.section6.content': { bg: 'Клиентът се съгласява да:', en: 'The client agrees to:' },
  'terms.section6.item1': { bg: 'Предоставя навременна обратна връзка и одобрения', en: 'Provide timely feedback and approvals' },
  'terms.section6.item2': { bg: 'Доставя цялото необходимо съдържание, изображения и материали', en: 'Supply all necessary content, images, and materials' },
  'terms.section6.item3': { bg: 'Гарантира, че цялото предоставено съдържание е законно притежавано или лицензирано', en: 'Ensure all provided content is legally owned or licensed' },
  'terms.section6.item4': { bg: 'Поддържа комуникация през целия проект', en: 'Maintain communication throughout the project' },
  'terms.section7.title': { bg: '7. Ревизии и промени', en: '7. Revisions and Changes' },
  'terms.section7.content': { bg: 'Всеки проект включва определен брой кръгове на ревизии. Допълнителни ревизии извън договорения обхват могат да доведат до допълнителни такси. Основни промени в обхвата на проекта ще изискват ново споразумение и допълнително плащане.', en: 'Each project includes a specified number of revision rounds. Additional revisions beyond the agreed scope may incur additional charges. Major changes to project scope will require a new agreement and additional payment.' },
  'terms.section8.title': { bg: '8. Гаранция и поддръжка', en: '8. Warranty and Support' },
  'terms.section8.content': { bg: 'Borago Web предоставя гаранционен период за отстраняване на грешки и технически проблеми, произтичащи от нашата работа. Гаранционният период и условията ще бъдат посочени в споразумението за проекта. Текуща поддръжка и услуги по поддръжка са налични при отделни споразумения.', en: 'Borago Web provides a warranty period for bug fixes and technical issues arising from our work. The warranty period and terms will be specified in the project agreement. Ongoing support and maintenance services are available under separate agreements.' },
  'terms.section10.title': { bg: '9. Прекратяване', en: '9. Termination' },
  'terms.section10.content': { bg: 'Всяка от страните може да прекрати споразумението с писмено уведомление. При прекратяване, клиентът носи отговорност за плащане на цялата извършена работа до датата на прекратяване. Всички завършени и платени резултати ще бъдат предоставени на клиента.', en: 'Either party may terminate the agreement with written notice. Upon termination, the client is responsible for payment of all work completed up to the termination date. All deliverables completed and paid for will be provided to the client.' },
  'terms.section11.title': { bg: '10. Поверителност', en: '10. Confidentiality' },
  'terms.section11.content': { bg: 'И двете страни се съгласяват да поддържат поверителността на всяка собствена или чувствителна информация, споделена по време на проекта. Това задължение продължава и след завършване на проекта.', en: 'Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the project. This obligation continues after project completion.' },
  'terms.section12.title': { bg: '11. Приложимо право', en: '11. Governing Law' },
  'terms.section12.content': { bg: 'Тези условия се управляват и тълкуват в съответствие със законите на България. Всички спорове, произтичащи от тези условия, подлежат на изключителната юрисдикция на българските съдилища.', en: 'These terms shall be governed by and construed in accordance with the laws of Bulgaria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the Bulgarian courts.' },
  'terms.section13.title': { bg: '12. Промени в условията', en: '12. Changes to Terms' },
  'terms.section13.content': { bg: 'Borago Web си запазва правото да променя тези условия по всяко време. Промените влизат в сила незабавно след публикуването им на нашия уебсайт. Продължаващото използване на нашите услуги представлява приемане на променените условия.', en: 'Borago Web reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services constitutes acceptance of modified terms.' },
  'terms.contactUs': { bg: 'Свържете се с нас', en: 'Contact Us' },
  'terms.contactDesc': { bg: 'Ако имате въпроси относно тези Условия за ползване, моля свържете се с нас:', en: 'If you have any questions about these Terms & Services, please contact us:' },
  'terms.email': { bg: 'Имейл:', en: 'Email:' },

  // Lead Funnel
  // Lead Funnel
  'funnel.step1.headline': { bg: 'Кое е най-голямото предизвикателство пред бизнеса ви в момента?', en: 'What is your business\'s biggest challenge right now?' },
  'funnel.step1.subheadline': { bg: 'Изберете едно, за да видите как можем да ви помогнем.', en: 'Select one to see how we can help you.' },
  'funnel.step1.cardA': { bg: 'Имам нужда от модерен сайт, който печели доверие.', en: 'I need a professional website that wins customer trust.' },
  'funnel.step1.cardB': { bg: 'Губя часове всяка седмица в досадни ръчни задачи.', en: 'I\'m wasting hours every week on manual, repetitive work.' },
  'funnel.step1.cardC': { bg: 'Трябват ми и двете: нов сайт и система, която пести време.', en: 'I need both: a trusted brand and a system that saves me time.' },

  'funnel.step2.condA.headline': { bg: 'Какъв е основният ви бизнес модел?', en: 'What best describes your business?' },
  'funnel.step2.condA.btn1': { bg: 'Продавам продукти онлайн', en: 'Selling products online' },
  'funnel.step2.condA.btn2': { bg: 'Предлагам услуги на клиенти', en: 'Providing services to clients' },
  'funnel.step2.condA.btn3': { bg: 'Изграждам личен бранд / Портфолио', en: 'Building a personal brand' },
  'funnel.step2.condA.btn4': { bg: 'Трябва ми специализирана платформа', en: 'I need a specialized platform' },

  'funnel.step2.condB.headline': { bg: 'Къде губите най-много време и усилия?', en: 'Which part of your day feels the most overwhelming?' },
  'funnel.step2.condB.btn1': { bg: 'Намиране на нови клиенти', en: 'Finding new customers' },
  'funnel.step2.condB.btn2': { bg: 'Задържане на настоящите клиенти (Имейли)', en: 'Keeping in touch with clients (Emails)' },
  'funnel.step2.condB.btn3': { bg: 'Документи, фактури и администрация', en: 'Paperwork, invoicing & admin' },
  'funnel.step2.condB.btn4': { bg: 'Обслужване на въпроси на клиенти', en: 'Answering common client questions' },

  'funnel.step3.headline': { bg: 'Кога бихте искали да започнем?', en: 'How quickly do you want to start solving this?' },
  'funnel.step3.btn1': { bg: 'Възможно най-скоро (до 2 седмици)', en: 'ASAP (Within 2 weeks)' },
  'funnel.step3.btn2': { bg: 'В рамките на следващия месец', en: 'Within the next month' },
  'funnel.step3.btn3': { bg: 'Просто разглеждам опциите си', en: 'Just exploring my options' },
  'funnel.loading': { bg: 'Изчисляваме вашият персонален план за действие...', en: 'Calculating your custom action plan...' },

  'funnel.step4.headline': { bg: 'Готово! 🎉', en: 'All set! 🎉' },
  'funnel.step4.subheadline': { bg: 'Въведете детайлите си по-долу и ще ви изпратим плана.', en: 'Enter your details below and we\'ll send you the plan.' },
  'funnel.firstName': { bg: 'Име', en: 'First Name' },
  'funnel.workEmail': { bg: 'Служебен имейл', en: 'Work Email' },
  'funnel.submit': { bg: 'Изпрати и виж плана', en: 'Submit & Get Plan' },

  'funnel.back': { bg: 'Назад', en: 'Back' },

  'funnel.success': { bg: 'Успешно завършено! Пренасочваме ви...', en: 'Success! Redirecting you...' },


  // Product Page
  'product.addToCart': { bg: 'Добави в количката', en: 'Add to Cart' },
  'product.outOfStock': { bg: 'Изчерпан', en: 'Out of Stock' },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('bg')

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'bg' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const translation = translations[key]
    if (!translation) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translation[language] || translation.en || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
