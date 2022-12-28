import { FC } from 'react'

import Header from '../../components/header/index.component'
import AuthForm from '../../components/forms/auth/index.component'
import Footer from '../../components/footer/index.component'

const SignInPage: FC = () => {

  return (
    <>
      <Header type='auth' />
      <AuthForm type='sign in' />
      <Footer className='mt-20 lg:mt-0' />
    </>    
  )
}

export default SignInPage;