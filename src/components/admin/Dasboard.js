import React, { useState, useEffect } from 'react';
import { Link as Reactlink } from 'react-router-dom';
import { Flex, Grid, Heading, Box, Text, Button } from '@chakra-ui/react';
import { AiOutlineMail } from 'react-icons/ai';
import { FaListOl } from 'react-icons/fa';
import { GoPackage, GoAlert } from 'react-icons/go';
import { GiCash, GiNewspaper, GiMoneyStack } from 'react-icons/gi';
import { ImUsers, ImInsertTemplate } from 'react-icons/im';
// import { MdSupportAgent, MdSettingsInputComponent } from 'react-icons/md';
import { RiPagesFill, RiUserSettingsFill } from 'react-icons/ri';
import { GrDocumentUser, GrMoney } from 'react-icons/gr';


import { MdArrowForward, MdPayment } from 'react-icons/md';
import { http } from '../../funcs';

import Overview from '../cards/Overview';

const AdminDashboard = ({ forced, settings }) => {
  const [transData, setTransData] = useState({});
  const [adminTransData, setAdminTransData] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    http
      .get('api/user/transaction/data')
      .then((response) => {
        setTransData(response.data);
        forced();
      })
      .catch((error) => {
        console.log(error);
      });

    http
      .get('api/admin/transaction/data')
      .then((response) => {
        setAdminTransData(response.data);
        // console.log(response.data);
        forced();
      })
      .catch((error) => {
        console.log(error);
      });

    http
      .get('api/transaction/mine/all')
      .then(({ data: { data: trans } }) => {
        setTransactions(trans);
        forced();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Flex color="#333" direction={['column']} minHeight={'100vh'} mt="8">
      <Flex direction={['column']}>
        <Box>
          <Heading as="h4">Admin</Heading>
          <Text>Configure and Admin this site from here</Text>
        </Box>
        <Flex mt="8" display={['none', 'flex']}>
          {/* make buttons dynamic */}
          <Button
            as={Reactlink}
            to={'./admin/transactions'}
            p={['auto', '6']}
            fontSize="1.1em"
            rightIcon={<MdArrowForward />}
            bgColor="#44C768"
            _hover={{ bgColor: '#4eed7a' }}
            color="#fff"
            py={[6]}
          >
            Transactions
          </Button>
          <Button
            as={Reactlink}
            to={'./admin/withdrawals'}
            p={['auto', '6']}
            rightIcon={<MdArrowForward />}
            mx="6"
            border="1px solid #6402ba"
            variant="solid"
          >
            Withdrawals
          </Button>
          <Button
            as={Reactlink}
            to={'./admin/users'}
            mr="10"
            p={['auto', '6']}
            rightIcon={<MdArrowForward />}
            bgColor="#f8f8f8"
            border="1px solid #44C768"
            borderRadius="5px"
          >
            Users
          </Button>
          <Button
            as={Reactlink}
            to={'./admin/transactions'}
            p={['auto', '6']}
            rightIcon={<MdArrowForward />}
            bgColor="#f8f8f8"
            border="1px solid #44C768"
            borderRadius="5px"
          >
            Investments
          </Button>
        </Flex>

        {/* mobile */}

        <Flex mt="8" display={['flex', 'none']} direction={['column']}>
          {/* make buttons dynamic */}
          <Flex mb="6">
            <Button
              as={Reactlink}
              to={'./admin/transactions'}
              p={['auto', '6']}
              fontSize="1.1em"
              rightIcon={<MdArrowForward />}
              bgColor="#44C768"
              color="#fff"
            >
              Transactions
            </Button>
            <Button
              as={Reactlink}
              to={'./admin/withdrawals'}
              p={['auto', '6']}
              rightIcon={<MdArrowForward />}
              mx="6"
              border="1px solid #6402ba"
              variant="solid"
            >
              Withdrawals
            </Button>
          </Flex>
          <Flex>
            <Button
              as={Reactlink}
              to={'./admin/users'}
              mr="10"
              p={['auto', '6']}
              rightIcon={<MdArrowForward />}
              bgColor="#f8f8f8"
              border="1px solid #44C768"
              borderRadius="5px"
            >
              Users
            </Button>
            <Button
              as={Reactlink}
              to={'./admin/transactions'}
              p={['auto', '6']}
              rightIcon={<MdArrowForward />}
              bgColor="#f8f8f8"
              border="1px solid #44C768"
              borderRadius="5px"
            >
              Investments
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Text mt="8" borderBottom="1px solid #f5f5f5" fontWeight="700" fontSize="1.3em">
        Quick Links (Investment)
      </Text>
      <Grid templateColumns={['repeat(1, 3fr)', 'repeat(3, 1fr)']} gap={6}>
        <Overview
          mt="6"
          title="Total Deposit"
          total={adminTransData.total_deposit}
          amountM={adminTransData.total_deposit_thirty}
          amountW={adminTransData.total_deposit_seven}
          symbol={settings.currency}
        />
        <Overview
          mt="6"
          title="Total Withdrawal"
          total={adminTransData.total_withdraw}
          amountM={adminTransData.total_withdraw_thirty}
          amountW={adminTransData.total_withdraw_seven}
          symbol={settings.currency}
        />
        <Overview
          mt="6"
          title="Balance in System"
          total={adminTransData.total_deposit - adminTransData.total_withdraw}
          amountM={adminTransData.total_withdraw_thirty - adminTransData.total_withdraw_thirty}
          amountW={adminTransData.total_withdraw_seven - adminTransData.total_withdraw_seven}
          symbol={settings.currency}
        />
      </Grid>
      {/* quick links */}
      <Flex direction={['column']} justifyContent="space-evenly">
        <Box mt="8" mb="6">
          <Heading as="h5" fontSize="1.3em">
            Investment Logs
          </Heading>
        </Box>

        <Grid mb="10" templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']} gap={6} textAlign={['center', 'left']}>
          <Flex
            direction="column"
            _hover={{
              bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
              color: '#fff',
            }}
            cursor="pointer"
            border="1px solid #e7e7e7"
            borderRadius="5px"
            p={['4', '8']}
            bgColor="#fff"
            as={Reactlink}
            to={'/admin/transactions'}
          >
            <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
              <FaListOl />
            </Flex>
            <Text>Transactions</Text>
            <Text fontSize={['1.2em']} fontWeight="500">
              All Transactions
            </Text>
          </Flex>
          <Flex
            direction="column"
            _hover={{
              bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
              color: '#fff',
            }}
            cursor="pointer"
            border="1px solid #e7e7e7"
            borderRadius="5px"
            p={['4', '8']}
            bgColor="#fff"
            as={Reactlink}
            to={'/admin/investment-packages'}
          >
            <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
              <GoPackage />
            </Flex>
            <Text>Investments Packages</Text>
            <Text fontSize={['1.2em']} fontWeight="500">
              All Investments Packages
            </Text>
          </Flex>
          <Flex
            direction="column"
            // bgGradient="linear(50deg, rgba(247,247,247,1) 50%, rgba(100,2,186,0.3)80%, rgba(10,252,248,1) 100%)"
            _hover={{
              bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
              color: '#fff',
            }}
            cursor="pointer"
            border="1px solid #e7e7e7"
            borderRadius="5px"
            p={['4', '8']}
            bgColor="#fff"
            as={Reactlink}
            to={'/admin/withdrawals'}
          >
            <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
              <GiCash />
            </Flex>
            <Text>Withdrawals</Text>
            <Text fontSize={['1.2em']} fontWeight="500">
              All Withdrawals
            </Text>
          </Flex>
        </Grid>



        {/*
          <Box mt="8" mb="6">
          <Heading as="h5" fontSize="1.3em">
            Donation Logs
          </Heading>
        </Box> */}
        {/*
        <Grid templateColumns={['repeat(2, 2fr)', 'repeat(3, 1fr)']} gap={6} textAlign={['center', 'left']}>
          <Flex
            cursor="pointer"
            direction="column"
            _hover={{
              bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
              color: '#fff',
            }}
            border="1px solid #e7e7e7"
            borderRadius="5px"
            p={['4', '8']}
            bgColor="#fff"
            as={Reactlink}
            to={'/admin/match-users'}
          >
            <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
              <AiOutlineWallet />
            </Flex>
            <Text>Match</Text>
            <Text fontSize={['1.2em']} fontWeight="500">
              Match Users
            </Text>
          </Flex>
          <Flex
            direction="column"
            _hover={{
              bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
              color: '#fff',
            }}
            cursor="pointer"
            border="1px solid #e7e7e7"
            borderRadius="5px"
            p={['4', '8']}
            bgColor="#fff"
            as={Reactlink}
            to={'/admin/donors'}
          >
            <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
              <AiOutlineWallet />
            </Flex>
            <Text>Donors</Text>
            <Text fontSize={['1.2em']} fontWeight="500">
              See Donors
            </Text>
          </Flex>
          <Flex
            direction="column"
            _hover={{
              bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
              color: '#fff',
            }}
            cursor="pointer"
            border="1px solid #e7e7e7"
            borderRadius="5px"
            p={['4', '8']}
            bgColor="#fff"
            as={Reactlink}
            to={'/admin/p2p/receivers'}
          >
            <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
              <AiOutlineWallet />
            </Flex>
            <Text>Receiver</Text>
            <Text fontSize={['1.2em']} fontWeight="500">
              See Receivers
            </Text>
          </Flex>
        </Grid> 

        <Box mt="8" mb="6">
          <Heading as="h5" fontSize="1.3em">
            Package Manager
          </Heading>
        </Box>

        <Grid mb="10" templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)']} gap={6} textAlign={['center', 'left']}>
          <Flex
            direction="column"
            // bgGradient="linear(50deg, rgba(247,247,247,1) 50%, rgba(100,2,186,0.3)80%, rgba(10,252,248,1) 100%)"
            _hover={{
              bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
              color: '#fff',
            }}
            cursor="pointer"
            border="1px solid #e7e7e7"
            borderRadius="5px"
            p={['4', '8']}
            bgColor="#fff"
            as={Reactlink}
            to={'/admin/donation-packages'}
          >
            <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
              <AiOutlineWallet />
            </Flex>
            <Text>Donation packages</Text>
            <Text fontSize={['1.2em']} fontWeight="500">
              Manage Donation Packs
            </Text>
          </Flex>
        </Grid>
        */}

        <Text mt="6" borderBottom="1px solid #f5f5f5" fontWeight="700" fontSize="1.3em">
          User Management
        </Text>

        <Grid
          flex="1"
          my="6"
          templateColumns={['repeat(1, 3fr)', 'repeat(3, 1fr)']}
          gap={6}
          textAlign={['center', 'left']}
        >
          <Flex
            direction="column"
            _hover={{
              bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
              color: '#fff',
            }}
            cursor="pointer"
            border="1px solid #e7e7e7"
            borderRadius="5px"
            p={['4']}
            bgColor="#fff"
            as={Reactlink}
            to={'/admin/users'}
          >
            <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
              <ImUsers />
            </Flex>
            <Text>Users</Text>
            <Text fontSize={['1.2em']} fontWeight="500">
              Manage Users
            </Text>
          </Flex>

          <Flex
            direction="column"
            _hover={{
              bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
              color: '#fff',
            }}
            cursor="pointer"
            border="1px solid #e7e7e7"
            borderRadius="5px"
            p={['4']}
            bgColor="#fff"
            as={Reactlink}
            to={'/admin/kyc/users'}
          >
            <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
              <GrDocumentUser />
            </Flex>
            <Text>Kyc Docs</Text>
            <Text fontSize={['1.2em']} fontWeight="500">
              Manage Kyc
            </Text>
          </Flex>

          <Flex
            direction="column"
            _hover={{
              bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
              color: '#fff',
            }}
            cursor="pointer"
            border="1px solid #e7e7e7"
            borderRadius="5px"
            p={['4']}
            bgColor="#fff"
            as={Reactlink}
            to={'/admin/goals/users'}
          >
            <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
              <GrDocumentUser />
            </Flex>
            <Text>Goals</Text>
            <Text fontSize={['1.2em']} fontWeight="500">
              Manage Goals
            </Text>
          </Flex>

          <Flex
            direction="column"
            _hover={{
              bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
              color: '#fff',
            }}
            cursor="pointer"
            border="1px solid #e7e7e7"
            borderRadius="5px"
            p={['4']}
            bgColor="#fff"
            as={Reactlink}
            to={'/admin/send-email'}
          >
            <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
              <AiOutlineMail />
            </Flex>
            <Text>Email</Text>
            <Text fontSize={['1.2em']} fontWeight="500">
              Send Email
            </Text>
          </Flex>
        </Grid>
      </Flex>
      <Text mt="6" borderBottom="1px solid #f5f5f5" fontWeight="700" fontSize="1.3em">
        Payment Management &amp; Others
      </Text>

      <Grid
        flex="1"
        my="6"
        templateColumns={['repeat(1, 6fr)', 'repeat(3, 2fr)']}
        gap={6}
        textAlign={['center', 'left']}
      >
        <Flex
          direction="column"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          cursor="pointer"
          border="1px solid #e7e7e7"
          borderRadius="5px"
          p={['4']}
          bgColor="#fff"
          as={Reactlink}
          to={'/admin/gateways'}
        >
          <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
            <MdPayment />
          </Flex>
          <Text>Payment Gateways</Text>
          <Text fontSize={['1.2em']} fontWeight="500">
            Edit Payment Gateways
          </Text>
        </Flex>
        <Flex
          direction="column"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          cursor="pointer"
          border="1px solid #e7e7e7"
          borderRadius="5px"
          p={['4']}
          bgColor="#fff"
          as={Reactlink}
          to={'/admin'}
        >
          <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
            <GrMoney />
          </Flex>
          <Text>Withdrawal Methods</Text>
          <Text fontSize={['1.2em']} fontWeight="500">
            Edit Withdrawal Methods
          </Text>
        </Flex>
        <Flex
          direction="column"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          cursor="pointer"
          border="1px solid #e7e7e7"
          borderRadius="5px"
          p={['4']}
          bgColor="#fff"
          as={Reactlink}
          to={'/admin/news'}
        >
          <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
            <GiNewspaper />
          </Flex>
          <Text>News</Text>
          <Text fontSize={['1.2em']} fontWeight="500">
            Blog Content
          </Text>
        </Flex>
        <Flex
          direction="column"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          cursor="pointer"
          border="1px solid #e7e7e7"
          borderRadius="5px"
          p={['4']}
          bgColor="#fff"
          as={Reactlink}
          to={'/admin/pages'}
        >
          <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
            <RiPagesFill />
          </Flex>
          <Text>Pages</Text>
          <Text fontSize={['1.2em']} fontWeight="500">
            Pages Management
          </Text>
        </Flex>

        <Flex
          direction="column"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          cursor="pointer"
          border="1px solid #e7e7e7"
          borderRadius="5px"
          p={['4']}
          bgColor="#fff"
          as={Reactlink}
          to={'/admin/alerts'}
        >
          <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
            <GoAlert />
          </Flex>
          <Text>Alerts</Text>
          <Text fontSize={['1.2em']} fontWeight="500">
            Alerts Management
          </Text>
        </Flex>

        <Flex
          direction="column"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          cursor="pointer"
          border="1px solid #e7e7e7"
          borderRadius="5px"
          p={['4']}
          bgColor="#fff"
          as={Reactlink}
          to={'/admin/support'}
        >
          <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
            {/* <MdSupportAgent /> */}
          </Flex>
          <Text>Support</Text>
          <Text fontSize={['1.2em']} fontWeight="500">
            View Support Tickets
          </Text>
        </Flex>
        <Flex
          direction="column"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          cursor="pointer"
          border="1px solid #e7e7e7"
          borderRadius="5px"
          p={['4']}
          bgColor="#fff"
          as={Reactlink}
          to={'/admin/addresses-generated'}
        >
          <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
            <GiMoneyStack />
          </Flex>
          <Text>Deposit Logs</Text>
          <Text fontSize={['1.2em']} fontWeight="500">
            Deposit Addresses
          </Text>
        </Flex>
      </Grid>

      <Text mt="6" borderBottom="1px solid #f5f5f5" fontWeight="700" fontSize="1.3em">
        Site Management{' '}
      </Text>

      <Grid
        flex="1"
        my="6"
        templateColumns={['repeat(1, 3fr)', 'repeat(3, 1fr)']}
        gap={6}
        textAlign={['center', 'left']}
      >
        <Flex
          direction="column"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          cursor="pointer"
          border="1px solid #e7e7e7"
          borderRadius="5px"
          p={['4']}
          bgColor="#fff"
          as={Reactlink}
          to={'/admin/settings'}
        >
          <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
            {/* <MdSettingsInputComponent /> */}
          </Flex>
          <Text>Site Settings</Text>
          <Text fontSize={['1.2em']} fontWeight="500">
            Edit Site Settings
          </Text>
        </Flex>
        <Flex
          direction="column"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          cursor="pointer"
          border="1px solid #e7e7e7"
          borderRadius="5px"
          p={['4']}
          bgColor="#fff"
          as={Reactlink}
          to={'/admin/p2p-settings'}
        >
          <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
            <RiUserSettingsFill />
          </Flex>
          <Text>P2P settings</Text>
          <Text fontSize={['1.2em']} fontWeight="500">
            Edit P2P settings
          </Text>
        </Flex>
        <Flex
          direction="column"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          cursor="pointer"
          border="1px solid #e7e7e7"
          borderRadius="5px"
          p={['4']}
          bgColor="#fff"
          as={Reactlink}
          to={'/admin/emails'}
        >
          <Flex fontSize="2em" alignSelf={['center', 'flex-start', 'flex-start']}>
            <ImInsertTemplate />
          </Flex>
          <Text>Email Templates</Text>
          <Text fontSize={['1.2em']} fontWeight="500">
            Edit Email templates
          </Text>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default AdminDashboard;
