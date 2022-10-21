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

function PageTable({ items, title, view }) {
  return (
    <>
      <Heading display={['block', 'block']} float="left" fontSize="1.5em" my="8">
        {title}
      </Heading>
      
      <Table size="sm" display={['table', 'table']}>
        <Thead>
          <Tr>
            <Th>Details</Th>
            <Th>Body</Th>
            <Th>Slug</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.length === 0 && <Heading fontSize="12">No Pages Yet</Heading>}
          {items.map((value, index) => {
            return (
              <Tr key={index}>
                <Td>
                  <Flex>
                    <Text>{value.title}</Text>
                  </Flex>
                </Td>
                <Td>
                  <Text>{value.body.substring(0, 21)}</Text>
                </Td>
                <Td>
                  <Text>{value.slug}</Text>
                </Td>
                <Td align="left">
                  <Menu>
                    <MenuButton color="red" fontSize="1.5em" fontWeight="900">
                      ...
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={(e) => view(e, value.id)}>
                        <BiShieldX />
                        Edit
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            );
          })}
          {console.log(items)}
        </Tbody>
      </Table>
    </>
  );
}

export default PageTable;
