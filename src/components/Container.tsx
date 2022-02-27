import { Flex, FlexProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';
interface Props extends FlexProps {
  children: ReactNode;
}

function Container({ children, ...props }: Props) {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      width="100%"
      my={3}
      px={[5, 7, 10]}
      {...props}
    >
      {children}
    </Flex>
  );
}

export default Container;
