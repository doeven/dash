import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text, Box, Input, Radio, Button, Link, Grid, InputRightElement, InputGroup, RadioGroup, Select } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';
import { http } from '../../funcs';
import toastr from 'toastr';
import $ from 'jquery';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { GiConsoleController } from 'react-icons/gi';

const Security = (props) => {

  // For the Sweet Alerts
  const mySwal = withReactContent(Swal);


  const [currPassword, setCurrPassword] = useState('');
  const [password, setPassword] = useState('');

  const[oldPassword, setOldPassword] = useState('');
  const[newPassword, setNewPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [confPassConf, setConfPassConf] = useState('');


  const[twoFATypeCode, setTwoFATypeCode] = useState(props.user.twofa_type);

  const[twoFactor, setTwoFactor] = useState('');
  const[updateComponent, setUpdateComponent] = useState(''); // handle component reloads
  const[twoFactorRecovery, setTwoFactorRecovery] = useState([]);
  const[twoFactorQR, setTwoFactorQR] = useState('');
  const [showQR, setShowQR] = useState(true);

  useEffect(() => {
    console.log(props.user.twofa_type)
    if(props.user && props.user.twofa_type != undefined){
      setTwoFATypeCode(twoFATypeCode.toString());
    }
    
  }, [updateComponent]);
  

  const showCodes = (e)=> {
    console.log("This code runs");
    setShowQR(true);
    // e.preventDefault();
    getRecoveryCodes();
}
  const ResetPassword = (e) => {
    let displayError;
    e.preventDefault();

    console.log(password + ' and ' + confirmPassword);



    if(password != confirmPassword){
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
      toastr.error("New and confirm passwords do not match");
      return;
    }


    http.get('/sanctum/csrf-cookie').then((response) => {
      http
        .post('/api/user/change-pass ', {
          old_password: currPassword,
          new_password: password,
        })
        .then((response) => {          
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
          if(response.data == 'Incorrect Old Password'){
            toastr.error(response.data);
            return;
          }
          toastr.success(response.data);
          
          console.log(response);
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
            timeOut: '5000',
            extendedTimeOut: '5000',
            showEasing: 'swing',
            hideEasing: 'linear',
          };
          toastr.error(displayError);
        });
    });
  };

  const setTwoFAType = (e) => {
    if(twoFATypeCode == 1){
        authEnable(e,1);

        http.get('/sanctum/csrf-cookie').then(response => {

              http.post('/api/user/twofa/change', {type: 1
              } ).then(response => {
                  console.log(response);
              }).catch((error) => { });

        });
        // setUpdateComponent('1');
        // window.location.reload();


        
      }else if(twoFATypeCode == 2){
        authEnable(e,2);

        http.get('/sanctum/csrf-cookie').then(response => {
        
              localStorage.setItem('isLoggedIn', true);
              localStorage.setItem('is2faed', true); // Added for the check when logged in

              http.post('/api/user/twofa/change', {type: 2
              } ).then(response => {
                  // console.log(response);
              }).catch((error) => { });

            });
            // setUpdateComponent('2');
        // window.location.reload();

      
      
      } else {
        authEnable(e,0);

        http.get('/sanctum/csrf-cookie').then(response => {


              http.post('/api/user/twofa/change', {type: 0
              } ).then(response => {
                  console.log(response);
              }).catch((error) => { });

        });
        // setUpdateComponent('0');
        // window.location.reload();


      }
  };

  const confirmPass = () => {

    mySwal.fire({
        title: 'Enter Your Password?',
        input: 'password',
          inputAttributes: {
            autocapitalize: 'off'
          },
        icon: 'warning',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Submit!',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return http.post(`/user/confirm-password`, {password: login})
            .then(response => {
              
              return console.log(response);
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        }
      }).then((result) => {
        if (result.isConfirmed) {

            // Let's Add the Call
            
                mySwal.fire(
                'Enabled!',
                '2FA Feature has been enabled',
                'success'
                );


                if(twoFactor == 1){
                  http.post('/user/two-factor-authentication', {
                  } ).then(response => {
                      setTwoFactor('1');
                  }).catch((error) => { });
                }else{
                  http.delete('/user/two-factor-authentication', {
                  } ).then(response => {
                      setTwoFactor('1');
                  }).catch((error) => { });
                }

                $("showCodes").show();

                // props.forced();
            

        }
      })


}

const resetStates = ()=>{
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('')
}
  const authEnable = (e,x) => {
    e.preventDefault();
    http.get('/sanctum/csrf-cookie').then(response => {
        if(x == 1){
          console.log('I am here '+x);
            http.post('/user/two-factor-authentication', {
            } ).then(response => {
                setTwoFactor('1');
                $('.sndReset').attr("disabled", true); 
                toastr.options = {
                    "debug": false,
                    "newestOnTop": false,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "4000",
                    "extendedTimeOut": "4000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                  };
                toastr.success('2FA by Authenticator has been Enabled');
                props.forced();
            }).catch((error) => {
                setTwoFactor('1');
                console.log();
                if(error.response.status === 423){
                    console.log('requires password');
                    confirmPass();
                    return;
                }

                // Display an info toast with no title
                toastr.options = {
                    "debug": false,
                    "newestOnTop": false,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "5000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                  };
                toastr.error(error);
            });
        }else {
            http.delete('/user/two-factor-authentication', {
            }).then(response => {

                $('.sndReset').attr("disabled", true); 
                if(x == 0){
                  toastr.options = {
                    "debug": false,
                    "newestOnTop": false,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "4000",
                    "extendedTimeOut": "4000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                  };
                toastr.warning('2FA has been Disabled');
                setTwoFactor('0');

                } else {
                  toastr.options = {
                    "debug": false,
                    "newestOnTop": false,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "4000",
                    "extendedTimeOut": "4000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                  };
                toastr.success('Email Verification has been Enabled');
                  setTwoFactor('2');
                }

                props.forced();
                
            }).catch((error) => {
              setTwoFactor('0');
                console.log(error);

                if(error.response.status === 423){
                    console.log('requires password');
                    confirmPass();
                    return;
                }
                // Display an info toast with no title
                toastr.options = {
                    "debug": false,
                    "newestOnTop": false,
                    "positionClass": "toast-top-center",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "5000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                  };
                toastr.error(error);
            });
        }
    });
}


  const getQR = () => {
    http.get('/sanctum/csrf-cookie').then(response => {
            http.get('/user/two-factor-qr-code').then(response => {
                // console.log(response.data.svg);
                setTwoFactorQR(response.data.svg);
            }).catch((error) => {
                console.log(error);
            });
        
    });
}

  const getRecoveryCodes = () => {
    http.get('/sanctum/csrf-cookie').then(response => {
            http.get('/user/two-factor-recovery-codes').then(response => {
                if(response.data.length != 0){
                    setTwoFactorRecovery(response.data);
                    getQR();
                    setTwoFactor(1);
                    console.log(response.data);
                }else{
                    setTwoFactor(0);
                }
            }).catch((error) => {
                console.log(error);
            });
        
    });
}



  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="0" pb="10">
      
      <Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
        Security
      </Heading>

      <Flex
        direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['4', '8']}
      >
        <Text my="6" fontSize="1.2em" fontWeight="600">
          Account password change
        </Text>
        <Flex direction={['column', 'row']}>
          <Box>
            <label>Current password:</label>
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                defaultValue={currPassword}
                onChange={(e) => setCurrPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem" onClick={handleClick}>
                {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box mx={[0, '10']} my={[10, 0]}>
            <label>New password:</label>
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem" onClick={handleClick}>
                {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box>
            <label>Confirm password:</label>
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                placeholder="Confirmpassword"
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem" onClick={handleClick}>
                {show ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </InputRightElement>
            </InputGroup>
          </Box>
        </Flex>

        <Button
          my="8"
          width={['50%', '25%']}
          bgColor="#44C768"
          color="#fff"
          py={[6]}
          fontSize="1.1em"
          fontWeight="600"
          _hover={{ bgColor: '#4eed7a' }}
          onClick={ResetPassword}
        >
          Change
        </Button>
      </Flex>
<br/>
      <Flex
        direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['4', '8']}
      >
        <Text my="6" fontSize="1.2em" fontWeight="600">
          2FA Authentication Settings
        </Text>
        
        <Flex direction={['column', 'row']}>

            <RadioGroup name="twofa_type" value={ twoFATypeCode }>
                  <Box>
                      <Radio value="0" onChange={(e) => setTwoFATypeCode(e.target.value)} checked="checked">Disable 2FA</Radio> {props.user.twofa_type == 0 && <span style={{color: "green"}}>(Enabled)</span>   }
                  </Box>
                  <Box>
                        <Radio value="2" onChange={(e) => setTwoFATypeCode(e.target.value)}>Email Code</Radio> {props.user.twofa_type == 2 && <span style={{color: "green"}}>(Enabled)</span>  }
                  </Box>
                  <Box>
                        <Radio value="1" onChange={(e) => setTwoFATypeCode(e.target.value)}>Authenticator/Recovery Codes</Radio> {props.user.twofa_type == 1 && <span style={{color: "green"}}>(Enabled)</span>   }
                  </Box>
            </RadioGroup>
          

        </Flex>

        {twoFATypeCode == 2 ? 

              <Text my="6" fontSize="1em" fontWeight="400" color="red">
              This option enables Login code being sent to user email.
              </Text>

        : twoFATypeCode == 1 ?
          <>
              <Text my="6" fontSize="1em" fontWeight="400" color="red">
                This option enables the use of Recovery codes or third party Authenticators such as Google Authenticator. <small>These are one time codes, make sure to save before you continue.</small>
              </Text> 

            <Flex direction={['column', 'row']}>

                <Box>
                    <Text my="6" fontSize="1em" fontWeight="600">
                        Scan QRCode
                    </Text>
                  <QRCode />
                  
                </Box>
                <Box mx={[0, '10']} my={[10, 0]}>
                    <Text my="6" fontSize="1em" fontWeight="600">
                        Recovery Codes
                    </Text>
                  <RecoveryCodes />
                </Box>

              </Flex>
          </>
        :
              <Text my="6" fontSize="1em" fontWeight="400" color="red">
                This disables 2FA.
              </Text>
      
        }

          <Flex direction={['column', 'row']}>
              <Box>

                <Button
                  my="4"
                  width={['100%', '100%']}
                  bgColor="#44C768"
                  color="#fff"
                  py={[6]}
                  fontSize="1.1em"
                  fontWeight="600"
                  _hover={{ bgColor: '#4eed7a' }}
                  onClick={setTwoFAType}
                >
                  Save 2FA Settings
                </Button>
              </Box>
              {props.user.twofa_type == 1 &&
              <Box>

                <Button
                  my="4"
                  mx="4"
                  width={['100%', '100%']}
                  bgColor="#44C768"
                  color="#fff"
                  py={[6]}
                  fontSize="1.1em"
                  fontWeight="600"
                  _hover={{ bgColor: '#4eed7a' }}
                  onClick={ e => showCodes() }
                  // style={{ display: "none" }}
                  className="showCodes"
                >
                  Generate Code
                </Button>
              </Box>
              }

          </Flex>
      </Flex>


      {/* <Flex
        direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['4', '8']}
        my="10"
      >
        <Text my="6" fontSize="1.2em" fontWeight="600">
          Secret password code
        </Text>
        <Text fontWeight="600">Secret password-code reset information</Text>
        <Text my="6">
          You need to fill out 3 questions and answer them. This information is very important, so save it. If you lose
          your secret password-code, you can reset it only if you have answers to these questions.
        </Text>
        <Flex direction={['column']}>
          <Grid mb="6" templateColumns={['repeat(1, 6fr)', 'repeat(2, 3fr)']} gap={6}>
            <Box>
              <label>Question 1:</label>
              <Input type="text" />
            </Box>
            <Box>
              <label>Answer 1:</label>
              <Input type="text" />
            </Box>
            <Box>
              <label>Question 2:</label>
              <Input type="text" />
            </Box>
            <Box>
              <label>Answer 2:</label>
              <Input type="text" />
            </Box>
            <Box>
              <label>Question 3:</label>
              <Input type="text" />
            </Box>
            <Box>
              <label>Answer 3:</label>
              <Input type="text" />
            </Box>
          </Grid>
          <hr />
          <Grid mt="6" templateColumns={['repeat(1, 2fr)', 'repeat(2, 1fr)']} gap={6}>
            <Box>
              <label>New secret password-code:</label>
              <Input type="text" />
              <Link color="#44C768">Show password</Link>
            </Box>
            <Box>
              <label>Repeat secret password-code:</label>
              <Input type="password" />
            </Box>
          </Grid>
        </Flex>

        <Button
          my="8"
          width={['50%', '25%']}
          bgColor="#44C768"
          color="#fff"
          py={[6]}
          fontSize="1.1em"
          fontWeight="600"
          _hover={{ bgColor: '#4eed7a' }}
        >
          Save
        </Button>
        <Text fontSize="0.9em" opacity="0.5">
          Secret password-code is an additional tool to protect your assets. This secret password-code will be requested
          for withdrawals and transfers of funds from your account, as well as for some other operations on the
          platform. We strongly advise you not to use simple passwords (e.g.: 1234, 0000, date or year of birth
          specified in your profile) as they are easy to find. Use complex passwords, keep them out of reach of others
          and for easy recovery in case of loss. It can take up to 10 calendar days to recover a secret password-code
          through platform support. In this case the example platform will ask you for full verification.
        </Text>
      </Flex>
     */}
    </Flex>
  );



  function QRCode(){
    return (
        <>
        {showQR && <div dangerouslySetInnerHTML={{ __html: `${twoFactorQR}` }} />}
        </>
    );
}

function RecoveryCodes() {
    return <>
              { twoFactorRecovery.map(el=>{ return <li>{el}</li>}) }
          </>
  }


};

export default Security;
