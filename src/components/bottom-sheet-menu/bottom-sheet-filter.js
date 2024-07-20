import React from 'react';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';

import styles from './styles.module.css';

function BottomSheetFilter(props) {
  const { visible, onDismiss, children, isFullHeight, variant, style } = props;

  const handlers = useSwipeable({
    onSwiped: () => onDismiss(),
  });

  return (
    <div
      className={[styles.root, visible ? styles.visible : ''].filter(Boolean).join(' ')}
    >
      <div className={styles.overlay} data-testid="btn-dismiss" onClick={() => onDismiss()} />
      <div
        className={[
          styles.content,
          styles[variant],
          isFullHeight ? styles.full_height : ''].filter(Boolean).join(' ')
        }
        style={style}
      >
        <div className={styles.swipe_btn} id="btn-swipe" {...handlers}/>
        {children}
      </div>
    </div>
  );
}

BottomSheetFilter.defaultProps = {
  children: null,
  isFullHeight: false,
  onDismiss: () => { },
  style: null,
  variant: '',
};

BottomSheetFilter.propTypes = {
  children: PropTypes.node,
  isFullHeight: PropTypes.bool,
  onDismiss: PropTypes.func,
  style: PropTypes.object,
  variant: PropTypes.oneOf(['bordered', '']),
  visible: PropTypes.bool.isRequired,
};

export default BottomSheetFilter;
