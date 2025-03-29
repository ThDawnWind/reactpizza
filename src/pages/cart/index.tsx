import React from 'react';
import { Helmet } from 'react-helmet-async';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch,  RootState} from '../../redux/store';
import { CartItem } from '../../components/cartItem';
import { clearCart } from './cartSlice';
import { calcTotalPrice } from '../../utils/CalcTotalPrice';
import { CartEmpty } from "../../components/cartEmpty";

import { ReactComponent as CartSvg } from '../../assets/img/cart.svg';
import { ReactComponent as DelSvg } from '../../assets/img/delete_icon.svg';

import styles from './Cart.module.scss';

const fadeInAnim = keyframes`${fadeIn}`;
const FadeInDiv = styled.div`
  animation: 0.9s ${fadeInAnim};
`;

export const Cart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalCount: number = useSelector((state: RootState) => state.cart.totalCount);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    localStorage.setItem('totalCount', JSON.stringify(totalCount)); 
  }, [items, totalCount]);

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalCount');
  }

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <CartEmpty />
      </div>
    );      
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Корзина - React Pizza</title>
        <meta name="description" content="Ваша корзина" />
      </Helmet>
      <div className={styles.topContain}>
        <div className={styles.iconContain}>
          <CartSvg className={styles.icon} /> 
          <h1>Корзина</h1>
        </div>
        <div onClick={handleClearCart} className={styles.clearContain}>
          <DelSvg className={styles.delete_icon} /> 
          <button>Очистить корзину</button>
        </div>
      </div>
      <div className={styles.itemContain}>
        <FadeInDiv>
          {items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              type={item.type}
              size={item.size}
              count={item.count}
            />
          ))} 
        </FadeInDiv>
      </div>
      <div className={styles.totalContainer}>
        <span>
          Всего пицц: {totalCount} <b>шт.</b>
        </span>
        <span>
          Сумма заказа: <b>{calcTotalPrice(items)} ₽</b>
        </span>
      </div>
      <div className={styles.bottom_buttons}>
        <Link to='/'>
          <button className={styles.back}>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span>Назад</span>
          </button>
        </Link>
        <button className={styles.pay}>
          <span>Оплатить</span>
        </button>
      </div>
    </div>
  );
}
