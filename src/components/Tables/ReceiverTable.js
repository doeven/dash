import React from 'react';
import { http, timestampFormatted } from '../../funcs';
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
} from '@chakra-ui/react';
import { BiShieldX } from 'react-icons/bi';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

function TransTable({ items, title, view, donorId }) {
  const manualMatch = (donor_id, receiver_id) => {
    let data = {
      receiver_id: receiver_id,
      donor_id: donor_id,
    };

    http
      .post(`api/admin/match/manual`, data)
      .then((response) => {
        mySwal.fire('Manual Match Confirmed!', response.data, 'success');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Heading float="left" fontSize="1.5em" my="8">
        {title}
      </Heading>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th isNumeric>Balance</Th>
            <Th isNumeric>Receiving Total</Th>
            <Th>Phone</Th>
            <Th>Due Date</Th>
            <Th>Last Login</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.length === 0 && <Heading fontSize="12">No Receiver Yet</Heading>}
          {items.map((value, index) => {
            const [lSdate, lSmonth, lSyear, lStime] = timestampFormatted(value.username.last_seen);
            const [dDdate, dDmonth, dDyear, dDtime] = timestampFormatted(value.due);

            return (
              <Tr key={index}>
                <Td>
                  <Box>
                    <Text>
                      {value.user.fname + ' ' + value.user.lname}({value.user.username})
                    </Text>
                  </Box>
                </Td>
                <Td>
                  <Text borderRadius="10px" bgColor="#DCFFD6" p="2" fontWeight="bold">
                    ${value.to_receive - value.received}
                  </Text>
                </Td>
                <Td>
                  <Text>${value.to_receive}</Text>
                </Td>
                <Td>
                  <Text>${value.user.mobile}</Text>
                </Td>
                <Td>
                  <Text>
                    {dDdate}/{dDmonth}/{dDyear} - {dDtime} ({value.package && value.package.title})
                  </Text>
                </Td>
                <Td>
                  <Text>
                    {lSdate}/{lSmonth}/{lSyear} - {lStime}
                  </Text>
                </Td>
                <Td align="left">
                  <Menu>
                    <MenuButton color="#0afcf8" fontSize="1.5em" fontWeight="900">
                      ...
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={(e) => view(e, value.id)}>
                        <BiShieldX />
                        View Details
                      </MenuItem>
                      <MenuItem onClick={(e) => manualMatch(donorId, value.id)}>
                        <BiShieldX />
                        Complete Match
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

export default TransTable;
