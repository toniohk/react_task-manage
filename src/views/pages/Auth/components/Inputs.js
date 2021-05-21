import React, { useState } from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { InputBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {
    backgroundColor: '#fff',
    boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    borderColor: theme.palette.primary.main,
  }
}));

function TextInput({ label, value, onChange, props }) {
  const classes = useStyles();

  return (
    <TextField
      label={label}
      className="w-full"
      variant="filled"
      InputProps={{ classes, disableUnderline: true }}
      value={value}
      onChange={e => onChange(e.target.value)}
      {...props}
    />
  );
}

function PasswordInput({ label, value, onChange, ...props }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl className="w-full" variant="filled">
      <InputLabel htmlFor="filled-adornment-password">{label}</InputLabel>
      <FilledInput
        disableUnderline
        classes={classes}
        id="filled-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        {...props}
      />
    </FormControl>
  );
}

const SelectInput = withStyles({
  root: {
    width: '100%',
    border: '1px solid #e2e2e1',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
  },
  input: {
    padding: '18px 12px 19px 10px'
  }
})(InputBase);

export { TextInput, PasswordInput, SelectInput };
