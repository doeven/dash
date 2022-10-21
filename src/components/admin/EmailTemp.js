import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Flex, Heading, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box } from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { http } from '../../funcs';
import EmailTable from '../Tables/EmailTable';

const EmailTemp = ({ history, forced }) => {
  const [pageNum, setPageNum] = useState(1);
  const [perScreen, setPerScreen] = useState(10);
  const [every, setEveryState] = useState({ pagination: {}, emails: [], userD: [] });

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
      .get(`api/email`)
      .then(({ data }) => {
        const { total, current_page, per_page } = data;
        setEveryState({
          pagination: {
            total: total,
            current_page: current_page,
            pageSize: per_page,
          },
          emails: data === '' ? [] : data,
          userD: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNum]);
  const editTemp = (e, id) => {
    e.preventDefault();
    history.push(`/admin/edit-email`, { id: id });
  };
  return (
    <Flex mb="10" minHeight="100vh" direction="column">
      <Flex color="#333" mt="10">
        <Heading as="h4">Email Templates</Heading>
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
            You have total {every.pagination?.total} email template(s).
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

        {/* <Flex>
          <Button
            as={Link}
            to="/admin/new-email"
            color="white"
            bgColor="red"
            _hover={{ color: 'white.300', bgColor: 'red' }}
          >
            +New Email Template
          </Button>
        </Flex> */}
      </Flex>
      {/* tabs */}
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Tabs align="end" variant="enclosed" mt="10">
          {/* fetch data */}
          <TabPanels>
            <TabPanel>
              {/* {console.log(every.emails.length)} */}
              <EmailTable items={every.emails} title="All" forced={forced} view={editTemp} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default EmailTemp;
