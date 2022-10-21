import { useEffect, useState } from 'react';
import { Link as Reactlink } from 'react-router-dom';

import { http } from '../../funcs';
import toastr from 'toastr';
import $ from 'jquery';
import queryString from 'query-string';
import {
  Flex,
  Box,
} from '@chakra-ui/react';

function EmailVerifyLink(props, { forced }) {
  // Get Query Strings
  const value = queryString.parse(props.location.search);
  const apiPath = `${window.location.pathname}?expires=${value.expires}&signature=${value.signature}`;

  const [logged, setLogged] = useState('0');

  useEffect(() => {
    console.log(apiPath);
    http.get('/sanctum/csrf-cookie').then((response) => {

      console.log('we are here');
 
      http
        .get(apiPath)
        .then((response) => {
          console.log(response.status);
          $('.sndReset').attr('disabled', true);
          
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
          console.log(error.response);
          if (error.response != undefined && error.response.data.message == 'Unauthenticated.') {
            setLogged('1');
            // Display an info toast with no title
            toastr.options = {
              debug: false,
              newestOnTop: false,
              positionClass: 'toast-top-center',
              preventDuplicates: false,
              onclick: null,
              showDuration: '300',
              hideDuration: '1000',
              timeOut: '8000',
              extendedTimeOut: '8000',
              showEasing: 'swing',
              hideEasing: 'linear',
            };
            toastr.error('Login to your Account and try visiting the link again');
          }
        });

    });
  }, []);


  

  // toast.success('Success Message');
  const ResendVerification = (e) => {
    e.preventDefault();
  };
  return (



    <Flex
      direction="column"
      color="#333"
      justifyContent={['center']}
      alignItems={['center']}
      bgColor=" #F7FCFF"
      minH="100vh"
      w="100vw"
    >
      <Box fontSize="1.5em" color="#44C768" fontWeight="400" mb={['6']}>
            <Reactlink to="/" className="logo-link">
              <img src="/images/logo-light.png" alt="logo" />
            </Reactlink>
        </Box>




        { logged == 1 ? (
                <>Login to your Account and try visiting the verification link again.</>
        ) : (
          <Box fontSize="1.5em" color="#44C768" fontWeight="400" mb={['6']}>
            {window.location.replace("/dashboard")}
            <>Account Verified</> <br/><br/>
            <Reactlink to="/login">Back to Login </Reactlink>
          </Box>
                
        )}

    </Flex>




    
  );
}

export default EmailVerifyLink;
