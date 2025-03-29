import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { calcTotalPrice } from '../../utils/CalcTotalPrice';
import { SearchPizzas } from '../searchPizzas';
import { RootState } from '../../redux/store';

import logoSvg from '../../assets/img/pizza_logo.svg';
import { ReactComponent as CartSvg } from '../../assets/img/cart.svg';

import styles from './PizzaHeader.module.scss';

export const PizzaHeader = () => {
  const totalCount = useSelector((state: RootState) => state.cart.totalCount);
  const location = useLocation();
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <div className={styles.root}>
      <Link to='/'>
        <div className={styles.logo}>
          <img className={styles.logoPicture} width="38" src={logoSvg} alt="Pizza logo" />
          <div>
            <h1>React Pizza</h1>
            <p>The Best Pizza ever</p>
          </div>
        </div>
      </Link>
      {location.pathname === '/' && <SearchPizzas />}
      <Link to='/cart'>
        <div className={styles.cart_container}>
          <span className={styles.total}>{calcTotalPrice(items)} ₽</span>
          <div className={styles.contain}>
            <CartSvg className={styles.cartIcon} />
            <span className={styles.count}>
                <div>
                  {totalCount}
                </div>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
