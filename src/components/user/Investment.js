import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text, Box, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import { http } from '../../funcs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import InvestTable from '../Tables/InvestTable';

const Investment = () => {
  const [pageNum, setPageNum] = useState('1');
  const [perScreen, setPerScreen] = useState(10);
  const [filter, setFilter] = useState('all');
  const [every, setEveryState] = useState({ pagination: {}, investments: [], investD: [] });

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
      .get(`/api/investments/mine/${filter}?page=${pageNum}`)
      .then(({ data }) => {
        const { total, current_page, per_page } = data;
        setEveryState({
          pagination: {
            total: total,
            current_page: current_page,
            pageSize: per_page,
          },
          investments: data.data === undefined ? [] : data.data,
          investD: data,
        });
      })
      .catch((error) => {});
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
        <Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
          Investment List
        </Heading>
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
            You have total {every.investments === undefined ? null : every.pagination?.total} investment(s).
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
      </Flex>
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Tabs align="end" variant="enclosed" mt="10px">
          <TabList>
            <Tab onClick={(e) => changeFilter(e, 'all')}>All</Tab>
            <Tab onClick={(e) => changeFilter(e, 'complete')}>Complete</Tab>
            <Tab onClick={(e) => changeFilter(e, 'on')}>Ongoing</Tab>
          </TabList>
          {/* fetch data */}
          <TabPanels>
            <TabPanel>
              <InvestTable items={every.investments} title="All Investments" />
            </TabPanel>
            <TabPanel>
              <InvestTable items={every.investments} title="Completed" />
            </TabPanel>
            <TabPanel>
              <InvestTable items={every.investments} title="OnGoing" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default Investment;
