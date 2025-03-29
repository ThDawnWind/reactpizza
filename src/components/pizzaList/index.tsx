import React from 'react';
import { fadeIn} from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { useAppDispatch} from '../../redux/store';
import { setCurrentPage, selectFilter } from '../categories/categoryFilterSlice';
import { selectPizzas, selectPizzaStatus } from './pizzaListSlice';
import { fetchPizzas } from '../../services/pizzasApi';
import { PizzaBlock } from '../pizzaBlock';
import { Skeleton } from '../skeleton';
import { Pagination } from '../pegination';
import { Modal } from '../fullPizza';

import styles from './PizzaList.module.scss';


  const fadeInAnim = keyframes`${fadeIn}`;
  
  const FadeInDiv = styled.div`
  animation: 0.9s ${fadeInAnim};
  `;

export const PizzaList = () => {
  const dispatch = useAppDispatch();
  
 const items = useSelector(selectPizzas);
 const status = useSelector(selectPizzaStatus);
 const filterState = useSelector(selectFilter);

  const { categoryId, rating, order, currentPage, search } = filterState;
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedPizza, setSelectedPizza] = React.useState<IPizza | null>(null);

  interface IPizza {
    id: number;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
    description: string;
  }
  const handlePizzaClick = (pizza: IPizza) => {
    setSelectedPizza(pizza);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPizza(null);
  };

 type OrderType = 'asc' | 'desc';

interface IFetchPizzasParams {
  sortBy: string;
  category: number | null;
  order: OrderType;
  currentPage: number;
  limit: number;
  search: string;
}

const params: IFetchPizzasParams = React.useMemo(() => {
  const validOrder = order === 'asc' || order === 'desc' ? order : 'asc';
  
  return {
    sortBy: String(rating), 
    category: categoryId || null, 
    order: validOrder,
    currentPage,
    limit: 4,
    search
  };
}, [categoryId, rating, order, currentPage, search]); 


  const onPageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

React.useEffect(() => {
  if (currentPage < 1) {
    dispatch(setCurrentPage(1));
  }
}, [currentPage]);

React.useEffect(() => {
  dispatch(fetchPizzas(params));
}, [params]);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
  <>
    {status === 'failed' ? (
      <div className={styles.errorInfo}>
        <p>Произошла ошибка загрузки...</p>
        <p>... или пиццы, которую вы ищете, в каталоге не найдена</p>
      </div>
    ) : (
      <div className={styles.pizzaBlockWrapper}>
        {status === 'loading' ? (
          skeletons
        ) : (
          items.map((item) => (
            <FadeInDiv key={item.id}>
              <PizzaBlock
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                sizes={item.sizes}
                types={item.types}
                handleClick={() => handlePizzaClick(item)}
              />
            </FadeInDiv>
          ))
        )}
      </div>
    )}
    <Modal show={showModal} onClose={handleCloseModal} pizza={selectedPizza} />
    <Pagination currentPage={currentPage} onPageChange={onPageChange} />
  </>
);
};
