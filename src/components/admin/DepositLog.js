import React, { useState, useEffect }  from 'react';
import { http} from '../../funcs';
import $ from 'jquery';


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
    Box  
} from "@chakra-ui/react";
import { RiSearch2Line } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Layout from '../layout/Layout';
import DepoLogTable from '../Tables/DepoLogTable';


const DepositLog = () => {

    const [pageNum, setPageNum] = useState('1');
    const [filter, setFilter] = useState('all');
    const [perScreen, setPerScreen] = useState(10);
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
    // console.log(every);
    // Change the Page Number
    const changePage = (pageNum) => {
        setPageNum(pageNum); 
    }

    useEffect(() => {
      http
        .get(`/api/deposits/${filter}?page=${pageNum}`)
        .then(({ data }) => {
          console.log(data)
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

    // useEffect(() => {
    //     $('.loader-float').show('fast'); // Show Loading
    //     http.get(`/api/deposits/${filter}?page=${pageNum}`).then( response => {
    //         console.log(response);
    //         setEveryState({"transactions":response.data.data, ...every})
    //     })
    //     .catch(error => { console.log(error);  });   
    //     $('.loader-float').hide('fast'); // Hide Loading
    //  }, [pageNum, filter]);
    
    // Change filter to be fetched
    const changeFilter = (e, filter)=>{
        e.preventDefault();
        setFilter(filter);
        setPageNum('1');
    }
    return (
      <Layout>
        <Flex mb="10" minHeight="100vh" direction="column">
          <Flex color="#333" mt="10">
            <Heading as="h4" mb="6">
              Users Deposit Logs
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
                You have total {every.depolog && every.pagination?.total} generated addresses.
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
                <Tab onClick={(e) => changeFilter(e, 'all')}>All</Tab>
                <Tab onClick={(e) => changeFilter(e, 'complete')}>Complete</Tab>
                <Tab onClick={(e) => changeFilter(e, 'pending')}>Pending</Tab>
              </TabList>
              {/* fetch data */}
              <TabPanels>
                <TabPanel>
                  <DepoLogTable items={every.transactions} title="All" />
                </TabPanel>
                <TabPanel>
                  <DepoLogTable items={every.transactions} title="Complete" />
                </TabPanel>
                <TabPanel>
                  <DepoLogTable items={every.transactions} title="Pending" />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Layout>
    );
}

export default DepositLog;

