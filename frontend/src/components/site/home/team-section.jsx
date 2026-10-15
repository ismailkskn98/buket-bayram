import Image from "next/image";
import { getTranslations } from "next-intl/server";

const teamMembers = [
  { image: "/images/team/team-01.webp", key: "one" },
  { image: "/images/team/team-02.webp", key: "two" },
  { image: "/images/team/team-03.webp", key: "three" },
  { image: "/images/team/team-04.webp", key: "four" },
  { image: "/images/team/team-05.webp", key: "five" },
  { image: "/images/team/team-06.webp", key: "six" },
];

export default async function TeamSection() {
  const t = await getTranslations("Home");

  return (
    <section id="team" aria-labelledby="team-title" className="gridContainer relative overflow-hidden bg-primary py-[clamp(4.5rem,8vw,8rem)] text-primary-foreground">
      <div className='absolute inset-0 bg-[url("/images/bg-pattern.png")] bg-repeat bg-center fluid pointer-events-none select-none opacity-[0.025]' />
      <div className="relative z-10">
        <header data-reveal className="grid gap-7 lg:grid-cols-12 lg:gap-[clamp(1.5rem,3vw,3.5rem)]">
          <p className="homeEyebrow homeEyebrowWide text-primary-foreground/65 lg:col-span-3">{t("teamEyebrow")}</p>

          <h2 id="team-title" className="homeSectionTitle max-w-[17ch] lg:col-span-6">
            {t("teamTitle")}
          </h2>

          <p className="homeSectionBody max-w-md text-primary-foreground/68 lg:col-span-3 lg:pt-2">{t("teamDescription")}</p>
        </header>

        <div data-stagger-group className="mt-[clamp(3rem,6vw,5.5rem)] grid grid-cols-2 gap-x-[clamp(0.75rem,1.25vw,1.5rem)] gap-y-[clamp(2rem,5vw,3.5rem)] sm:grid-cols-3 lg:grid-cols-6">
          {teamMembers.map((member, index) => (
            <article key={member.key} data-stagger-item className="group lg:even:pt-[clamp(1.5rem,3vw,3.25rem)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-primary-foreground/8">
                <Image
                  src={member.image}
                  alt={t(`teamMembers.${member.key}.imageAlt`)}
                  fill
                  quality={84}
                  sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 15vw"
                  className="object-cover transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.025] group-hover:saturate-[0.9]"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              <div className="mt-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="homeMetaTitle">{t(`teamMembers.${member.key}.name`)}</h3>
                  <span className="text-[0.65rem] tracking-[0.14em] text-primary-foreground/45">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="homeFineText mt-1 text-primary-foreground/62">{t(`teamMembers.${member.key}.role`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
