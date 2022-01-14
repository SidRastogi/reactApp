import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailFunction = (state, action) => {
  if (action.type === 'EMAIL_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'EMAIL_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordFunction = (state, action) => {
  if (action.type === 'password_input') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'password_blur') {
    return { value: state.value, isValid: state.isValid };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatch] = useReducer(emailFunction, {
    value: '',
    isValid: false,
  });

  const [passwordState, passDispatch] = useReducer(passwordFunction, {
    value: '',
    isValid: false,
  });
  const { isValid: emailValid } = emailState;
  const { isValid: passValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('run');
      setFormIsValid(emailValid && passValid);
    }, 500);
    return () => {
      console.log('clean');
      clearTimeout(identifier);
    };
  }, [emailValid, passValid]);

  const emailChangeHandler = (event) => {
    emailDispatch({ type: 'EMAIL_INPUT', val: event.target.value });
    // setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    passDispatch({ type: 'password_input', val: event.target.value });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    emailDispatch({ type: 'EMAIL_BLUR' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    passDispatch({ type: 'password_blur' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}>
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
