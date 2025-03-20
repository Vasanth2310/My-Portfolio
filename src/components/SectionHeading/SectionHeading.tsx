interface SectionHeadingTypes {
  title: string
  subtitle?: string
}

const SectionHeading: React.FC<SectionHeadingTypes> = ({ title, subtitle }) => {
  return (
    <div className="lg:max-w-[50dvw]">
      <h2 className="text-2xl font-bold tracking-wider text-primary">{title}</h2>
      {subtitle && <p className="mt-5 text-pretty text-lg text-gray-400">{subtitle}</p>}
    </div>
  )
}

export default SectionHeading
