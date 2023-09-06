import { React, useState }                from 'react';
import { Button, Input, Card, Col, Row }  from 'antd';
import style                              from './Login.module.css'

function Login() {

  const [UsernameValue, setUsernameValue] = useState('');
  const [PasswordValue, setPasswordValue] = useState('');

  const [errorText, seterrorText]         = useState('');

  const usernameInput = (e) => {
    setUsernameValue(e.target.value)
  }

  const passwordInput = (e) => {
    setPasswordValue(e.target.value);
    console.log(PasswordValue);
  }

  const checkLogin = () => {
    if (UsernameValue == '' || PasswordValue == '') {
      seterrorText(<p className={style.errorText}>Error<br></br>Inputs must have text!!</p>);
    }
    else {
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

export default Login;
