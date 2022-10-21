import React, { useState, useEffect } from 'react';

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
} from '@chakra-ui/react';
import { RiSearch2Line } from 'react-icons/ri';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { http } from '../../funcs';
import ReceiverTable from '../Tables/ReceiverTable';

const Reciever = ({ history, location }) => {
  const [pageNum, setPageNum] = useState(1);
  const [perScreen, setPerScreen] = useState(10);
  const [filter, setFilter] = useState('active');
  const [donorId, setDonorId] = useState(false);
  const [every, setEveryState] = useState({ pagination: {}, receivers: [], receiverD: [] });

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
    const donor_id = location && location.state && location.state.donor_id;
    setDonorId(donor_id);
  }, []);
  useEffect(() => {
    http
      .get(`api/admin/receivers/${filter}?page=${pageNum}`)
      .then(({ data }) => {
        const { total, current_page, per_page } = data;
        setEveryState({
          pagination: {
            total: total,
            current_page: current_page,
            pageSize: per_page,
          },
          receivers: data === '' ? [] : data.data,
          receiverD: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNum, filter]);

  const viewUser = (e, id) => {
    e.preventDefault();
    history.push(`/admin/user-profile/${id}`);
  };

  // Change filter to be fetched
  const changeFilter = (e, filter) => {
    e.preventDefault();
    setFilter(filter);
    setPageNum('1');
  };

  return (
    <Flex mb="10" minHeight="100vh" direction="column">
      <Flex color="#333" mt="10">
        <Heading as="h4" mb="6">
          Recievers List
        </Heading>
      </Flex>
      <Flex
        cursor="pointer"
        direction={['column', 'row']}
        justifyContent="space-between"
        borderRadius="3px"
        p={['2', '6']}
        bgColor="#FFE3E2"
      >
        <Flex justifyContent="center">
          <Text fontSize="1.2em" mt={['10px']} mr={['6']}>
            You have total {every.receivers && every.pagination?.total} user(s) ready to make payment.
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
            <TabList>
              <Tab onClick={(e) => changeFilter(e, 'active')}>Active</Tab>
              <Tab onClick={(e) => changeFilter(e, 'complete')}>Complete</Tab>
              <Tab onClick={(e) => changeFilter(e, 'all')}>All</Tab>
            </TabList>
          </TabList>
          {/* fetch data */}
          <TabPanels>
            <TabPanel>
              <ReceiverTable items={every.receivers} title="Active" view={viewUser} donorId={donorId} />
            </TabPanel>
            <TabPanel>
              <ReceiverTable items={every.receivers} title="Complete" view={viewUser} donorId={donorId} />
            </TabPanel>
            <TabPanel>
              <ReceiverTable items={every.receivers} title="All" view={viewUser} donorId={donorId} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default Reciever;
