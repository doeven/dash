import { Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import React from 'react';
import { timestampFormatted, transName } from '../../funcs';

import { CgArrowTopRightO, CgArrowBottomLeftO } from 'react-icons/cg';






function TransTable({ items, title }) {
  return (
    <>
      <Heading float="left" fontSize="1.5em" my="8">
        {title}
      </Heading>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Details</Th>
            <Th>Tx. ID</Th>
            <Th isNumeric>Amount</Th>
            <Th isNumeric>Balance</Th>
            <Th isNumeric>Fee</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((value, index) => {
            const [date, month, year, time] = timestampFormatted(value.created_at);

            return (
              <Tr key={index}>
                <Td>
                  <Box>
                    <Text>
                      <Text
                      color={
                        (value.type > 0 && value.type <= 10) ? '#009128' :
                        (value.type > 10 && value.type <21) ? '#f00' :
                        '#009128'
                        }                      
                      >{transName(value.type.toString())}</Text> - {value.user.username}
                    </Text>
                    <Text> {`${date} ${month} ${year} - ${time}`}</Text>
                  </Box>
                </Td>
                <Td>
                  {/* <Box mb="6"></Box> */}
                  <Box>
                    <Text borderRadius="10px" 
                    
                    bg={
                      (value.type > 0 && value.type <= 10) ? '#009128' :
                      (value.type > 10 && value.type <21) ? '#f00' :
                      '#009128'
                      }                    
                    color="#fff" 
                    
                    p="2">
                    {value.tx_id} - {value.description}
                    </Text>
                  </Box>
                </Td>
                <Td isNumeric>{value.amount}</Td>
                <Td isNumeric>{value.balance}</Td>
                <Td isNumeric>{value.fee}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

export default TransTable;
