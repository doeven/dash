import $ from 'jquery';
import { React, useEffect, useState, useRef } from 'react';
import { Link as Reactlink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import { Scrollbars } from 'rc-scrollbars';

import { Flex, Heading, Grid, Tabs, TabList, Tab, TabPanels, TabPanel, Box, Text, Button, Link, Image, Input, InputGroup, InputRightElement, Textarea, Table, Thead, Tbody, Td, Tr, Th } from '@chakra-ui/react';
import { BsChatLeftDots } from 'react-icons/bs';
import { MdOutlineScheduleSend } from 'react-icons/md';


import { RiUserFill } from 'react-icons/ri';
import { BiSend } from 'react-icons/bi';
import { http, btnProcessing, timestampFormatted } from '../../funcs';

// import NewsCard from '../cards/NewsCard';

const ChatNew = ({ user, history, ...props }) => {
  const { id, username } = useParams();


  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(0);

  // For the Sweet Alerts
  const mySwal = withReactContent(Swal);

  const selectContact = (e, id) => {
    // console.log(id+ ' was selected');
    
    http
    .get(`api/message/${id}`)
    .then((response) => {
      setChat(response.data);
      setSelectedContact(id);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const submitChat = (e) =>{
    e.preventDefault();
    setIsLoading(true);
    let message = document.getElementById('message').value;

    let receiver_id = id;
    
    let data = {
      message: message,
      receiver_id: receiver_id
    }
    console.log(data);

    http
    .post(`api/message/create`, data)
    .then((response) => {
      console.log(response);
      document.getElementById('message').value = '';
      setIsLoading(false);
      history.push(`/messages`);
      })
      .catch((error) => {
        console.log(error);
      });


  }


  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="0" pb="10">
      
      <Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
        Messaging
      </Heading>

      <Flex direction="column" border="1px solid #e7e7e7" bgColor="#fff" p={['4', '8']}>
        <Text my="6" fontSize="1.2em" fontWeight="600">
          Send a New Chat to <span style={{ color: 'red' }}>{username}</span>
        </Text>


        <Flex direction="row">
                                <form onSubmit={e=> submitChat(e)} w="100%">
                                  <Textarea placholder="Enter a message" id="message" name="message" disabled={isLoading} ></Textarea> <br/><br/>
                                  <Button type="submit" disabled={isLoading}>{isLoading ? <MdOutlineScheduleSend/> :<BiSend />}</Button>
                                </form>
                      </Flex>
        
        
      </Flex>
      {/* cards */}

      
      
    </Flex>
  );


};

export default ChatNew;

