import React, { useEffect, useState } from 'react';
import { Flex, Heading, Text, Box, Textarea, Button } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';
import { http, btnProcessing, timestampFormatted } from '../funcs';
import ChatItem from './ChatItem';
import $ from 'jquery';

const Messages = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState({});
  const [showChats, setShowChats] = useState(false);
  const [comment, setComment] = useState('');
  const [refetch, setRefetch] = useState(false);
  const [filter, setFilter] = useState('open');

  const [date, month, year, timeValue] = timestampFormatted(currentMessage.created_at);

  const sender = user.id && `${user.fname} ${user.lname} (You)`;

  const initials = user.id && `${user.fname[0]}${user.lname[0]}`;

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    const elem = e.target;

    if (comment.length <= 0) {
      console.log('Empty');
      return;
    }

    const data = { pm_id: currentMessage.id, reply: comment };
    const prev = elem.innerHTML;

    btnProcessing(elem, () => {
      http
        .post(`/api/message/reply`, data)
        .then((r) => {
          setRefetch(!refetch);
          setComment('');
          setCurrentMessage(currentMessage.id);
          console.log(r);

          http.get(`api/message/${data.pm_id}`).then((rr) => {
            setCurrentMessage(rr.data);
          });
        })
        .catch((r) => console.log(r));

      elem.innerHTML = prev;
      elem.removeAttribute('disabled');
    });
  };

  const changeActive = (e, current) => {
    e.preventDefault();
    // let elem = e.target.parentElement;
    let elem = e.target.closest('li');

    $('.chat-item').removeClass('current');

    $(elem).addClass('current');
  };

  useEffect(() => {
    http.get(`/api/messages/mine`).then((r) => {
      setMessages(r.data);
      console.log(r.data);
    });
  }, [filter]);

  //add chat package
  return (
    <Flex flex={['2']} mr={['0', '0', '10', '10']} my="10" border="1px solid #e7e7e7" bgColor="#fff" borderRadius="5px">
      <Flex direction="column" w="20vw" borderRight="1px solid #e7e7e7" p="6">
        <Heading>Chats</Heading>
        <Text>Messages</Text>
        {messages === 'You do not have any Private Messages' ? (
          <h6>No Messages</h6>
        ) : (
          messages.map((message) => (
            <ChatItem
              message={message}
              user={message.partner}
              reload={refetch}
              show={setShowChats}
              current={setCurrentMessage}
              changeActive={changeActive}
            />
          ))
        )}
      </Flex>
      <Flex direction="column" w="40vw">
        {messages !== 'You do not have any Private Messages' && currentMessage.id !== undefined ? (
          <>
            <Flex borderBottom="1px solid #e7e7e7" p="6">
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
                textAlign="center"
              >
                <Text>
                  {currentMessage.partner &&
                    currentMessage.partner.fname.charAt(0) + currentMessage.partner.lname.charAt(0)}
                </Text>
              </Flex>
              <Box>
                <Text>
                  {currentMessage.partner && currentMessage.partner.fname + ' ' + currentMessage.partner.lname}{' '}
                </Text>
                <Text>Last Seen:{currentMessage.partner && currentMessage.partner.last_seen}</Text>
              </Box>
            </Flex>
            {Object.entries(currentMessage).length === 0
              ? null
              : currentMessage.replies.map((item) => (
                  <>
                    {item.reply.reply} {`${date} ${month} ${year} - ${timeValue}`}
                  </>
                ))}
            <Flex bgColor="#F0F3F6" h="75%">
              <Textarea rows="1" placeholder="Type your message..." value={comment} onChange={handleCommentChange} />
              <Button onClick={handleReplySubmit} />
            </Flex>
          </>
        ) : messages !== 'You do not have any Private Messages' && currentMessage.id === undefined ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              position: 'absolute',
              top: '40%',
            }}
          >
            <h6 style={{ margin: '20px' }}>Click on/Select a Message from the sidebar</h6>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              position: 'absolute',
              top: '40%',
            }}
          >
            <Reactlink to="/referrals">
              <button className="btn btn-success">Go to Referral Page</button>
            </Reactlink>
            <h6 style={{ margin: '20px' }}>Send a message to users in your referral tree from the referral Page</h6>
          </div>
        )}
      </Flex>
    </Flex>
  );
};

export default Messages;
