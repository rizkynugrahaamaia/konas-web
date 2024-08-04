import React from 'react';
import PropTypes from 'prop-types';

import Table from '../../components/mytable';

const PrintView = React.forwardRef(function PrintView (
  { 
    data = [],
    headers = [],
   },
  ref
) {
  
  const newHead = headers.slice(0, 4);
  return (
    <div style={{ display: 'none' }}>
      <div ref={ref}>
      <style>{`
          @page{ margin: 0.5cm 1cm 0.5cm 0.8cm; size: landscape; }
        `}</style>
        <h6>Data Peserta</h6>
        <Table
          data={data?.map((dt) => ({
          ...dt,
          presence: ( <div>{dt.presence ? 'Hadir' : 'Belum Hadir'}</div>)
          }))}
          head={newHead}
        />
      </div>
    </div>
  );
});

PrintView.propTypes = {
  data: PropTypes.array,
  headers: PropTypes.array,
};

export default PrintView;
