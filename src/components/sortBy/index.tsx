import React from 'react';
import { fadeIn} from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { useAppDispatch} from '../../redux/store';
import { setRating, setOrder } from '../categories/categoryFilterSlice';

import styles from './SortBy.module.scss';

type Label = 'популярности' | 'цене' | 'алфавиту'; 
type Order = 'asc' | 'desc';
type Value = 'rating' | 'price' | 'title';

interface ISortOptions {
  label: Label;
  value: Value;
  order: Order;
}
const sortOptions: ISortOptions[] = [
  { label: 'популярности', value: 'rating', order: 'desc' },
  { label: 'цене', value: 'price', order: 'asc' },
  { label: 'алфавиту', value: 'title', order: 'asc' }
];

 const fadeInAnim = keyframes`${fadeIn}`;

  const FadeInDiv = styled.div`
  animation: 0.9s ${fadeInAnim};
  `;

export const SortBy = () => {
  const [selectedSort, setSelectedSort] = React.useState<string>('rating'); 
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSortChange = (sortOption: ISortOptions) => {
    setSelectedSort(sortOption.value);
    setIsDropdownOpen(false);
    dispatch(setRating(sortOption.value)); 
    dispatch(setOrder(sortOption.order));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); 
  };

  return (
    <div className={styles.sort}>
      <div className={styles.sortLabel} onClick={toggleDropdown}>
        <b>Сортировка по:</b> <span>{sortOptions.find(option => option.value === selectedSort)?.label}</span>
      </div>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <FadeInDiv>
            <ul>
              {sortOptions.map((option) => (
                <li
                  key={option.value}
                  className={selectedSort === option.value ? styles.active : ''}
                  onClick={() => handleSortChange(option)} 
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </FadeInDiv>
        </div>
      )}
    </div>
  );
};
