import React from 'react';
import PropTypes from 'prop-types';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '../../configs/react-query';


function AppLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
          {children}
    </QueryClientProvider>
  );
}

export default AppLayout;

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
