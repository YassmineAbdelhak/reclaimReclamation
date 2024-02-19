import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Card, Col, Row, Form, Label, Input, FormGroup, Button } from 'reactstrap';
function AuthPage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const [error, setError] = useState();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { username, password };
      console.log(loginUser)
      const loginRes = await axios.post(
        "http://localhost:5000/loginEmployee/loginemployee",
        loginUser
      );
      console.log("loginRes ====== ", loginRes.data.token)
      localStorage.setItem("token", loginRes.data.token)

     
     window.location = '/AllReclamation';
    } catch (err) {
      console.log(err);
    }
  };

return (
  <Row
    style={{
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Col md={6} lg={4}>
      <Card body>
        <Form onSubmit={submit}>
          <FormGroup>
            <Label for="username"> Username</Label>
            <Input
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Write Your Username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Write Your Password" />
          </FormGroup>
          <Button type="submit"
            size="lg"
            className="bg-gradient-theme-left border-0"
            block>Submit
            </Button>
        </Form>
      </Card>
    </Col>
  </Row>
);
          }    

export default AuthPage;
 
