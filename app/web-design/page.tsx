
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Професионален Уеб Дизайн | Изработка на Бизнес Сайтове - BoragoWeb',
  description: 'Търсите професионален уеб дизайн? BoragoWeb създава модерни и бързи сайтове, които превръщат посетителите в реални клиенти. Вижте цени и портфолио!',
  keywords: 'уеб дизайн, изработка на сайтове, потребителско изживяване, графичен дизайн, WordPress, мобилна версия, скорост на зареждане, конверсия, SEO оптимизация, UI/UX, прототип',
  openGraph: {
    title: 'Професионален Уеб Дизайн за Бизнеса | BoragoWeb',
    description: 'Модерни и бързи сайтове, които превръщат посетителите в клиенти',
    url: 'https://boragoweb.eu/web-design',
    siteName: 'BoragoWeb',
    locale: 'bg_BG',
    type: 'website',
  }
};

export default function WebDesignPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Уеб Дизайн и Разработка",
            "provider": {
              "@type": "Organization",
              "name": "BoragoWeb",
              "url": "https://boragoweb.eu"
            },
            "areaServed": "BG",
            "description": "Професионален уеб дизайн и изработка на бизнес сайтове"
          })
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-6 leading-tight">
            Професионален Уеб Дизайн за Бизнеса:<br />
            <span className="text-blue-600">Пътят към Успешно Онлайн Присъствие (2026)</span>
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* Introduction */}
        <section className="mb-16">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            В дигиталната ера на 2026 година, <strong className="text-blue-600">уеб дизайнът</strong> не е просто естетика - 
            това е мощна машина за продажби, която работи 24/7 за вашия бизнес. 
            Професионалната изработка на сайтове комбинира потребителско изживяване (UX), 
            визуален графичен дизайн (UI) и SEO оптимизация, за да превърне посетителите във ваши клиенти.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            BoragoWeb създава модерни, бързи и конверсиращи уеб сайтове, които отговарят 
            на най-високите стандарти за качество. Независимо дали сте стартиращ малък бизнес 
            или утвърдена средна компания, ние имаме решението за вас.
          </p>
        </section>

        {/* Section 1: Why Web Design Matters */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-2 inline-block">
            Защо Уеб Дизайнът е Лицето на Вашия Бизнес?
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            <strong className="text-blue-600">Първото впечатление е решаващо.</strong> Изследванията показват, 
            че потребителите формират мнение за вашия бизнес само за 0.05 секунди 
            след отварянето на сайта ви. Един професионален уеб дизайн:
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="text-blue-600 text-2xl mr-3">✓</span>
              <div>
                <strong className="text-gray-900">Изгражда доверие и авторитет</strong>
                <span className="text-gray-600"> - 75% от потребителите оценяват достоверността на бизнеса според дизайна на сайта</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 text-2xl mr-3">✓</span>
              <div>
                <strong className="text-gray-900">Подобрява конверсията</strong>
                <span className="text-gray-600"> - добре проектиран сайт може да увеличи продажбите с до 200%</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 text-2xl mr-3">✓</span>
              <div>
                <strong className="text-gray-900">Намалява процента на отпадане</strong>
                <span className="text-gray-600"> - адаптивният мобилен дизайн задържа посетителите на страницата</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 text-2xl mr-3">✓</span>
              <div>
                <strong className="text-gray-900">Подобрява SEO позициите</strong>
                <span className="text-gray-600"> - скоростта на зареждане и потребителското изживяване са ключови фактори за Google</span>
              </div>
            </li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-lg text-gray-800">
              Вашият сайт не е просто визитка - това е вашият най-силен продавач, 
              който никога не спи. Инвестицията в качествен уеб дизайн се връща 
              многократно чрез увеличени поръчки и лоялни клиенти.
            </p>
          </div>
        </section>

        {/* Section 2: What's Included */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-2 inline-block">
            Какво Включва Услугата "Уеб Дизайн" в BoragoWeb?
          </h2>
          
          <p className="text-lg text-gray-700 mb-8">
            Нашият процес на изработка на сайтове е холистичен и обхваща всички 
            аспекти на успешното онлайн присъствие:
          </p>

          {/* Subsection: UX Strategy */}
          <div className="mb-12 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">1</span>
              UX (User Experience) Стратегия - Пътят на Клиента
            </h3>
            
            <p className="text-gray-700 mb-4">
              Потребителското изживяване е основата на всеки успешен проект. Ние:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Анализираме целевата ви аудитория и техните нужди</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Създаваме прототип на потребителския път (user journey)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Оптимизираме навигацията за интуитивно търсене</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Тестваме удобството на използване (usability testing)</span>
              </li>
            </ul>

            <p className="text-gray-700 italic">
              Резултатът е сайт, където всеки посетител лесно намира това, което търси, 
              и бързо преминава от разглеждане към покупка или запитване.
            </p>
          </div>

          {/* Subsection: UI Design */}
          <div className="mb-12 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">2</span>
              UI (User Interface) Дизайн - Визуална Естетика
            </h3>
            
            <p className="text-gray-700 mb-4">
              Графичният дизайн е вашата визуална идентичност онлайн. Ние създаваме:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <div>
                  <strong className="text-gray-900">Модерен минималистичен дизайн</strong>
                  <span className="text-gray-700"> - чист, професионален и фокусиран върху съдържанието</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <div>
                  <strong className="text-gray-900">Цветова палитра и типография</strong>
                  <span className="text-gray-700"> - съобразени с вашия бранд и психологията на цветовете</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <div>
                  <strong className="text-gray-900">Микро-анимации и интерактивност</strong>
                  <span className="text-gray-700"> - фини детайли, които правят изживяването запомнящо се</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <div>
                  <strong className="text-gray-900">Висококачествени изображения и графики</strong>
                  <span className="text-gray-700"> - професионална фотография или AI генерирани визуали</span>
                </div>
              </li>
            </ul>

            <p className="text-gray-700 italic">
              Следваме последните тенденции за 2026 година - от тъмни режими и градиентни фонове 
              до 3D елементи и имерсивни преживявания с изкуствен интелект.
            </p>
          </div>

          {/* Subsection: Responsive Design */}
          <div className="mb-12 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">3</span>
              Адаптивен Дизайн - Перфектен Вид на Мобилни Устройства
            </h3>
            
            <p className="text-gray-700 mb-4">
              <strong className="text-blue-600">Над 65% от българските потребители разглеждат сайтове от смартфони.</strong> Мобилната версия не е опция - това е необходимост.
            </p>

            <p className="text-gray-700 mb-4">
              Нашият адаптивен уеб дизайн гарантира:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Автоматично приспособяване към всякакви екранни размери</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Бърза скорост на зареждане на мобилни мрежи</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Touch-friendly интерфейс с удобни бутони</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">Тестване на iOS, Android и различни браузъри</span>
              </li>
            </ul>

            <p className="text-gray-700 italic">
              Google вече използва mobile-first индексиране, което означава, че мобилната 
              версия на вашия сайт е решаваща за SEO ранкингите ви.
            </p>
          </div>
        </section>

        {/* Section 3: Process */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-2 inline-block">
            Процесът на Работа: От Идеята до Готовия Продукт
          </h2>
          
          <p className="text-lg text-gray-700 mb-8">
            Прозрачността е в основата на нашето сътрудничество. Ето как протича 
            изработката на вашия сайт стъпка по стъпка:
          </p>

          <div className="space-y-6">
            {[
              {
                num: 1,
                title: "Консултация и анализ (1-2 дни)",
                desc: "Безплатна първоначална среща, където обсъждаме вашите цели, целева аудитория, конкуренти и желан стил. Анализираме какво работи в индустрията ви."
              },
              {
                num: 2,
                title: "Стратегия и прототип (3-5 дни)",
                desc: "Създаваме структурата на сайта (sitemap), скелетни модели (wireframes) и интерактивен прототип. Вие виждате как ще изглежда сайтът преди дизайна."
              },
              {
                num: 3,
                title: "Визуален дизайн (5-7 дни)",
                desc: "Разработваме уникален визуален стил - цветове, типография, графики. Представяме ви дизайн на ключови страници (Homepage, About, Services)."
              },
              {
                num: 4,
                title: "Разработка и имплементация (7-14 дни)",
                desc: "Използваме модерни технологии като React, Next.js или WordPress за изграждане на бързи, сигурни сайтове. Интегрираме хостинг, домейн и SSL сертификат."
              },
              {
                num: 5,
                title: "Тестване и оптимизация (2-3 дни)",
                desc: "Проверяваме всичко - скорост, SEO, функционалност, съвместимост с устройства. Коригираме детайли според вашите забележки."
              },
              {
                num: 6,
                title: "Публикуване и обучение (1 ден)",
                desc: "Пускаме сайта на живо и ви обучаваме как да го управлявате. Осигуряваме документация и 30 дни безплатна поддръжка."
              }
            ].map((step) => (
              <div key={step.num} className="flex items-start bg-white border-l-4 border-blue-600 p-6 rounded-r-lg shadow-md transition-transform hover:scale-[1.01]">
                <div className="flex-shrink-0 bg-blue-600 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center text-xl mr-4">
                  {step.num}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Pricing */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-2 inline-block">
            Цена за Уеб Дизайн: Кои Фактори Определят Бюджета?
          </h2>
          
          <p className="text-lg text-gray-700 mb-8">
            Цената за професионален уеб дизайн варира според сложността и нуждите на вашия проект. 
            Ето основните фактори:
          </p>

          {/* Pricing Table */}
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-bold">Фактор</th>
                  <th className="py-4 px-6 text-left font-bold">Влияние върху цената</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold">Тип на сайта</td>
                  <td className="py-4 px-6">Визитка (3-5 страници) е по-евтина от онлайн магазин или платформа</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold">Дизайн</td>
                  <td className="py-4 px-6">Шаблонен дизайн vs индивидуален уникален дизайн на мярка</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold">Функционалност</td>
                  <td className="py-4 px-6">Контактна форма, блог, e-commerce, интеграции с CRM/ERP</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold">Съдържание</td>
                  <td className="py-4 px-6">Предоставяте ли готови текстове и снимки или ни наемате за копирайтинг</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-semibold">SEO & Marketing</td>
                  <td className="py-4 px-6">SEO оптимизация, Google Analytics, реклами, email маркетинг</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Price Ranges */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ориентировъчни ценови диапазони:</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
                <h4 className="font-bold text-lg mb-2">Визитка (3-5 страници)</h4>
                <p className="text-3xl font-bold text-blue-600">от 800 до 2,000 лв</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
                <h4 className="font-bold text-lg mb-2">Корпоративен сайт (8-15 страници)</h4>
                <p className="text-3xl font-bold text-blue-600">от 2,500 до 6,000 лв</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
                <h4 className="font-bold text-lg mb-2">Онлайн магазин (e-commerce)</h4>
                <p className="text-3xl font-bold text-blue-600">от 4,000 до 12,000 лв</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
                <h4 className="font-bold text-lg mb-2">Сложна платформа или портал</h4>
                <p className="text-3xl font-bold text-blue-600">по индивидуална оферта</p>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r">
              <p className="text-gray-800">
                <strong>Важно:</strong> Цената включва пълна разработка, но хостинг и домейн са 
                отделна годишна такса (обикновено 100-300 лв/год). При нас получавате прозрачност - 
                няма скрити разходи.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-b-4 border-blue-600 pb-2 inline-block">
            Често Задавани Въпроси (FAQ)
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Колко време отнема изработката на уеб сайт?",
                a: "Зависи от сложността. Прост сайт-визитка е готов за 2-3 седмици, докато пълноценен онлайн магазин може да отнеме 6-8 седмици. Винаги ви даваме реалистични срокове."
              },
              {
                q: "Каква е разликата между шаблонен и индивидуален дизайн?",
                a: "Шаблонният дизайн използва готови теми (по-бърз и евтин, но по-малко уникален). Индивидуалният дизайн се създава от нулата специално за вас - 100% уникален, пълно съответствие с бранда ви."
              },
              {
                q: "Ще мога ли сам да актуализирам сайта след това?",
                a: "Абсолютно! Ако използваме WordPress или друга CMS система, ще ви обучим как да добавяте текст, снимки, блог постове. За по-технически промени предлагаме месечна поддръжка."
              },
              {
                q: "Как уеб дизайнът помага на продажбите?",
                a: "Добрият дизайн води потребителя през психологически оптимизиран път - от любопитство към доверие и до покупка. Ясни call-to-action бутони, бърза скорост и убедително копи увеличават конверсията с 50-200%."
              },
              {
                q: "Предлагате ли SEO оптимизация?",
                a: "Да! Всеки наш сайт идва с базова SEO оптимизация (мета тагове, структура, скорост). Предлагаме и пълни SEO пакети с keyword research, линк билдинг и месечни отчети."
              },
              {
                q: "Какво се случва след публикуването на сайта?",
                a: "Получавате 30 дни безплатна поддръжка за поправки и малки корекции. След това можете да изберете месечен план за поддръжка (от 50 лв/месец) или да ни наемате ad-hoc за актуализации."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start">
                  <span className="text-blue-600 mr-2">Q:</span>
                  {faq.q}
                </h3>
                <p className="text-gray-700 pl-6">
                  <span className="text-blue-600 font-bold mr-2">A:</span>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Trends 2026 */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-2 inline-block">
            Модерни Тенденции в Уеб Дизайна за 2026
          </h2>
          
          <p className="text-lg text-gray-700 mb-8">
            Световният уеб дизайн се развива бързо. Ето водещите тенденции, които прилагаме в проектите си:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🤖",
                title: "AI-генериран контент и персонализация",
                desc: "Изкуственият интелект създава уникални визуали и адаптира съдържанието според потребителя"
              },
              {
                icon: "✨",
                title: "Микро-интеракции и анимации",
                desc: "Фини визуални отговори на действията на потребителя, които правят сайта 'жив'"
              },
              {
                icon: "🌙",
                title: "Тъмен режим (Dark Mode)",
                desc: "Популярен при младата аудитория, намалява уморът на очите"
              },
              {
                icon: "🎨",
                title: "3D елементи и имерсивни изживявания",
                desc: "Three.js и WebGL технологии за интерактивни 3D модели"
              },
              {
                icon: "🎤",
                title: "Гласов интерфейс и достъпност",
                desc: "Сайтове, които работят чрез гласови команди и са достъпни за хора с увреждания"
              },
              {
                icon: "📐",
                title: "Минимализъм с асиметрични layouts",
                desc: "Чист дизайн с неочаквани визуални акценти"
              }
            ].map((trend, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
                <div className="text-4xl mb-3">{trend.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{trend.title}</h3>
                <p className="text-gray-700">{trend.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
            <p className="text-gray-800">
              В BoragoWeb следим тези тенденции и ги адаптираме според индустрията и целите на всеки клиент. 
              Не прилагаме нови технологии заради <em>"хайпа"</em>, а когато те носят реална стойност за бизнеса ви.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12 rounded-2xl shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Готови ли сте да Стартирате?
          </h2>
          
          <p className="text-xl mb-6 text-center max-w-3xl mx-auto">
            Професионалният уеб дизайн е инвестиция, която се изплаща от първия ден. 
            Вашият сайт е вашият 24/7 продавач, маркетинг инструмент и визитка в едно.
          </p>

          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-center">С BoragoWeb получавате:</h3>
            <ul className="max-w-2xl mx-auto space-y-3">
              <li className="flex items-center">
                <span className="text-yellow-300 text-2xl mr-3">✓</span>
                <span>Уникален дизайн, който изпъква сред конкуренцията</span>
              </li>
              <li className="flex items-center">
                <span className="text-yellow-300 text-2xl mr-3">✓</span>
                <span>Бързи, сигурни и SEO оптимизирани сайтове</span>
              </li>
              <li className="flex items-center">
                <span className="text-yellow-300 text-2xl mr-3">✓</span>
                <span>Прозрачност при цени и процес</span>
              </li>
              <li className="flex items-center">
                <span className="text-yellow-300 text-2xl mr-3">✓</span>
                <span>Дългосрочна поддръжка и експертни съвети</span>
              </li>
            </ul>
          </div>

          <div className="text-center mb-8">
            <p className="text-2xl font-bold mb-6">📞 Свържете се с нас днес за безплатна консултация!</p>
            
            <div className="space-y-2 text-lg">
              <p><strong>Email:</strong> info@boragoweb.com</p>
              <p><strong>Телефон:</strong> +359 XXX XXX XXX</p>
              <p><strong>Уебсайт:</strong> www.boragoweb.com</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/about#contact" 
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition text-center"
            >
              Безплатна Консултация →
            </a>
            <a 
              href="/about#contact" 
              className="inline-block bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition text-center"
            >
              Поискайте Оферта
            </a>
          </div>
        </section>

      </article>

      {/* Footer Note */}
      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2">
            © 2026 BoragoWeb - Професионален Уеб Дизайн и Разработка
          </p>
          <p className="text-gray-500 text-sm">
            Изработка на сайтове | UI/UX Дизайн | SEO Оптимизация | WordPress | React | Next.js
          </p>
        </div>
      </footer>
    </main>
  );
}
