import React, { useState } from 'react';
import { Flex, Heading, Textarea, Box, Input, Select, Button } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';
import { http, btnProcessing } from '../../funcs';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

const NewTicket = (props) => {
  const [ticket, setTicket] = useState({
    title: '',
    message: '',
    category: '',
    priority: '',
  });

  const [redirect, setRedirect] = useState(false);

  const handleOnChange = (e) => {
    const name = $(e.target).attr('name');
    const value = $(e.target).val();

    const data = { ...ticket };
    data[name] = value;
    setTicket(data);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const prev = e.target.innerHTML;
    btnProcessing(e.target, () => {
      http
        .post(`api/ticket/create`, ticket)
        .then((response) => {
          // Sweet Alert
          mySwal
            .fire({
              title: <p>Support Created</p>,
              html: `<p>${response.data}</p>`,
              icon: 'success',
            })
            .then((r) => {
              console.log(r);
              if (r.isConfirmed || r.isDismissed) {
                setRedirect(true);
              }
            });
        })
        .catch((error) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Support Error</p>,
            html: `<p>${error.response}</p>`,
            icon: 'error',
          });
          console.log(error.response);
        });
      e.target.innerHTML = prev;
      e.target.removeAttribute('disabled');
    });
  };
  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="10" pb="10" width={['80vw', '60vw']}>
      {redirect && <Redirect to="/support" />}
      
      <Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
        Create New Ticket
      </Heading>
      <Flex border="1px solid #e7e7e7" bgColor="#fff" direction="column" borderRadius="5px" p="6">
        <Box>
          <Input
            type="text"
            placeholder="Ticket title"
            id="title"
            name="title"
            defaultValue={ticket.title}
            onChange={handleOnChange}
          />
        </Box>
        <Box my="10">
          <Textarea
            placeholder="Enter message here"
            id="message"
            name="message"
            defaultValue={ticket.message}
            onChange={handleOnChange}
          />
        </Box>
        <Box>
          <Select
            placeholder="Select category"
            id="category"
            name="category"
            defaultValue={ticket.category}
            onChange={handleOnChange}
          >
            <option value="1">Technical</option>
            <option value="2">UI</option>
          </Select>
        </Box>
        <Box my="10">
          <Select
            placeholder="Select priority"
            id="priority"
            name="priority"
            defaultValue={ticket.priority}
            onChange={handleOnChange}
          >
            <option value="1">Low</option>
            <option value="2">High</option>
          </Select>
        </Box>
        <Button bgColor="#44C768" _hover={{ bgColor: '#4eed7a' }} color="#fff" p={[6]} onClick={handleOnSubmit}>
          Submit Ticket
        </Button>
      </Flex>
    </Flex>
  );
};

export default NewTicket;
