import { FC } from 'react'

import Logo from '../../assets/logos/logo-dark.png'
import Button from '../button/index.component'

const Header: FC = () => {
  return (
    <nav className='w-full bg-neutral-grey-1 h-14 xl:h-20 px-10 flex justify-between items-center'>
      <img src={Logo} alt="logo" className='h-8 xl:h-12' />
      <div className="buttonContainer w-28 xl:w-56 flex gap-x-1">
        <Button type='button' buttonStyle='text'>Sign In</Button>
        <Button type='button' buttonStyle='primary' className='hidden xl:block'>Sign Up</Button>
      </div>
    </nav> 
  )
}

export default Header