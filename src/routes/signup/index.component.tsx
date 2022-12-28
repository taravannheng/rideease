import { FC } from 'react'

import Header from '../../components/header/index.component'
import AuthForm from '../../components/forms/auth/index.component'
import Footer from '../../components/footer/index.component'

const SignUpPage: FC = () => {
  return (
    <>
      <Header type='auth' />
      <AuthForm type='sign up' />
      <Footer className='mt-20 lg:mt-0' />
    </>
  )
}

export default SignUpPage