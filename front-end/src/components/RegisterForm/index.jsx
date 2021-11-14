import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { inputs } from './constants';
import Styled from './S.RegisterForm';

const RegisterForm = () => {
  const { user, setUser } = useContext(AppContext);

  const handleChange = ({ target: { name, value } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  }

  const handleClick = () => {
    
  }

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
              value={ user[input.name] }
              onChange={ handleChange }
            />
          </Styled.Label>
        ))
      }
      <Styled.Button
        type="button"
        onClick={ handleClick }
      >
        Registrar!
      </Styled.Button>
    </Styled.Main> 
  )
}

export default RegisterForm;
