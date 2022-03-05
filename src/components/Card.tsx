import { Box, Icon, Text, IconProps } from '@chakra-ui/react';

import { getLanguageColor } from '@utils/colors';
import { Repository } from '@utils/api';

function LanguageColorIcon({ color = 'gray.500', ...props }: IconProps) {
  return (
    <Icon viewBox="0 0 100 100" color={color} {...props}>
      <circle fill="currentColor" cx="50" cy="50" r="50" />
    </Icon>
  );
}

function StarsIcon() {
  return (
    <Icon viewBox="0 0 16 16" color="gray.500">
      <svg
        fill="currentColor"
        aria-label="stars"
        version="1.1"
        width="16"
        height="16"
        role="img"
      >
        <path
          fillRule="evenodd"
          d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
        />
      </svg>
    </Icon>
  );
}

function ForkIcon() {
  return (
    <Icon viewBox="0 0 16 16" color="gray.500">
      <svg
        fill="currentColor"
        aria-label="forks"
        version="1.1"
        width="16"
        height="16"
        role="img"
      >
        <path
          fillRule="evenodd"
          d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
        />
      </svg>
    </Icon>
  );
}

export function Card(repo: Repository) {
  const lang = getLanguageColor(repo.language);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      flex="1"
      p={4}
      borderWidth="1px"
      borderRadius="5px"
    >
      <Box mb={3}>
        <Box pb={2} as="a" href={repo.htmlURL} target="_blank" rel="noopener">
          <Text isTruncated color="blue.500" fontSize="md">
            {repo.name}
          </Text>
        </Box>

        <Text mt={1} fontSize="xs" noOfLines={5}>
          {repo.description}
        </Text>
      </Box>

      <Box mt={3} display="flex" color="gray.500">
        {repo.language && (
          <Box display="flex" alignItems="center" pr={5}>
            {lang?.color && <LanguageColorIcon color={lang?.color} />}
            <Text pl={2} fontSize="xs">
              {repo.language}
            </Text>
          </Box>
        )}

        <Box display="flex" alignItems="center" pr={5}>
          <StarsIcon />
          <Text
            pl={1}
            fontSize="xs"
            as="a"
            href={`${repo.htmlURL}/stargazers`}
            target="_blank"
            rel="noopener"
          >
            {repo.stars}
          </Text>
        </Box>

        {repo.forksCount > 0 && (
          <Box display="flex" alignItems="center">
            <ForkIcon />
            <Text
              pl={1}
              fontSize="xs"
              as="a"
              href={`${repo.htmlURL}/network/members`}
              target="_blank"
              rel="noopener"
            >
              {repo.forksCount}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
