import React from 'react';
import { Flex, Heading, Text, Box, Button } from '@chakra-ui/react';

function UserCard({ fname, lname, username, email }) {
  return (
    <>
      <Box
        w="40px"
        h="40px"
        borderRadius="50%"
        color="#150026"
        bgColor="#44C768"
        fontWeight="500"
        pt="2"
        textAlign="center"
      >
        {fname[0]}
        {lname[0]}
      </Box>
      <Text my="4">{`${fname} ${lname}`}</Text>
      <Text fontSize="0.8em">Username: {username}</Text>
      <Text fontSize="0.8em">Email: {email}</Text>

      {/* <Flex
        p="6"
        direction="column"
        border="1px solid #150026"
        justifyContent="space-evenly"
        fontSize="1.2em"
        borderRadius="5px"
      >
        <Text fontWeight="600" mb={['6']}>
          My Direct Referal
        </Text>
        <Flex>
          <Box mr="10">
            <Text fontSize="1.5em" fontWeight="600">
              0
            </Text>
            <Text>Total Joined</Text>
          </Box>
          <Box>
            <Text fontSize="1.5em" fontWeight="600">
              0 USD
            </Text>
            <Text>Total Referral Bonuses earned</Text>
          </Box>
        </Flex>
      </Flex> */}
    </>
  );
}

export default UserCard;
