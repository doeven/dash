import React, { useState } from 'react';
import { Flex, Heading, Text, Box, FormControl, FormLabel, Input, Button, Link } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';

import { http } from '../../funcs';
import toastr from 'toastr';
import $ from 'jquery';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(0);

  const ResetPassword = (e) => {
    e.preventDefault();
    $('.sndReset').attr('disabled', true);
    http.get('/sanctum/csrf-cookie').then((response) => {
      http
        .post('/forgot-password ', {
          email: email,
        })
        .then((response) => {
          console.log(response);
          setSent(1);
          $('.nk-block-des').hide();
          $('#formData').hide();
          toastr.options = {
            debug: false,
            newestOnTop: false,
            positionClass: 'toast-top-center',
            preventDuplicates: false,
            onclick: null,
            showDuration: '300',
            hideDuration: '1000',
            timeOut: '4000',
            extendedTimeOut: '4000',
            showEasing: 'swing',
            hideEasing: 'linear',
          };
          toastr.success(response.data.message);
        })
        .catch((error) => {
          console.log(error);
          $('.sndReset').attr('disabled', false);

          // Display an info toast with no title
          toastr.options = {
            debug: false,
            newestOnTop: false,
            positionClass: 'toast-top-center',
            preventDuplicates: false,
            onclick: null,
            showDuration: '300',
            hideDuration: '1000',
            timeOut: '5000',
            extendedTimeOut: '5000',
            showEasing: 'swing',
            hideEasing: 'linear',
          };
          toastr.error(error.response.data.errors.email);
        });
    });
  };

  return (
    <Flex
      direction="column"
      color="#333"
      justifyContent={['center']}
      alignItems={['center']}
      bgColor=" #F7FCFF"
      h="100vh"
      w="100vw"
    >
      <Box fontSize="1.5em" color="#44C768" fontWeight="400" mb={['6']}>
        <Link to="/" className="logo-link">
          <img src="./images/logo-light.png" alt="logo" />
        </Link>
      </Box>
      <Flex
        direction={['column']}
        border="1px solid #e7e7e7"
        bgColor="#fff"
        px="10"
        py="6"
        w={['85vw', '40vw']}
        borderRadius="5px"
      >
        <Heading fontSize="1.5em" opacity="0.9">
          Reset Password
        </Heading>
        <Text my="4" opacity="0.7">
          If you forgot your password, well, then we’ll email you instructions to reset your password.
        </Text>
        <FormControl>
          {sent === 1 && (
            <div className="alert alert-success">
              <strong>We have emailed you a password reset link.</strong>
            </div>
          )}
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input type="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <Button
          bgColor="#44C768"
          onClick={ResetPassword}
          my="6"
          _hover={{ bgColor: '#4eed7a' }}
          color="#fff"
          py={[6]}
          fontSize="1.1em"
          fontWeight="bold"
        >
          Send Reset Link
        </Button>
        <Link as={Reactlink} to="/login" fontWeight="bold" textAlign="center" color="#44C768">
          Return to login
        </Link>
      </Flex>
    </Flex>
  );
};

export default PasswordReset;
