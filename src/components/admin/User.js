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
import UserTable from '../Tables/UserTable';

const UserAdmin = ({ history, forced }) => {
  const [pageNum, setPageNum] = useState(1);
  const [perScreen, setPerScreen] = useState(10);
  const [filter, setFilter] = useState('zzxxallxxzz');
  const [every, setEveryState] = useState({ pagination: {}, users: [], userD: [] });

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
      .get(`api/admin/users/${filter}?page=${pageNum}`)
      .then(({ data }) => {
        const { total, current_page, per_page } = data;
        setEveryState({
          pagination: {
            total: total,
            current_page: current_page,
            pageSize: per_page,
          },
          users: data === '' ? [] : data.data,
          userD: data,
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
        <Heading as="h4">Users List</Heading>
      </Flex>
      <Flex
        cursor="pointer"
        direction={['column', 'row']}
        justifyContent="space-between"
        borderRadius="3px"
        p={['2', '6']}
      >
        <Flex justifyContent="center">
          <Text fontSize="1.2em" mt={['10px']} mr={['6']}>
            You have total {every.users === undefined ? null : every.pagination?.total} user(s).
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
            <form onSubmit={e=>{changeFilter(e, document.getElementById('user').value)}}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<RiSearch2Line color="gray.300" />} />
                  <Input type="search" placeholder="Search" id="user" name="user" />
                </InputGroup>
            </form>
        </Flex>
      </Flex>
      {/* tabs */}
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Tabs align="end" variant="enclosed" mt="10">
          <TabList>
            <Tab onClick={(e) => changeFilter(e, 'zzxxallxxzz')}>All</Tab>
            <Tab onClick={(e) => changeFilter(e, 'zzxxemail-verifiedxxzz')}>Email Ver</Tab>
            <Tab onClick={(e) => changeFilter(e, 'zzxxpaidxxzz')}>Paid</Tab>
            <Tab onClick={(e) => changeFilter(e, 'zzxxfreexxzz')}>Free</Tab>
            <Tab onClick={(e) => changeFilter(e, 'zzxxbannedxxzz')}>Banned</Tab>
            <Tab onClick={(e) => changeFilter(e, 'zzxxunbannedxxzz')}>UnBanned</Tab>
            <Tab onClick={(e) => changeFilter(e, 'zzxxsuperxxzz')}>Admins</Tab>
          </TabList>
          {/* fetch data */}
          <TabPanels>
            <TabPanel>
              <UserTable items={every.users} title="All" forced={forced} view={viewUser} />
            </TabPanel>
            <TabPanel>
              <UserTable items={every.users} title="Email Verified" forced={forced} view={viewUser} />
            </TabPanel>
            <TabPanel>
              <UserTable items={every.users} title="Paid" forced={forced} view={viewUser} />
            </TabPanel>
            <TabPanel>
              <UserTable items={every.users} title="Free" forced={forced} view={viewUser} />
            </TabPanel>
            <TabPanel>
              <UserTable items={every.users} title="Banned" forced={forced} view={viewUser} />
            </TabPanel>
            <TabPanel>
              <UserTable items={every.users} title="UnBanned" forced={forced} view={viewUser} />
            </TabPanel>
            <TabPanel>
              <UserTable items={every.users} title="Admins" forced={forced} view={viewUser} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default UserAdmin;
