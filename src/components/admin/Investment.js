import React from 'react';
import {
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from '@chakra-ui/react';
import { RiSearch2Line } from 'react-icons/ri';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import TransactionData from '../data/Transactions';

const InvestmentAdmin = () => {
  return (
    <Flex mt="10" minHeight="100vh" direction="column">
      <Flex color="#29004d" mb="10">
        <Heading as="h4">User Investments</Heading>
      </Flex>
      <Flex
        cursor="pointer"
        direction={['column', 'row']}
        justifyContent="space-between"
        borderRadius="20px"
        p={['2', '6']}
      >
        <Flex justifyContent="center">
          <Text fontSize="1.2em" mt={['10px']} mr={['6']}>
            You have total {every.pagination?.total} transaction(s)
          </Text>
          <br />
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <IoIosArrowBack color="#0afcf8" fontSize="1.5em" />
          <Text mx="10">1/10</Text>
          <IoIosArrowForward color="#0afcf8" fontSize="1.5em" />
        </Flex>
        <Flex>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<RiSearch2Line color="gray.300" />} />
            <Input type="search" placeholder="Search" />
          </InputGroup>
        </Flex>
      </Flex>
      {/* tabs */}
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Tabs align="end" variant="enclosed" mt="10">
          <TabList>
            <Tab>All</Tab>
            <Tab>Deposits</Tab>
            <Tab>Withdrawals</Tab>
            <Tab>Bonus</Tab>
            <Tab>Investment</Tab>
          </TabList>
          {/* fetch data */}

          <TabPanels>
            <TabPanel>
              <Heading float="left" fontSize="1.5em" my="8">
                All Transactions
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
                {TransactionData.map((data, index) => {
                  return (
                    <Tbody>
                      <Tr key={index}>
                        <Td>
                          <Box>{data.icon}</Box>
                          <Box>
                            <Text> {data.deposit}</Text>
                            <Text> {data.date}</Text>
                          </Box>
                        </Td>
                        <Td>
                          <Box mb="6">{data.tId}</Box>
                          <Box>
                            <Text borderRadius="10px" bg="#44C768" color="#333" p="2">
                              Fund Deposit
                            </Text>
                          </Box>
                        </Td>
                        <Td isNumeric>{data.amount}</Td>
                        <Td isNumeric>{data.balance}</Td>
                        <Td isNumeric>{data.fee}</Td>
                      </Tr>
                    </Tbody>
                  );
                })}
              </Table>

              {/* );
                                    })
                                }
                            */}
            </TabPanel>
            <TabPanel>
              {/* {
                                    userTransactions.map((data, index) => {
                                        return( */}
              <Heading float="left" fontSize="1.5em" my="8">
                Deposits
              </Heading>
              <Table size="sm">
                <Thead>
                  <Tr
                  // key={index}
                  >
                    <Th>Details</Th>
                    <Th>Tx. ID</Th>
                    <Th isNumeric>Amount</Th>
                    <Th isNumeric>Balance</Th>
                    <Th isNumeric>Fee</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Box>Icon</Box>
                      <Box>
                        <Text> Deposit - (Raymond)</Text>
                        <Text> @0 Sep, 2021 - 14:43:58s</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box mb="6">DPTXQbmCype</Box>
                      <Box>
                        <Text borderRadius="10px" bg="#150026" color="#f7f7f7" p="2">
                          Fund Deposit
                        </Text>
                      </Box>
                    </Td>
                    <Td isNumeric>25.4</Td>
                    <Td isNumeric>25.4</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                </Tbody>
              </Table>

              {/* );
                                    })
                                }
                            */}
            </TabPanel>
            <TabPanel>
              {/* {
                                    userTransactions.map((data, index) => {
                                        return( */}
              <Heading float="left" fontSize="1.5em" my="8">
                Withdrawals
              </Heading>
              <Table size="sm">
                <Thead>
                  <Tr
                  // key={index}
                  >
                    <Th>Details</Th>
                    <Th>Tx. ID</Th>
                    <Th isNumeric>Amount</Th>
                    <Th isNumeric>Balance</Th>
                    <Th isNumeric>Fee</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Box>Icon</Box>
                      <Box>
                        <Text> Deposit - (Raymond)</Text>
                        <Text> @0 Sep, 2021 - 14:43:58s</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box mb="6">DPTXQbmCype</Box>
                      <Box>
                        <Text borderRadius="10px" bg="#150026" color="#f7f7f7" p="2">
                          Fund Deposit
                        </Text>
                      </Box>
                    </Td>
                    <Td isNumeric>25.4</Td>
                    <Td isNumeric>25.4</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                </Tbody>
              </Table>

              {/* );
                                    })
                                }
                            */}
            </TabPanel>
            <TabPanel>
              {/* {
                                    userTransactions.map((data, index) => {
                                        return( */}
              <Heading float="left" fontSize="1.5em" my="8">
                Bonus
              </Heading>
              <Table size="sm">
                <Thead>
                  <Tr
                  // key={index}
                  >
                    <Th>Details</Th>
                    <Th>Tx. ID</Th>
                    <Th isNumeric>Amount</Th>
                    <Th isNumeric>Balance</Th>
                    <Th isNumeric>Fee</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Box>Icon</Box>
                      <Box>
                        <Text> Deposit - (Raymond)</Text>
                        <Text> @0 Sep, 2021 - 14:43:58s</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box mb="6">DPTXQbmCype</Box>
                      <Box>
                        <Text borderRadius="10px" bg="#150026" color="#f7f7f7" p="2">
                          Fund Deposit
                        </Text>
                      </Box>
                    </Td>
                    <Td isNumeric>25.4</Td>
                    <Td isNumeric>25.4</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                </Tbody>
              </Table>

              {/* );
                                    })
                                }
                            */}
            </TabPanel>
            <TabPanel>
              {/* {
                                    userTransactions.map((data, index) => {
                                        return( */}
              <Heading float="left" fontSize="1.5em" my="8">
                Investments
              </Heading>
              <Table size="sm">
                <Thead>
                  <Tr
                  // key={index}
                  >
                    <Th>Details</Th>
                    <Th>Tx. ID</Th>
                    <Th isNumeric>Amount</Th>
                    <Th isNumeric>Balance</Th>
                    <Th isNumeric>Fee</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Box>Icon</Box>
                      <Box>
                        <Text> Deposit - (Raymond)</Text>
                        <Text> @0 Sep, 2021 - 14:43:58s</Text>
                      </Box>
                    </Td>
                    <Td>
                      <Box>DPTXQbmCype</Box>
                      <Box>
                        <Text borderRadius="10px" bg="#150026" color="#f7f7f7" p="2">
                          Fund Deposit
                        </Text>
                      </Box>
                    </Td>
                    <Td isNumeric>25.4</Td>
                    <Td isNumeric>25.4</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                </Tbody>
              </Table>

              {/* );
                                    })
                                }
                            */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default InvestmentAdmin;
