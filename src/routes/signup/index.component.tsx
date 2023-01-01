import { FC, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/header/index.component'
import AuthForm from '../../components/forms/auth/index.component'
import Footer from '../../components/footer/index.component'
import * as ROUTES from '../../utils/constants/routes'
import UserContext from '../../contexts/user-context'

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