import React from 'react';
import { setCategoryId } from './categoryFilterSlice';
import { setCurrentPage } from './categoryFilterSlice';
import { useAppDispatch} from '../../redux/store';

import styles from './Categories.module.scss';

export const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const dispatch = useAppDispatch();
  
  const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const handleCategoryClick = React.useCallback((index: number) => {
    setActiveIndex(index);
    const categoryId = index === 0 ? null : index; 
    dispatch(setCategoryId(categoryId)); 
    dispatch(setCurrentPage(1));
  }, [dispatch]);

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
