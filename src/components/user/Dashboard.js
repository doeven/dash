import $ from 'jquery';
import { React, useEffect, useState, useRef } from 'react';
import { Link as Reactlink } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import toastr from 'toastr';

import { Flex, Grid, Tabs, TabList, Tab, TabPanels, TabPanel, Box, Text, Button, Link, Image, Input, InputGroup, InputRightElement, Textarea, Table, Thead, Tbody, Td, Tr, Th } from '@chakra-ui/react';
import { AiFillAlert } from 'react-icons/ai';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { HiOutlineSave } from 'react-icons/hi';
import { BsCalendarDateFill, BsFillImageFill, BsFillChatDotsFill } from 'react-icons/bs';


import { RiFileCopyLine, RiUserFill } from 'react-icons/ri';
import { AiOutlineHome } from 'react-icons/ai';
import { http, btnProcessing, transName, submitGoalData, timestampFormatted } from '../../funcs';
import depositImage from '../../assets/images/deposited.png';
import withdrawImage from '../../assets/images/withdrawn.png';
import uploadImage from '../../assets/images/uploadImage.png';
import homeBg from '../../assets/images/icons/homeTab.png';
import userBg from '../../assets/images/icons/homeUserTab.png';
import homeBg2 from '../../assets/images/icons/homeTab2.png';
import userBg2 from '../../assets/images/icons/homeUserTab2.png';

// import NewsCard from '../cards/NewsCard';
import KYCAlert from '../KYCAlert';

const Dashboard = ({ user, ...props }) => {

  const uploadRef = useRef();
  const [transData, setTransData] = useState({});
  const [goal, setGoal] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  const [counter, setCounter] = useState(true);


  // const urlString = queryString.parse(props.location.search);
  const urlString = 'https://oooooo';

  // For the Sweet Alerts
  const mySwal = withReactContent(Swal);

  useEffect(() => {
    http
      .get('api/user/transaction/data')
      .then((response) => {
        setTransData(response.data);
        // console.log(response.data);
        // props.forced();
      })
      .catch((error) => {
        console.log(error);
      });

    http
      .get(`api/transaction/mine/${filter}`)
      .then(({ data: { data: trans } }) => {
        setTransactions(trans);
        // props.forced();
      })
      .catch((error) => {
        console.log(error);
      });

    // Let's check payment
    if (urlString.payment === 'passed') {
      // Sweet Alert
      mySwal.fire({
        title: <p>Deposit Success</p>,
        html: `<p>Deposit was successful. Your account balance would be topped up in a few minutes.</p>`,
        icon: 'success',
      });
      return;
    } else if (urlString.payment === 'failed') {
      // Sweet Alert
      mySwal.fire({
        title: <p>Deposit Error Alert</p>,
        html: `<p>An error occured while trying to make deposit. Kindly try again.</p>`,
        icon: 'error',
      });
      return;
    } else {
    }

    // props.forced();


    /// Trading View Widget
    var addScriptTwo = document.createElement('script');
    addScriptTwo.async = true;
    addScriptTwo.setAttribute('src', 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js');

    // addScriptTwo.text = {
    addScriptTwo.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "300",
      "defaultColumn": "overview",
      "screener_type": "crypto_mkt",
      "displayCurrency": "USD",
      "colorTheme": "light",
      "locale": "en",
      "isTransparent": false
    })
    // document.body.appendChild(addScriptTwo);
    // document.getElementById("btcChartBuild").appendChild(addScriptTwo);
    let getChart = document.getElementById("btcChartBuild");
    if (getChart){
      getChart.appendChild(addScriptTwo);
    }



  }, []);

  useEffect(() => {
    http
      .get(`api/goal/logged/user`)
      .then(({ data }) => {
        setGoal(data);
        console.log(data);
        // props.forced();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filter]);


  useEffect(() => {
    http
      .get(`api/transaction/mine/${filter}`)
      .then(({ data: { data: trans } }) => {
        setTransactions(trans);
        // props.forced();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filter]);

  const copyToClipboard = (id) => {
    let input = document.getElementById(id);

    input.select();
    input.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(input.value);
    // Toastr Alert for Copy
    toastr.options = {
      debug: false,
      newestOnTop: false,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '4000',
      extendedTimeOut: '4000',
      showEasing: 'swing',
      hideEasing: 'linear',
    };
    toastr.success("Copied successfully.");
  };

  const calDay = (x) => {
    return parseInt((new Date().getTime() / 1000).toFixed(0)) - parseInt((new Date(x).getTime() / 1000).toFixed(0));
  };

  // Calculates the Number of Days from original package
  const finalDay = () => {
    let days = (calDay(transData.last_package_data.created_at) / 86400).toFixed(2);

    let next_due = (calDay(transData.last_package_data.next_due) / 86400).toFixed(2);

    // If Next Due is Equal to or greater than zero, return zero
    if (next_due >= 0) {
      return '0';
    } else {
      return days;
    }
  };

  const submitGoal = (e) => {

    e.preventDefault();

    const prev = e.target.innerHTML;
    const elem = e.target;
    console.log('Goal Submitted');

    let fd = new FormData(e.target);

    btnProcessing(elem, async () => {
      const dataBack = await submitGoalData(fd);

      console.log(dataBack);

      if (dataBack.error) {
        console.log(dataBack.error);
        // Sweet Alert
        mySwal.fire({
          title: <p>Error</p>,
          html: `<p>Make sure all fields are correctly filled, and image must be not more than 2MB in any of (jpeg,png,jpg) format</p>`,
          footer: 'An error occured',
          icon: 'error',
        });
      } else {
        // Sweet Alert
        mySwal.fire({
          title: <p>Goal Uploaded</p>,
          html: `${dataBack}</br>`,
          footer: `<p>Uploaded Successfully.</p>`,
          icon: 'success',
        });
        $('#kyc-form')[0].reset();
        setCounter(!counter);
      }

      elem.removeAttribute('disabled');
      elem.innerHTML = prev;
    });

    props.forced();
  }

  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="10">
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Box borderBottom="2px solid #44C768" w={['50%', '50%', '25%', '17%']} pb="4">
          <Reactlink to="/">{props.settings.tagline}</Reactlink>
        </Box>
      </Box>
      <br/>
      { user.alert == 1 &&
            <Reactlink to="/notifications/alerts">
              <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
                <Box borderBottom="2px solid #ff0000" width="100%" pb="4" style={{ display:"flex" }}>
                <AiFillAlert />  <strong> New Broadcast from Admin! Click to read.</strong>
                </Box>
              </Box>
            </Reactlink>
      }

      {/* line profit team */}
      <Flex mt="8" direction={['column', 'column', 'row']}>
        <Flex
          direction="column"
          bgColor="#fff"
          justifyContent="center"
          alignItems="center"
          p="10"
          border="1px solid #e7e7e7"
          borderRadius="5px"
          mb="20px"
          fontSize="14px" fontWeight="500"
        >
          <Box borderBottom="1px solid #e7e7e7" w="100%" textAlign="center">
            <Flex justifyContent="center">
              {user?.profile_photo_path ? (
                              <img src={process.env.REACT_APP_API_URL + process.env.REACT_APP_USE_PHOTO  +  user.profile_photo_path } alt={user.username} style={{ height: "100px", width: "100px", borderRadius: "50%", objectFit: "cover"}} />
              ) : (
                <RiUserFill align="center" fontSize="5em" color="#44C768" />
              )}
            </Flex>

            <Box my="8">
              <Text fontSize="14px" fontWeight="500">Username: {user && user.username}</Text>
              <Text fontSize="14px" fontWeight="500">Email: {user && user.email}</Text>
            </Box>
          </Box>
          <Box mt="10" textAlign="center">
            {user && user.kyc === 0 ? <KYCAlert /> : null}
            {user && user.kyc === 0 ? (
              <>
                <Box border="1px solid red" borderRadius="7px" textAlign="center" p="2" cursor="default" mb="6">
                  Not Verified
                </Box>
                <Link as={Reactlink} color="#44C768" textDecoration="underline" fontWeight="bold" to="/kyc-update">
                  Begin Verification Process
                </Link>
              </>
            ) : (
              <Box border="1px solid green" borderRadius="7px" textAlign="center" p="2" cursor="default" mb="6">
                Verified
              </Box>
            )}
          </Box>

          {user.roles != null && user.roles.includes("ROLE_ADMIN") ? 
              <Reactlink to="/admin">
                    <Button
                    mt="8"
                    color="#ffffff"
                    border="1px solid #44C768"
                    width={['100%', '100%']}
                    borderRadius="5px"
                    bgColor="#44C768"
                    _hover={{ bgColor: '#fff', color: '#44C768' }}
                  >
                    Admin
                  </Button>
              </Reactlink>
        : null }
          
        </Flex>

        {/* section 2 line profit team */}
        <Flex
          direction="column"
          bgColor="#fff"
          p="6"
          ml={['0', '0', '10']}
          border="1px solid #e7e7e7"
          borderRadius="5px"
          textAlign="center"
          fontSize="14px" fontWeight="500"
        >
          <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 3fr)']} gap={6} textAlign={["center", "center", "left", "left"]}>
            <Box>
              <Text>Account Balance:</Text>
              <Text fontWeight="bold">${user && user.balance}</Text>
            </Box>
            <Box>
              <Text>Current website time:</Text>
              <Text fontWeight="bold">{Date()}</Text>
            </Box>
            <Box>
              <Text>Pending withdrawals:</Text>
              <Text fontWeight="bold">
                {props.settings.symbol}
                {transData.pending_withdraw}
              </Text>
            </Box>
            <Box>
              <Text>Last logged in time:</Text>
              <Text fontWeight="bold">{user && user.last_seen}</Text>
            </Box>
            <Box>
              <Text>Current Package Name:</Text>
              <Text fontWeight="700" color="#44C768" fontSize="1.3em">
                {transData.last_package_helper !== undefined && transData.last_package_helper.title}
              </Text>
            </Box>
            <Box>
              <Text>Days Accrued (current):</Text>
              <Text fontWeight="700" color="#44C768" fontSize="1.3em">
                {transData.last_package_data && transData.last_package_helper ? finalDay() : null} Days
              </Text>
            </Box>
          </Grid>
          <Text my="6">Your referral link:</Text>
          <Flex
            border="1px solid #e7e7e7"
            bgColor="#fff"
            p="4"
            borderRadius="5px"
            justifyContent="space-between"
            color="#44C768"
            fontWeight="500"
            mb="8"
          >
            <Link to={`${process.env.REACT_APP_WEB_APP_URL}/ref/${user && user.username}`}>{`${
              process.env.REACT_APP_WEB_APP_URL
            }/ref/${user && user.username}`}</Link>
            <Box>
              <input
                id="ref"
                value={`${process.env.REACT_APP_WEB_APP_URL}/ref/${user && user.username}`}
                style={{ display: 'none' }}
              />
              <RiFileCopyLine fontSize="1.5em" style={{ cursor:"copy" }} onClick={(e) => copyToClipboard('ref')} />
            </Box>
          </Flex>
          {user.upline_data === undefined || user.upline_data === null ? (<></>) : (
                <Flex direction="column" textAlign={['left', 'left']} fontSize="0.9em">
                        <Text>Your Inviter: <br/><strong>{user.upline_data.fname} {user.upline_data.lname} ({user.upline_data.username})</strong></Text>
                        <Reactlink to={`/messages/new/${user.upline_data.id}/${user.upline_data.username}`}>Contact</Reactlink>
                </Flex>   
            )}
          
          {/* <hr /> */}
          {/*<Button
            mt="8"
            color="#44C768"
            border="1px solid #44C768"
            width={['70%', '50%']}
            borderRadius="5px"
            bgColor="#fff"
            _hover={{ bgColor: '#44C768', color: '#fff' }}
          >
            Register a new partner
          </Button>{' '}
          */}
        </Flex>
      </Flex>

      {/* crypto stats and chart*/}
      {/* <Flex mt="10">
        <Box fontWeight="600" fontSize="1.2em" mb="6">
          <coingecko-coin-heatmap-widget  height="400" locale="en"></coingecko-coin-heatmap-widget>
        </Box>
      </Flex> */}

      {/* my accounts */}

      <Grid mt="10" templateColumns={['repeat(1, 4fr)', 'repeat(2, 2fr)']} gap={6} textAlign={['center', 'left']}>
        <Flex
          cursor="pointer"
          direction="row"
          justifyContent="space-between"
          bgColor="#fff"
          border="1px solid #e7e7e7"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          borderRadius="5px"
          p={['4', '8']}
        >
          <Box>
            <Text fontSize={['1.2em', '1.2em']}>Account Balance</Text>
            <Text fontSize={['1.6em', '1.9em']} fontWeight="700">
              ${user && user.balance}
            </Text>
            <Link as={Reactlink} color="#44C768" textDecoration="underline" fontWeight="bold" to="/deposit">
            <Button
              mt="8"
              color="#fff"
              border="1px solid #44C768"
              // width={['50%','30%']}
              borderRadius="5px"
              bgColor="#44C768"
              _hover={{ bgColor: '#fff', color: '#44C768' }}
            >
              Top up balance
            </Button>
            </Link>
          </Box>
          <Box
            // justifyContent='flex-end'
            top="50px"
            opacity="0.1"
            // outline='1px solid red'
            position="relative"
            display={['none', 'block']}
            _hover={{ opacity: '0.3', display: 'block' }}
          >
            <Image src={homeBg2} position="relative" style={{ right:"-32px", bottom:"-37px" }} />
            {/* <HiOutlineSave position="relative" fontSize="8em" /> */}
          </Box>
        </Flex>
        
        <Flex
          cursor="pointer"
          direction="row"
          justifyContent="space-between"
          bgColor="#fff"
          border="1px solid #e7e7e7"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          borderRadius="5px"
          p={['4', '8']}
        >
          <Box>
            <Text fontSize={['1.2em', '1.2em']}>Active Investment</Text>
            <Text fontSize={['1.6em', '1.9em']} fontWeight="700">
              ${transData.active_investment}
            </Text>
            <Link as={Reactlink} color="#44C768" textDecoration="underline" fontWeight="bold" to="/investment">
            <Button
              mt="8"
              color="#fff"
              border="1px solid #44C768"
              // width={['50%','30%']}
              borderRadius="5px"
              bgColor="#44C768"
              _hover={{ bgColor: '#fff', color: '#44C768' }}
            >
              See Investment
            </Button>
            </Link>
          </Box>
          <Box
            // justifyContent='flex-end'
            top="50px"
            opacity="0.1"
            // outline='1px solid red'
            position="relative"
            display={['none', 'block']}
            _hover={{ opacity: '0.3', display: 'block' }}
          >
            <Image src={homeBg2} position="relative" style={{ right:"-32px", bottom:"-37px" }} />
            {/* <HiOutlineSave position="relative" fontSize="8em" /> */}
          </Box>
        </Flex>


        {/*  Second Row */ }


        <Flex
          cursor="pointer"
          direction="row"
          justifyContent="space-between"
          bgColor="#fff"
          border="1px solid #e7e7e7"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          borderRadius="5px"
          p={['4', '8']}
        >
          <Box>
            <Text fontSize={['1.2em', '1.2em']}>Invested Amount</Text>
            <Text fontSize={['1.6em', '1.9em']} fontWeight="700">
              ${user && user.balance}
            </Text>
            <Link as={Reactlink} color="#44C768" textDecoration="underline" fontWeight="bold" to="/deposit">
            <Button
              mt="8"
              color="#fff"
              border="1px solid #44C768"
              // width={['50%','30%']}
              borderRadius="5px"
              bgColor="#44C768"
              _hover={{ bgColor: '#fff', color: '#44C768' }}
            >
              Top up balance
            </Button>
            </Link>
          </Box>
          <Box
            // justifyContent='flex-end'
            top="50px"
            opacity="0.1"
            // outline='1px solid red'
            position="relative"
            display={['none', 'block']}
            _hover={{ opacity: '0.3', display: 'block' }}
          >
            <Image src={userBg2} position="relative" style={{ right:"-32px", bottom:"-37px" }} />
            {/* <HiOutlineSave position="relative" fontSize="8em" /> */}
          </Box>
        </Flex>
        
        <Flex
          cursor="pointer"
          direction="row"
          justifyContent="space-between"
          bgColor="#fff"
          border="1px solid #e7e7e7"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          borderRadius="5px"
          p={['4', '8']}
        >
          <Box>
            <Text fontSize={['1.2em', '1.2em']}>Total Profit</Text>
            <Text fontSize={['1.6em', '1.9em']} fontWeight="700">
              ${transData.active_investment}
            </Text>
            <Link as={Reactlink} color="#44C768" textDecoration="underline" fontWeight="bold" to="/investment">
            <Button
              mt="8"
              color="#fff"
              border="1px solid #44C768"
              // width={['50%','30%']}
              borderRadius="5px"
              bgColor="#44C768"
              _hover={{ bgColor: '#fff', color: '#44C768' }}
            >
              See Investment
            </Button>
            </Link>
          </Box>
          <Box
            // justifyContent='flex-end'
            top="50px"
            opacity="0.1"
            // outline='1px solid red'
            position="relative"
            display={['none', 'block']}
            _hover={{ opacity: '0.3', display: 'block' }}
          >
            <Image src={userBg2} position="relative" style={{ right:"-32px", bottom:"-37px" }} />
            {/* <HiOutlineSave position="relative" fontSize="8em" /> */}
          </Box>
        </Flex>



        {/*
        <Flex
          cursor="pointer"
          direction="row"
          justifyContent="space-between"
          bgColor="#fff"
          border="1px solid #e7e7e7"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          borderRadius="5px"
          p={['4', '8']}
        >
          <Box>
            <Text fontSize={['1.2em', '1.2em']}>Investment Account</Text>
            <Text fontSize={['1.6em', '1.9em']} fontWeight="700">
              $500
            </Text>
            <Button
              mt="8"
              color="#fff"
              border="1px solid #44C768"
              // width={['50%','30%']}
              borderRadius="5px"
              bgColor="#44C768"
              _hover={{ bgColor: '#fff', color: '#44C768' }}
            >
              Top up balance
            </Button>
          </Box>
          <Box
            // justifyContent='flex-end'
            top="50px"
            opacity="0.1"
            // outline='1px solid red'
            position="relative"
            display={['none', 'block']}
            _hover={{ opacity: '0.3', display: 'block' }}
          >
            <HiOutlineSave position="relative" fontSize="8em" />
          </Box>
        </Flex>

        <Flex
          cursor="pointer"
          direction="row"
          justifyContent="space-between"
          bgColor="#fff"
          border="1px solid #e7e7e7"
          _hover={{
            bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
            color: '#fff',
          }}
          borderRadius="5px"
          p={['4', '8']}
        >
          <Box>
            <Text fontSize={['1.2em', '1.2em']}>Investment Account</Text>
            <Text fontSize={['1.6em', '1.9em']} fontWeight="700">
              $500
            </Text>
            <Button
              mt="8"
              color="#fff"
              border="1px solid #44C768"
              // width={['50%','30%']}
              borderRadius="5px"
              bgColor="#44C768"
              _hover={{ bgColor: '#fff', color: '#44C768' }}
            >
              Top up balance
            </Button>
          </Box>
          <Box
            // justifyContent='flex-end'
            top="50px"
            opacity="0.1"
            // outline='1px solid red'
            position="relative"
            display={['none', 'block']}
            _hover={{ opacity: '0.3', display: 'block' }}
          >
            <HiOutlineSave position="relative" fontSize="8em" />
          </Box>
        </Flex>

      */}
      </Grid>

      {/* event statistics */}
      <Flex direction={['column', 'row']} mt="10">
        <Flex
          direction="column"
          // justifyContent='space-between'
          border="1px solid #e7e7e7"
          bgColor="#fff"
          mr={[0, '10']}
          p={['4', '8']}
        >
          <Box fontWeight="600" fontSize="1.1em" mb={['8', '12em']} textAlign="center">
            <Text>Program profitability</Text>
            <Text>statistics Line Profit Team:</Text>
          </Box>
          <Flex direction="row">
            <Flex textAlign="center" direction="column" w="50%">
              <Image src={depositImage} w={["80px", "100px", "100px", "100px"]} p="10px"  m="0 auto" />
              {/* <BiCylinder color="#44C768" fontSize="8em" /> */}
              <Text>Deposited:</Text>
              <Text color="#44C768" fontSize="1.5em" fontWeight="700">
                {transData.total_deposit} {props.settings.currency}
              </Text>
              
            </Flex>
            <Flex textAlign="center" direction="column" w="50%">
              <Image src={withdrawImage} w={["80px", "100px", "100px", "100px"]} p="10px" m="0 auto" />
              {/* <BiCylinder color="#44C768" fontSize="8em" /> */}
              <Text>Withdrawn:</Text>
              <Text color="#44C768" fontSize="1.5em" fontWeight="700">
                {transData.completed_withdraw} {props.settings.currency}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* stat tabs */}
        <Flex border="1px solid #e7e7e7" bgColor="#fff" p={['4', '8']} direction="column" flex="2">
          <Box fontWeight="600" fontSize="1.1em" mb="6">
            <Text>Recent Event Statistics:</Text>
          </Box>
          <Tabs isLazy display={['none', 'block']}>
            <TabList color="#666">
              <Tab
                fontSize="1.1em"
                fontWeight="600"
                _selected={{ borderBottom: '1px solid #44C768', color: '#333' }}
                onClick={(e) => setFilter('all')}
              >
                All
              </Tab>
              <Tab
                fontSize="1.1em"
                fontWeight="600"
                _selected={{ borderBottom: '1px solid #44C768', color: '#333' }}
                onClick={(e) => setFilter('deposit')}
              >
                Deposit
              </Tab>
              <Tab
                fontSize="1.1em"
                fontWeight="600"
                _selected={{ borderBottom: '1px solid #44C768', color: '#333' }}
                onClick={(e) => setFilter('withdraw')}
              >
                Withdrawals
              </Tab>
              <Tab
                fontSize="1.1em"
                fontWeight="600"
                _selected={{ borderBottom: '1px solid #44C768', color: '#333' }}
                onClick={(e) => setFilter('bonus')}
              >
                Bonuses
              </Tab>
            </TabList>

            <TabPanels>


              <TabPanel>
                <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>Details</Th>
                        <Th>Date</Th>
                        <Th isNumeric>Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                          {transactions.length === 0 && 'No Transaction yet'}
                          {transactions.map((item) => {
                            const [date, month, year, time] = timestampFormatted(item.created_at);
                            return (
                              <Tr key={item.id}>
                                <Td> 
                                    <Text
                                      color={item.type<10 ? "green" : "red"}          
                                      >{transName(item.type.toString())}
                                    </Text>
                                </Td>
                                <Td>{`${date} ${month} ${year} - ${time}`}</Td>
                                <Td isNumeric>${item.amount}</Td>
                              </Tr>
                            );
                          })}
                  </Tbody>
                </Table>

              </TabPanel>

              <TabPanel>
                <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>Details</Th>
                        <Th>Date</Th>
                        <Th isNumeric>Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                          {transactions.length === 0 && 'No Transaction yet'}
                          {transactions.map((item) => {
                            const [date, month, year, time] = timestampFormatted(item.created_at);
                            return (
                              <Tr key={item.id}>
                                <Td> 
                                    <Text
                                      color={item.type<10 ? "green" : "red"}          
                                      >{transName(item.type.toString())}
                                    </Text>
                                </Td>
                                <Td>{`${date} ${month} ${year} - ${time}`}</Td>
                                <Td isNumeric>${item.amount}</Td>
                              </Tr>
                            );
                          })}
                  </Tbody>
                </Table>

              </TabPanel>

              <TabPanel>
                <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>Details</Th>
                        <Th>Date</Th>
                        <Th isNumeric>Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                          {transactions.length === 0 && 'No Transaction yet'}
                          {transactions.map((item) => {
                            const [date, month, year, time] = timestampFormatted(item.created_at);
                            return (
                              <Tr key={item.id}>
                                <Td> 
                                    <Text
                                      color={item.type<10 ? "green" : "red"}          
                                      >{transName(item.type.toString())}
                                    </Text>
                                </Td>
                                <Td>{`${date} ${month} ${year} - ${time}`}</Td>
                                <Td isNumeric>${item.amount}</Td>
                              </Tr>
                            );
                          })}
                  </Tbody>
                </Table>

              </TabPanel>

              <TabPanel>
                <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>Details</Th>
                        <Th>Date</Th>
                        <Th isNumeric>Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                          {transactions.length === 0 && 'No Transaction yet'}
                          {transactions.map((item) => {
                            const [date, month, year, time] = timestampFormatted(item.created_at);
                            return (
                              <Tr key={item.id}>
                                <Td> 
                                    <Text
                                      color={item.type<10 ? "green" : "red"}          
                                      >{transName(item.type.toString())}
                                    </Text>
                                </Td>
                                <Td>{`${date} ${month} ${year} - ${time}`}</Td>
                                <Td isNumeric>${item.amount}</Td>
                              </Tr>
                            );
                          })}
                  </Tbody>
                </Table>

              </TabPanel>


            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>

      {/* profitability section */}

      <Flex direction={['column', 'column', 'column', 'row']} my="10">
        {/* table */}
        <Flex direction="column" border="1px solid #e7e7e7" bgColor="#fff" mr={[0, '10']} p={['4', '8']}>
          <Text fontWeight="600" fontSize="1.2em" mb="6">
            Your profitability table:
          </Text>
          <Flex p={['4', '4']} bgColor="#F7FCFF" borderRadius="3px" justifyContent="space-between" mb="6">
            <Box>
              <Text fontWeight="600">Total earned</Text>
            </Box>
            <Box>
              <Text fontSize="1.5em" color="#44C768">
                ${transData.earnings}
              </Text>
            </Box>
          </Flex>

          <Table display={['none', 'block']}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Amount</Th>
                <Th isNumeric> amount % of the total amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Active Investment package</Td>
                <Td isNumeric>${transData?.active_investment}</Td>
                <Td isNumeric>%</Td>
              </Tr>
              <Tr>
                <Td>Withdrawals</Td>
                <Td isNumeric>${transData?.completed_withdraw}</Td>
                <Td isNumeric>%</Td>
              </Tr>
              <Tr>
                <Td>Referral bonus</Td>
                <Td isNumeric>${transData?.ref_earn}</Td>
                <Td isNumeric>%</Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex> 
      {/* chart */}
      <Flex
          flexShrink="0"
          border="1px solid #e7e7e7"
          bgColor="#fff"
          p={['4', '8']}
          direction="column"
          justifyContent="space-between"
        >
          <Text fontWeight="600" fontSize="1.2em" mb="6">
            Your profitability chart:
          </Text>
          <Flex direction="column">
            <Flex alignItems="center">
              <Box w="10px" h="10px" borderRadius="50%" bgColor="orange" mr="2"></Box>
              <Text>Active Investment</Text>
            </Flex>
            <Flex alignItems="center" my="4">
              <Box w="10px" h="10px" borderRadius="50%" bgColor="green" mr="2"></Box>
              <Text>Referral bonus</Text>
            </Flex>
            <Flex alignItems="center">
              <Box w="10px" h="10px" borderRadius="50%" bgColor="purple" mr="2"></Box>
              <Text>Withdrawal</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/* career section */}

      {/* <Flex
        direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        mr={[0, '10']}
        p={['4', '8']}
        mb="10"
        width="100%"
      >
        <Text fontWeight="600" fontSize="1.2em" mb="6">
          Mentor Bonus
        </Text>
        <Flex p={['4', '4']} bgColor="#F7FCFF" borderRadius="3px" justifyContent="space-between" mb="6">
          <Box>
            <Text fontWeight="600">Your status</Text>
          </Box>
          <Box>
            <Text fontSize="1.5em" color="#44C768">
              MO
            </Text>
          </Box>
        </Flex>
        <Text my="4" fontWeight="600">
          To obtain next status <span style={{ color: '#44C768', fontSize: '1.1em' }}>M1</span> You need:
        </Text>
        <Text>Increase personal package volume by</Text>
        <Flex my="2" alignItems="center">
          <Box bgColor="#F7FCFF" h="4px" w="80%"></Box>
          <Text ml="4" fontWeight="600">
            $100
          </Text>
        </Flex>
        <Text>Increase the main branch volume by</Text>
        <Flex my="2" alignItems="center">
          <Box bgColor="#F7FCFF" h="4px" w="80%"></Box>
          <Text ml="4" fontWeight="600">
            $1200
          </Text>
        </Flex>
        <Text>Increase side branch volume by</Text>
        <Flex my="2" alignItems="center">
          <Box bgColor="#F7FCFF" h="4px" w="80%"></Box>
          <Text ml="4" fontWeight="600">
            $1300
          </Text>
        </Flex>
      </Flex> */}

      {/* news section */}
      {/* <Grid mt="10" templateColumns={['repeat(1, 3fr)', 'repeat(3, 1fr)']} gap={6}>
        <NewsCard
          img={'https://example.trade/core/templates/public/img/news/news429.jpg'}
          title={'Protection from Online Fraud'}
          date={'22.09.2021'}
        />
        <NewsCard
          img={'https://example.trade/core/templates/public/img/news/news429.jpg'}
          title={'Protection from Online Fraud'}
          date={'22.09.2021'}
        />
        <NewsCard
          img={'https://example.trade/core/templates/public/img/news/news429.jpg'}
          title={'Protection from Online Fraud'}
          date={'22.09.2021'}
        />
      </Grid> */}


      <Flex border="1px solid #e7e7e7" bgColor="#fff" p={['4', '8']} direction="column" flex="2" mt="20px" mb="20px">
      <form action="#" encType="multipart/form-data" id="kyc-form" onSubmit={ e => { submitGoal(e) }}>
        <Text fontWeight="700" fontSize="1.2em">My Goal</Text>
          <Box mr="8">
            <label mb="4">Goal Description:</label>
            <InputGroup mt="2" mb="6">
              <Textarea id="goal" type="text" placeholder="Example: apartment in center of Canada, 3000sqm" defaultValue={goal?.goal} name="goal" row="4" />
              <InputRightElement pointerEvents="none" children={<BsFillChatDotsFill color="gray.300" />} />

            </InputGroup>

            <label mb="4">Goal Description:</label>
            <Box style={{ border: "1px solid #eee", padding: "20px" }} >
              <InputGroup style={{ margin: "0 auto", flexDirection:"column" }} left={["30%", "40%", "40%", "40%"]}>

                <Image src={goal?.image ?  (process.env.REACT_APP_API_URL + process.env.REACT_APP_USE_PHOTO + goal?.image) : 
                  uploadImage
                  } w="100px" opacity="0.6" /><br/>
                <Input type="file" id="image" placeholder="facebook" defaultValue="" name="image" ref={uploadRef} style={{ display: "none" }} />
                <Button className="" htmlFor="image" onClick={e=> { e.preventDefault(); uploadRef.current.click(); } } style={{ backgroundColor:"#44C768", color:"#fff",padding: "6px", borderRadius: "5px", width: "100px", marginLeft: "1px" }} >Upload</Button>
              </InputGroup>

            </Box>
          </Box>
          <Box flex="2">
                <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 3fr)']} gap={6} textAlign={["center", "center", "left", "left"]}>
                  <Box>
                      <label mb="4">Cost:</label>
                      <InputGroup mt="2" mb="6">
                        <Input id="cost" type="text" placeholder="$3000" defaultValue={goal?.cost} name="cost" />
                        <InputRightElement pointerEvents="none" children={<FaMoneyBillAlt color="gray.300" />} />
                      </InputGroup>
                  </Box>
                  <Box>
                      <label>Planned goal date:</label>
                      <InputGroup mt="2" mb="6">
                        <Input id="date" type="text" placeholder="DD/MM/YYYY" defaultValue={goal?.date} name="date" />
                        <InputRightElement pointerEvents="none" children={<BsCalendarDateFill color="gray.300" />} />
                      </InputGroup>
                  </Box>
                </Grid>    
          </Box>

          <Box flex="2">
                <Box>
                      <label mb="4">Cost:</label>
                      <InputGroup mt="2" mb="6">
                        <Input id="cost" type="submit" placeholder="$3000" name="submit" value="Save" bgColor="#44C768" />
                      </InputGroup>
                  </Box> 
          </Box>
          <Text fontSize="0.8em" opacity="0.8">Accepted file formats: png and jpg, the maximum file size is 1 Mb</Text>

          </form>
        
      </Flex>


      <Flex border="1px solid #e7e7e7" bgColor="#fff" p={['4', '8']} direction="column" flex="2" mt="20px" mb="20px">
        <CoinTicker />
      </Flex>
    </Flex>
  );
};

export default Dashboard;


const CoinTicker = () =>{

  return (
    <div>
      <div id="btcChartBuild"></div>
      <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
    // <div style={{height: '560px', backgroundColor: '#FFFFFF', overflow: 'hidden', boxSizing: 'border-box', border: '1px solid #56667F', borderRadius: '4px', textAlign: 'right', lineHeight: '14px', fontSize: '12px', fontFeatureSettings: 'normal', textSizeAdjust: '100%', boxShadow: 'inset 0 -20px 0 0 #56667F', padding: '0px', margin: '0px', width: '100%'}}><div style={{height: '540px', padding: '0px', margin: '0px', width: '100%'}}><iframe src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505" width="100%" height="536px" scrolling="auto" marginWidth={0} marginHeight={0} frameBorder={0} border={0} style={{border: 0, margin: 0, padding: 0, lineHeight: '14px'}} /></div><div style={{color: '#FFFFFF', lineHeight: '14px', fontWeight: 400, fontSize: '11px', boxSizing: 'border-box', padding: '2px 6px', width: '100%', fontFamily: 'Verdana, Tahoma, Arial, sans-serif'}}><a href="https://coinlib.io" target="_blank" style={{fontWeight: 500, color: '#FFFFFF', textDecoration: 'none', fontSize: '11px'}}>Cryptocurrency Prices</a>&nbsp;by Coinlib</div></div>
  );
}
