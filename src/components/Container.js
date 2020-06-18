import PropTypes from 'prop-types';
import React from 'react';
import { Flex } from '@chakra-ui/core';

function Container({ children }) {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      width="100%"
      my={3}
      px={[5, 10]}
    >
      {children}
    </Flex>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired
};

export default Container;
