import { Heading, HeadingProps } from '@chakra-ui/react';

export interface HeroProps extends HeadingProps {
  title?: string;
}

export function Hero({ title, ...props }: HeroProps) {
  return (
    <Heading
      as="h1"
      alignSelf="center"
      my={5}
      fontSize={['xl', '2xl', '3xl']}
      {...props}
    >
      {title || 'Search GitHub Repositories'}
    </Heading>
  );
}
