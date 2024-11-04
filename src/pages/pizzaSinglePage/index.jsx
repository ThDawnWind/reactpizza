import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './PizzaSinglePage.module.scss';

export const PizzaSinglePage = () => {
    const { items} = useSelector((state) => state.pizzas); 
    const { id } = useParams();
    const navigate = useNavigate();
    
    const pizza = items.find(p => p.id === parseInt(id))

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