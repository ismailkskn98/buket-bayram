export default function PageIntro({eyebrow, title, description}) {
  const isLongTitle = title.length > 22;

  return (
    <section className="gridContainer border-b border-primary/20 pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
      <div className="pageHeroContent">
        <div className="grid gap-6 border-t border-primary/25 pt-5 md:grid-cols-[1fr_1fr] md:items-start">
          <p className="text-xs text-primary sm:text-sm">{eyebrow}</p>
          <p className="max-w-xl text-base leading-7 text-muted-foreground md:justify-self-end md:text-lg md:leading-8">
            {description}
          </p>
        </div>

        <h1 className={`pageHeroTitle mt-16 font-light uppercase text-primary sm:mt-20 ${isLongTitle ? 'pageHeroTitleLong' : ''}`}>
          {title}
        </h1>
      </div>
    </section>
  );
}
