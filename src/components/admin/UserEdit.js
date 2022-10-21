import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Heading, Text, Box, Input, Button, InputRightElement, InputGroup, Select } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';
import { http } from '../../funcs';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

const UserEdit = (props) => {
  const [userData, setUserData] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [disabledBasic, setDisabledBasic] = useState(false);
  const [disabledAdd, setDisabledAdd] = useState(false);
  const [disabledRef, setDisabledRef] = useState(false);
  const [newBalance, setNewBalance] = useState(0);
  const [newRef, setNewRef] = useState('');
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleClick = () => setShow(!show);
  const { id } = useParams();

  useEffect(() => {
    http.get(`/api/user/${id}`).then(({ data }) => {
      console.log(data);
      setUserData(data);
      setNewRef(data.referrer_name);
    });
  }, [refresh, id]);

  const updateBasic = () => {
    setDisabledBasic(true);
    const { fname, lname, mobile, dob } = userData;
    const fields = { fname, lname, mobile, dob };
    http.patch(`/api/admin/user/${id}`, fields).then(({ data }) => {
      const isError = data.status === 'error' || data.result.toLowerCase().includes('error');
      setDisabledBasic(false);

      mySwal.fire({
        title: <p>{isError ? 'Update Error' : 'Success'}</p>,
        html: `<p>${data.result}</p>`,
        icon: isError ? 'error' : 'success',
      });

      setRefresh(!refresh);
    });
  };

  const updateAddress = () => {
    setDisabledAdd(true);
    const { street, city, state, post_code, country } = userData;
    const fields = { street, city, state, post_code, country };
    http.patch(`/api/admin/user/${id}`, fields).then(({ data }) => {
      const isError = data.status === 'error' || data.result.toLowerCase().includes('error');
      setDisabledAdd(false);

      mySwal.fire({
        title: <p>{isError ? 'Update Error' : 'Success'}</p>,
        html: `<p>${data.result}</p>`,
        icon: isError ? 'error' : 'success',
      });

      setRefresh(!refresh);
    });
  };

  const updateRoles = () => {
    let { roles } = userData;
    if (roles === 'null') {
      roles = null;
    }
    const fields = { roles };
    http.patch(`/api/admin/user/${id}`, fields).then(({ data }) => {
      const isError = data.status === 'error' || data.result.toLowerCase().includes('error');

      mySwal.fire({
        title: <p>{isError ? 'Update Error' : 'Success'}</p>,
        html: `<p>${data.result}</p>`,
        icon: isError ? 'error' : 'success',
      });

      setRefresh(!refresh);
    });
  };

  const updateRef = () => {
    setDisabledRef(true);
    http.patch(`/api/admin/referrer/${id}`, { ref_username: newRef }).then(({ data }) => {
      const isError = data.status === 'error' || data.result.toLowerCase().includes('error');
      setDisabledRef(false);
      mySwal.fire({
        title: <p>{isError ? 'Update Error' : 'Success'}</p>,
        html: `<p>${data.result}</p>`,
        icon: isError ? 'error' : 'success',
      });

      setRefresh(!refresh);
    });
  };

  const topUpUser = (add) => {
    setDisabled(true);
    let { balance } = userData;
    if (add) {
      balance = +balance + +newBalance;
    } else {
      balance = +balance - +newBalance;
    }

    const fields = { balance };
    http.patch(`/api/admin/user/${id}`, fields).then(({ data }) => {
      const isError = data.status === 'error' || data.result.toLowerCase().includes('error');
    setDisabled(false);
      mySwal.fire({
        title: <p>{isError ? 'TopUp Failed' : 'TopUp Success'}</p>,
        html: `<p>${data.result}</p>`,
        icon: isError ? 'error' : 'success',
      });

      setRefresh(!refresh);
    });
  };

  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="0" pb="10">
      
      <Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
        Username Data
      </Heading>

      <Flex
        direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['4', '8']}
        my="10"
      >
        <Text my="6" fontSize="1.2em" fontWeight="600">
          Personal | Balance: ${userData.balance}
        </Text>

        <Flex direction={['column', 'row']}>
          
          <Box>
            <label>First Name:</label>
            <InputGroup>
              <Input
                type="text"
                placeholder="First Name"
                defaultValue={userData.fname}
                onChange={(e) => setUserData({ ...userData, fname: e.target.value })}
              />
            </InputGroup>
          </Box>
          <Box>
            <label>Last Name:</label>
            <InputGroup>
              <Input
                type="text"
                placeholder="Last Name"
                defaultValue={userData.lname}
                onChange={(e) => setUserData({ ...userData, lname: e.target.value })}
              />
            </InputGroup>
          </Box>
          <Box>
            <label>Phone:</label>
            <InputGroup>
              <Input
                type="text"
                placeholder="Phone"
                defaultValue={userData.mobile}
                onChange={(e) => setUserData({ ...userData, mobile: e.target.value })}
              />
            </InputGroup>
          </Box>

          <Box>
            <label>D.O.B:</label>
            <InputGroup>
              <Input
                type="date"
                placeholder="Date of Birth"
                defaultValue={userData.dob}
                onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
              />
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
          onClick={updateBasic}
          disabled={disabledBasic}
        >
          Update
        </Button>
      </Flex>

      <Flex
        direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['4', '8']}
        my="10"
      >
        <Text my="6" fontSize="1.2em" fontWeight="600">
          Address Information
        </Text>
        <Flex direction={['column']}>
          <Box>
            <label>Street:</label>
            <InputGroup>
              <Input
                type="text"
                placeholder="Street"
                defaultValue={userData.street}
                onChange={(e) => setUserData({ ...userData, street: e.target.value })}
              />
            </InputGroup>
          </Box>
          <Box>
            <label>City:</label>
            <InputGroup>
              <Input
                type="text"
                placeholder="City"
                defaultValue={userData.city}
                onChange={(e) => setUserData({ ...userData, city: e.target.value })}
              />
            </InputGroup>
          </Box>
          <Box>
            <label>State:</label>
            <InputGroup>
              <Input
                type="text"
                placeholder="State"
                defaultValue={userData.state}
                onChange={(e) => setUserData({ ...userData, state: e.target.value })}
              />
            </InputGroup>
          </Box>

          <Box>
            <label>Postal:</label>
            <InputGroup>
              <Input
                type="text"
                placeholder="Postal"
                defaultValue={userData.post_code}
                onChange={(e) => setUserData({ ...userData, post_code: e.target.value })}
              />
            </InputGroup>
          </Box>

          <Box>
            <label>Country:</label>
            <InputGroup>
              <Input
                type="text"
                placeholder="Country"
                defaultValue={userData.country}
                onChange={(e) => setUserData({ ...userData, country: e.target.value })}
              />
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
          onClick={updateAddress}
          disabled={disabledAdd}
        >
          Update Address
        </Button>
      </Flex>

      <Flex
        direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['4', '8']}
        my="10"
      >
        <Text my="6" fontSize="1.2em" fontWeight="600">
          User Role
        </Text>
        <Flex direction={['column', 'row']}>
          <Box>
            <label>Role:</label>
            <InputGroup>
              <Select
                value={userData.roles}
                onChange={(e) => {
                  setUserData({ ...userData, roles: e.target.value });
                }}
              >
                <option value={'null'}>Empty</option>
                <option value="ROLE_ADMIN">Admin Role</option>
                <option value="ROLE_MANAGEMENT">Role Management</option>
                <option value="ROLE_FINANCE">Finance Role</option>
                <option value="ROLE_ACCOUNT_MANAGER">Account Manager Role</option>
                <option value="ROLE_SUPPORT">Support Role</option>
              </Select>
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
          onClick={updateRoles}
        >
          Update Role
        </Button>
      </Flex>

      <Flex
        direction={['column', 'row']}
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['4', '8']}
        my="10"
      >
        <Text my="6" fontSize="1.2em" fontWeight="600">
          Fund Account
        </Text>
        <Flex direction={['column', 'row']}>
          <Box>
            <label>Enter Amount:</label>
            <InputGroup>
              <Input
                type="number"
                placeholder="Enter Amount"
                defaultValue={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
              />
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
          onClick={(e) => topUpUser(true)}
          disabled={disabled}
        >
          Add to Balance
        </Button>

        <Button
          my="8"
          width={['50%', '25%']}
          bgColor="#44C768"
          color="#fff"
          py={[6]}
          fontSize="1.1em"
          fontWeight="600"
          _hover={{ bgColor: '#4eed7a' }}
          onClick={(e) => topUpUser(false)}
          disabled={disabled}
        >
          Sub. from Balance
        </Button>
      </Flex>

      <Flex
        direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['4', '8']}
        my="10"
        display="none"
      >
        <Text my="6" fontSize="1.2em" fontWeight="600">
          Activations
        </Text>
        <Flex direction={['column', 'row']}>
          <Box>
            <label>Current password:</label>
            <InputGroup>
              <Input
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                // defaultValue={currPassword}
                // onChange={(e) => setCurrPassword(e.target.value)}
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
                // defaultValue={password}
                // onChange={(e) => setPassword(e.target.value)}
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
                // defaultValue={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
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
          // onClick={ResetPassword}
        >
          Update Address
        </Button>
      </Flex>

      <Flex
        direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['4', '8']}
        my="10"
      >
        <Text my="6" fontSize="1.2em" fontWeight="600">
          Change Referrer
        </Text>
        <Flex direction={['column', 'row']}>
          <Box>
            <label>Referrer Username:</label>
            <InputGroup>
              <Input
                type="text"
                placeholder="Upline username"
                defaultValue={newRef}
                value={newRef}
                onChange={(e) => setNewRef(e.target.value)}
                disabled={disabledRef}
              />
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
          onClick={updateRef}
        >
          Update Ref.
        </Button>
      </Flex>
    </Flex>
  );
};

export default UserEdit;
