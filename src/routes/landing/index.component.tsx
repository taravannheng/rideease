import { FC } from 'react'

import Header from '../../components/header/index.component'
import ImgCarLamborghini from '../../assets/images/car-lamborghini.png'
import ImgStripeLogo from '../../assets/logos/stripe.png'
import Button from '../../components/button/index.component'

const LandingPage: FC = () => {
  return (
    <>
      <Header />
      <main className='landing pt-10 flex flex-col items-center'>
        <section className='landing__hero flex flex-col items-center'>
          <img src={ImgCarLamborghini} alt="lamborghini" className='h-40 md:h-80 xl:h-96  m-auto' />
          <h1 className='text-h3 md:text-h2 lg:text-h1 text-primary text-center'>Car Rental Made Easy</h1>
          <p className='text-center text-neutral-grey-4 text-body w-10/12 md:w-6/12 lg:w-1/3 m-auto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum</p>
          <div className="button-container w-40 mt-8">
            <Button type='button' buttonStyle='primary'>Start Booking</Button>
          </div>
        </section>
        <section className="landing__payment w-full flex flex-row justify-center items-center bg-neutral-grey-1 py-10 mt-20">
          <div className="landing__payment-logo-container basis-1/2 flex justify-end">
            <img src={ImgStripeLogo} alt="Stripe Logo" className='h-32 lg:h-52'/>
          </div>
          <div className="landing__payment-text flex flex-col pr-5 basis-1/2">
            <h2 className='text-h4 sm:text-h3 lg:text-h2 text-primary text-left'>Quick Payments</h2>
            <p className='text-body text-neutral-grey-4 text-left sm:w-10/12 md:w-8/12 lg:w-1/2 xl:w-1/3 mt-2'>Made your payments quickly and efficiently through Stripe for all your bookings</p>
          </div>
        </section>
      </main>
    </>
  )
}

export default LandingPage