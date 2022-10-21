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
import React from 'react';
import { timestampFormatted } from '../../funcs';
import { BiShieldX } from 'react-icons/bi';

function TransTable({ items, title, view, viewR }) {
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
            <Th isNumeric>Initial Pledge</Th>
            <Th>Phone</Th>
            <Th>Last Login</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.length === 0 && <Heading fontSize="12">No Donor Yet</Heading>}
          {items.map((value, index) => {
            const [date, month, year, time] = timestampFormatted(value.user.last_seen);

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
                    ${value.amount - value.sent}
                  </Text>
                </Td>
                <Td>
                  <Text>${value.amount}</Text>
                </Td>
                <Td>
                  <Text>${value.user.mobile}</Text>
                </Td>
                <Td>
                  <Text>
                    {date}/{month}/{year} - {time}
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
                      <MenuItem onClick={(e) => viewR(e, value.id)}>
                        <BiShieldX />
                        Match
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
