import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.css';
import useBackButton from '../../hooks/use-back-button';
import {
  firstNumber,
  lastNumber,
  PaginationPropType,
} from '../../utils/pagination';

function Pagination(props) {
  const {
    className,
    dataperPageSelector,
    loading,
    mobilePagination,
    mobilePaginationClass,
    onChangePage,
    onChangeSize,
    pagination,
    querySearch,
    size
  } = props;

  const { qs } = useBackButton();
  const [ mobilePage, setMobilePage ] = useState(qs?.page || pagination.page);

  useEffect(() => {
    if (pagination.page === 1 && pagination.totalDataOnPage <= 5) {
      setMobilePage(1);
    }
  }, [pagination]);

  const RenderPageNumbers = () => {
    const { totalPage, page } = pagination;

    const buttons = generatePageNumbers(parseInt(page), totalPage);

    return (
      <>
        { parseInt(page) > 4 && parseInt(totalPage) !== 6 &&
        (<div>
          <button onClick={() => onChangePage(parseInt(1))}>1</button>
          <span>...</span>
        </div>)}

        {buttons.map((pageNumber, index) => {
          return (
            <button
              className={parseInt(page) === parseInt(pageNumber) ? styles.active : undefined}
              disabled={parseInt(page) === parseInt(pageNumber) || typeof pageNumber === 'string'}
              id={`page-number-${index}`}
              key={index + parseInt(pageNumber)}
              onClick={() => onChangePage(parseInt(pageNumber))}
            >
              {pageNumber}
            </button>
          );})}

        {
          parseInt(totalPage) > 5 &&
          parseInt(totalPage) !== 6 &&
          parseInt(page) !== parseInt(totalPage) &&
          parseInt(page) < parseInt(totalPage - 3) &&
          '...'
        }
        { parseInt(page) === 4 && '...' }
        <button
          className={parseInt(page) === parseInt(totalPage) ? styles.active : undefined}
          disabled={parseInt(page) === parseInt(totalPage) || typeof totalPage === 'string'}
          onClick={() => onChangePage(parseInt(totalPage))}
        >
          {totalPage}
        </button>

      </>

    );
  };

  function generatePageNumbers(activePage, totalPage) {
    let startPage = 1;

    if(totalPage !== 6) {
      if(activePage < 5){
        startPage = 1;
      }else{
        if(activePage >=  totalPage - 3){
          startPage = totalPage - 4;
        }else{
          startPage = activePage - 2;
        }
      }
    }

    const endPage = startPage + 4 < totalPage ? startPage + 4 : totalPage;
    const diff = startPage - endPage + 4;
    startPage -=  diff > 0 ? diff : 0;

    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      if (i > 0 && i !== totalPage) {
        pages.push(i);
      }
    }
    return pages;
  }

  return (
    Object.keys(pagination).length > 0 && (
      <div className={`${styles.root} ${className}`}>

        {mobilePagination &&
          pagination.page < pagination.totalPage
          && (
            <div className="p-4 text-center" id="view-more">
              <button
                className={`link ${styles.btnLoadmore}
                ${mobilePaginationClass}`}
                disabled={loading}
                onClick={() => {
                  onChangePage(mobilePage + 1);
                  setMobilePage(mobilePage + 1);
                  querySearch && onChangeSize(parseInt(querySearch?.size) + 5);
                }}
              >
                Tampilkan Lebih Banyak
              </button>
            </div>
          )}

        {!mobilePagination &&
          pagination.totalPage < 2 && (
          <div className={styles.pagination} id="pagination-entries">
            {dataperPageSelector &&
                dataperPageSelector.length > 1
              ? <div className="flex items-center">
                <p>Jumlah data per halaman :</p>
                {dataperPageSelector.map((perPage) => {
                  return (
                    <div
                      className={parseInt(size) === perPage
                        ? styles.btnperpageactive
                        : styles.btnperpage}
                      key={perPage}
                      onClick={() => onChangeSize(perPage)}
                    >
                      {perPage}
                    </div>
                  );
                })}
                <p className="ml-4"> dari total {pagination.totalData} data</p>
              </div>
              :
              <p>
                {`Menampilkan ${firstNumber(pagination)} sampai ${lastNumber(
                  pagination
                )} dari total ${pagination.totalData} data`}
              </p>
            }
            <div />
          </div>
        )}

        {!mobilePagination &&
          pagination.totalPage > 1 && (
          <div className={styles.pagination} id="pagination-entries">
            {dataperPageSelector &&
              dataperPageSelector.length > 1
              ? <div className="flex items-center">
                <p>Jumlah data per halaman :</p>
                {dataperPageSelector.map((perPage) => (
                  <div
                    className={parseInt(size) === perPage
                      ? styles.btnperpageactive
                      : styles.btnperpage}
                    key={perPage}
                    onClick={() => onChangeSize(perPage)}
                  >
                    {perPage}
                  </div>
                ))}
                <p className="ml-4"> dari total {pagination.totalData} data</p>
              </div>
              : <p>
                {`Menampilkan ${firstNumber(pagination)} sampai ${lastNumber(
                  pagination
                )} dari total ${pagination.totalData} data`}
              </p>
            }
            <div>
              <button
                disabled={pagination.page <= 1}
                id="previous-btn"
                onClick={() => onChangePage(parseInt(pagination.page) - 1)}
              >
                {'<'}
              </button>
              <RenderPageNumbers />
              <button
                disabled={pagination.page === pagination.totalPage}
                id="next-btn"
                onClick={() => onChangePage(parseInt(pagination.page) + 1)}
              >
                {'>'}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
}

Pagination.propTypes = {
  className: PropTypes.string,
  dataperPageSelector: PropTypes.array,
  loading: PropTypes.bool,
  mobilePagination: PropTypes.bool,
  mobilePaginationClass: PropTypes.string,
  onChangePage: PropTypes.func,
  onChangeSize: PropTypes.func,
  pagination: PaginationPropType,
  querySearch: PropTypes.object.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Pagination.defaultProps = {
  className: '',
  dataperPageSelector: [],
  loading: false,
  mobilePagination: false,
  mobilePaginationClass: '',
  onChangePage: () => { },
  onChangeSize: () => { },
  pagination: {},
  size: '10'
};

export default Pagination;
