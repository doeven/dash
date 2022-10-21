import React, { useEffect, useState } from 'react';
import { Flex, Heading, Text, Box, Grid, Button, Input } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';
import { http, btnProcessing } from '../../funcs';
import $ from 'jquery';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

const MatchUsers = () => {
  const [donPacks, setDonPacks] = useState([]);

  useEffect(() => {
    // Get Active Donation Packages
    http
      .get(`/api/p2p/packages/active`)
      .then(({ data }) => {
        setDonPacks(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const autoMatch = () => {
    mySwal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this auto match!",
        icon: 'warning',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Auto Match Users!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Let's Add the Call
          http
            .get(`/api/admin/match/auto`)
            .then((response) => {
              mySwal.fire('Match Status!', response.data, 'success');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
  };

  const [recData, setRecData] = useState({
    username: '',
    package_id: '',
    amount: '',
  });

  const handleOnChange = (e) => {
    const name = $(e.target).attr('name');
    const value = $(e.target).val();

    console.log(value);

    const data = { ...recData };
    data[name] = value;
    setRecData(data);
  };

  const addUser = (e) => {
    e.preventDefault();
    const prev = e.target.innerHTML;
    console.log(recData);
    // return;
    btnProcessing(e.target, () => {
      http
        .post(`api/admin/add/receiver`, recData)
        .then((response) => {
          console.log(response.data);
          if (response.data.includes('Invalid')) {
            mySwal.fire('Error!', response.data, 'error');
          } else {
            mySwal.fire('Receiver Add Success!', response.data, 'success');
          }

          e.target.innerHTML = prev;
          e.target.removeAttribute('disabled');
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.response);
          mySwal.fire('Error!', error.response, 'errro');
          e.target.innerHTML = prev;
          e.target.removeAttribute('disabled');
        });
    });
  };

  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="8" pb="10" width={['80vw', '60vw']}>
      <Heading width="100%" as="h1" my="6" fontSize="1.6em">
        Match Users
      </Heading>
      <Grid templateColumns={['repeat(1, 3fr)', 'repeat(3, 1fr)']} gap={6}>
        <Box border="1px solid #e7e7e7" bgColor="#fff" p="6" borderRadius="5px">
          <Text fontSize="1.2em" fontWeight="600">
            Auto Links Go here
          </Text>
          <Button
            my="6"
            alignSelf="center"
            bgColor="#44C768"
            color="#fff"
            _hover={{ bgColor: '#4eed7a' }}
            onClick={autoMatch}
          >
            Auto Match
          </Button>
        </Box>
        <Box border="1px solid #e7e7e7" bgColor="#fff" p="6" borderRadius="5px">
          <Text fontSize="1.2em" fontWeight="600">
            Manual Links Go here
          </Text>
          <Button
            my="6"
            as={Reactlink}
            to="/admin/p2p/donors"
            alignSelf="center"
            bgColor="#44C768"
            color="#fff"
            _hover={{ bgColor: '#4eed7a' }}
          >
            Click here to view available donors
          </Button>
        </Box>
      </Grid>
      <Text fontSize="1.2em" mt="8" mb="6" fontWeight="600">
        Add Username to Pledge Receivers
      </Text>
      <Grid
        templateColumns={['repeat(1, 4fr)', 'repeat(1, 4fr)']}
        gap={6}
        border="1px solid #e7e7e7"
        bgColor="#fff"
        p="6"
        borderRadius="5px"
      >
        <Box>
          <label>Enter Username</label>
          <Input placeholder="Enter Username" id="username" name="username" onChange={(e) => handleOnChange(e)} />
        </Box>

        <Box>
          <label>Select Package</label>
          <Input placeholder="Enter package id" id="package_id" name="package_id" onChange={(e) => handleOnChange(e)} />
        </Box>
        <Box>
          <label>Enter Amount</label>
          <Input placeholder="Enter Amount" id="amount" name="amount" onChange={(e) => handleOnChange(e)} />
        </Box>
        <Button
          my="6"
          alignSelf="center"
          w="50%"
          bgColor="#44C768"
          color="#fff"
          _hover={{ bgColor: '#4eed7a' }}
          onClick={addUser}
        >
          Add User
        </Button>
      </Grid>
      <Text fontSize="1.2em" mt="8" mb="6" fontWeight="600">
        Packages, IDs and Amount Range
      </Text>
      <Box border="1px solid #e7e7e7" bgColor="#fff" p="6" borderRadius="5px">
        <Text>Use details to fill Adding Pledge</Text>
        {donPacks.length === 0 ? (
          <Text>No Active Packages</Text>
        ) : (
          donPacks.map((item) => (
            <Text>
              {item.id} - {item.title} - min:{item.min} - max:{item.max}
            </Text>
          ))
        )}
      </Box>
    </Flex>
  );
};

export default MatchUsers;
