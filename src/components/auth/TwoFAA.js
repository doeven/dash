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
    <div className="card card-bordered">
      <div className="card-inner card-inner-lg">
        <div className="nk-block-head">
          <div className="nk-block-head-content">
            <h4 className="nk-block-title">2FA Verification</h4>

            <div className="nk-block-des">
              <p>Use Authentication Code or Recovery code to login</p>
            </div>
          </div>
        </div>
        <form>
          {recoveryMode ? (
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="recovery_code">
                  Enter Recovery Code
                </label>
              </div>
              <input
                type="text"
                className="form-control form-control-lg"
                id="recovery_code"
                placeholder="Enter your recovery Code"
                fontSize="13px"
                onChange={(e) => setRecoveryCode(e.target.value)}
              />
            </div>
          ) : (
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="code">
                  Enter Code
                </label>
              </div>
              <input
                type="text"
                className="form-control form-control-lg"
                id="code"
                placeholder="Enter Code"
                fontSize="13px"
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <div className="form-label-group">
              <label className="form-label" htmlFor="recovery_tick">
                Use Recovery Code
              </label>
            </div>
            <input type="checkbox" className="form-control" id="recovery_tick" onChange={(e) => recmode()} />
          </div>

          <div className="form-group" style={{ paddingTop: "20px" }}>
            <button className="btn btn-lg btn-primary btn-block" onClick={(e) => verify(e)}>
              Sign in
            </button>
          </div>
        </form>
        <div className="form-note-s2 text-center pt-4">
          {' '}
          New on our platform? <Link to="register">Create an account</Link>
        </div>

      </div>
    </div>



        <Flex
                direction={['column']}
                justify='center'
                alignItems='center'
                width={['85%','75%','75%','60%']}
                margin='auto'
                pt='30%'
                >
                <Heading fontSize='1.5em' opacity='0.9'>2FA Verification</Heading>
                <Text my='4' opacity='0.7'>Use Authentication Code or Recovery code to login</Text>

                {recoveryMode ? (
                <FormControl>
                    <InputGroup>
                        <InputLeftElement children={<AiOutlineUser />} />
                        <Input type="text" id="recovery_code" placeholder="Enter Your Recovery Code" onChange={(e) => setRecoveryCode(e.target.value)} required/>
                    </InputGroup>
                </FormControl>

                ):(
                <FormControl>
                    <InputGroup>
                        <InputLeftElement children={<AiOutlineUser />} />
                        <Input type="text" id="code" placeholder="Enter Code" onChange={(e) => setCode(e.target.value)} required/>
                    </InputGroup>
                </FormControl>
                )}

                <FormControl>
                    <Checkbox>
                        <InputLeftElement children={<AiOutlineUser />} />
                        <Input type="text" id="code" id="recovery_tick" onChange={(e) => recmode()} />
                    </Checkbox>
                </FormControl>


                
                <Button
                  onClick={(e) => verify(e)}
                  bgColor="#44C768"
                  _hover={{ bgColor: '#4eed7a' }}
                  color="#fff"
                  py={[6]}
                  fontSize="1.2em"
                  fontWeight="bold"
                  w="100%"
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
