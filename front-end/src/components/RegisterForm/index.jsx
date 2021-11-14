import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../context/AppContext';
import { inputs } from './constants';
import Api from '../../services/Api';
import Styled from './S.RegisterForm';

const initialState = {
  name: '',
  telephone: '',
  password: '',
};

const RegisterForm = () => {
  const [disable, setDisable] = useState(true);
  const { user, setUser } = useContext(AppContext);

  const verifyNewUserCredentials = () => {
    const { name, telephone, password } = user;
    const minNameLength = 4;
    const minPasswordLength = 6;
    const telephoneLength = 11;
    if (name.length < minNameLength
      || password.length < minPasswordLength
      || telephoneLength !== telephone.length) {
      setDisable(true);
      return;
    }
    setDisable(false);
  }

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  }

  const handleClick = async () => {
    const { name, telephone, password } = user;
    const newUser = {
      msisdn: `+55${telephone}`,
      name,
      password,
    };
    await Api.registerUser(newUser);
    setUser(initialState);
  }

  useEffect(() => {
    verifyNewUserCredentials();
  });

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
        disabled={ disable }
        onClick={ handleClick }
      >
        Registrar!
      </Styled.Button>
    </Styled.Main> 
  )
}

export default RegisterForm;
