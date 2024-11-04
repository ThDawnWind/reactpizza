import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export const Pagination = ({ currentPage, onPageChange }) => {

  return (
    <div className={styles.root}>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={''}
        pageCount={3}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(event) => onPageChange(event.selected + 1)}
        containerClassName={styles.container}
        activeClassName={styles.active}
        forcePage={currentPage - 1}
      />
    </div>
  );
}
