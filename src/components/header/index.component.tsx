import { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

import Logo from '../../assets/logos/logo-dark.png'
import Button from '../button/index.component'

const Header: FC = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  const showMobileNavToggler = () => {
    setShowMobileNav(prevShowMobileNav => !prevShowMobileNav);
  }


  return (
    <header className='w-full bg-neutral-grey-1 h-20 px-10 flex justify-between items-center'>
      <img src={Logo} alt="logo" className='h-10 xl:h-12' />
      <nav className="buttonContainer w-56 gap-x-1 hidden xl:flex">
        <Button type='button' buttonStyle='text'>Sign In</Button>
        <Button type='button' buttonStyle='primary'>Sign Up</Button>
      </nav>
      <FontAwesomeIcon icon={faBars} className="w-6 h-6 text-neutral-dark xl:hidden cursor-pointer" onClick={showMobileNavToggler} />
      <nav className={`mobile-nav absolute w-screen flex flex-col items-center pt-20 gap-y-8 h-screen bg-neutral-grey-1 top-0 left-0 ${!showMobileNav && 'translate-x-full'} transition`}>
        <Button type='button' buttonStyle='text'>Sign In</Button>
        <Button type='button' buttonStyle='text'>Sign Up</Button>
        <FontAwesomeIcon icon={faXmark} className="w-6 h-6 cursor-pointer text-neutral-dark absolute top-7 right-10" onClick={showMobileNavToggler} />
      </nav>
    </header> 
  )
}

export default Header