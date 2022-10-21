import { Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import React  from 'react';

function DepoLogTable({ items, title }) {
  return (
    <>
      <Heading float="left" fontSize="1.5em" my="8">
        {title}
      </Heading>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>USERNAME/DETAILS</Th>
            <Th>GENERATED ADDRESS</Th>
            <Th isNumeric>AMOUNT</Th>
            <Th isNumeric>BTC AMOUNT</Th>
            <Th isNumeric>STATUS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.length === 0 && <Heading fontSize="12">No Address Yet</Heading>}
          {items.map((value, index) => {
            return (
              <Tr key={index}>
                <Td>
                  <Box>
                    <Text>
                      {value.user.username}
                    </Text>
                  </Box>
                </Td>
                <Td>
                  <Box>
                    <Text borderRadius="10px" bg="#44C768" color="#333" p="2">
                      {value.address}
                    </Text>
                  </Box>
                </Td>
                <Td isNumeric>{value.amount}</Td>
                <Td isNumeric>{value.btc_amount}</Td>
                <Td isNumeric color={value.status == 0 ? 'orange' : 'green'}>
                  {value.status == 0 ? 'Ongoing' : 'Completed'}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

export default DepoLogTable;
