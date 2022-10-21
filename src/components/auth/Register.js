import React, { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Text,
  Image,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Link,
  Select,
  Checkbox,
} from '@chakra-ui/react';
import { Link as Reactlink, Redirect } from 'react-router-dom';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import RegImage from '../../assets/svg/auth-bg.svg';


import { http, btnProcessing } from '../../funcs';
import toastr from 'toastr';
import $ from 'jquery';

const Register = ({ forced }) => {
  const [accountCreated, setAccountCreated] = useState('');
  const [show, setShow] = useState(false);
  const [pshow, setPshow] = useState(false);
  const handleClick = (e) => { 
    if(e == 'password'){

      if('password' == $('#password').attr('type')){
        $('#password').prop('type', 'text');
        $('.popen').toggle();
        $('.pclose').toggle();
      }else{
            $('#password').prop('type', 'password');
        $('.popen').toggle();
        $('.pclose').toggle();
      }

    } else {
      if('password' == $('#confirm_password').attr('type')){
        $('#confirm_password').prop('type', 'text');
        $('.copen').toggle();
        $('.cclose').toggle();
      }else{
            $('#confirm_password').prop('type', 'password');
            $('.copen').toggle();
            $('.cclose').toggle();
      }
    }

  };

  const RegForm = () => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ref, setRef] = useState('');
    const [iAgree, setIAgree] = useState(false); // Checkbox Boolean
    const [usernameError, setUsernameError] = useState(false);
    const thePath = window.location.pathname;

    useEffect(() => {
      const re = /^[a-zA-Z0-9]*$/;
      const getLast = thePath.substring(thePath.lastIndexOf('/') + 1);

      if (getLast === 'register') {
        setRef('admin');
      } else {
        setRef(getLast);
        $('.ref-div').show('fast');
      }

      // Hide Email
      $('.no-valid-email').hide('fast');

      let usernameLower = username.toLowerCase();

      //Check if username is empty or i agree checkbox is false
      if (usernameLower === '' || usernameLower.split().length === 0 || usernameLower.length === 0 || !iAgree) {
        $('#register').attr('disabled', true);
      } else {
        if (re.test(usernameLower)) {
          http.get(`username-check/${usernameLower}`).then((response) => {
            if (response.data === 1) {
              setUsernameError('Username is taken');
              $('#register').attr('disabled', true);
            } else {
              setUsernameError('');
              $('#register').attr('disabled', false);
              console.log($('#register').attr('disabled'));
            }
          });
        } else {
          setUsernameError('Username can only contain letters and numbers');
          $('#register').attr('disabled', true);
        }
      }

      if (password.length > 0 && password.length < 8) {
        $('.no-minimum').show('fast');
        // console.log('password is less than 8 characters');
      } else {
        $('.no-minimum').hide('fast');
      }

      if (confirmPassword.length > 0 && password !== confirmPassword) {
        console.log('passwords do not match');
        $('.no-match').show('fast');
      } else {
        $('.no-match').hide('fast');
      }
  }, [username, iAgree, password, confirmPassword, email, thePath]);

    const RegisterNow = (e) => {
      e.preventDefault();
      const btn = e.target;
      const prev = btn.innerHTML;

      btnProcessing(btn, () => {
        http.get('/sanctum/csrf-cookie').then((response) => {
          http
            .post('/register', {
              fname: fName,
              lname: lName,
              email: email,
              country: country,
              username: username.toLowerCase(),
              mobile: mobile,
              email: email,
              password: password,
              password_confirmation: confirmPassword,
              referrer: ref,
            })
            .then((response) => {
              console.log(typeof response.status);
              if (response.status == 201) {
                window.location.replace("dashboard");
                // setAccountCreated('Created');
              }

              btn.removeAttribute('disabled');
              btn.innerHTML = prev;
            })
            .catch((error) => {
              const theErrors = error.response.data.errors;
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

              if (theErrors.hasOwnProperty('email')) {
                toastr.error(theErrors.email);
                $('.no-valid-email').show('fast');
              } else {
                toastr.error('Make sure all fields are filled correctly');
              }

              btn.removeAttribute('disabled');
              btn.innerHTML = prev;
            });
        });
      });
    };

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
              <img src="/images/logo-light.png" alt="logo" />
            </Reactlink>
        </Box>
        <Image src={RegImage} flex='2' padding="100px" />
        <Heading as="h6" fontSize="1.2em" px="20px">LET'S GET STARTED.</Heading>


      </Flex>
      {/* form section */}

          <Flex direction={['column']} px="10" py="6" h="60vh" flex="1">

                  <Flex
                    direction={['column']}
                    justify="center"
                    alignItems="center"
                    width={['85%', '75%', '75%', '45%']}
                    margin="auto"
                    pt="10%"
                  >
                    <Heading fontSize="1.5em" opacity="0.9">
                      Register
                    </Heading>
                    <Text my="4" opacity="0.7">
                      Create an Account
                    </Text>
                    <div className="ref-div" style={{ display: 'none' }}>
                      You followed <strong>{ref}'s</strong> referral link.
                    </div>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="First Name"
                        id="fname"
                        onChange={(e) => setFName(e.target.value)}
                        fontSize="13px"
                      />
                    </FormControl>
                    <FormControl my="6">
                      <Input type="text" placeholder="Last Name" id="lname" onChange={(e) => setLName(e.target.value)} fontSize="13px" />
                    </FormControl>
                    <FormControl>
                      {usernameError && <div style={{ color: '#f00' }}>{usernameError}</div>}
                      <Input type="text" placeholder="Username" id="username" onChange={(e) => setUsername(e.target.value)} fontSize="13px" />
                    </FormControl>

                    <FormControl my="6">
                      <div className="no-valid-email" style={{ color: '#f00', display: 'none' }}>
                        <small>This Email has already been taken</small>
                      </div>
                      <Input type="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} fontSize="13px" />
                    </FormControl>
                    <FormControl>
                      <Select value={country} onChange={(e) => setCountry(e.target.value)} mb="20px" id="country" fontSize="13px">
                              <option value="">Select Country</option>
                              <option value="Afganistan">Afghanistan</option>
                              <option value="Albania">Albania</option>
                              <option value="Algeria">Algeria</option>
                              <option value="American Samoa">American Samoa</option>
                              <option value="Andorra">Andorra</option>
                              <option value="Angola">Angola</option>
                              <option value="Anguilla">Anguilla</option>
                              <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                              <option value="Argentina">Argentina</option>
                              <option value="Armenia">Armenia</option>
                              <option value="Aruba">Aruba</option>
                              <option value="Australia">Australia</option>
                              <option value="Austria">Austria</option>
                              <option value="Azerbaijan">Azerbaijan</option>
                              <option value="Bahamas">Bahamas</option>
                              <option value="Bahrain">Bahrain</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Barbados">Barbados</option>
                              <option value="Belarus">Belarus</option>
                              <option value="Belgium">Belgium</option>
                              <option value="Belize">Belize</option>
                              <option value="Benin">Benin</option>
                              <option value="Bermuda">Bermuda</option>
                              <option value="Bhutan">Bhutan</option>
                              <option value="Bolivia">Bolivia</option>
                              <option value="Bonaire">Bonaire</option>
                              <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                              <option value="Botswana">Botswana</option>
                              <option value="Brazil">Brazil</option>
                              <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                              <option value="Brunei">Brunei</option>
                              <option value="Bulgaria">Bulgaria</option>
                              <option value="Burkina Faso">Burkina Faso</option>
                              <option value="Burundi">Burundi</option>
                              <option value="Cambodia">Cambodia</option>
                              <option value="Cameroon">Cameroon</option>
                              <option value="Canada">Canada</option>
                              <option value="Canary Islands">Canary Islands</option>
                              <option value="Cape Verde">Cape Verde</option>
                              <option value="Cayman Islands">Cayman Islands</option>
                              <option value="Central African Republic">Central African Republic</option>
                              <option value="Chad">Chad</option>
                              <option value="Channel Islands">Channel Islands</option>
                              <option value="Chile">Chile</option>
                              <option value="China">China</option>
                              <option value="Christmas Island">Christmas Island</option>
                              <option value="Cocos Island">Cocos Island</option>
                              <option value="Colombia">Colombia</option>
                              <option value="Comoros">Comoros</option>
                              <option value="Congo">Congo</option>
                              <option value="Cook Islands">Cook Islands</option>
                              <option value="Costa Rica">Costa Rica</option>
                              <option value="Cote DIvoire">Cote DIvoire</option>
                              <option value="Croatia">Croatia</option>
                              <option value="Cuba">Cuba</option>
                              <option value="Curaco">Curacao</option>
                              <option value="Cyprus">Cyprus</option>
                              <option value="Czech Republic">Czech Republic</option>
                              <option value="Denmark">Denmark</option>
                              <option value="Djibouti">Djibouti</option>
                              <option value="Dominica">Dominica</option>
                              <option value="Dominican Republic">Dominican Republic</option>
                              <option value="East Timor">East Timor</option>
                              <option value="Ecuador">Ecuador</option>
                              <option value="Egypt">Egypt</option>
                              <option value="El Salvador">El Salvador</option>
                              <option value="Equatorial Guinea">Equatorial Guinea</option>
                              <option value="Eritrea">Eritrea</option>
                              <option value="Estonia">Estonia</option>
                              <option value="Ethiopia">Ethiopia</option>
                              <option value="Falkland Islands">Falkland Islands</option>
                              <option value="Faroe Islands">Faroe Islands</option>
                              <option value="Fiji">Fiji</option>
                              <option value="Finland">Finland</option>
                              <option value="France">France</option>
                              <option value="French Guiana">French Guiana</option>
                              <option value="French Polynesia">French Polynesia</option>
                              <option value="French Southern Ter">French Southern Ter</option>
                              <option value="Gabon">Gabon</option>
                              <option value="Gambia">Gambia</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Germany">Germany</option>
                              <option value="Ghana">Ghana</option>
                              <option value="Gibraltar">Gibraltar</option>
                              <option value="Great Britain">Great Britain</option>
                              <option value="Greece">Greece</option>
                              <option value="Greenland">Greenland</option>
                              <option value="Grenada">Grenada</option>
                              <option value="Guadeloupe">Guadeloupe</option>
                              <option value="Guam">Guam</option>
                              <option value="Guatemala">Guatemala</option>
                              <option value="Guinea">Guinea</option>
                              <option value="Guyana">Guyana</option>
                              <option value="Haiti">Haiti</option>
                              <option value="Hawaii">Hawaii</option>
                              <option value="Honduras">Honduras</option>
                              <option value="Hong Kong">Hong Kong</option>
                              <option value="Hungary">Hungary</option>
                              <option value="Iceland">Iceland</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="India">India</option>
                              <option value="Iran">Iran</option>
                              <option value="Iraq">Iraq</option>
                              <option value="Ireland">Ireland</option>
                              <option value="Isle of Man">Isle of Man</option>
                              <option value="Israel">Israel</option>
                              <option value="Italy">Italy</option>
                              <option value="Jamaica">Jamaica</option>
                              <option value="Japan">Japan</option>
                              <option value="Jordan">Jordan</option>
                              <option value="Kazakhstan">Kazakhstan</option>
                              <option value="Kenya">Kenya</option>
                              <option value="Kiribati">Kiribati</option>
                              <option value="Korea North">Korea North</option>
                              <option value="Korea Sout">Korea South</option>
                              <option value="Kuwait">Kuwait</option>
                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                              <option value="Laos">Laos</option>
                              <option value="Latvia">Latvia</option>
                              <option value="Lebanon">Lebanon</option>
                              <option value="Lesotho">Lesotho</option>
                              <option value="Liberia">Liberia</option>
                              <option value="Libya">Libya</option>
                              <option value="Liechtenstein">Liechtenstein</option>
                              <option value="Lithuania">Lithuania</option>
                              <option value="Luxembourg">Luxembourg</option>
                              <option value="Macau">Macau</option>
                              <option value="Macedonia">Macedonia</option>
                              <option value="Madagascar">Madagascar</option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Malawi">Malawi</option>
                              <option value="Maldives">Maldives</option>
                              <option value="Mali">Mali</option>
                              <option value="Malta">Malta</option>
                              <option value="Marshall Islands">Marshall Islands</option>
                              <option value="Martinique">Martinique</option>
                              <option value="Mauritania">Mauritania</option>
                              <option value="Mauritius">Mauritius</option>
                              <option value="Mayotte">Mayotte</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Midway Islands">Midway Islands</option>
                              <option value="Moldova">Moldova</option>
                              <option value="Monaco">Monaco</option>
                              <option value="Mongolia">Mongolia</option>
                              <option value="Montserrat">Montserrat</option>
                              <option value="Morocco">Morocco</option>
                              <option value="Mozambique">Mozambique</option>
                              <option value="Myanmar">Myanmar</option>
                              <option value="Nambia">Nambia</option>
                              <option value="Nauru">Nauru</option>
                              <option value="Nepal">Nepal</option>
                              <option value="Netherland Antilles">Netherland Antilles</option>
                              <option value="Netherlands">Netherlands (Holland, Europe)</option>
                              <option value="Nevis">Nevis</option>
                              <option value="New Caledonia">New Caledonia</option>
                              <option value="New Zealand">New Zealand</option>
                              <option value="Nicaragua">Nicaragua</option>
                              <option value="Niger">Niger</option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="Niue">Niue</option>
                              <option value="Norfolk Island">Norfolk Island</option>
                              <option value="Norway">Norway</option>
                              <option value="Oman">Oman</option>
                              <option value="Pakistan">Pakistan</option>
                              <option value="Palau Island">Palau Island</option>
                              <option value="Palestine">Palestine</option>
                              <option value="Panama">Panama</option>
                              <option value="Papua New Guinea">Papua New Guinea</option>
                              <option value="Paraguay">Paraguay</option>
                              <option value="Peru">Peru</option>
                              <option value="Phillipines">Philippines</option>
                              <option value="Pitcairn Island">Pitcairn Island</option>
                              <option value="Poland">Poland</option>
                              <option value="Portugal">Portugal</option>
                              <option value="Puerto Rico">Puerto Rico</option>
                              <option value="Qatar">Qatar</option>
                              <option value="Republic of Montenegro">Republic of Montenegro</option>
                              <option value="Republic of Serbia">Republic of Serbia</option>
                              <option value="Reunion">Reunion</option>
                              <option value="Romania">Romania</option>
                              <option value="Russia">Russia</option>
                              <option value="Rwanda">Rwanda</option>
                              <option value="St Barthelemy">St Barthelemy</option>
                              <option value="St Eustatius">St Eustatius</option>
                              <option value="St Helena">St Helena</option>
                              <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                              <option value="St Lucia">St Lucia</option>
                              <option value="St Maarten">St Maarten</option>
                              <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                              <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                              <option value="Saipan">Saipan</option>
                              <option value="Samoa">Samoa</option>
                              <option value="Samoa American">Samoa American</option>
                              <option value="San Marino">San Marino</option>
                              <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                              <option value="Saudi Arabia">Saudi Arabia</option>
                              <option value="Senegal">Senegal</option>
                              <option value="Seychelles">Seychelles</option>
                              <option value="Sierra Leone">Sierra Leone</option>
                              <option value="Singapore">Singapore</option>
                              <option value="Slovakia">Slovakia</option>
                              <option value="Slovenia">Slovenia</option>
                              <option value="Solomon Islands">Solomon Islands</option>
                              <option value="Somalia">Somalia</option>
                              <option value="South Africa">South Africa</option>
                              <option value="Spain">Spain</option>
                              <option value="Sri Lanka">Sri Lanka</option>
                              <option value="Sudan">Sudan</option>
                              <option value="Suriname">Suriname</option>
                              <option value="Swaziland">Swaziland</option>
                              <option value="Sweden">Sweden</option>
                              <option value="Switzerland">Switzerland</option>
                              <option value="Syria">Syria</option>
                              <option value="Tahiti">Tahiti</option>
                              <option value="Taiwan">Taiwan</option>
                              <option value="Tajikistan">Tajikistan</option>
                              <option value="Tanzania">Tanzania</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Togo">Togo</option>
                              <option value="Tokelau">Tokelau</option>
                              <option value="Tonga">Tonga</option>
                              <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                              <option value="Tunisia">Tunisia</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Turkmenistan">Turkmenistan</option>
                              <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                              <option value="Tuvalu">Tuvalu</option>
                              <option value="Uganda">Uganda</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="United Arab Erimates">United Arab Emirates</option>
                              <option value="United States of America">United States of America</option>
                              <option value="Uraguay">Uruguay</option>
                              <option value="Uzbekistan">Uzbekistan</option>
                              <option value="Vanuatu">Vanuatu</option>
                              <option value="Vatican City State">Vatican City State</option>
                              <option value="Venezuela">Venezuela</option>
                              <option value="Vietnam">Vietnam</option>
                              <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                              <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                              <option value="Wake Island">Wake Island</option>
                              <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                              <option value="Yemen">Yemen</option>
                              <option value="Zaire">Zaire</option>
                              <option value="Zambia">Zambia</option>
                              <option value="Zimbabwe">Zimbabwe</option>
                      </Select>
                    </FormControl>
                    <FormControl my="6">
                      <Input type="text" placeholder="Mobile Number" id="mobile" onChange={(e) => setMobile(e.target.value)} fontSize="13px" />
                    </FormControl>
                    <FormControl>
                      <div className="no-minimum" style={{ color: '#f00', display: 'none' }}>
                        <small>Passwords should be a minimum of 8 characters</small>
                      </div>
                      <InputGroup size="md">
                        <Input
                          pr="4.5rem"
                          type={show ? 'text' : 'password'}
                          placeholder="Enter Password"
                          id="password"
                          onChange={(e) => setPassword(e.target.value)}
                          fontSize="13px"
                        />
                        <InputRightElement width="4.5rem" onClick={e=>handleClick('password')}>
                          <AiOutlineEye className='popen' /> <AiOutlineEyeInvisible className='pclose' style={{ display: "none" }} />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl my="6">
                      <div className="no-match" style={{ color: '#f00', display: 'none' }}>
                        <small>Passwords do not match</small>
                      </div>
                      <InputGroup size="md">
                        <Input
                          pr="4.5rem"
                          type={show ? 'text' : 'password'}
                          placeholder="Confirm password"
                          id="confirm_password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          fontSize="13px"
                        />
                        <InputRightElement width="4.5rem" onClick={e=>handleClick('confirm')}>
                          <AiOutlineEye className='copen' /> <AiOutlineEyeInvisible className='cclose' style={{ display: "none" }} />
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Checkbox mb="6" id="checkbox" onChange={(e) => setIAgree(e.target.checked)}>
                      I agree to the{' '}
                      <a href={`${process.env.REACT_APP_WEB_HOME}/privacy`}>
                        <small style={{ color:"#44C768" }}>Privacy Policy</small>
                      </a>
                      <> &amp; </>
                      <a href={`${process.env.REACT_APP_WEB_HOME}/resources/dictionary`}>
                        <small style={{ color:"#44C768" }}>Terms.</small>
                      </a>
                    </Checkbox>
                    <Button
                      id="register"
                      onClick={RegisterNow}
                      bgColor="#44C768"
                      _hover={{ bgColor: '#4eed7a' }}
                      color="#fff"
                      borderRadius="60px"
                      py={[6]}
                      fontSize="13px"
                      fontWeight="700"
                      w="100%"
                    >
                      Signup
                    </Button>
                    <Text textAlign="center" mt="6">
                      Already have an account?{' '}
                      <Link as={Reactlink} to="/login" fontWeight="bold" color="#44C768">
                        Sign in instead
                      </Link>
                    </Text>
                    </Flex>






              </Flex>
      </Flex>
    );
  };

  const RegisteredSuccess = () => {
    <Redirect to={'/' + process.env.REACT_APP_USE_DASHBOARD}/>
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
      {/* <Box fontSize="1.5em" color="#44C768" fontWeight="400" mb={['6']}>
        <Link to="/" className="logo-link">
          <img src="./images/logo-light.png" alt="logo" />
        </Link>
      </Box> */}
      {accountCreated === 'Created' ? <RegisteredSuccess /> : <RegForm />}
     
      {/* <RegisteredSuccess />
      <RegForm /> */}
    </Flex>
  );
};

export default Register;
