import PropTypes from 'prop-types';

export const initialPagination = {
  page: 1,
  totalPage: 1,
  totalData: 0,
  totalDataOnPage: 0,
};

export const firstNumber = (pagination = initialPagination) => {
  const { page, totalPage, totalData, totalDataOnPage } = pagination;
  if (totalData === 0) {
    return 0;
  }
  if (page === totalPage) {
    return totalData - totalDataOnPage + 1;
  }
  return totalDataOnPage * page - totalDataOnPage + 1;
};

export const lastNumber = (pagination = initialPagination) => {
  const { page, totalPage, totalData, totalDataOnPage } = pagination;
  if (page === totalPage) {
    return totalData;
  }
  const last = totalDataOnPage * page;
  return last > totalData ? totalData : last;
};

export const toPaginationFormat = (pagination) => {
  if (typeof pagination === 'object') {
    const { page, totalPage, totalData, totalDataOnPage, size } = pagination;
    return {
      page: page || 0,
      totalPage: totalPage || 0,
      totalData: totalData || 0,
      totalDataOnPage: totalDataOnPage || size || 0
    };
  } else {
    return initialPagination;
  }
};

export const PaginationPropType = PropTypes.shape({
  page: PropTypes.number,
  totalPage: PropTypes.number,
  totalData: PropTypes.number,
  totalDataOnPage: PropTypes.number,
});

