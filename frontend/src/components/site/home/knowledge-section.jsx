import {getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/navigation';

const knowledgeTopics = [
  {category: 'knowledgeOneCategory', title: 'knowledgeOneTitle'},
  {category: 'knowledgeTwoCategory', title: 'knowledgeTwoTitle'},
  {category: 'knowledgeThreeCategory', title: 'knowledgeThreeTitle'}
];

export default async function KnowledgeSection() {
  const t = await getTranslations('Home');

  return (
    <section className="gridContainer border-y border-primary/20 py-20 sm:py-28 lg:py-36">
      <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div data-reveal>
          <h2 className="max-w-[11ch] text-[clamp(3rem,6vw,6.5rem)] font-light leading-[0.91] tracking-[-0.055em] text-primary">
            {t('knowledgeTitle')}
          </h2>
          <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">
            {t('knowledgeDescription')}
          </p>
          <Link
            href="/blog"
            className="mt-9 inline-flex border-b border-primary pb-1 text-sm font-semibold text-primary transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-60"
          >
            {t('knowledgeCta')}
          </Link>
        </div>

        <div className="border-t border-primary/25">
          {knowledgeTopics.map((topic, index) => (
            <article key={topic.title} data-reveal>
              <Link
                href="/blog"
                className="group grid gap-4 border-b border-primary/20 py-7 sm:grid-cols-[2.5rem_0.32fr_1fr_auto] sm:items-center sm:gap-6 sm:py-9"
              >
                <span className="text-xs text-primary/55">0{index + 1}</span>
                <span className="text-xs text-muted-foreground">
                  {t(topic.category)}
                </span>
                <h3 className="max-w-xl text-xl font-medium leading-snug tracking-[-0.025em] sm:text-2xl">
                  {t(topic.title)}
                </h3>
                <span
                  aria-hidden="true"
                  className="text-xl text-primary transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
