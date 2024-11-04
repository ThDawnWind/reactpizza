import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../categories/categoryFilterSlice';
import { ReactComponent as SearchSvg } from '../../assets/img/search_icon.svg';
import _ from 'lodash';

import styles from './SearchPizzas.module.scss';

export const SearchPizzas = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState('');

  const debouncedSearch = React.useCallback(
    _.debounce((value) => {
      dispatch(setSearch(value));
    }, 1500),
    [dispatch]
  );

  const onChangeInput = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const onClearSearch = () => {
    setSearchValue('');
    dispatch(setSearch(''));
  };

  return (
    <div className={styles.searchPizzas}>
      <div className={styles.searchIcon}>
        <SearchSvg className={styles.icon} />
      </div>
      <input
        className={styles.searchInput}
        type="text"
        value={searchValue}
        onChange={onChangeInput}
        placeholder="Search for pizzas..."
      />
      {searchValue && (
        <div className={styles.clearSearch}>
          <button onClick={onClearSearch}>×</button>
        </div>
      )}
    </div>
  );
};
