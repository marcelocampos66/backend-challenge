import React from 'react';
import { inputs } from './constants';
import Styled from './S.RegisterForm';

const RegisterForm = () => {
  return (
    <Styled.Main>
      {
        inputs.map((input) => (
          <Styled.Label htmlFor={ input.id }>
            { input.labelText }
            <Styled.Input
              type={ input.type }
              name={ input.name }
              placeholder={ input.placeholder }
            />
          </Styled.Label>
        ))
      }
      <Styled.Button>
        Registrar!
      </Styled.Button>
    </Styled.Main> 
  )
}

export default RegisterForm;
