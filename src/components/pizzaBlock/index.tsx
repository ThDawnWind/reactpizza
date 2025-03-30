import React from 'react';
import { useSelector } from 'react-redux';
import { addItem } from '../../pages/cart/cartSlice';
import { useAppDispatch, RootState } from '../../redux/store';

import styles from './PizzaBlock.module.scss';

const typeNames: string[] = ['тонкое', 'традиционное'];

interface PizzaBlockProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  handleClick: () => void;
}

export const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types, handleClick }) => {
  const dispatch = useAppDispatch();

  const cartItem = useSelector((state: RootState) => state.cart.items.find((item) => item.id === id));

  const [activeType, setActiveType] = React.useState<number>();
  const [activeSize, setActiveSize] = React.useState<number>();

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType!],
      size: sizes[activeSize!],
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
              key={type}
              onClick={() => setActiveType(index)}
              className={activeType === index ? styles.active : styles.notActive}>
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={size}
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? styles.active : styles.notActive}>
              {size} см
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.pizzaBlockBtn}>
        <div className={styles.pizzaPrice}>от {price} ₽</div>
          <button disabled={activeType === undefined || activeSize === undefined} onClick={onClickAdd} className={`button`}>
          <span>+ Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};
