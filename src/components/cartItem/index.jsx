import React from "react";
import { useDispatch} from 'react-redux';
import { removeItem , decrementItem, addItem} from "../../pages/cart/cartSlice";

import styles from './CartItem.module.scss';

export const CartItem = ({ id, title, price, imageUrl, type, size, count, totalPrice, totalCount}) => {
   const dispatch = useDispatch();

   const decrementCount = () => {
     if (count > 1) {
       dispatch(decrementItem({ id }));
     }
   };
   
   const incrementCount = () => {
     dispatch(addItem({ id }));
   };
   const removeItemFromCart = () => {
     dispatch(removeItem({ id }));
   };

    return (
          <div key={id} className={styles.item}>
            <div className={styles.name}>
              <div className={styles.itemImage}>
              <img src={imageUrl} alt="Pizza" />
            </div>
            <div className={styles.info}>
              <h3>{title}</h3>
              <p>
                {type},&nbsp;
                {size} см.
              </p>
            </div>
            </div>
            <div className={styles.count}>
              <button onClick={() => decrementCount(id)}>
                <b>-</b>
              </button>
              <b>{count}</b>
              <button onClick={() => incrementCount(id)}>
                <b>+</b>
              </button>
            </div>
            <div className={styles.price}>
              <b>{price} ₽</b>
            </div>
            <div className={styles.remove}>
  <button onClick={() => removeItemFromCart(id)}>
    <svg
      width="12"
      height="12"
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
      />
      <path
        d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"      
      />
    </svg>
  </button>
  </div>
</div>
    )
}