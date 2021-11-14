import React from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import UsersTable from '../components/UsersTable';

const ListUsers = () => {
  return (
    <Container>
      <Header />
      <NavBar />
      <UsersTable />
    </Container>
  );
}

export default ListUsers;
