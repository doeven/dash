import React, { useEffect, useState } from 'react';
import { Flex, Heading, Text, Box, Input, Select, Textarea, Button, InputGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { http, btnProcessing, uploadPhotoData } from '../../funcs';
import { Link as Reactlink } from 'react-router-dom';
import $ from 'jquery';
import { RiFileCopyLine, RiUserFill } from 'react-icons/ri';



import { FaRegUserCircle, FaCamera } from 'react-icons/fa';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

const Profile = ({ user, forced, props, settings }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [BTC, setBTC] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');

  const [bank, setBank] = useState('');
  const [accName, setAccName] = useState('');
  const [accNum, setAccNum] = useState('');

  useEffect(() => {
    if (user) {
      setFName(user.fname);
      setLName(user.lname);
      setMobile(user.mobile);
      setDob(user.dob);
      setBTC(user.btc_address);
      setStreet(user.street);
      setCity(user.city);
      setState(user.state);
      setPostCode(user.post_code);
      setCountry(user.country);
    }
  }, [user]);

  useEffect(() => {
    if (user.bank) {
      setBank(user.bank.bank);
      setAccName(user.bank.acc_name);
      setAccNum(user.bank.acc_num);
    }
  }, [user.bank]);

  const submitAddressChange = (e) => {
    e.preventDefault();

    let data = {
      street: street,
      city: city,
      state: state,
      post_code: postCode,
      country: country,
    };
    const elem = e.target;
    const prev = elem.innerHTML;
    btnProcessing(elem, () => {
      http
        .patch('/api/user/update/profile', data)
        .then(({ data }) => {
          console.log(data);
          // Sweet Alert
          mySwal.fire({
            title: <p>Address Info Update</p>,
            html: `<p>${data.result}</p>`,
            icon: 'success',
          });

          elem.removeAttribute('disabled');
          elem.innerHTML = prev;
        })
        .catch((e) => {
          console.log(e);
          elem.removeAttribute('disabled');
          elem.innerHTML = prev;
        });
    });
  };

  const submitBankChange = (e) => {
    e.preventDefault();

    let data = {
      bank: bank,
      acc_name: accName,
      acc_num: accNum,
    };
    const elem = e.target;
    const prev = elem.innerHTML;
    btnProcessing(elem, () => {
      http
        .patch('/api/user/bank', data)
        .then(({ data }) => {
          console.log(data);
          // Sweet Alert
          mySwal.fire({
            title: <p>Bank Info Update</p>,
            html: `<p>${data}</p>`,
            icon: 'success',
          });

          elem.removeAttribute('disabled');
          elem.innerHTML = prev;
        })
        .catch((e) => {
          console.log(e);
          elem.removeAttribute('disabled');
          elem.innerHTML = prev;
        });
    });
  };

  const submitProfileChange = (e) => {
    e.preventDefault();

    let data = {
      fname: fname,
      lname: lname,
      mobile: mobile,
      dob: dob,
      btc_address: BTC,
    };
    const elem = e.target;
    const prev = elem.innerHTML;

    btnProcessing(elem, () => {
      http
        .patch('/api/user/update/profile', data)
        .then(({ data }) => {
          console.log(data);
          // Sweet Alert
          mySwal.fire({
            title: <p>Profile Update</p>,
            html: `<p>${data.result}</p>`,
            icon: 'success',
          });
          forced();
          elem.removeAttribute('disabled');
          elem.innerHTML = prev;
        })
        .catch((e) => {
          console.log(e);
          elem.removeAttribute('disabled');
          elem.innerHTML = prev;
        });
    });
  };


  const uploadPhoto = (e) => {
    e.preventDefault();
    const prev = e.target.innerHTML;
    const elem = e.target;
    
    let fd = new FormData(e.target);

  //   for (var value of fd.entries()) {
  //     console.log(value[0]+ ', '+ value[1]);
  //  }

  //  return;
    
    console.log(e.target);

    btnProcessing(elem, async () => {
      const dataBack = await uploadPhotoData(fd);
      if (dataBack.error) {
        console.log(dataBack.error);
        // Sweet Alert
        mySwal.fire({
          title: <p>Error</p>,
          html: `<p>Make sure you select an image file, and image must be not more than 2MB in any of (jpeg,png,jpg) format</p>`,
          footer: 'An error occured',
          icon: 'error',
        });
        onClose();
      } else {
        // Sweet Alert
        mySwal.fire({
          title: <p>Profie Photo Uploaded</p>,
          html: `${dataBack}</br>`,
          footer: `<p>Uploaded Successfully.</p>`,
          icon: 'success',
        });
        $('#profile-form')[0].reset();
        onClose();
        window.location.reload();
      }

      elem.removeAttribute('disabled');
      elem.innerHTML = prev;
    });

    forced();
  };
  return (
    <>
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="0" pb="10">
      
      <Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
        Personal Information
      </Heading>

      <Flex border="1px solid #e7e7e7" bgColor="#fff" direction="column" p={['4', '8']}>
        <Text mb="6" mt="0" fontSize="1.2em" fontWeight="600" textAlign={["center", "center", "left", "left"]}>
          Profile data
        </Text>
        <Flex direction={['column', 'row']}>
          <Box mr="6" margin={["0 auto", "0", "0", "0" ]}>
            {user && user.profile_photo_path ? (
              <img src={process.env.REACT_APP_API_URL + process.env.REACT_APP_USE_PHOTO  +  user.profile_photo_path } alt={user.username} style={{ height: "100px", width: "100px", borderRadius: "50%", objectFit: "cover"}} />
            ) : (
              <RiUserFill color="#44C768" fontSize="7em" ml={["0", "15px", "0", "0"  ]}/>
            )}

            <Text fontSize="11px" display="flex" width="120px" fontWeight="bold" color="#006600" pr="5px" onClick={(e)=>{e.preventDefault(); onOpen();}} cursor="pointer"><FaCamera color="#fece00" fontSize="2em" style={{ paddingRight: "5px", marginTop: "-5px" }} /> Change Photo</Text>
          </Box>
          
          <Flex direction="column">
            <Text my="6" fontSize="1.2em" fontWeight="600">
              Basic Information:
            </Text>
            <Box mb="5">
              <label>First Name:</label>
              <Input type="text" defaultValue={fname} onChange={(e) => setFName(e.target.value)} mb="20px"/>
              <label>Last Name:</label>
              <Input type="text" defaultValue={lname} onChange={(e) => setLName(e.target.value)} mb="20px" />
              <label>Date of Birth:</label>
              <Input type="date" defaultValue={dob} onChange={(e) => setDob(e.target.value)} mb="20px" />
              <label>Email:</label>
              <Input type="text" defaultValue={user.email} readOnly mb="20px" />
              <label>Phone Number:</label>
              <Input type="tel" mb="20px" />
              <label>BTC Address:</label>
              <Input type="address" defaultValue={BTC} onChange={(e) => setBTC(e.target.value)} mb="20px" />
              <Button
                my="6"
                // width="30%"
                bgColor="#44C768"
                color="#fff"
                py={[6]}
                fontSize="1.1em"
                fontWeight="600"
                _hover={{ bgColor: '#4eed7a' }}
                onClick={submitProfileChange}
              >
                Update Profile
              </Button>
            </Box>
 


            {/* <Text opacity="0.5">Accepted file formats: png and jpg, the maximum file size is 1 Mb</Text> */}
          </Flex>
        </Flex>
      </Flex>
      <br/>
      {/* 
      
      <Flex border="1px solid #e7e7e7" bgColor="#fff" direction="column" p={['4', '8']}>
        <Flex direction={['column', 'row']}>
         
          <Flex direction="column">

            <Text my="6" fontSize="1.2em" fontWeight="600">
              Bank:
            </Text>

            <Flex direction="column">
              <Box>
                <label>Bank Name:</label>
                <Input type="text" defaultValue={bank} onChange={(e) => setBank(e.target.value)} />
                <label>Account Name:</label>
                <Input type="text" defaultValue={accName} onChange={(e) => setAccName(e.target.value)} />
                <label>Account Number:</label>
                <Input type="text" defaultValue={accNum} onChange={(e) => setAccNum(e.target.value)} />
              </Box>
              <Button
                my="6"
                width="30%"
                bgColor="#44C768"
                color="#fff"
                py={[6]}
                fontSize="1.1em"
                fontWeight="600"
                _hover={{ bgColor: '#4eed7a' }}
                onClick={submitBankChange}
              >
                Update Bank
              </Button>
            </Flex>

            
          </Flex>
        </Flex>
      </Flex>
      <br/>
      
      
      */}


      

      
      <Flex border="1px solid #e7e7e7" bgColor="#fff" direction="column" p={['4', '8']}>
        <Flex direction={['column', 'row']}>
          
          <Flex direction="column" pl={["0px", "120px", "120px", "120px"]}>
            <Text my="6" fontSize="1.2em" fontWeight="600">
              Address:
            </Text>
            <Flex direction="column">
              <Box>
                <label>Street:</label>
                <Input type="text" defaultValue={street} onChange={(e) => setStreet(e.target.value)} mb="20px" />
                <label>City:</label>
                <Input type="text" defaultValue={city} onChange={(e) => setCity(e.target.value)} mb="20px" />
                <label>Postal:</label>
                <Input type="text" defaultValue={postCode} onChange={(e) => setPostCode(e.target.value)} mb="20px" />
                <label>State:</label>
                <Input type="text" defaultValue={state} onChange={(e) => setState(e.target.value)} mb="20px" />
                <label>Country:</label>
                <Select value={country} onChange={(e) => setCountry(e.target.value)} mb="20px">
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
                <Button
                  my="6"
                  // width="30%"
                  bgColor="#44C768"
                  color="#fff"
                  py={[6]}
                  fontSize="1.1em"
                  fontWeight="600"
                  _hover={{ bgColor: '#4eed7a' }}
                  onClick={submitAddressChange}
                >
                  Update Address
                </Button>
              </Box>
            </Flex>

            {/* <Text opacity="0.5">Accepted file formats: png and jpg, the maximum file size is 1 Mb</Text> */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>


    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Profile Photo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <form action="#" encType="multipart/form-data" id="profile-form" onSubmit={uploadPhoto}>
            <InputGroup>
              <Text opacity="0.5">Select photo</Text>
            </InputGroup>
            <InputGroup>
              <Input type="file" id="profile" name="profile"></Input>
            </InputGroup>
            <InputGroup>
              <Button my="4" type="submit">
                Upload Photo
              </Button>
            </InputGroup>
            </form>
          </ModalBody>

          <ModalFooter>
            <Text fontSize="12px">Use form to upload profile photo</Text>
          </ModalFooter>
        </ModalContent>
      </Modal>


</>
  );
};

export default Profile;
