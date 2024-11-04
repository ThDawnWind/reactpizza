import React from 'react';
import { useDispatch } from 'react-redux'; // Импорт useDispatch
import { setCategoryId } from './categoryFilterSlice';
import { setCurrentPage } from '../categories/categoryFilterSlice';

import styles from './Categories.module.scss';

export const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const dispatch = useDispatch();

  
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const handleCategoryClick = React.useCallback((index) => {
    setActiveIndex(index);
    const categoryId = index === 0 ? null : index; 
    dispatch(setCategoryId(categoryId)); 
    dispatch(setCurrentPage(1));
  }, [activeIndex]);

  return (
    <div className={styles.root}>
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => handleCategoryClick(i)} 
            className={activeIndex === i ? styles.active : styles.notActive}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
