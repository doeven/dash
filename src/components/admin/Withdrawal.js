import React, { useState, useEffect, useCallback } from 'react';
import { Link as Reactlink } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';

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
  Box,
  Button,
} from '@chakra-ui/react';
import { RiSearch2Line } from 'react-icons/ri';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BiShieldX } from 'react-icons/bi';
import { http, timestampFormatted, transName } from '../../funcs';
import WithTable from '../Tables/WithTable';
import $ from 'jquery';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

const WithdrawalAdmin = ({ forced }) => {
  const [pageNum, setPageNum] = useState(1);
  const [perScreen, setPerScreen] = useState(10);
  const [filter, setFilter] = useState('all');
  const [every, setEveryState] = useState({ pagination: {}, withdraws: [], withD: [] });

  const pages = () => {
    let _whole = every.pagination.total / perScreen;
    let _decimal = parseInt(_whole.toString().split('.')[1]);
    return _decimal === 0 || isNaN(_decimal) ? parseInt(_whole) : parseInt(_whole) + 1;
  };

  // Change the Page Number
  const changePage = (pageNum) => {
    setPageNum(pageNum);
  };

  const payAll = (e) => {
    e.preventDefault();
    mySwal
      .fire({
        title: 'Are you sure?',
        text: 'All Pending Withdrawals would be confirmed and Paid',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Make Payment!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          $('.payUser').click();
          // console.log(document.getElementsByClassName("payUser"));

          // http
          //   .post('/api/admin/withdraw-mass', [])
          //   .then((response) => {
          //     console.log(response.data);
          //     Swal.fire('Confirmed!', 'All Payments Made.', 'success');
          //   })
          //   .catch((error) => {
          //     console.log(error.response.data);
          //   });

          // forced();
        }
      });
  };

  useEffect(() => {
    http
      .get(`/api/admin/withdraws/${filter}?page=${pageNum}`)
      .then(({ data }) => {
        // console.log(data)
        const { total, current_page, per_page } = data;
        setEveryState({
          pagination: {
            total: total,
            current_page: current_page,
            pageSize: per_page,
          },
          withdraws: data === '' ? [] : data.data,
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
    <Flex mb="10" minHeight="100vh" direction="column">
      <Flex color="#333" mt="10">
        <Heading as="h4">User Withdrawals</Heading>
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
            You have total {every.withdraws === undefined ? null : every.pagination?.total} transaction(s)
          </Text>
          <br />
          <Button
            p={['auto', '6']}
            fontSize="1.1em"
            rightIcon={<MdArrowForward />}
            bgColor="#44C768"
            color="#fff"
            onClick={payAll}
          >
            Pay All!
          </Button>
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

        {/* <Flex>
            <form onSubmit={e=>{changeFilter(e, document.getElementById('user').value)}}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<RiSearch2Line color="gray.300" />} />
                  <Input type="search" placeholder="Search" id="user" name="user" />
                </InputGroup>
            </form>
        </Flex> */}
      </Flex>
      {/* tabs */}
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Tabs align="end" variant="enclosed" mt="10">
          <TabList>
            <Tab onClick={(e) => changeFilter(e, 'all')}>All</Tab>
            <Tab onClick={(e) => changeFilter(e, 'paid')}>Paid Withdrawals</Tab>
            <Tab onClick={(e) => changeFilter(e, 'unpaid')}>Unpaid Withdrawals</Tab>
          </TabList>
          {/* fetch data */}
          <TabPanels>
            <TabPanel>
              <WithTable items={every.withdraws} title="All Withdrawals" forced={forced} />
            </TabPanel>
            <TabPanel>
              <WithTable items={every.withdraws} title="Paid Withdrawals" />
            </TabPanel>
            <TabPanel>
              <WithTable items={every.withdraws} title="Unpaid Withdrawals" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default WithdrawalAdmin;
