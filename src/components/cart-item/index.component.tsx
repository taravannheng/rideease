import { FC } from 'react'

import Divider from '../divider/index.component';
import Button from '../button/index.component';
import CartItemModel from '../../models/cart-item';

interface CartItemProps {
  className: string;
  item: CartItemModel;
  onClick: (e: Event) => void;
}

const CartItem: FC<CartItemProps> = ({ item, className, onClick }) => {
  const { id, src, alt, caption, details } = item;

  return (
    <li key={id} className={` w-full flex flex-row justify-between items-center ${className} min-h-[52px] md:min-h-[100px]`}>
      <div className=' basis-1/3 min-h-[52px] md:min-h-[100px]'>
        <div className='w-full flex justify-center'>
          <img src={src} alt={alt} className="h-[52px] md:h-[100px]" />
        </div>
      </div>
      <div className='basis-2/3 flex relative min-h-[52px] md:min-h-[100px] items-center'>
        <div className='w-full flex flex-row'>
          <p className='basis-1/2 flex justify-center'>${details.pricePerDay!}</p>
          <div className='basis-1/2 flex justify-center'>
            <Button buttonStyle='text' type='button' id={id} className="hover:text-status-error !p-0" onClick={onClick}>Remove</Button>
          </div>
        </div>
        <Divider className='absolute bottom-0 right-0 w-full' />
      </div>
    </li>
  )
}

export default CartItem