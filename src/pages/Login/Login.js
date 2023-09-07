import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card, Col, Row } from "antd";
import style from "./Login.module.css";

export const Login = () => {
  const [UsernameValue, setUsernameValue] = useState("");
  const [PasswordValue, setPasswordValue] = useState("");

  const [errorText, setErrorText] = useState(false);

  const navigate = useNavigate();

  const usernameInput = (e) => {
    setUsernameValue(e.target.value);
  };

  const passwordInput = (e) => {
    setPasswordValue(e.target.value);
  };

  const checkLogin = () => {
    if (UsernameValue == "" || PasswordValue == "") {
      setErrorText(true);
    } else {
      navigate("/MainContentList");
    }
  };
  return (
    <Row className={style.rowContainer}>
      <Col className={style.colContainer}>
        <Card className={style.card} title="Sign in">
          <Input
            className={style.input}
            placeholder="Username"
            onChange={usernameInput}
          />
          <Input
            className={style.input}
            placeholder="Password"
            onChange={passwordInput}
          />
          {errorText ? (
            <p className={style.errorText}>
              Error<br></br>
              Inputs must have text
            </p>
          ) : null}
          <Button className={style.button} onClick={checkLogin}>
            Login
          </Button>
        </Card>
      </Col>
    </Row>
  );
};
