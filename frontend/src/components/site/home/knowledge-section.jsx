import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import {Link} from '@/i18n/navigation';

const knowledgeTopics = [
  {
    category: 'knowledgeOneCategory',
    title: 'knowledgeOneTitle',
    imageAlt: 'knowledgeOneImageAlt',
    image: '/images/services/facial-consultation.webp'
  },
  {
    category: 'knowledgeTwoCategory',
    title: 'knowledgeTwoTitle',
    imageAlt: 'knowledgeTwoImageAlt',
    image: '/images/services/laser-treatment.webp'
  },
  {
    category: 'knowledgeThreeCategory',
    title: 'knowledgeThreeTitle',
    imageAlt: 'knowledgeThreeImageAlt',
    image: '/images/services/scalp-examination.webp'
  }
];

export default async function KnowledgeSection() {
  const t = await getTranslations('Home');

  return (
    <section aria-labelledby="knowledge-title" className="gridContainer border-t border-primary/8 py-[clamp(5rem,10vw,9rem)]">
      <div>
        <header data-reveal className="mx-auto max-w-3xl text-center">
          <h2 id="knowledge-title" className="homeSectionTitle text-primary">
            {t('knowledgeTitle')}
          </h2>
          <p className="homeSectionBody mx-auto mt-6 max-w-2xl text-muted-foreground">
            {t('knowledgeDescription')}
          </p>
          <Link
            href="/blog"
            className="mt-7 inline-flex border-b border-primary pb-1 text-sm font-semibold text-primary transition-opacity duration-300 hover:opacity-60"
          >
            {t('knowledgeCta')}
          </Link>
        </header>

        <div className="mt-[clamp(3.5rem,7vw,6rem)] grid gap-10 lg:grid-cols-12 lg:gap-8">
          <article data-reveal className="lg:col-span-7">
            <Link href="/blog" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-[16/10]">
                <Image
                  src={knowledgeTopics[0].image}
                  alt={t(knowledgeTopics[0].imageAlt)}
                  fill
                  sizes="(max-width: 1023px) 92vw, 54vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.018]"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <p className="homeEyebrow text-primary">
                    {t(knowledgeTopics[0].category)}
                  </p>
                  <h3 className="homeFeatureTitle mt-2 max-w-[28ch]">
                    {t(knowledgeTopics[0].title)}
                  </h3>
                </div>
                <span aria-hidden="true" className="mt-1 text-xl text-primary transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          </article>

          <div className="lg:col-span-5">
            {knowledgeTopics.slice(1).map((topic) => (
              <article key={topic.title} data-reveal className="border-t border-primary/10 py-6 first:border-t-0 first:pt-0 lg:py-7 lg:first:pt-0">
              <Link
                href="/blog"
                className="group grid grid-cols-[minmax(7.5rem,0.85fr)_1fr] items-center gap-5 sm:grid-cols-[minmax(10rem,0.8fr)_1fr] lg:grid-cols-[minmax(9rem,0.8fr)_1fr]"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={topic.image}
                    alt={t(topic.imageAlt)}
                    fill
                    sizes="(max-width: 639px) 34vw, (max-width: 1023px) 28vw, 17vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.025]"
                  />
                </div>
                <div>
                  <p className="homeEyebrow text-primary">{t(topic.category)}</p>
                  <h3 className="homeCardTitle mt-2">
                    {t(topic.title)}
                  </h3>
                  <span className="mt-4 inline-flex border-b border-primary/50 pb-0.5 text-xs text-primary">
                    {t('knowledgeReadCta')}
                  </span>
                </div>
              </Link>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
