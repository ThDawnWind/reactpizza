import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {RootState} from '../../redux/store';

import styles from './PizzaSinglePage.module.scss';

export const PizzaSinglePage = () => {
    const pizzas = useSelector((state: RootState) => state.pizzas.items); 
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    
   const pizza = React.useMemo(() => {
    return pizzas.find((p) => p.id === Number(id));
  }, [pizzas, id]);

    React.useEffect(() => {
            if (pizza === undefined) {
        navigate('/', { replace: true });
        alert('Ошибка при получении пиццы!');
    }
    }, [navigate, pizza])
    
    return (
        <div className={styles.container}>
            <div className={styles.pizzaWrapper}>
            <img src={pizza?.imageUrl} alt={pizza?.title} />
            <h1>{pizza?.title}</h1>
            <p className={styles.description}>{pizza?.description}</p>
            <p className={styles.price}>Цена: {pizza?.price}</p>
            </div>
        </div>
    );
};