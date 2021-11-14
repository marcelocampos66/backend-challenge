import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const initialState = {
  name: '',
  telephone: '',
  password: '',
};

const Provider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
