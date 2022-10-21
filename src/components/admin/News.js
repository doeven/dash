import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Flex, Heading, Button, Tabs, TabPanels, TabPanel, Text, Box } from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { http } from '../../funcs';
import NewsTable from '../Tables/NewsTable';

const News = ({ history, forced }) => {
  const [pageNum, setPageNum] = useState(1);
  const [perScreen, setPerScreen] = useState(10);
  const [every, setEveryState] = useState({ pagination: {}, news: [], newsD: [] });

  const _pages = () => {
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
      .get(`api/news`)
      .then(({ data }) => {
        const { total, current_page, per_page } = data;
        setEveryState({
          pagination: {
            total: total,
            current_page: current_page,
            pageSize: per_page,
          },
          news: data === 'no news' ? [] : data,
          newsD: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNum]);
  const editNews = (e, id) => {
    e.preventDefault();
    history.push(`/admin/edit-news`, { id: id });
  };
  return (
    <Flex mb="10" minHeight="100vh" direction="column">
      <Flex color="#333" mt="10">
        <Heading as="h4">News</Heading>
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
            You have total {every.pagination?.total} news.
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
            {pageNum}/{_pages()}
          </Text>
          {pageNum === _pages() ? (
            <IoIosArrowForward color="#0afcf8" fontSize="1.5em" />
          ) : (
            <IoIosArrowForward color="#0afcf8" fontSize="1.5em" onClick={(e) => changePage(pageNum + 1)} />
          )}
        </Flex>

        <Flex>
          <Button
            as={Link}
            to="/admin/new-news"
            color="white"
            bgColor="red"
            _hover={{ color: 'white.300', bgColor: 'red' }}
          >
            +New News
          </Button>
        </Flex>
      </Flex>
      {/* tabs */}
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Tabs align="end" variant="enclosed" mt="10">
          {/* fetch data */}
          <TabPanels>
            <TabPanel>
              <NewsTable items={every.news} title="All" forced={forced} view={editNews} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default News;
