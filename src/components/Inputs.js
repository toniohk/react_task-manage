import { withStyles } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';

const TextInput = withStyles({
  root: {
    width: '432px',
    height: '36px',
    padding: '6px 16px',
    borderRadius: '6px',
    border: 'solid 2px #f0f0f0',
    backgroundColor: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.67px',
    color: '#2e2e2e'
  },
})(InputBase);

const SelectInput = withStyles({
  root: {
    width: '432px',
    height: '36px',
    borderRadius: '6px',
    border: 'solid 2px #f0f0f0',
    backgroundColor: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '-0.67px',
    color: '#2e2e2e'
  },
  input: {
    padding: '0 0 0 16px',
    height: '36px'
  }
})(InputBase);

export { TextInput, SelectInput };
