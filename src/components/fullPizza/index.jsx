import React from 'react';
import { Link } from 'react-router-dom';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

import styles from './FullPizza.module.scss';

  const fadeInAnim = keyframes`${fadeIn}`;
  
  const FadeInDiv = styled.div`
  animation: 0.9s ${fadeInAnim};
  `;

export const Modal = ({ show, onClose, pizza }) => {
  const modalRef = React.useRef();

  React.useEffect(() => {
    const clickOutside = (e) => {

      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }

    if (show) {
      document.addEventListener('mousedown', clickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    }
  }, [show, onClose])

  if (!show) return null;

  return (
    <div className={styles.root}>
      <FadeInDiv>
        <div className={styles.modal} ref={modalRef}>
            <button className={styles.closeBtn} onClick={onClose}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 10 10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                  />
                  <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                  />
                </svg>
            </button>
            <div className={styles.modalContent}>
              <h1>{pizza.title}</h1>
              <img src={pizza.imageUrl} alt={pizza.title} />
              <p><b>Описание:</b> {pizza.description}</p>
              <p><b>Цена:</b> {pizza.price} ₽</p>
            </div>
            <Link to={`/pizza/${pizza.id}`}>
                <span className={styles.moreInfo}>Подробнее о пицце</span>
            </Link>
      </div>
      </FadeInDiv>
    </div>
  );
};

