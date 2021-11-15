import React from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import HomeContent from '../components/HomeContent';

const Home = () => {
  return (
    <Container>
      <Header />
      <NavBar />
      <HomeContent />
    </Container>
  )
}

export default Home;
