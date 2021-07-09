import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Card from './Card';
import Button from './Button';
import classes from './ErrorModal.module.css';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const OverLaye = (props) => (
  <Card className={classes.modal}>
    <header className={classes.header}>
      <h2>{props.title}</h2>
    </header>
    <div className={classes.content}>
      <p>{props.message}</p>
    </div>
    <footer className={classes.actions}>
      <Button onClick={props.onConfirm}>Okay</Button>
    </footer>
  </Card>
);

const ErrorModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop {...props} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <OverLaye {...props} />,
        document.getElementById('overlaye-root')
      )}
    </Fragment>
  );
};

export default ErrorModal;
