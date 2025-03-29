import { Link } from 'react-router-dom';
import cartEmptyImg from '../../assets/img/empty_cart.png';

import styles from './CartEmpty.module.scss';

export const CartEmpty = () => {
    return (
        <div className={styles.cartEmpty}>
            <h1>Корзина пустая</h1>
            <p>Вероятней всего, вы не заказывали ещё пиццу.<br/>
            Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
            <div>
                  <img src={cartEmptyImg} alt="Empty cart" />
            </div>       
            <Link to='/'>
                <button className={styles.back}>
                        <svg
                            width="8"
                            height="14"
                            viewBox="0 0 8 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                            d="M7 13L1 6.93015L6.86175 1"
                            stroke="#D3D3D3"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"></path>
                        </svg>    
                        <span>Вернуться назад</span>                  
                </button>   
            </Link>
        </div>
    )
}