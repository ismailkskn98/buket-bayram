import {getTranslations} from 'next-intl/server';

import {Button} from '@/components/ui/button';
import {Link} from '@/i18n/navigation';

const knowledgeTopics = [
  {category: 'knowledgeOneCategory', title: 'knowledgeOneTitle'},
  {category: 'knowledgeTwoCategory', title: 'knowledgeTwoTitle'},
  {category: 'knowledgeThreeCategory', title: 'knowledgeThreeTitle'}
];

export default async function KnowledgeSection() {
  const t = await getTranslations('Home');

  return (
    <section className="gridContainer bg-parchment py-24 sm:py-32 lg:py-40">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div data-reveal>
          <span className="inline-flex rounded-full bg-primary/9 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.19em] text-primary ring-1 ring-primary/10">
            {t('knowledgeEyebrow')}
          </span>
          <h2 className="mt-7 max-w-[11ch] font-display text-5xl leading-[0.92] tracking-[-0.045em] sm:text-7xl">
            {t('knowledgeTitle')}
          </h2>
        </div>
        <p
          data-reveal
          className="max-w-xl text-base leading-7 text-muted-foreground lg:ml-auto lg:text-lg lg:leading-8"
        >
          {t('knowledgeDescription')}
        </p>
      </div>

      <div className="mt-16 divide-y divide-foreground/10 border-y border-foreground/10">
        {knowledgeTopics.map((topic, index) => (
          <article key={topic.title} data-reveal>
            <Link
              href="/blog"
              className="group grid gap-5 py-7 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-2 sm:grid-cols-[4rem_0.45fr_1fr_auto] sm:items-center sm:gap-7 sm:py-9"
            >
              <span className="font-display text-2xl italic text-clay">
                0{index + 1}
              </span>
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {t(topic.category)}
              </span>
              <h3 className="max-w-xl font-display text-3xl leading-tight tracking-[-0.03em] sm:text-4xl">
                {t(topic.title)}
              </h3>
              <span className="flex size-10 items-center justify-center rounded-full bg-foreground/[0.06] transition-[transform,background-color,color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:bg-foreground group-hover:text-background">
                →
              </span>
            </Link>
          </article>
        ))}
      </div>

      <div data-reveal className="mt-10 flex justify-end">
        <Button asChild variant="outline" className="justify-between py-2 pl-6 pr-2">
          <Link href="/blog">
            <span>{t('knowledgeCta')}</span>
            <span className="flex size-9 items-center justify-center rounded-full bg-foreground/[0.06] text-lg transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-105">
              →
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
