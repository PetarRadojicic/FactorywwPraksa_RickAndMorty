import { React, useState }                from 'react';
import { Button, Input, Card, Col, Row }  from 'antd';
import style                              from './Login.module.css'

export const  Login= ()=> { // no need for enter after component opening bracket
  // again, naming conventions, in js/ts plain variables start with lowercase
  // maybe i missed something, but usual CapitalCase entities are Classes (class definitions, not instances),
  // ReactComponents 
  
  // Further more on naming conventions, if we have some "config" code constants 
  // per example AVAILABLE_LANGUAGES = ['SR', 'EN', 'ES'], its in ALL_CAPS_SNAKE_CASE
  const [UsernameValue, setUsernameValue] = useState('');
  const [PasswordValue, setPasswordValue] = useState('');

  const [errorText, seterrorText] = useState(''); // dont use spaces to align code, usualy we have linters configured that should do that automaticly for us

  const usernameInput = (e) => {
    setUsernameValue(e.target.value)
  }

  const passwordInput = (e) => {
    setPasswordValue(e.target.value);
    console.log(PasswordValue); // remove console logs
  }

  // one of the tasks was to check for mocked credentials 
  const checkLogin = () => {
    if (UsernameValue == '' || PasswordValue == '') {
      // dont set elements into state if not absolutely neccessary to do so, instead, you should either conditionally
      // or(and) dynamically render the error
      seterrorText(<p className={style.errorText}>Error<br></br>Inputs must have text!!</p>);
      
    }
    else {
      // we dont do routing in react like this, google on how to use router to navigate
      window.location = '/MainContentLIst'
    }
  }
  return (
    <Row
      className={style.rowContainer}
    >
      <Col
        className={style.colContainer}
      >
        <Card className={style.card} title="Sign in">
          <Input className={style.input} placeholder="Username" onChange={usernameInput} />
          <Input className={style.input} placeholder="Password" onChange={passwordInput} />
          {errorText}
          <Button className={style.button} onClick={checkLogin}>Login</Button>
        </Card>
      </Col>
    </Row>
  );
}


