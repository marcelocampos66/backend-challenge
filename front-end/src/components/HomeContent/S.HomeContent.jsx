import styled, { keyframes } from 'styled-components';

class Styled {

  typingAnimation = keyframes`
    from { width: 0 }
    to { width: 100% }
  `;

  blinkAnimation = keyframes`
    from, to { border-color: transparent }
    50% { border-color: #000000; }
  `;

  Main = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 77vh;
  `;

  DivH1 = styled.div`
    font-size: 24px;
  `;

  H1 = styled.h1`
    overflow: hidden;
    border-right: .15em solid #000000;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: .15em;
    color: #000000;
    animation: 
      ${this.typingAnimation} 1.5s steps(40, end),
      ${this.blinkAnimation} .75s step-end infinite;
  `;

}

export default new Styled();
