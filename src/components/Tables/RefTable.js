import React from 'react';
import { Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from '@chakra-ui/react';
import { timestampFormatted } from '../../funcs';
import { Link as Reactlink } from 'react-router-dom';




function RefTable({ items, title }) {
  const toReceive = (deposit, percentage) => {
    let total = deposit + (deposit * percentage) / 100;
    return total;
  };
  return (
    <>
      <Heading display={['none', 'block']} float="left" fontSize={["1em", "1em", "1em", "1em"]} my="8">
        {title}
      </Heading>
      
      <Table size="sm" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Full Name</Th>
            <Th display={["none", "none", "revert", "revert"]}>Email</Th>
            <Th>Date Registered</Th>
            <Th display={["none", "none", "revert", "revert"]}>Status</Th>
            <Th display={["none", "none", "revert", "revert"]}>Contact</Th>
          </Tr>
        </Thead>
        <Tbody>
          {(items == 'You Do Not Have Any Referrals' || items.length === 0) && <Heading fontSize="12">No Referrals on this list</Heading>}
          {items != 'You Do Not Have Any Referrals' && items.map((value, index) => {
            const [date, month, year, time] = timestampFormatted(value.created_at);
            return (
              <Tr key={index}>
                <Td>
                  <Text fontSize={["1em", "1em", "1em", "1em"]}>{value.fname} {value.lname}</Text>
                </Td>
                <Td display={["none", "none", "revert", "revert"]}>
                  <Text>{value.email}</Text>
                </Td>
                <Td>
                  <Text opacity="0.5" fontSize={["1em", "1em", "1em", "1em"]}>{date}/{month}/{year}</Text>
                </Td>
                <Td display={["none", "none", "revert", "revert"]} color={value.status === 0 ? 'orange' : 'green'}>
                  {value.kyc === 0 ? 'Unverified' : 'Verified'}
                </Td>
                <Td display={["none", "none", "revert", "revert"]}>
                  <Reactlink to={`/messages/new/${value.id}/${value.username}`}>
                    Contact
                  </Reactlink>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

export default RefTable;
