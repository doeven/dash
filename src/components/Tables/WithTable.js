import {
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
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { http, timestampFormatted, transName } from '../../funcs';
import toastr from 'toastr';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

function WithTable({ items, title, forced }) {
  
  const payUser = (e, id, address, amount, reference) => {
    e.target.setAttribute('disabled', true);
    let data = {
      id: id,
      address: address,
      amount: amount,
      reference: reference,
    };

    http.get('/sanctum/csrf-cookie').then((response) => {
      http
        .post(`/api/admin/auto-pay-alfacoin`, data)
        .then((response) => {
          const { data } = response;
          if (data === 'paid') {
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
            toastr.success('Payment Sent');
          } else {
            mySwal.fire({
              title: <p>An Error Occured</p>,
              html: '<p>' + data + '</p>',
              icon: 'error',
            });
            e.target.setAttribute('disabled', false);
            forced();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const withdrawActivate = (e, id, option) => {
    e.preventDefault();

    http.get('/sanctum/csrf-cookie').then((response) => {
      http
        .post(`/api/admin/withdraw-update`, { id: id, option: option })
        .then((response) => {
          const { data } = response;
          mySwal.fire({
            title: <p>Withdraw Alert</p>,
            html: '<p>' + data + '</p>',
            icon: 'success',
          });
          // forced();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <>
      <Heading display={['block', 'block']} float="left" fontSize="1.5em" my="8">
        {title}
      </Heading>
      

      <Table size="sm" display={['table', 'table']} variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Details</Th>
            <Th>Status</Th>
            <Th isNumeric>Amount</Th>
            <Th>Address</Th>
            <Th>Pay</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.length === 0 && <Heading fontSize="12">No Transaction Yet</Heading>}

          {items.map((value, index) => {
            const [date, month, year, time] = timestampFormatted(value.created_at);
             return (<Tr>
               <Td><Box>
                    <Text>{value.user.username}</Text>
                    <Text>{`${date} ${month} ${year}`}</Text>
                  </Box>
                </Td>
               <Td>
                    <Box>
                      <Text textAlign="center" color={value.status == 0 ? '#000' : '#FFF'} bg={value.status == 0 ? 'yellow' : 'green'} p="5px">
                        {value.status == 0 ? 'Pending' : 'Paid'}
                      </Text>
                    </Box>
               </Td>
               <Td isNumeric>${value.amount}</Td>
               <Td>{value.detail}</Td>
               <Td>
                 {
                   (title == 'Unpaid Withdrawals' && value.status == 0) && 
                    <Button 
                      p={['auto', '3px']}
                      fontSize="1.1em"
                      bgColor="#44C768"
                      color="#fff"
                      _hover={{
                        bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
                        color: '#fff',
                      }}
                      className="payUser"
                      onClick={(e) => payUser(e, value.id, value.detail, value.amount, value.wd_id)}
                      >
                      Pay
                    </Button>
                  }
               </Td>
               <Td>
                    <Menu>
                          <MenuButton color="#0afcf8" fontSize="1.5em" fontWeight="900">
                            ...
                          </MenuButton>
                          <MenuList>
                            <MenuItem 
                              onClick={(e) => withdrawActivate(e, value.id, 'pay')}
                              >
                              {/* <BiShieldX /> */}
                              Mark as paid
                            </MenuItem>
                            <MenuItem 
                              onClick={(e) => withdrawActivate(e, value.id, 'unpay')}
                              >
                              {/* <BiShieldX /> */}
                              Mark as unpaid
                            </MenuItem>
                            <MenuItem 
                              onClick={(e) => withdrawActivate(e, value.id, 'delete')}
                              >
                              {/* <BiShieldX /> */}
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
               </Td>
             </Tr>);
          })}


        </Tbody>
      </Table>
    </>
  );
}

export default WithTable;
