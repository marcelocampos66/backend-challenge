import React from 'react';
import PropTypes from 'prop-types';
import Styled from './S.Container';

const Container = ({ children }) => {
  return (
    <Styled.Main>
      { children }
    </Styled.Main>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
