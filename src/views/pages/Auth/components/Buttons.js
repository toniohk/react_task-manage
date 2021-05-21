import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BlackButton = withStyles({
  root: {
    color: '#fff',
    padding: '15px 22px',
    backgroundColor: '#000',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#000',
      opacity: 0.9,
    },
    '&:focus': {
      outline: 'none'
    },
  },
})(Button);

export { BlackButton };
