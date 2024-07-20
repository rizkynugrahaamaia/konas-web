import React from 'react'
import PropTypes from 'prop-types'; 

import Pagination from '../pagination-table';
import { PaginationPropType } from '../../utils/pagination';

import styles from './styles.module.css'; 

export default function Table(props){

    const { 
        data, 
        head,
        loading,
        mobilePagination,
        noPagination,
        onChangePage,
        pagination
    } = props;

    return(
    <div>
        <div className="overflow-x-auto rounded-lg border border-[#D9D9D9]">
            <table className="min-w-full">

            <thead>
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider">No</th>
                    {head?.map((item, key) => (
                        <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider" key={key}>{item.label}</th>
                    ))}
                </tr>
            </thead>
            
                <tbody>
                    {data?.map((value, index) => (
                        <tr className={styles.tableRow} key={index}>
                            <td className="px-4 py-2 text-sm font-medium">{index+1}</td>
                            {head.map((item, i) => (
                                <td className="px-4 py-2 text-sm font-medium" key={i}>{value[item.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>

    {
        !noPagination && (
        <Pagination
            className={styles.footer}
            loading={loading}
            mobilePagination={mobilePagination}
            onChangePage={onChangePage}
            pagination={pagination}
        />
        )
    }
    </div>
    )
}

Table.defaultProps = {
    data: [],
    head: [],
    loading: false,
    mobilePagination: false,
    noPagination: false,
    onChangePage: () => { },
    pagination: {},
  };
  
Table.propTypes = {
    data: PropTypes.array,
    head: PropTypes.array,
    loading: PropTypes.bool,
    mobilePagination: PropTypes.bool,
    noPagination: PropTypes.bool,
    onChangePage: PropTypes.func,
    pagination: PaginationPropType,
};
