import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../pages/cart/cartSlice';

import styles from './PizzaBlock.module.scss';;;

const typeNames = ['тонкое', 'традиционное'];

export const PizzaBlock = ({ id, title, price, imageUrl, sizes, types, handleClick }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((item) => item.id === id));
  const [activeType, setActiveType] = React.useState();
  const [activeSize, setActiveSize] = React.useState();

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 1, 
    };
    dispatch(addItem(item));
  };


  return (
    <div key={id} className={styles.pizzaContainer}>
      <div onClick={handleClick}>
         <img src={imageUrl} alt={title} />
         <h4>{title}</h4>
      </div>
      <div className={styles.pizzaType}>
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              onClick={() => setActiveType(index)}
              className={activeType === index ? styles.active : styles.notActive}>
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? styles.active : ''}>
              {size} см
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.pizzaBlockBtn}>
        <div className={styles.pizzaPrice}>от {price} ₽</div>
        <button disabled={activeSize === undefined || activeType === undefined} onClick={onClickAdd} className={`button`}>
          <span>+ Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};
