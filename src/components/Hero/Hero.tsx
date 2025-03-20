'use client'
import useRoleSwitcher from '@/hooks/useRoleSwitcher'
import useRotatingAnimation from '@/hooks/useRotatingAnimation'
import Image from 'next/image'
import { Ellipse, HeroImage } from '../../utils/images'

const Hero = () => {
  const ellipseRef = useRotatingAnimation()
  const role = useRoleSwitcher({ roles: ['FULLSTACK DEVELOPER', 'AI & ML ENGINEER', 'DATA ANALYST & SCIENTIST', 'BIOINFORMATICIAN'] })

  return (
    <section className="min-h-[calc(dvh-4rem)] bg-primary bg-small-glow bg-small-glow-position bg-no-repeat md:bg-large-glow-position lg:bg-large-glow">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-4 px-4 pb-10 pt-12 md:grid-cols-2 lg:p-4">
        <div className="flex min-h-48 flex-col justify-between lg:min-h-56 lg:max-w-[33.75rem]">
          <h1>
            <span className="mb-2 block text-3xl font-bold text-white">Hi - I'm Vasanth Kumar</span>
            <span className="block text-[1.75rem] font-bold text-mint">{role}</span>
          </h1>

          <h2 className="mt-3">Crafting innovative solutions to solve real-world problems</h2>

          <div className="mt-6 flex flex-wrap gap-6">
            <a
              href="#"
              aria-label="Connect with me"
              className="min-w-32 cursor-pointer rounded-lg bg-mint px-[14px] py-[10px] text-center text-sm font-medium text-[#00071E]">
              Hire Me
            </a>
            <a
              href="https://www.linkedin.com/in/vasanth-kumar-917003259/"
              aria-label="View LinkedIn Profile"
              className="cursor-pointer rounded-lg bg-[#1C2B3A] px-[14px] py-[10px] text-sm text-white">
              LinkedIn Profile
            </a>
          </div>
        </div>

        <div className="flex min-h-[18.75rem] items-center justify-center lg:min-h-[35rem]">
          <div className="relative size-56 sm:size-60 md:size-[20rem] lg:size-[25.75rem]">
            <Image
              src={HeroImage}
              fill={true}
              priority={true}
              sizes="(min-width: 1024px) 25.75rem, (min-width: 768px) 20rem, (min-width: 640px) 15rem, 14rem"
              alt="John Doe - Full Stack Developer"
              className="object-contain p-7"
            />
            <Image
              ref={ellipseRef}
              src={Ellipse}
              alt="decorative ellipse"
              fill={true}
              // sizes="(min-width: 1024px) 25.75rem, (min-width: 768px) 20rem, (min-width: 640px) 15rem, 14rem"
              className="absolute left-0 top-0 transition-transform duration-500 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
