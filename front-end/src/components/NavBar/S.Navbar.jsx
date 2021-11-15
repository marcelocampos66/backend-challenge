import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Styled {

  Nav = styled.nav`
    color: white;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 8vh;
    background-color: #000000;
  `;

  Link = styled(Link)`
    height: 100%;
  `;

  Button = styled.button`
    border: none;
    height: 100%;
    background-color: black;
    color: white;
    width: 150px;
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
      cursor: pointer;
    }
  `;

}

export default new Styled();
