import {
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { BiShieldX } from 'react-icons/bi';
import { http } from '../../funcs';
import React from 'react';
import { withRouter } from "react-router";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

function UserTable({ items, title, forced, history, view }) {


  const userActivate = (e, activate, id) => {
    e.preventDefault();

    if (activate) {
      http
        .post('/api/admin/activate-user', { id: id })
        .then((r) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Activate User</p>,
            html: `<p>${r.value}</p>`,
            icon: 'success',
          });
          forced();
        })
        .catch((err) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Activate User</p>,
            html: `<p>${err}</p>`,
            icon: 'error',
          });
        });
    } else {
      http
        .post('/api/admin/deactivate-user', { id: id })
        .then((r) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Deactivate User</p>,
            html: `<p>${r.data}</p>`,
            icon: 'success',
          });
          forced();
        })
        .catch((err) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Deactivate User</p>,
            html: `<p>${err}</p>`,
            icon: 'error',
          });
        });
    }
  };
  const paidActivate = (e, activate, id) => {
    e.preventDefault();

    if (activate) {
      http
        .post('/api/admin/paid/activate', { id: id })
        .then((r) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Paid Activate</p>,
            html: `<p>${r.data}</p>`,
            icon: 'success',
          });
          forced();
        })
        .catch((err) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Paid Activate</p>,
            html: `<p>${err}</p>`,
            icon: 'error',
          });
        });
    } else {
      http
        .post('/api/admin/paid/deactivate', { id: id })
        .then((r) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Paid Deactivate</p>,
            html: `<p>${r.data}</p>`,
            icon: 'success',
          });
          forced();
        })
        .catch((err) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Paid Deactivate</p>,
            html: `<p>${err}</p>`,
            icon: 'error',
          });
        });
    }
  };
  const banActivate = (e, activate, id) => {
    e.preventDefault();

    if (activate) {
      http
        .post('/api/admin/ban', { id: id })
        .then((r) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Ban User</p>,
            html: `<p>${r.data}</p>`,
            icon: 'success',
          });
          forced();
        })
        .catch((err) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Unban User</p>,
            html: `<p>${err}</p>`,
            icon: 'error',
          });
        });
    } else {
      http
        .post('/api/admin/unban', { id: id })
        .then((r) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Ban User</p>,
            html: `<p>${r.data}</p>`,
            icon: 'success',
          });
          forced();
        })
        .catch((err) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>Unban User</p>,
            html: `<p>${err}</p>`,
            icon: 'error',
          });
        });
    }
  };
  const twoFAActivate = (e, activate, id) => {
    e.preventDefault();

    if (activate) {
      http
        .post('/api/admin/twofa', { id: id })
        .then((r) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>2FA Unlocked for User</p>,
            html: `<p>${r.data}</p>`,
            icon: 'success',
          });
          forced();
        })
        .catch((err) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>2FA Error</p>,
            html: `<p>${err}</p>`,
            icon: 'error',
          });
        });
    }
  };
  const sendEmail = (e, username) => {
    e.preventDefault();
    history.push({
      pathname: '/admin/send-single-email',
      state: { username: username },
    });
  };

  return (
    <>
      <Heading display={['none', 'block']} float="left" fontSize="1.5em" my="8">
        {title}
      </Heading>
      <Box>
        <Text display={['block', 'none']} fontSize="1.5em">
          Switch to desktop to view
        </Text>
      </Box>
      <Table size="sm" display={['none', 'table']}>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Username </Th>
            <Th>Email</Th>
            <Th>Country</Th>
            <Th>Last Login</Th>
            <Th>Ban</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.length === 0 && <Heading fontSize="12">No User Yet</Heading>}
          {items.map((value, index) => {
            return (
              <Tr key={index}>
                <Td>
                  <Flex>
                    <Box
                      mr="4"
                      w="35px"
                      h="35px"
                      borderRadius="50%"
                      pt="2"
                      pl="0.4em"
                      bgColor="#DCFFD6"
                      textAlign="center"
                    >
                      {value.fname[0]}
                      {value.lname[0]}
                    </Box>
                    <Text>{value.name}</Text>
                  </Flex>
                </Td>
                <Td>
                  <Text>{value.username}</Text>
                </Td>
                <Td>{value.email}</Td>
                <Td>{value.country}</Td>
                <Td>
                  <Text>{value.last_seen}</Text>
                </Td>
                <Td>
                  <Text fontWeight="bold" color={value.banned === 1 ? 'red' : 'green'}>
                    {value.banned === 1 ? 'Banned' : 'Free'}
                  </Text>
                </Td>
                <Td>
                  <Text fontWeight="bold" color={value.ver_status === 0 ? 'red' : 'green'}>
                    {value.ver_status === 0 ? 'Inactive' : 'Active'}
                  </Text>
                </Td>
                <Td align="left">
                  <Menu>
                    <MenuButton color="red" fontSize="1.5em" fontWeight="900">
                      ...
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={(e) => view(e, value.id)}>
                        <BiShieldX />
                        View details
                      </MenuItem>
                      <MenuItem onClick={(e) => userActivate(e, true, value.id)}>
                        <BiShieldX />
                        Activate
                      </MenuItem>
                      <MenuItem onClick={(e) => userActivate(e, false, value.id)}>
                        <BiShieldX />
                        Deactivate
                      </MenuItem>
                      <MenuItem onClick={(e) => paidActivate(e, true, value.id)}>
                        <BiShieldX />
                        Active paid
                      </MenuItem>
                      <MenuItem onClick={(e) => paidActivate(e, false, value.id)}>
                        <BiShieldX />
                        Deactivate paid
                      </MenuItem>
                      <MenuItem onClick={(e) => banActivate(e, true, value.id)}>
                        <BiShieldX />
                        Ban
                      </MenuItem>
                      <MenuItem onClick={(e) => banActivate(e, false, value.id)}>
                        <BiShieldX />
                        Unban
                      </MenuItem>
                      <MenuItem onClick={(e) => twoFAActivate(e, true, value.id)}>
                        <BiShieldX />
                        Unlock 2fa
                      </MenuItem>
                      <MenuItem onClick={(e) => sendEmail(e, value.username)}>
                        <BiShieldX />
                        Email
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

export default withRouter(UserTable);
