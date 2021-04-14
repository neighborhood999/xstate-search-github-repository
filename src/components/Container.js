import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';

function Container({ children }) {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      width="100%"
      my={3}
      px={[5, 7, 10]}
    >
      {children}
    </Flex>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
