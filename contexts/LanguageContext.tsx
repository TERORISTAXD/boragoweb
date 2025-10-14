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
  
  // Hero Section
  'hero.title': { bg: 'Създаваме уеб решения', en: 'We Create Web Solutions' },
  'hero.subtitle': { bg: 'Модерни уебсайтове и онлайн магазини', en: 'Modern Websites and Online Stores' },
  'hero.cta': { bg: 'Започнете сега', en: 'Get Started' },
  
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
  'pricing.consultationDesc': { bg: 'Безплатна констултация за вас или вашият бизнес.', en: 'The perfect plan if you\'re just getting started with our product.' },
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
  
  // Hero Section
  'hero.badge': { bg: 'Водещи AI и уеб дизайнери за прогресивни бизнеси', en: 'Leading AI and Web Designers for Progressive Businesses' },
  'hero.mainTitle1': { bg: 'Вашата компания', en: 'Your company' },
  'hero.mainTitle2': { bg: 'се нуждае от', en: 'needs' },
  'hero.aiServices': { bg: 'AI услуги', en: 'AI Services' },
  'hero.website': { bg: 'уебсайт', en: 'Website' },
  'hero.subtitle1': { bg: 'Експертни WIO услуги, адаптирани към вашите бизнес нужди', en: 'Expert WIO Services Tailored for Your Business Needs' },
  'hero.subtitle2': { bg: 'Трансформирайте операциите си с AI-базирани решения', en: 'Transform Your Operations with AI-Driven Solutions' },
  'hero.getStarted': { bg: 'Започнете', en: 'Get Started' },
  'hero.bookConsultation': { bg: 'Резервирайте консултация', en: 'Book a Consultation' },
  
  // WIO Section
  'wio.whatIs': { bg: 'Какво е', en: 'What is' },
  'wio.title': { bg: 'WIO-като-услуга', en: 'WIO-as-a-Service' },
  'wio.description': { bg: 'Нашата WIO-като-услуга ви предлага експертизата на Web Intelligence Officer без допълнителните разходи. От разработка на уебсайт до AI интеграция, ние предоставяме цялостни дигитални решения, адаптирани към вашия бизнес, осигурявайки дългосрочен растеж, ефективност и иновации.', en: 'Our WIO-as-a-Service offers you the expertise of a Web Intelligence Officer without the overhead. From website development to AI integration, we provide end-to-end digital solutions tailored to your business, ensuring long-term growth, efficiency, and innovation.' },
  
  // Benefits
  'benefit.strategicPlanning': { bg: 'Стратегическо планиране', en: 'Strategic Planning' },
  'benefit.strategicPlanningDesc': { bg: 'Разработете и изпълнете технологична пътна карта, съобразена с вашите бизнес цели, за да осигурите устойчив растеж.', en: 'Develop and execute a technology roadmap aligned with your business goals to ensure sustainable growth.' },
  'benefit.security': { bg: 'Сигурност и съответствие', en: 'Security & Compliance' },
  'benefit.securityDesc': { bg: 'Внедрете усъвършенствани мерки за сигурност и осигурете съответствие с индустриалните стандарти за защита на вашия бизнес.', en: 'Implement advanced security measures and ensure compliance with industry standards to protect your business.' },
  'benefit.customSolutions': { bg: 'Персонализирани решения', en: 'Custom Solutions' },
  'benefit.customSolutionsDesc': { bg: 'Софтуерни решения по поръчка, адресиращи вашите специфични нужди, от фактуриране и автоматизация до интеграция и операции.', en: 'Tailor-made software solutions addressing your specific needs, from billing and automation to integration and operations.' },
  'benefit.efficiency': { bg: 'Оперативна ефективност', en: 'Operational Efficiency' },
  'benefit.efficiencyDesc': { bg: 'Оптимизирайте операциите си с ефективни технологични решения и автоматизация за повишаване на производителността.', en: 'Streamline your operations with effective technology solutions and automation to boost productivity.' },
  'benefit.innovation': { bg: 'Иновации и растеж', en: 'Innovation & Growth' },
  'benefit.innovationDesc': { bg: 'Стимулирайте иновациите и устойчивия растеж чрез стратегическо внедряване на технологии и дигитална трансформация.', en: 'Drive innovation and sustainable growth through strategic technology implementation and digital transformation.' },
  'benefit.leadership': { bg: 'Експертно лидерство', en: 'Expert Leadership' },
  'benefit.leadershipDesc': { bg: 'Получете достъп до опитна експертиза на WIO ниво без разходите за пълноценно наемане на изпълнителен директор.', en: 'Access experienced WIO-level expertise without the overhead of a full-time executive hire.' },
  
  // Clients Section
  'clients.title': { bg: 'Нашите клиенти', en: 'Our Clients' },
  'clients.subtitle': { bg: 'Доверени от водещи компании', en: 'Trusted by leading companies' },
  
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
  'terms.section2.content': { bg: 'Borago Web предоставя уеб разработка, интеграция на изкуствен интелект и дигитални услуги, включително, но не само:', en: 'Borago Web provides web development, AI integration, and digital services including but not limited to:' },
  'terms.section2.item1': { bg: 'Дизайн и разработка на уебсайтове', en: 'Website design and development' },
  'terms.section2.item2': { bg: 'Решения за електронна търговия', en: 'E-commerce solutions' },
  'terms.section2.item3': { bg: 'Услуги и интеграции, базирани на изкуствен интелект', en: 'AI-powered services and integrations' },
  'terms.section2.item4': { bg: 'Уеб консултации и стратегия', en: 'Web consulting and strategy' },
  'terms.section2.item5': { bg: 'Услуги по поддръжка и техническа поддръжка', en: 'Maintenance and support services' },
  'terms.section3.title': { bg: '3. Условия за плащане', en: '3. Payment Terms' },
  'terms.section3.content': { bg: 'Всички цени са изброени в евро (€) и подлежат на промяна без предизвестие. Условията за плащане включват:', en: 'All prices are listed in Euros (€) and are subject to change without notice. Payment terms include:' },
  'terms.section3.item1': { bg: 'Плащането се изисква преди започване на проекта, освен ако не е договорено друго', en: 'Payment is required before project commencement unless otherwise agreed' },
  'terms.section3.item2': { bg: 'За по-големи проекти ще бъде установен график на плащане', en: 'For larger projects, a payment schedule will be established' },
  'terms.section3.item3': { bg: 'Всички плащания са невъзстановими след започване на работата', en: 'All payments are non-refundable once work has commenced' },
  'terms.section3.item4': { bg: 'Забавени плащания могат да доведат до допълнителни такси', en: 'Late payments may incur additional fees' },
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
  'terms.section9.title': { bg: '9. Ограничение на отговорността', en: '9. Limitation of Liability' },
  'terms.section9.content': { bg: 'Borago Web не носи отговорност за каквито и да било непреки, случайни, специални или последващи щети, произтичащи от или свързани с нашите услуги. Нашата обща отговорност не трябва да надвишава сумата, платена за конкретната въпросна услуга.', en: 'Borago Web shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with our services. Our total liability shall not exceed the amount paid for the specific service in question.' },
  'terms.section10.title': { bg: '10. Прекратяване', en: '10. Termination' },
  'terms.section10.content': { bg: 'Всяка от страните може да прекрати споразумението с писмено уведомление. При прекратяване, клиентът носи отговорност за плащане на цялата извършена работа до датата на прекратяване. Всички завършени и платени резултати ще бъдат предоставени на клиента.', en: 'Either party may terminate the agreement with written notice. Upon termination, the client is responsible for payment of all work completed up to the termination date. All deliverables completed and paid for will be provided to the client.' },
  'terms.section11.title': { bg: '11. Поверителност', en: '11. Confidentiality' },
  'terms.section11.content': { bg: 'И двете страни се съгласяват да поддържат поверителността на всяка собствена или чувствителна информация, споделена по време на проекта. Това задължение продължава и след завършване на проекта.', en: 'Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the project. This obligation continues after project completion.' },
  'terms.section12.title': { bg: '12. Приложимо право', en: '12. Governing Law' },
  'terms.section12.content': { bg: 'Тези условия се управляват и тълкуват в съответствие със законите на България. Всички спорове, произтичащи от тези условия, подлежат на изключителната юрисдикция на българските съдилища.', en: 'These terms shall be governed by and construed in accordance with the laws of Bulgaria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the Bulgarian courts.' },
  'terms.section13.title': { bg: '13. Промени в условията', en: '13. Changes to Terms' },
  'terms.section13.content': { bg: 'Borago Web си запазва правото да променя тези условия по всяко време. Промените влизат в сила незабавно след публикуването им на нашия уебсайт. Продължаващото използване на нашите услуги представлява приемане на променените условия.', en: 'Borago Web reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services constitutes acceptance of modified terms.' },
  'terms.contactUs': { bg: 'Свържете се с нас', en: 'Contact Us' },
  'terms.contactDesc': { bg: 'Ако имате въпроси относно тези Условия за ползване, моля свържете се с нас:', en: 'If you have any questions about these Terms & Services, please contact us:' },
  'terms.email': { bg: 'Имейл:', en: 'Email:' },
  
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
