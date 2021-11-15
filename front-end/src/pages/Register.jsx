import React from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    <Container>
      <Header />
      <NavBar />
      <RegisterForm />
    </Container>
  );
}

export default Register;
