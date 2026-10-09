import {getTranslations} from 'next-intl/server';

const approachSteps = [
  {number: '01', title: 'approachStepOneTitle', description: 'approachStepOneDescription'},
  {number: '02', title: 'approachStepTwoTitle', description: 'approachStepTwoDescription'},
  {number: '03', title: 'approachStepThreeTitle', description: 'approachStepThreeDescription'}
];

export default async function ApproachSection() {
  const t = await getTranslations('Home');

  return (
    <section className="gridContainer bg-forest py-24 text-parchment sm:py-32 lg:py-40">
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
          <span className="inline-flex rounded-full bg-white/[0.07] px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.19em] text-sage ring-1 ring-white/10">
            {t('approachEyebrow')}
          </span>
          <h2 className="mt-7 max-w-[10ch] font-display text-5xl leading-[0.9] tracking-[-0.045em] sm:text-7xl lg:text-8xl">
            {t('approachTitle')}
          </h2>
          <p className="mt-8 max-w-lg text-base leading-7 text-parchment/58 sm:text-lg sm:leading-8">
            {t('approachDescription')}
          </p>
        </div>

        <ol className="space-y-4">
          {approachSteps.map((step) => (
            <li
              key={step.number}
              data-reveal
              className="bezelShell rounded-[2.1rem] bg-white/[0.055] p-1.5 ring-white/10"
            >
              <div className="bezelCore rounded-[calc(2.1rem-0.375rem)] bg-[#213d30] p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] sm:p-9">
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <h3 className="font-display text-3xl leading-none tracking-[-0.03em] sm:text-4xl">
                      {t(step.title)}
                    </h3>
                    <p className="mt-5 max-w-lg text-sm leading-7 text-parchment/58">
                      {t(step.description)}
                    </p>
                  </div>
                  <span className="font-display text-3xl italic text-clay sm:text-4xl">
                    {step.number}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
