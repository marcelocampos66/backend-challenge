import styled from 'styled-components';

class Styled {

  Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 77vh;
  `;

  Table = styled.table`
    width: 80%;
    margin-top: 1%;
    color: #000000;
  `;

  Button = styled.button`
    width: 70%;
    background-color: #000000;
    color: #ffffff;
    &:hover {
      background-color: #ffffff;
      color: #000000;
    }
  `;

  Td = styled.td`
    border: 1px solid #000000;
    font-size: 12px;
    padding: 8px;
    width: 100px;
  `;

  Th = styled.th`
    border: 1px solid #000000;
    font-size: 12px;
    padding: 8px;
    width: 15%;
    padding-bottom: 12px;
    padding-top: 12px;
    text-align: left;
  `;

  Tr = styled.tr`
    &:nth-child( even ) {
      background-color: #ddd;
    }
  `;

  Tbody = styled.tbody`
    text-align: center;
  `;

  Thead = styled.thead`
    text-align: center;
    background-color: #000000;
    color: #ffffff;
  `;

  DivButton = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

}

export default new Styled();
