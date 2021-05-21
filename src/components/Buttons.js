import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BlueButton = ({ large, children, ...other }) => {
  const RenderButton = withStyles({
    root: {
      color: '#ffffff',
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight: 600,
      padding: large ? '11px 35px 10px 36px' : '7px 35px 6px 36px',
      backgroundColor: '#4588ff',
      borderRadius: '6px',
      textTransform: 'capitalize',
      '&:hover': {
        backgroundColor: '#4588ff',
        opacity: 0.9,
      },
      '&:focus': {
        outline: 'none'
      },
    },
  })(Button);

  return <RenderButton {...other}>{children}</RenderButton>;
};

const GrayButton = ({ large, children, ...other }) => {
  const RenderButton = withStyles({
    root: {
      color: '#2e2e2e',
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight: 600,
      padding: large ? '11px 35px 10px 36px' : '7px 35px 6px 36px',
      backgroundColor: '#eaebec',
      borderRadius: '6px',
      textTransform: 'capitalize',
      '&:hover': {
        backgroundColor: '#eaebec',
        opacity: 0.9,
      },
      '&:focus': {
        outline: 'none'
      },
    },
  })(Button);

  return <RenderButton {...other}>{children}</RenderButton>;
};

const RedButton = ({ large, children, ...other }) => {
  const RenderButton = withStyles({
    root: {
      color: '#ffffff',
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight: 600,
      padding: large ? '11px 35px 10px 36px' : '7px 35px 6px 36px',
      backgroundColor: '#ec2425',
      borderRadius: '6px',
      textTransform: 'capitalize',
      '&:hover': {
        backgroundColor: '#ec2425',
        opacity: 0.9,
      },
      '&:focus': {
        outline: 'none'
      },
    },
  })(Button);

  return <RenderButton {...other}>{children}</RenderButton>;
};

const BlueOutlineButton = withStyles({
  root: {
    color: '#4588ff',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 500,
    padding: '7px 35px 6px 36px',
    backgroundColor: 'rgba(69, 136, 255, 0.1)',
    borderRadius: '6px',
    border: 'solid 2px #4588ff',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#eaebec',
      opacity: 0.9,
    },
    '&:focus': {
      outline: 'none'
    },
  },
})(Button);

const GrayOutlineButton = withStyles({
  root: {
    color: '#2e2e2e',
    fontFamily: 'Poppins',
    fontSize: '16px',
    fontWeight: 500,
    padding: '7px 35px 6px 36px',
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    border: 'solid 2px #f0f0f0',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#eaebec',
      opacity: 0.9,
    },
    '&:focus': {
      outline: 'none'
    },
  },
})(Button);


export { BlueButton, GrayButton, RedButton, BlueOutlineButton, GrayOutlineButton };
