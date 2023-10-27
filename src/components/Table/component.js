import React from 'react'
import PropTypes from 'prop-types'; 

export default function Table(props){

    const { data, head } = props;

    return(
        <div className="w-full px-8">
        <table className="table-auto w-full my-4 border border-gray-400">

            <thead className=" bg-orange-400">
            <tr>
                <th className="px-4 py-2 text-white text-left">No</th>
                {head?.map((item, key) => (
                     <th className="px-4 py-2 text-white text-left" key={key}>{item.label}</th>
                ))}
            </tr>
            </thead>
        
            <tbody>
                {data?.map((value, index) => (
                    <tr className="border border-gray-400" key={index}>
                        <td className="px-4 py-2 font-medium">{index+1}</td>
                        {head.map((item, i) => (
                            <td className="px-4 py-2 font-medium" key={i}>{value[item.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>

        </table>
    </div>
    )
}

Table.defaultProps = {
    data: [],
    head: [],
  };
  
Table.propTypes = {
    data: PropTypes.array,
    head: PropTypes.array,
};
