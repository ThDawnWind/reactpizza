import React from 'react';
import { setSearch } from '../categories/categoryFilterSlice';
import { useAppDispatch} from '../../redux/store';
import { ReactComponent as SearchSvg } from '../../assets/img/search_icon.svg';
import _ from 'lodash';

import styles from './SearchPizzas.module.scss';

export const SearchPizzas = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = React.useState<string>('');


  const debouncedSearch: (value: string) => void = React.useCallback(
    _.debounce((value: string) => {
      dispatch(setSearch(value));
    }, 1500),
    [dispatch]
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
