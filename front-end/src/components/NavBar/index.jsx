import React from 'react';
import Styled from './S.Navbar';

const NavBar = () => {
  return (
    <Styled.Nav>
      <Styled.Link to="/register">
        <Styled.Button>
          Registrar Usuário
        </Styled.Button>
      </Styled.Link>
      <Styled.Link to="/users">
        <Styled.Button>
          Listar Usuários
        </Styled.Button>
      </Styled.Link>
    </Styled.Nav>
  );
}

export default NavBar;
