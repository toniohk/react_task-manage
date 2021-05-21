import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const ToastAlert = (props) => (
  <Alert elevation={6} variant="filled" {...props} />
);

const Toast = ({ open, type, message, onClose }) => (
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
  >
    <ToastAlert severity={type}>{message}</ToastAlert>
  </Snackbar>
);

export default Toast;
