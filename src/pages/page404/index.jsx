import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import styles from './Page404.module.scss';

export const Page404 = () => {
  return (
    <div className={styles.page404Container}>
      <Helmet>
        <title>Страница не найдена - React Pizza</title>
        <meta name="description" content="Страница, которую вы ищете, не найдена." />
      </Helmet>
      <h1 className={styles.page404Title}>404</h1>
      <p className={styles.page404Message}>Oops! The page you're looking for doesn't exist.</p>
      <Link className={styles.page404Link} to="/">
        Go Back to Home
      </Link>
    </div>
  );
};
