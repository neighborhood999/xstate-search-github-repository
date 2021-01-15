import React from 'react';
import { Heading } from '@chakra-ui/react';

function Hero() {
  return (
    <Heading as="h1" alignSelf="center" my={5} fontSize={['xl', '2xl', '3xl']}>
      Search GitHub Repositories
    </Heading>
  );
}

export default Hero;
