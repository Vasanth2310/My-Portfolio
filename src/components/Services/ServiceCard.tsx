import Image from 'next/image'

interface ServiceCardTypes {
  icon: string
  title: string
  shortDescription: string
}

const ServiceCard: React.FC<ServiceCardTypes> = ({ title, shortDescription, icon }) => {
  return (
    <div className="bg-secondary flex flex-col items-center rounded-[14px] border border-[#1E2D3D] p-5">
      <Image src={icon} alt={title} className="my-1 size-14" />
      <h5 className="text-mint mb-5 mt-2 text-center text-base font-semibold">{title}</h5>
      <div className="rounded-2xl bg-primary p-4">
        <p className="text-center text-sm font-normal text-primary">{shortDescription}</p>
      </div>
    </div>
  )
}

export default ServiceCard
