import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import { http, timestampFormatted } from '../funcs';
// import $ from 'jquery';

const ChatItem = ({ message, reload, user, current, changeActive }) => {
  const handleClick = (e, id) => {
    http.get(`api/message/${id}`).then((r) => {
      current(r.data);
      console.log(r.data);
    });
  };
  const [date, month, year] = timestampFormatted(message.created_at);

  const partner = `${user.fname} ${user.lname}`;

  const initials = `${user.fname[0]}${user.lname[0]}`;
  return (
    <Flex
      mt="4"
      onClick={(e) => {
        handleClick(e, message.id);
        changeActive(e, 'current');
      }}
    >
      <Flex
        mr="4"
        justifyContent="center"
        alignItems="center"
        w="50px"
        h="50px"
        bgColor="red"
        borderRadius="50%"
        color="#fff"
        fontWeight="bold"
      >
        <Text textAlign="center">{initials}</Text>
      </Flex>
      <Box>
        <Flex>
          <Text mr="4" fontWeight="bold">
            {partner}
          </Text>
          <Text opacity="0.7">{`${date} ${month} ${year}`}</Text>
        </Flex>
        <Text opacity="0.7">You: {message.message}</Text>
      </Box>
    </Flex>
  );
};

export default ChatItem;
