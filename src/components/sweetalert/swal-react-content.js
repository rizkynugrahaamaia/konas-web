import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './styles.scoped.css';
import './styles.css';

const MySwal = withReactContent(Swal);

const SwalReactContent = props => {
  const { onConfirm, onCancel, onClose, onTimer, ...settings } = props;

  return MySwal.fire({
    customClass: {
      confirmButton: styles.confirmButton,
      cancelButton: styles.cancelButton
    },
    reverseButtons: true,
    ...settings
  }).then((result) => {
    if (result.value) {
      onConfirm && onConfirm(result.value);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel && onCancel();
    } else if (result.dismiss === Swal.DismissReason.backdrop) {
      onCancel && onCancel();
    } else if (result.dismiss === Swal.DismissReason.esc) {
      onCancel && onCancel();
    } else if (result.dismiss === Swal.DismissReason.close) {
      onClose && onClose();
    } else if (result.dismiss === Swal.DismissReason.timer) {
      onTimer && onTimer();
    }
  });
};

export default SwalReactContent;
