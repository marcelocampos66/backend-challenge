import styled from 'styled-components';

class Styled {

  Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 77vh;
  `;

  Label = styled.label`
    width: 25%;
    height: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `;

  Input = styled.input`
    border-radius: 5px;
    height: 3vh;
  `;

  Button = styled.button`
    border-radius: 5px;
    height: 4vh;
    background-color: black;
    color: white;
    width: 150px;
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
      cursor: pointer;
    }
    margin-top: 2%;
  `;

}

export default new Styled();
