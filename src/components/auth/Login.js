import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Text,
  Box,
  FormControl,
  Form,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Button,
  Link,
} from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';

import { AiOutlineEye, AiOutlineEyeInvisible,AiOutlineUser, AiOutlineLock} from "react-icons/ai";
// import RegImage from '../../assets/images/register.png';
import RegImage from '../../assets/svg/auth-bg.svg';
import { btnProcessing, http } from '../../funcs';
import toastr from 'toastr';
import TwoFA from './TwoFA';
import TwoFAed from './TwoFAed';

const Login = ({ forced, user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFA, setTwoFA] = useState(false);
  const [show, setShow] = React.useState(false);

  const handle2FAVerify = () => {
    localStorage.setItem('isLoggedIn', true);
    forced();
  };

  const handleType2 = () => {
    localStorage.setItem('is2faed', 'true');
    forced();
  }

  const handle2FAFail = () => {
    setTwoFA(false);
    console.log('You have entered an Invalid Code');
  };


  // toast.success('Success Message');
  const LoginNow = (e) => {
    e.preventDefault();
    const btn = e.target;
    const prev = btn.innerHTML;

    btnProcessing(btn, () => {
      http.get('/sanctum/csrf-cookie').then((response) => {
        http
          .post(
            '/login',
            {
              email: email.toLowerCase(),
              password: password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            },
          )
          .then(({ data }) => {
            if (data.two_factor === true) {
              setTwoFA(true);
            } else {
              localStorage.setItem('isLoggedIn', true);
              forced();
            }
            btn.removeAttribute('disabled');
            btn.innerHTML = prev;
          })
          .catch((error) => {

            // Display an info toast with no title
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

            
            if (error) {    
              if (error.response && error.response.status === 422){
                toastr.error(error.response.data.errors.email);
              }        
            }


            btn.removeAttribute('disabled');
            btn.innerHTML = prev;
          });
      });
    });
  };

  const handleClick = () => setShow(!show);
  return (
    <Flex direction={['column', 'column', 'row', 'row']} color="#333" bgColor=" #F7FCFF" h="100vh" w="100vw">
      {/* brand info and image section */}
      <Flex
        display={['none', 'none', 'inline-block', 'inline-block']}
        // bgImage={RegImage}
        bgRepeat="no-repeat"
        bgPosition="center"
        background="#f2fff3"
        flex="1"
      >
        <Box fontSize="1.5em" color="#44C768" fontWeight="400" mb={['6']}>
            <Reactlink to="/" className="logo-link">
              <img src="./images/logo-light.png" alt="logo" />
            </Reactlink>
        </Box>
        <Image src={RegImage} flex='2' padding="100px" />
        <Heading as="h6" fontSize="1.2em" px="20px">Built for you. SIGN UP . INVEST . GET PAID</Heading>

      </Flex>
      {/* form section */}
      <Flex direction={['column']} px="10" py="6" h="60vh" flex="1">
        {twoFA ? (
          <TwoFA onVerify={handle2FAVerify} onFail={handle2FAFail} />
        ) : user.twofa_type === 2 && localStorage.getItem('is2faed') != 'true' ? (
          <TwoFAed onVerify={handleType2} />
        ) : (
          <Flex
            direction={['column']}
            justify="center"
            alignItems="center"
            width={['85%', '75%', '75%', '45%']}
            margin="auto"
            pt="30%"
          >
            <Heading fontSize="1.5em" opacity="0.9">
              Welcome!
            </Heading>
            <Text my="4" opacity="0.7" fontSize="13px">
              Let's get to know you
            </Text>
           
              <FormControl>
                <InputGroup>
                  <InputLeftElement children={<AiOutlineUser />} />
                  <Input
                    type="email"
                    id="email"
                    placeholder="Username or email"
                    onChange={(e) => setEmail(e.target.value)}
                    fontSize="13px"
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl my="6">
                <InputGroup size="md">
                  <InputLeftElement children={<AiOutlineLock />} />
                  <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    fontSize="13px"
                    required
                  />
                  <InputRightElement width="4.5rem" onClick={handleClick} >
                    {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </InputRightElement>
                </InputGroup>
                <Link mt="4" ml="4" as={Reactlink} to="/reset-password" color="red" opacity="0.6" fontSize="14px">
                  Forgot Password?
                </Link>
              </FormControl>
              
              <Button
                onClick={LoginNow}
                bgColor="#44C768"
                _hover={{ bgColor: '#4eed7a' }}
                color="#fff"
                borderRadius="60px"
                py={[6]}
                fontSize="13px"
                fontWeight="700"
                w="100%"
              >
                Login
              </Button>
            <Text textAlign="center" mt="6" fontSize="14px">
              New on our platform?{' '}
              <Link as={Reactlink} to="/register" fontWeight="bold" color="#44C768">
                Create an account
              </Link>
            </Text>

            {/* <form onSubmit={ (e) => {e.preventDefault(); console.log('Here'); } }>
              <input name="me" type="text" placeholder="Login Here" />
              <input name="you" />
            </form> */}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Login;
