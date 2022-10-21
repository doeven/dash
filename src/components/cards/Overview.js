import React from 'react';
import { Flex, Heading, Box, Text } from '@chakra-ui/react';

const Overview = ({ display, mt, title, amountM, amountW, total, symbol }) => {
  return (
    <Box mt={mt} display={display} p="6" rounded="lg" bg="#150026" color="#d7d7d7" fontWeight="400">
      <Flex direction="column">
        <Text>{title}</Text>
        <Heading as="h4" fontSize={['1.5em', '2em']} my="2">
          {total} {symbol}
        </Heading>
      </Flex>
      <Flex justifyContent="space-between">
        <Box>
          <Text>This Month</Text>
          <Text fontSize={['1.2em']}>
            {amountM} {symbol}
          </Text>
        </Box>
        <Box>
          <Text>This Week</Text>
          <Text fontSize={['1.2em']}>
            {amountW} {symbol}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Overview;
