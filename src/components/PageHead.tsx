type PageHeadProps = { title: React.ReactNode; intro?: string; children?: React.ReactNode };

/** Inner-page title: left-aligned, bold, no label stack. */
export default function PageHead({ title, intro, children }: PageHeadProps) {
  return (
    <section className="border-b border-line pb-14 pt-12 md:pb-20 md:pt-20">
      <div className="shell">
        <h1 className="t-display max-w-[16ch]">{title}</h1>
        {intro && <p className="lede mt-6">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
