import React from 'react';
import { Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from '@chakra-ui/react';
import { BiShieldX } from 'react-icons/bi';
import { CgArrowTopRightO, CgArrowBottomLeftO } from 'react-icons/cg';
import {GoPrimitiveDot} from 'react-icons/go';
import { timestampFormatted } from '../../funcs';



function InvestTable({ items, title }) {
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
            <Th>Details</Th>
            <Th display={["none", "none", "revert", "revert"]}>Amount</Th>
            <Th>To Receive</Th>
            <Th>Next Due Date</Th>
            <Th display={["none", "none", "revert", "revert"]}>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.length === 0 && <Heading fontSize="12">No Investments Yet</Heading>}
          {items.map((value, index) => {
            const [date, month, year, time] = timestampFormatted(value.created_at);
            return (
              <Tr key={index}>
                <Td>
                  <Flex><Text display={["block", "none", "none", "none"]} color={value.status === 0 ? 'green' : 'orange'}><GoPrimitiveDot/></Text> {value.package.title}</Flex>
                  <Text opacity="0.5" fontSize={["1em", "1em", "1em", "1em"]}>{date}/{month}/{year}</Text>
                  
                </Td>
                <Td display={["none", "none", "revert", "revert"]}>
                  <Text>${value.amount}</Text>
                </Td>
                <Td>
                  ${toReceive(+value.amount, +value.package.percent)}
                </Td>
                <Td fontWeight="400">{value.next_due}</Td>
                <Td display={["none", "none", "revert", "revert"]} color={value.status === 0 ? 'green' : 'orange'}>
                  {value.status === 0 ? 'Completed' : 'Ongoing'}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

export default InvestTable;
