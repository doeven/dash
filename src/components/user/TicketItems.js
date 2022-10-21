import { Heading, Text, Table, Tbody, Tr } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
function TicketItems({ items }) {
  return (
    <>
      <Table size="sm" display={['none', 'table']}>
        <Tbody>
          {items.length === 0 && <Heading fontSize="12">No Ticket Yet</Heading>}
          {items.map((value, index) => {
            return (
              <Tr key={index} as={Link} to={`/support/${value.id}`}>
                <Text my="6">{value.title}</Text>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

export default TicketItems;
