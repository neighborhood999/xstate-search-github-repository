import PropTypes from 'prop-types';
import React from 'react';
import { Box, Icon, Text } from '@chakra-ui/core';

import { getLanguageColor } from '../utils/colors';

function Card({ repo }) {
  const lang = getLanguageColor(repo.language);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p={4}
      borderWidth="1px"
      borderRadius="5px"
    >
      <Box mb={3}>
        <Box pb={2}>
          <Text
            isTruncated
            color="blue.500"
            href={repo.htmlURL}
            fontSize="md"
            as="a"
            target="_blank"
            rel="noopener"
          >
            {repo.name}
          </Text>
        </Box>

        <Box>
          <Text fontSize="xs">{repo.description}</Text>
        </Box>
      </Box>

      <Box mt={3} display="flex" color="gray.500">
        {repo.language && (
          <Box display="flex" alignItems="center" pr={5}>
            {lang?.color && (
              <Icon name="cirlce" size="12px" color={lang?.color} />
            )}
            <Text pl={2} fontSize="xs">
              {repo.language}
            </Text>
          </Box>
        )}

        <Box display="flex" alignItems="center" pr={5}>
          <Icon name="stars" size="14px" />
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
            <Icon name="fork" size="14px" />
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

Card.propTypes = {
  repo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    htmlURL: PropTypes.string.isRequired,
    stars: PropTypes.number.isRequired,
    language: PropTypes.string,
    description: PropTypes.string,
    forksCount: PropTypes.number.isRequired
  })
};

export default Card;
