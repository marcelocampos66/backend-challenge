import React from 'react';
import logo from '../../images/mlearn.png';
import Styled from './S.Header';

const Header = () => {
  return (
    <Styled.Header>
      <Styled.Link to="/">
        <Styled.Img
          src={ logo }
          alt="mLearn Logo"
        />
      </Styled.Link>
    </Styled.Header>
  );
}

export default Header;
