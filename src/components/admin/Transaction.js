import React, { useState, useEffect, useCallback } from 'react';
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
import { http, timestampFormatted, transName } from '../../funcs';
import TransTable from '../Tables/TransTable';

const TransactionAdmin = ({ settings }) => {
  const [pageNum, setPageNum] = useState(1);
  const [perScreen, setPerScreen] = useState(10);
  const [filter, setFilter] = useState('all');
  const [every, setEveryState] = useState({
    pagination: {},
    transactions: [],
    transD: [],
  });
  const pages = () => {
    let _whole = every.pagination.total / perScreen;
    let _decimal = parseInt(_whole.toString().split('.')[1]);
    return _decimal === 0 || isNaN(_decimal) ? parseInt(_whole) : parseInt(_whole) + 1;
  };
  // Change the Page Number
  const changePage = (pageNum) => {
    setPageNum(pageNum);
  };

  useEffect(() => {
    http
      .get(`/api/transactions/${filter}?page=${pageNum}`)
      .then(({ data }) => {
        const { total, current_page, per_page } = data;
        setEveryState({
          pagination: {
            total: total,
            current_page: current_page,
            pageSize: per_page,
          },
          transactions: data === '' ? [] : data.data,
          transD: data,
        });

      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNum, filter]);

  // Change filter to be fetched
  const changeFilter = (e, filter) => {
    e.preventDefault();
    setFilter(filter);
    setPageNum('1');
  };
  return (
    <Flex mt="10" minHeight="100vh" direction="column">
      <Flex color="#333" mb="10">
        <Heading as="h4">User Transactions</Heading>
      </Flex>
      <Flex
        cursor="pointer"
        direction={['column', 'row']}
        justifyContent="space-between"
        _hover={{ boxShadow: 'lg' }}
        borderRadius="20px"
        p={['2', '6']}
      >
        <Flex justifyContent="center">
          <Text fontSize="1.2em" mt={['10px']} mr={['6']}>
            You have total {every.transactions === undefined ? null : every.pagination?.total} transaction(s)
          </Text>
          <br />
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          {pageNum === 1 ? (
            <IoIosArrowBack color="#0afcf8" fontSize="1.5em" />
          ) : (
            <IoIosArrowBack color="#0afcf8" fontSize="1.5em" onClick={(e) => changePage(pageNum - 1)} />
          )}
          <Text mx="10">
            {pageNum}/{pages()}
          </Text>
          {pageNum === pages() ? (
            <IoIosArrowForward color="#0afcf8" fontSize="1.5em" />
          ) : (
            <IoIosArrowForward color="#0afcf8" fontSize="1.5em" onClick={(e) => changePage(pageNum + 1)} />
          )}
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
            <Tab onClick={(e) => changeFilter(e, 'all')}>All</Tab>
            <Tab onClick={(e) => changeFilter(e, 'deposit')}>Deposits</Tab>
            <Tab onClick={(e) => changeFilter(e, 'withdraw')}>Withdrawals</Tab>
            <Tab onClick={(e) => changeFilter(e, 'bonus')}>Bonus</Tab>
            <Tab onClick={(e) => changeFilter(e, 'lend')}>Investment</Tab>
            {settings.p2p === 1 && (
              <>
                <Tab onClick={(e) => changeFilter(e, 'donation-all')}>All Donations</Tab>
                <Tab onClick={(e) => changeFilter(e, 'sent')}>Sent</Tab>
                <Tab onClick={(e) => changeFilter(e, 'received')}>Received</Tab>
                <Tab onClick={(e) => changeFilter(e, 'donations')}>Pledges</Tab>
              </>
            )}
          </TabList>

          <TabPanels>
            <TabPanel>
              <TransTable items={every.transactions} title="All Transactions" />
            </TabPanel>
            <TabPanel>
              <TransTable items={every.transactions} title="Deposits" />
            </TabPanel>
            <TabPanel>
              <TransTable items={every.transactions} title="Withdrawals" />
            </TabPanel>
            <TabPanel>
              <TransTable items={every.transactions} title="Bonus" />
            </TabPanel>
            <TabPanel>
              <TransTable items={every.transactions} title="Investment" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default TransactionAdmin;
