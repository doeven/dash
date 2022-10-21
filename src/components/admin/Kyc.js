import React, { useState, useEffect } from 'react';
import { Link as Reactlink } from 'react-router-dom';

import {
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { RiSearch2Line } from 'react-icons/ri';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BiShieldX } from 'react-icons/bi';
import { http, btnProcessing, kycName } from '../../funcs';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

const Kyc = ({ forced }) => {
  const [pageNum, setPageNum] = useState(1);
  const [every, setEveryState] = useState({ pagination: {}, kycs: [], kycsD: [] });
  const [perScreen, setPerScreen] = useState(10);

  const [kycId, setKycId] = useState('');
  const [filter, setFilter] = useState('all');
  const [refetch, setRefetch] = useState(false);

  const pages = () => {
    let _whole = every.pagination.total / perScreen;
    let _decimal = parseInt(_whole.toString().split('.')[1]);
    return _decimal === 0 || isNaN(_decimal) ? parseInt(_whole) : parseInt(_whole) + 1;
  };
  // Change the Page Number
  const changePage = (pageNum) => {
    setPageNum(pageNum);
  };

  // Change filter to be fetched
  const changeFilter = (e, filter) => {
    e.preventDefault();
    setFilter(filter);
    setPageNum('1');
  };
  
  const verifyAll = () => {
    mySwal
      .fire({
        title: 'Are you sure?',
        text: 'All Pending KYCs would be verified if you confirm',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Verify!',
      })
      .then((result) => {
        if (result.isConfirmed) {
          http
            .post('/api/kyc/verify-all', [])
            .then((response) => {
              console.log(response.data);
              Swal.fire('Confirmed!', 'All pending KYCs verified.', 'success');
            })
            .catch((error) => {
              console.log(error.response.data);
            });
          forced();
        }
      });
  };

  useEffect(() => {
    http
      .get(`/api/kyc/${filter}?page=${pageNum}`)
      .then(({ data }) => {
        const { total, current_page, per_page } = data;
        setEveryState({
          pagination: {
            total: total,
            current_page: current_page,
            pageSize: per_page,
          },
          kycs: data === '' ? [] : data.data,
          kycsD: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNum, refetch, filter]);

  const handleApprove = (e, id) => {
    e.preventDefault();
    const prev = e.target.innerHTML;
    btnProcessing(e.target, () => {
      http
        .patch(`api/admin/user/${id}`, { kyc: 1 })
        .then((response) => {
          http
            .patch(`api/admin/user-kyc/${id}`, { status: 1 })
            .then((response) => {
              console.log(response.data);
              // Sweet Alert
              mySwal
                .fire({
                  title: <p>KYC Approved</p>,
                  html: `<p>${response.data}</p>`,
                  icon: 'success',
                })
                .then(() => {
                  setRefetch(!refetch);
                });
            })
            .catch((error) => {
              // Sweet Alert
              mySwal.fire({
                title: <p>KYC Error</p>,
                html: `<p>${error.response}</p>`,
                icon: 'error',
              });
            });
        })
        .catch((error) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>KYC Error</p>,
            html: `<p>${error.response}</p>`,
            icon: 'error',
          });
        });
      e.target.innerHTML = prev;
      e.target.removeAttribute('disabled');
    });
  };
  const handleReject = (e, id) => {
    e.preventDefault();
    const prev = e.target.innerHTML;
    btnProcessing(e.target, () => {
      http
        .patch(`api/admin/user/${id}`, { kyc: 0 })
        .then((response) => {
          http
            .patch(`api/admin/user-kyc/${id}`, { status: 2 })
            .then((response) => {
              // Sweet Alert
              mySwal
                .fire({
                  title: <p>KYC Rejected</p>,
                  html: `<p>${response.data}</p>`,
                  icon: 'success',
                })
                .then(() => {
                  forced();
                });
            })
            .catch((error) => {
              // Sweet Alert
              mySwal.fire({
                title: <p>KYC Error</p>,
                html: `<p>${error.response}</p>`,
                icon: 'error',
              });
            });
        })
        .catch((error) => {
          // Sweet Alert
          mySwal.fire({
            title: <p>KYC Error</p>,
            html: `<p>${error.response}</p>`,
            icon: 'error',
          });
        });
      e.target.innerHTML = prev;
      e.target.removeAttribute('disabled');
    });
  };

  return (
    <Flex mb="10" minHeight="100vh" direction="column">
      <Flex color="#333" mt="10">
        <Heading as="h4">KYC Documents</Heading>
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
            You have total {every.kycs === undefined ? null : every.pagination?.total} KYC document(s).
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

        <Flex>
          <Button onClick={verifyAll}>Verify All Pending</Button>
        </Flex>
      </Flex>
      {/* table */}
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Box>
          <Text display={['block', 'none']} fontSize="1.5em">
            Switch to desktop to view
          </Text>
        </Box>

        <Table size="sm" display={['none', 'table']}>
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Doctype </Th>
              <Th>Documents</Th>
              <Th>Submitted</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {every.kycs.length === 0 && <Heading fontSize="12">No Kycs Yet</Heading>}
            {every.kycs.map((value, index) => {
              return (
                <Tr key={index}>
                  <Td>
                    <Flex>
                      <Box mr="4" w="35px" h="35px" borderRadius="50%" pt="2" pl="0.4em" bgColor="#DCFFD6">
                        {value.user.fname[0]}
                        {value.user.lname[0]}
                      </Box>
                      <Box>
                        <Text>
                          {value.user.fname} {value.user.lname}
                        </Text>
                        <Text>{value.user.username}</Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>{kycName(value.type)}</Td>
                  <Td>
                    <Flex>
                      <Box mr="4" bgColor="#DCFFD6">
                        <Reactlink to={{ pathname: process.env.REACT_APP_API_URL + process.env.REACT_APP_USE_PHOTO + value.front }} target="_blank">Front</Reactlink>
                      </Box>
                      <Box bgColor="#DCFFD6">
                        <Reactlink to={{ pathname: process.env.REACT_APP_API_URL + process.env.REACT_APP_USE_PHOTO + value.back }} target="_blank">Back</Reactlink>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Text>{value.created_at}</Text>
                  </Td>
                  <Td>
                    <Text
                      fontWeight="bold"
                      color={value.status === 1 ? 'green' : value.status === 2 ? 'red' : 'orange'}
                    >
                      {value.status === 1 ? 'Approved' : value.status === 2 ? 'Rejected' : 'Pending'}
                    </Text>
                  </Td>
                  <Td align="left">
                    <Menu>
                      <MenuButton color="red" fontSize="1.5em" fontWeight="900">
                        ...
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={(e) => handleApprove(e, value.user_id)}>
                          <BiShieldX />
                          Approve
                        </MenuItem>
                        <MenuItem onClick={(e) => handleReject(e, value.user_id)}>
                          <BiShieldX />
                          Reject
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default Kyc;
