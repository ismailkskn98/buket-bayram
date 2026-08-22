export default function PageIntro({eyebrow, title, description}) {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto w-[min(92%,72rem)]">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      </div>
    </section>
  );
}
