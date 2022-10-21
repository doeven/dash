import { useEffect, useState } from 'react';
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
  const [resend, setResend] = useState(false)
  const [time, setTime] = useState(60)

  useEffect(()=>{
    if(time === 0){
      setResend(true);
    }
  }, [time])

  const reduceTime = () => {
    const interval = setInterval(()=>{
      if(time === 0){
        clearInterval(interval);
      }
      setTime(time=> time - 1)
    }, 1000);

    
  }
// console.log(time)
  const send_email = () => {
    setTime(60);
    http.get('/sanctum/csrf-cookie').then((response) => {
      setResend(false);
      reduceTime();
      http
        .post('/api/user/session/send-email')
    })
  }

  useEffect(()=>{
    if(localStorage.getItem('shouldResend') !== 'true'){
      localStorage.setItem('shouldResend', 'true')
      send_email();
    }else{
      setResend(true)
    }
  },[])

  const verify = (e) => {
    e.preventDefault();
    let data = {};

    data.code = code;
    
    http.get('/sanctum/csrf-cookie').then((response) => {
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
      http
        .post('/api/user/session/set', data)
        .then(({data}) => {
          if(data === "You entered a wrong code"){
            toastr.error(data)
          }else{
            props.onVerify();
          }
        })
        .catch((error) => {
          toastr.error('You have entered an invalid code. Retry Login.');
        });
    });
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
                <Text my='4' opacity='0.7'>Use Authentication Code to login</Text>

                <FormControl>
                    <InputGroup>
                        <InputLeftElement children={<AiOutlineUser />} />
                        <Input type="text" id="code" placeholder="Enter Authentication Code" onChange={(e) => setCode(e.target.value)} fontSize="13px" required/>
                    </InputGroup>
                </FormControl><br/>

                
                <Button
                  onClick={(e) => verify(e)}
                  bgColor="#44C768"
                  _hover={{ bgColor: '#4eed7a' }}
                  color="#fff"
                  py={[6]}
                  fontSize="13px"
                  fontWeight="bold"
                  borderRadius="60px"
                  w="100%"
                  pt="20px"
                >
                  Sign In
                </Button>
                <Text textAlign="center" mt="6">
                  {resend  ? (
                    <Link as={Reactlink} to="/#" onClick={(e)=>{e.preventDefault(); send_email()}} fontWeight="bold" color="#44C768">
                      Resend OTP
                    </Link>
                  ) :(
                    <Text opacity='0.7'> Resend in {time} second(s) </Text>
                  )}
                </Text>
                </Flex>

                </>
  );
}

export default TwoFA;
