import {getTranslations} from 'next-intl/server';

const approachSteps = [
  {title: 'approachStepOneTitle', description: 'approachStepOneDescription'},
  {title: 'approachStepTwoTitle', description: 'approachStepTwoDescription'},
  {title: 'approachStepThreeTitle', description: 'approachStepThreeDescription'}
];

export default async function ApproachSection() {
  const t = await getTranslations('Home');

  return (
    <section className="gridContainer bg-primary-soft py-20 sm:py-28 lg:py-36">
      <div>
        <div data-reveal className="mx-auto max-w-5xl text-center">
          <h2 className="text-[clamp(2.7rem,6.1vw,6.5rem)] font-light leading-[0.94] tracking-[-0.055em] text-primary">
            {t('approachTitle')}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {t('approachDescription')}
          </p>
        </div>

        <ol className="mt-16 grid border-t border-primary/25 md:grid-cols-3 lg:mt-24">
          {approachSteps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              className="border-b border-primary/20 py-8 md:border-b-0 md:px-7 md:py-10 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l"
            >
              <span className="text-xs text-primary/55">0{index + 1}</span>
              <h3 className="mt-10 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                {t(step.title)}
              </h3>
              <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
                {t(step.description)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
