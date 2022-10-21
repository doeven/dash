import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import SidebarData from './SidebarData';
import Notifications from './NotificationItem';
import { Link as Reactlink, NavLink, Redirect, Route } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import {MdNotificationAdd, MdNotifications} from 'react-icons/md'
import { FaSignOutAlt } from 'react-icons/fa';
import { RiUserFill } from 'react-icons/ri';

import { http, withdrawFund, postProcessed, loadScript, hideNavbar } from '../../funcs';
import headerBg from '../../assets/images/headerBg.png';
import $ from 'jquery';
import {
  Box,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  InputGroup,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Layout = ({ children, user, forced, settings, path, withdraw }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const burgerRef = React.useRef();
  const [errorDetails, setErrorDetails] = useState({ amount: '' });
  const [transData, setTransData] = useState({});
  const [notifChange, setNotifChange] = useState(user.notif);

  // let logged = true;

  const [notifications, setNotifications] = useState([]);

  const logoutSend = (e) => {
    e.preventDefault();
    // Call API Logout Route
    http.get('/api/logout', { withCredentials: true }).then((response) => {
      // Set Login Variable to FALSE
      localStorage.setItem('isLoggedIn', false);
      localStorage.setItem('is2faed', false);

      forced();
    });
  };

  const showNotif = () => {
    setNotifChange(0);
    console.log('why');

    if (user.notif === 1) {
      // Update the DB (Clear notification)
      http.patch('/api/user/update/profile', { notif: 0 }).then(({ data }) => {
        // console.log(data);
      });
    }
  };

  const calDay = (x) => {
    return parseInt((new Date().getTime() / 1000).toFixed(0)) - parseInt((new Date(x).getTime() / 1000).toFixed(0));
  };

  const finalCalAmount = () => {
    let investment = transData.last_package_data.amount;
    let days = (calDay(transData.last_package_data.created_at) / 86400).toFixed(4);
    let daily_pay = (
      ((transData.last_package_helper.percent / 100) * 24) /
      transData.last_package_helper.time_hours
    ).toFixed(4);
    let amount = (investment * days * daily_pay).toFixed(2);

    let next_due = (calDay(transData.last_package_data.next_due) / 86400).toFixed(2);

    // If Next Due is Equal to or greater than zero, return zero
    if (next_due >= 0) {
      return 'Last Pack Complete';
    } else {
      return 'Last Pack Earnings: ' + amount + ' ' + settings.currency;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

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
    // Add Notifications
    http
      .get(`/api/user/notifications/alert`)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>

      {/* {logged ? null : <Redirect to={{ pathname: '/login', state: { prev: path } }} />} */}
      
      <Flex direction="column" color="#333" bgColor=" #F7FCFF" px={[0]} overflowX="hidden">
        {/* navigation */}
        
        <Flex
          justifyContent="space-between"
          py={['4']}
          minW="100%"
          pr={['6', '7%']}
          pl={['6', '5%']}
          bgColor="#ecfaf0"
          borderBottom="1px solid #c7c7c7"
          // backgroundImage={headerBg}
        >

          

          {/* {mobile nav open} */}

                <Box ref={burgerRef} onClick={onOpen} display={['flex', 'flex', 'flex', 'none']} alignSelf="center">
                  <GiHamburgerMenu fontSize="1.5em" color="#45c668" />
                </Box>
                
                <Box fontSize="1.5em" color="#44C768" fontWeight="400" mr={['6', '0']} mt="15px" display={['none', 'flex', 'flex', 'flex']}>
                  <Reactlink to="/" className="logo-link">
                    <img src="/images/logo-light.png" alt="logo" />
                  </Reactlink>
                </Box>
                <Box fontSize="1.5em" color="#44C768" fontWeight="400" mr={['6', '0']} mt="15px" ml="10px !important" display={['flex', 'none', 'none', 'none']}>
                  <Reactlink to="/" className="logo-link">
                    <img src="/images/logo-light-thumb.png" alt="logo" maxWidth="50px !important" minWidth="40px !important"  />
                  </Reactlink>
                </Box>
                <Flex alignItems="center" fontSize="1.5em" mr={[0, 0, 0, 0]}>
                  <Box><div id="google_translate_element"></div></Box>
                  <Box mr="6">

                    <Menu>
                    {({ isOpen }) => (
                        <>
                          <MenuButton 
                            isActive={isOpen}
                            bg="transparent"
                            as={IconButton}
                            icon={ notifChange == 0 ? <MdNotifications fontSize="1.5em" /> : <MdNotificationAdd fontSize="1.5em" /> }
                            color={ notifChange == 0 ? "#45c668" : "rgb(154, 0, 0);" }
                            // color="#45c668"
                            _hover={{ color: '#FFFFFF' }}
                            _expanded={{ bg: 'transparent', color: '#FFFFFF' }}
                            _active={{ bg: 'transparent', color: '#FFFFFF' }}
                            onClick={()=>showNotif()}
                            >
                          </MenuButton>
                          

                          <MenuList color="#44C768">

                            {
                              notifications == '' ?
                              <>
                                <h4 style={{padding: "10px"}}>No Notifications</h4>
                              </>
                              :

                              <Notifications notifItem={notifications} />
                              
                            }
                              { notifications != '' &&
                                <Reactlink to="/transactions">
                                  <MenuItem fontSize="12px">More Transactions</MenuItem>
                                </Reactlink>
                              }
                                


                          </MenuList>
                        </>
                      )}
                        
                    </Menu>



                  </Box>
                  <Box>
                  {user && user.profile_photo_path ? (
                    
                    <img src={process.env.REACT_APP_API_URL + process.env.REACT_APP_USE_PHOTO + user.profile_photo_path } alt={user.username} style={{ height: "24px", width: "24px", borderRadius: "50%", objectFit: "cover"}} />
                  ): (
                    <RiUserFill color="#45c668" />
                      )
                  }
                  </Box>

                  <Menu isLazy>
                    {({ menuOpen }) => (
                      <>
                        <MenuButton
                          bg="transparent"
                          isActive={menuOpen}
                          as={IconButton}
                          icon={<BiChevronDown fontSize="1.5em" />}
                          color="#45c668"
                          _hover={{ color: '#FFFFFF' }}
                          _expanded={{ bg: 'transparent', color: '#FFFFFF' }}
                          _active={{ bg: 'transparent', color: '#FFFFFF' }}
                        ></MenuButton>
                        <Portal bgColor="#f8f8f8">
                          <MenuList color="#44C768">
                            {/* <Flex
                                      p='4'
                                      borderBottom='1px solid #c7c7c7'
                                      >
                                          <Box alignSelf='center' w='35px' h='35px' borderRadius='50%' bgColor='#0afcf8'><Text textAlign='center' fontWeight='700' color='#6402ba' mt='1'>OF</Text></Box>
                                          <Flex
                                          direction='column'
                                          ml='6'
                                          >
                                          <Box  fontSize='1em' fontWeight='600'>Paul Tonny</Box>
                                          <Box fontSize='1em' fontWeight='400'>paultony@gmail.com</Box>
                                          </Flex>
                                      </Flex> */}

                            {/* <Flex
                                      p='4'
                                      borderBottom='1px solid #c7c7c7'
                                      >
                                          <Reactlink to='/withdraw'>
                                          <Flex
                                          direction='column'
                                          >
                                              <Text fontWeight='700' opacity='0.5'>ACCOUNT BALANCE</Text>
                                              <Flex color='#6402ba' >
                                              <Text fontSize='2em' >1500.00</Text>
                                              <Text fontSize='1em' alignSelf='center' ml='2'>USD</Text>
                                              </Flex>
                                              <Flex>
                                              <Text  mr='4' >Withdraw Funds</Text>
                                              <Box alignSelf='center'color='#6402ba'><FaSignOutAlt/></Box>
                                              </Flex>
                                          </Flex>
                                          </Reactlink>
                                      </Flex> */}
                            <Reactlink to="/profile">
                              <MenuItem>Personal Data</MenuItem>
                            </Reactlink>
                            <Reactlink to="/deposit">
                              <MenuItem>Deposit</MenuItem>
                            </Reactlink>
                            <Reactlink to="/security">
                              <MenuItem>Settings</MenuItem>
                            </Reactlink>

                            <Flex p="4" borderTop="1px solid #c7c7c7">
                              <Reactlink to="/login" onClick={logoutSend}>
                                <Flex>
                                  <Box alignSelf="center" mr="4">
                                    <FaSignOutAlt color="#44C768" />
                                  </Box>
                                  <Text>Sign Out</Text>
                                </Flex>
                              </Reactlink>
                            </Flex>
                          </MenuList>
                        </Portal>
                      </>
                    )}
                  </Menu>



                </Flex>
          
        </Flex>

        <Box>
          <Drawer
            isOpen={isOpen}
            placement="top"
            onClose={onClose}
            finalFocusRef={burgerRef}
            display={['none', 'none', 'flex']}
            direction="column"
            mr="10"
            borderRight="1px solid #c7c7c7"
            py={['2', '2', '10']}
            px={['10']}
            bgColor="#fff"
            fontWeight="600"
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader p="10px"
                bgColor="#ecfaf0"
                // backgroundImage={headerBg}
              >
                <Flex borderBottom="1px solid #e7e7e7">
                  <Flex justifyContent="center" px="10px" mt="8px">
                    {user?.profile_photo_path ? (
                              <img src={process.env.REACT_APP_API_URL + process.env.REACT_APP_USE_PHOTO  +  user.profile_photo_path } alt={user.username} style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover"}} />
                      ) : (
                        <RiUserFill align="center" fontSize="2em" color="#44C768" />
                      )}
                  </Flex>
                  

                  <Flex my="5">
                    <Text fontSize={["12px"]} color="#222">Username: {user ? user.username : ''}</Text>
                    <Text fontSize={["12px"]} ml="10px" color="#222">Email: {user ? user.email : ''}</Text>
                  </Flex>
                </Flex>
              </DrawerHeader>

              <DrawerBody p="10px">
                <Flex direction="column" mt="0" mb="5">
                  {SidebarData.map((item, index) => {
                    return (
                      <Box
                        as="button"
                        key={index}
                        borderBottom="1px solid #e8e8e8"
                        color="#7f8fa4"
                        _hover={{ color: '#089c99' }}
                        _active={{
                          color: '#dddfe2',
                          transform: 'scale(0.98)',
                          borderColor: '#bec3c9',
                          
                        }}
                        _focus={{
                          boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                        }}
                        onClick={ e=>{onClose()} }
                      >
                        {item.title.toLowerCase() === 'withdraw' ? (
                         
                            <Flex mb="10px" mt="10px" onClick={withdraw}>
                              <Box fontSize="1.2em">{item.icon}</Box>
                              <Text fontSize="0.9em" fontWeight="500" ml="6">
                                {item.title}
                              </Text>
                            </Flex>
                        ) : (
                          <Reactlink to={item.path}>
                            <Flex  mb="10px" mt="10px">
                              <Box fontSize="1.2em">{item.icon}</Box>
                              <Text fontSize="0.9em" fontWeight="500" ml="6">
                                {item.title}
                              </Text>
                            </Flex>
                          </Reactlink>
                        )}
                      </Box>
                    );
                  })}
                </Flex>
              </DrawerBody>

              {/* <DrawerFooter borderTop="1px solid #c7c7c7">
                <Reactlink to="/">
                  <Flex mr="7em" fontSize="1.4em" color="#7f8fa4">
                    <BiSupport />
                    <Text ml="4" mt="-1">
                      Support
                    </Text>
                  </Flex>
                </Reactlink>
              </DrawerFooter> */}
            </DrawerContent>
          </Drawer>
        </Box>

        <Flex direction={['column', 'row']} margin="auto" w={['95vw', '95vw', '80vw', '80vw']}>
          {/* side bar desktop */}

          <Flex
            display={['none', 'none', 'none', 'flex']}
            direction="column"
            mr="10"
            borderRight="1px solid #c7c7c7"
            minWidth={['20vw']}
            maxWidth={['20vw']}
            bgColor="#fff"
            fontWeight="600"
          >
            <Box mt="10"></Box>

            {SidebarData.map((item, index) => {


              if (item.title.toLowerCase() === 'withdraw') {
                return (
                  <Flex
                    // direction='column'
                    alignItems="center"
                    borderLeft="2px solid #fff"
                    color="#7F8EA4"
                    as={NavLink}
                    to={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      withdraw(e);
                    }}
                    key={index}
                    _hover={{ color: '#44C768', bgColor: '#F7FCFF', borderLeft: '2px solid #44C768' }}
                    _active={{
                      color: '#44C768',
                      transform: 'scale(0.98)',
                      borderColor: '#44C768',
                      borderLeft: '2px solid #44C768',
                    }}
                    _focus={{
                      boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                    }}
                  >
                    <Flex py="4" pl="2">
                      <Box fontSize="1.5em">{item.icon}</Box>
                      <Text fontSize="0.9em" ml="6">
                        {item.title}
                      </Text>
                    </Flex>
                  </Flex>
                );
              }

              else if( item.title.toLowerCase() === 'admin'){

                if(user.roles != null && user.roles.includes("ROLE_ADMIN") ){

                  return (
                    <Flex
                      // direction='column'
                      alignItems="center"
                      borderLeft="2px solid #fff"
                      color="#7F8EA4"
                      as={NavLink}
                      activeClassName="activeSide"
                      to={item.path}
                      key={index}
                      _hover={{ color: '#44C768', bgColor: '#F7FCFF', borderLeft: '2px solid #44C768' }}
                      _active={{
                        color: '#44C768',
                        transform: 'scale(0.98)',
                        borderColor: '#44C768',
                        borderLeft: '2px solid #44C768',
                      }}
                      _focus={{
                        boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                      }}
                    >
                      <Flex py="4" pl="2">
                        <Box fontSize="1.5em">{item.icon}</Box>
                        <Text fontSize="0.9em" ml="6">
                          {item.title}
                        </Text>
                      </Flex>
                    </Flex>
                  );
                  
                }

              }
              
              else {
                return (
                  <Flex
                    // direction='column'
                    alignItems="center"
                    borderLeft="2px solid #fff"
                    color="#7F8EA4"
                    as={NavLink}
                    activeClassName="activeSide"s
                    to={item.path}
                    key={index}
                    _hover={{ color: '#44C768', bgColor: '#F7FCFF', borderLeft: '2px solid #44C768' }}
                    _active={{
                      color: '#44C768',
                      transform: 'scale(0.98)',
                      borderColor: '#44C768',
                      borderLeft: '2px solid #44C768',
                    }}
                    _focus={{
                      boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                    }}
                  >
                    <Flex py="4" pl="2">
                      <Box fontSize="1.5em">{item.icon}</Box>
                      <Text fontSize="0.9em" ml="6">
                        {item.title}
                      </Text>
                    </Flex>
                  </Flex>
                );
              }


            })}
          </Flex>

          {/* end of side bar */}
          <Flex flex="1" direction="column">
            {children}
          </Flex>
          {/* footer */}
          
        </Flex>


          <Flex margin="20px auto 0px auto" padding="10px" background="#FFF" textAlign="center" width="100%">
            <Text fontSize="0.9em" margin="0 auto" color="#888">© 2022 Doeven Investment and Trading. All Rights Reserved.</Text>
          </Flex>


      </Flex>





    </>
  );
};

const DashboardLayoutRoute = ({
  component: Component,
  user: user,
  forced: forced,
  title: title,
  settings: settings,
  p2p: p2p,
  location,
  ...rest
}) => {
  let logged = true;

  if (user === undefined) {
    logged = false;
  }


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState(0);

  const withdraw = (e) => {
    e.preventDefault();

    let wd_amt = parseInt(amount, 10);
    if (wd_amt < parseInt(settings.min_wd, 10)) {
      const closes = $('.chakra-modal__close-btn');
      for (let i = 0; i < closes.length; i++) {
        closes[i].click();
      }
      MySwal.fire({
        title: <p>Withdraw Alert</p>,
        html:
          '<div>You entered an amount less than minimum withdrawal amount of ' +
          settings.symbol +
          settings.min_wd +
          '</div>',
        icon: 'error',
      });
      return;
    }

    // Create the Anchor Link Element
    postProcessed(e, async () => {
      const res = await withdrawFund(e, user.btc_address);
      if (res.error) {
        const closes = $('.chakra-modal__close-btn');
        for (let i = 0; i < closes.length; i++) {
          closes[i].click();
        }
        const errors = Object.keys(res.error).map((el, i) => {
          return `<p>${el} : ${res.error[el]}</p>`;
        });
        MySwal.fire({
          title: <p>Withdraw Alert</p>,
          html: '<div>' + errors + '</div>',
          icon: 'error',
        });
      } else if (res.info === 'IB') {
        const closes = $('.chakra-modal__close-btn');
        for (let i = 0; i < closes.length; i++) {
          closes[i].click();
        }
        MySwal.fire({
          title: <p>Withdraw Alert</p>,
          html: '<p>' + res.data + '</p>',
          icon: 'error',
        });
      } else if (
        res.data ===
        'You need an Ongoing/Active Investment in order to Withdraw. Kindly visit the Investment page to activate an Investment.'
      ) {
        const closes = $('.chakra-modal__close-btn');
        for (let i = 0; i < closes.length; i++) {
          closes[i].click();
        }
        MySwal.fire({
          title: <p>Withdraw Alert</p>,
          html: '<p>' + res.data + '</p>',
          icon: 'error',
        });
      } else if (res.data === 'You have to Verify your account by uploading your KYC') {
        const closes = $('.chakra-modal__close-btn');
        for (let i = 0; i < closes.length; i++) {
          closes[i].click();
        }
        MySwal.fire({
          title: <p>Withdraw Alert</p>,
          html: '<p>' + res.data + '</p>',
          icon: 'error',
        });
      } else {
        const closes = $('.chakra-modal__close-btn');
        console.log(closes);
        for (let i = 0; i < closes.length; i++) {
          closes[i].click();
        }
        MySwal.fire({
          title: <p>Withdraw Alert</p>,
          html: '<p>' + res.data + '</p>',
          icon: 'success',
        });
      }
      return '';
    });
    forced();
  };
  const handleOnChange = (e) => {
    let value = $(e.target).val();
    setAmount(value);
  };
  document.title = title;
  // Check for Admin ROLES
  if (location && location.pathname.startsWith('/admin')) {
    // if (user && user.roles && !user.roles.includes('ROLE_ADMIN')) {
      if (user && user.roles == null ) {

      return <Redirect to={process.env.REACT_APP_USE_DASHBOARD} />;
    }
  }
  
  // Check for User Ban
  if (user !== undefined) {
    if (user && user.banned === 1) {
      return <Redirect to="/suspended" />;
    }
  }


  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout
          user={{ ...user }}
          settings={{ ...settings }}
          path={location.pathname}
          forced={forced}
          withdraw={onOpen}
        >

{user == undefined ?
  <Redirect to={{ pathname: '/login', state: { prev: location.pathname } }} />
:
    
<>
{/* {logged ? null : } */}
        
          <Component
            {...matchProps}
            user={{ ...user }}
            settings={{ ...settings }}
            p2p={{ ...p2p }}
            forced={forced}
            withdraw={onOpen}
          />

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Withdraw Request</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form>

                    <Box mr="10">
                      <label>Specify Amount:</label>
                      <Input type="amount" onChange={handleOnChange} defaultVaue={amount} name="amount" placeholder="Enter Amount" />
                    </Box>
                  <InputGroup>
                  <Button
                    my="8"
                    width="35%"
                    bgColor="#44C768"
                    color="#fff"
                    py={[6]}
                    fontSize="1.1em"
                    fontWeight="600"
                    _hover={{ bgColor: '#4eed7a' }}
                    onClick={withdraw}
                  >
                    Withdraw
                  </Button>
                  </InputGroup>
                </form>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>

</>
        
}

        </Layout>
      )}
    />
  );
};

export default DashboardLayoutRoute;
