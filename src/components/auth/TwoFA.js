import { useState } from 'react';
import { Link as Reactlink } from 'react-router-dom';

import {
    Flex,
    Heading,
    Text,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    InputLeftElement,
    Button,
    Link,
  } from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible,AiOutlineUser, AiOutlineLock} from "react-icons/ai";


import { http } from '../../funcs';
import toastr from 'toastr';
import { Checkbox } from '@chakra-ui/checkbox';

function TwoFA(props) {
  const [code, setCode] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [recoveryMode, setRecoveryMode] = useState(false);

  const verify = (e) => {
    e.preventDefault();
    let data = {};

    if (code !== '') {
      data.code = code;
    } else {
      data.recovery_code = recoveryCode;
    }
    http.get('/sanctum/csrf-cookie').then((response) => {
      http
        .post('/two-factor-challenge', data)
        .then((response) => {
          props.onVerify();
        })
        .catch((error) => {
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
          toastr.error('You have entered an invalid code. Retry Login.');
          props.onFail();
        });
    });
  };

  const recmode = () => {
    let tickElement = document.getElementById('recovery_tick');
    if (tickElement.checked === true) {
      setCode('');
      setRecoveryMode(true);
    } else {
      setRecoveryCode('');
      setRecoveryMode(false);
    }
  };

  return (

    <>
        <Flex
                direction={['column']}
                justify='center'
                alignItems='center'
                width={['85%','75%','75%','60%']}
                margin='auto'
                pt='30%'
                >
                <Heading fontSize='1.5em' opacity='0.9'>2FA Verification</Heading>
                <Text my='4' opacity='0.7'>Use Authentication Code or Recovery Code to login</Text>

                {recoveryMode ? (
                <FormControl>
                    <InputGroup>
                        <InputLeftElement children={<AiOutlineUser />} />
                        <Input type="text" id="recovery_code" placeholder="Enter Your Recovery Code" onChange={(e) => setRecoveryCode(e.target.value)} fontSize="13px" required/>
                    </InputGroup>
                </FormControl>

                ):(
                <FormControl>
                    <InputGroup>
                        <InputLeftElement children={<AiOutlineUser />} />
                        <Input type="text" id="code" placeholder="Enter Authentication Code" onChange={(e) => setCode(e.target.value)} fontSize="13px" required/>
                    </InputGroup>
                </FormControl>
                )}

                <FormControl>
                    <Checkbox id="recovery_tick" onChange={(e) => recmode()} >Use Recovery Code
                    </Checkbox>
                </FormControl>


                
                <Button
                  onClick={(e) => verify(e)}
                  bgColor="#44C768"
                  _hover={{ bgColor: '#4eed7a' }}
                  color="#fff"
                  py={[6]}
                  fontSize="13px"
                  fontWeight="700"
                  borderRadius="60px"
                  w="100%"
                  pt="20px"
                >
                  Sign In
                </Button>
                <Text textAlign="center" mt="6">
                  New on our platform?{' '}
                  <Link as={Reactlink} to="/register" fontWeight="bold" color="#44C768">
                    Create an account
                  </Link>
                </Text>
                </Flex>

                </>
  );
}

export default TwoFA;
