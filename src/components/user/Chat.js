import $ from 'jquery';
import { React, useEffect, useState, useRef } from 'react';
import { Link as Reactlink } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import { Scrollbars } from 'rc-scrollbars';

import { Flex, Grid, Tabs, TabList, Tab, TabPanels, TabPanel, Box, Text, Button, Link, Image, Input, InputGroup, InputRightElement, Textarea, Table, Thead, Tbody, Td, Tr, Th } from '@chakra-ui/react';
import { BsChatLeftDots } from 'react-icons/bs';
import { MdOutlineScheduleSend } from 'react-icons/md';


import { RiUserFill } from 'react-icons/ri';
import { BiSend } from 'react-icons/bi';
import { http, btnProcessing, timestampFormatted } from '../../funcs';

// import NewsCard from '../cards/NewsCard';

const Chat = ({ user, ...props }) => {

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(0);

  // For the Sweet Alerts
  const mySwal = withReactContent(Swal);


  useEffect(() => {
    http
      .get(`api/messages/mine`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filter]);

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
    // let pm_id = chat.partner.id;
    let pm_id = chat.id;

    let data = {
      reply: message,
      pm_id: pm_id
    }

    http
    .post(`api/message/reply`, data)
    .then((response) => {
      console.log(response);
      selectContact(e, pm_id);
      document.getElementById('message').value = '';
      setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });


  }


  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="10">
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Box borderBottom="2px solid #44C768" w={['50%', '50%', '25%', '17%']} pb="4">
          Chat/Messages
        </Box>
      </Box>
      <br/>

      {/* chat heads */}
      <Flex mt="8" direction={['column', 'column', 'row']}>
        
        
        <Flex
          direction="column"
          bgColor="#fff"
          justifyContent="center"
          alignItems="center"
          border="1px solid #e7e7e7"
          borderRadius="5px"
          mb="20px"
          fontSize="14px" fontWeight="500"
        >
            <Text fontSize="1em">Contacts</Text>

          <Scrollbars style={{ width: 200, height: 500 }}>
{/* {console.log(messages.length)} */}

            {
              messages == undefined || messages.length == 0 || messages == 'You do not have any Private Messages' ?
              <Box>
                Select a Contact
              </Box>
              :

              messages.map((message) => {
                const [date, month, year, time] = timestampFormatted(message.created_at);
                return (
                <Flex direction="row" p="10px" bgColor={selectedContact == message.id ? '#F1F1F1': 'white'} style={{ borderBottom: '1px solid #e8e8e8', cursor: 'pointer' }}
                onClick={e=>{ selectContact(e, message.id); }}
                >
                  
                  
                  {message?.partner.profile_photo_url != 'https://ui-avatars.com/api/?name=&color=7F9CF5&background=EBF4FF' ? (
                              <img src={message?.partner.profile_photo_url} style={{ height: "100px", width: "100px", borderRadius: "50%", objectFit: "cover"}} />
                  ) : (
                    <RiUserFill align="center" fontSize="2em" color="#44C768" /> 
                  )}


                  <Box pl="10px">
                    <Text>{message?.partner.fname} {message?.partner.lname} </Text>                        
                    <Text fontSize="0.8em">{time}</Text> 
                  </Box>
                </Flex>
                
              )})
                  
              }

          </Scrollbars>
        </Flex>




        {/* section for chat */}
        <Flex
          direction="column"
          bgColor="#fff"
          p="6"
          ml={['0', '0', '10']}
          border="1px solid #e7e7e7"
          borderRadius="5px"
          // textAlign="center"
          fontSize="14px" fontWeight="500"
        >
                      <Scrollbars style={{ width: 500, height: 500 }}>
                              {selectedContact == 0  &&              
                                <Box textAlign="center" style={{ margin: "0 auto", paddingTop: "200px" }}>
                                  Select A Chat <br/> 
                                  <BsChatLeftDots align="center" fontSize="4em" color="#44C768" style={{ margin: "0 auto", paddingTop: "10px" }} />
                                </Box>                         
      
                              }

                              { Object.keys(chat).length !== 0 &&
                              <>
                              <Flex p="20px" style={{ borderBottom: '1px solid #e8e8e8' }}>
                                  <Text fontWeight="500" fontSize="1.5em">Chat with {chat.partner.fname}</Text>
                                </Flex>


                                <Flex justify={chat.sender_id == user.id ? 'end' : 'start'} mx="10px" my="5px">
                                <Box textAlign="left"
                                    p="10px" 
                                    // bgColor="#b0ffd0" 
                                    bgColor={chat.sender_id == user.id ? "#b0ffd0"  : "#f4f9e1"}
                                    style={{ borderRadius: '5px', width: '200px' }}>
                                      <Box>     
                                        <Text fontWeight="500" color="red"><em>{chat.sender_id == user.id ? 'You' : chat.partner.fname}</em></Text>
                                        <Text>{chat.message}</Text>
                                        </Box>
                                        <Text fontSize="0.8em" textAlign="right">{timestampFormatted(chat.created_at)}</Text>
                                </Box>
                              </Flex> 
                              </>
                              }

                              
{
  Object.keys(chat).length !== 0 && Object.keys(chat.replies).length !== 0 
        &&
        chat.replies.map(item => {
      const [date, month, year, timeValue] = timestampFormatted(item.created_at);
      const partner = chat.partner.fname;
      const isMe = user.id == item.user_id ? true : false;
          return (
            <Flex justify={isMe ? 'end' : 'start'}  mx="10px" my="5px" key={item.id}>
            <Box textAlign="left"
                p="10px" 
                bgColor={isMe ? "#b0ffd0"  : "#f4f9e1"}
                style={{ borderRadius: '5px', width: '200px' }}>
                  <Box>     
                    <Text fontWeight="500" color="red"><em>{isMe ? 'You' : chat.partner.fname}</em></Text>
                    <Text>{item.reply}</Text>
                    </Box>
                    <Text fontSize="0.8em" textAlign="right">{timeValue}</Text>
            </Box>
          </Flex> 
          )
        } )
        

}

                             
                      </Scrollbars>

                      <Flex direction="row">
                                <form onSubmit={e=> submitChat(e)} w="100%">
                                  <Input placeholder='Enter a message' row="1" name="message" id="message" w="80%" disabled={isLoading} /> <Button type="submit" disabled={isLoading}>{isLoading ? <MdOutlineScheduleSend/> :<BiSend />}</Button>
                                </form>
                      </Flex>
          
          </Flex>
      </Flex>
      

    </Flex>
  );


function Chats(props) {
  return (
      <>
      {  props.replies && props.replies.map(item => {
      const [date, month, year, timeValue] = timestampFormatted(item.created_at);
              return  <Flex justify="end">
                                      <Box textAlign="left"
                                      p="10px" 
                                      bgColor="#b0ffd0" 
                                      style={{ borderRadius: '5px', width: '200px' }}>
                                        <Box>     
                                          <Text fontWeight="500"><em>{item?.partner.fname}</em></Text>
                                          <Text>{item.message}</Text>
                                          </Box>
                                          <Text fontSize="0.8em">{timeValue}</Text>
                                      </Box>
                        </Flex>
      }) }
      </>
  );
}





};

export default Chat;

