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
import DonorTable from '../Tables/DonorTable';

const Donors = ({ history }) => {
  const [pageNum, setPageNum] = useState(1);
  const [perScreen, setPerScreen] = useState(10);
  const [filter, setFilter] = useState('active');
  const [every, setEveryState] = useState({ pagination: {}, donors: [], donorD: [] });

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
      .get(`api/admin/donors/${filter}?page=${pageNum}`)
      .then(({ data }) => {
        const { total, current_page, per_page } = data;
        setEveryState({
          pagination: {
            total: total,
            current_page: current_page,
            pageSize: per_page,
          },
          donors: data === '' ? [] : data.data,
          donorD: data,
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

  const viewReceiver = (e, donor_id) => {
    e.preventDefault();
    history.push({ pathname: '/admin/p2p/receivers', state: { donor_id: donor_id } });
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
          Donor's List
        </Heading>
      </Flex>
      <Flex
        cursor="pointer"
        direction={['column', 'row']}
        justifyContent="space-between"
        borderRadius="3px"
        p={['2', '6']}
        bgColor="#DCFFD6"
      >
        <Flex justifyContent="center">
          <Text fontSize="1.2em" mt={['10px']} mr={['6']}>
            You have total {every.donors && every.pagination?.total} user(s) ready to make payment.
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
            <Tab onClick={(e) => changeFilter(e, 'active')}>Active</Tab>
            <Tab onClick={(e) => changeFilter(e, 'complete')}>Complete</Tab>
            <Tab onClick={(e) => changeFilter(e, 'all')}>All</Tab>
          </TabList>
          {/* fetch data */}
          <TabPanels>
            <TabPanel>
              <DonorTable items={every.donors} title="Active" view={viewUser} viewR={viewReceiver} />
            </TabPanel>
            <TabPanel>
              <DonorTable items={every.donors} title="Complete" view={viewUser} viewR={viewReceiver} />
            </TabPanel>
            <TabPanel>
              <DonorTable items={every.donors} title="All" view={viewUser} viewR={viewReceiver} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default Donors;
