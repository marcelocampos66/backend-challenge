import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Styled {

  Header = styled.header`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 15vh;
    background-color: #08a8ec;
  `;

  Img = styled.img`
  
  `;

  Link = styled(Link)`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

}

export default new Styled();
