'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BurgerIcon, CloseIcon, Logo } from '../../utils/icons'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Projects',
    href: '/#projects',
  },
  {
    label: 'Services',
    href: '/#services',
  },
  {
    label: 'Contact Me',
    href: '/#contact',
  },
]

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsVisible(!isVisible)
  }

  return (
    <nav className="h-16 w-dvw overflow-hidden border-b border-[#2B3E6E] bg-primary">
      <div className="mx-auto flex h-full w-dvw max-w-[1200px] items-center justify-between px-4 py-1">
        {isVisible ? (
          <div className="md:hidden">Menu</div>
        ) : (
          <Link href="/">
            <div className="relative flex animate-fade-up items-center gap-3 transition-all duration-300 md:static">
              <Image src={Logo} alt="logo" className="h-8 w-10" />
              <span className="text-primary">Vasanth Kumar</span>
            </div>
          </Link>
        )}

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isVisible ? (
              <Image src={CloseIcon} alt="close-icon" />
            ) : (
              <Image src={BurgerIcon} alt="menu-icon" />
            )}
          </button>
        </div>

        <ul
          className={`${isVisible ? 'flex' : 'hidden'} absolute left-0 top-16 z-10 h-dvh w-dvw animate-fade-in flex-col bg-primary md:static md:top-0 md:flex md:h-full md:w-[72%] md:flex-row lg:w-[70%]`}>
          {navItems.map(({ label, href }) => (
            <li
              key={href}
              onClick={() => setIsVisible(false)}
              className="flex items-center border-b border-[#2B3E6E] px-4 text-2xl md:border-y-0 md:border-e md:text-base md:first:border-s md:last:ml-auto md:last:border-none md:last:px-0 lg:px-8">
              <Link
                href={href}
                className={`w-full py-7 text-primary transition-all duration-150 hover:text-white md:py-0 ${pathname === href ? 'cursor-text text-white' : ''}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
