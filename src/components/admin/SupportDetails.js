import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Heading, Text, Box, Button, Textarea } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';
import { http, timestampFormatted, btnProcessing } from '../../funcs';
import toastr from 'toastr';

const SupportDetails = () => {
  const { id } = useParams();
  const [current, setCurrent] = useState({});
  const [creator, setCreator] = useState({});
  const [comment, setComment] = useState('');
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    http.get(`api/ticket/${id}`).then(({ data }) => {
      const _current = data;
      http
        .get(`/api/user/${_current.user_id}`)
        .then(({ data }) => {
          const _creator = data;
          setCurrent(_current);
          setCreator(_creator);
        })
        .catch((e) => console.log(e));
    });
  }, [refetch]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    const elem = e.target;

    if (comment.length <= 0) {
      return;
    }

    const data = { ticket_id: current.id, comment: comment };
    const prev = elem.innerHTML;

    btnProcessing(elem, () => {
      http
        .post(`/api/ticket/reply`, data)
        .then((r) => {
          setRefetch(!refetch);
          setComment('');
        })
        .catch((r) => {});

      elem.innerHTML = prev;
      elem.removeAttribute('disabled');
    });
  };

  const [date, month, year] = timestampFormatted(current.created_at);

  const sender = creator.fname && `${creator.fname} ${creator.lname}`;

  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="10" pb="10" width={['80vw', '60vw']}>
      <Flex my="10" justifyContent="space-between">
        <Box>
          <Heading width="100%" as="h1" my="4" fontSize="1.6em">
            {current.title}
          </Heading>
          <Text opacity="0.5">Technical Problem</Text>
        </Box>
      </Flex>
      <Flex border="1px solid #e7e7e7" bgColor="#fff" direction="column" borderRadius="5px" p="6" my="4">
        <Text fontWeight="bold" fontSize="1.1em">
          {sender}
          <span style={{ opacity: '0.5', marginLeft: '20px', fontWeight: 400 }}>
            {date} {month}. {year}
          </span>
        </Text>
        <Text my="4">{current.message}</Text>
        <Box>
          {current.comments &&
            current.comments.map((item, index) => {
              const [date, month, year] = timestampFormatted(item.created_at);

              const sender = item.user_id === creator.id ? `${creator.fname} ${creator.lname}(You)` : 'Support Team';
              const initials = item.user_id === creator.id ? `${creator.fname[0]}${creator.lname[0]}` : 'ST';

              return (
                <Flex
                  border="1px solid #e7e7e7"
                  bgColor="#fff"
                  direction="column"
                  borderRadius="5px"
                  p="6"
                  my="4"
                  key={index}
                >
                  <Text fontWeight="bold" fontSize="1.1em">
                    {sender}
                    <span style={{ opacity: '0.5', marginLeft: '20px', fontWeight: 400 }}>
                      {date} {month}. {year}
                    </span>
                  </Text>
                  <Text>{item.comment}</Text>
                </Flex>
              );
            })}
        </Box>
        <Box>
          {current.status === 'open' ? (
            <>
              <Text color="#E85247" mb="2" fontWeight="600">
                Reply
              </Text>
              <Textarea placeholder="Type your message" defaultValue={comment} onChange={handleCommentChange} />
              <Button bgColor="#0A71FE" color="#fff" _hover={{ bgColor: '#3288fc' }} mt="4" onClick={handleReplySubmit}>
                Reply
              </Button>
            </>
          ) : (
            <Text color="#E85247" mb="2" fontWeight="600">
              Can't Reply as Ticket has been Marked as Closed
            </Text>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default SupportDetails;
