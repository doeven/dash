import React, { useEffect, useState } from 'react';
import { Flex, Heading, Text, Box, Button, Wrap, WrapItem, SimpleGrid } from '@chakra-ui/react';
import { http } from '../../funcs';
import {Link as Reactlink, Redirect, Route } from 'react-router-dom';
import RefTable from '../Tables/RefTable';


const Referral = ( { history, settings, user }, ...props ) => {
  const [every, setEveryState] = useState({ refs: [] });
  const [refDeposit, setRefDeposit] = useState(0);

  useEffect(() => {
    http
      .get('api/user/ref/mine')
      .then(({ data }) => {

        setEveryState({
          refs: data,
        });

        if(data != 'You Do Not Have Any Referrals'){
          http
          .get('api/user/ref-deposit/mine')
          .then(({ data }) => {
            setRefDeposit(data);
          })
          .catch((error) => {
            console.log(error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    
  }, []);

  const sendDM = (e, id) => {
    e.preventDefault();
    history.push(`/message/new/${id}`);
  };

  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="0" pb="10">

      <Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
        Referral
      </Heading>

      <SimpleGrid columns={[1, 2, 2, 2]} spacing='10px' width={["100%", "100%", "100%", "100%"]}>

      <Flex direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['10px', '20px']}>
        <Box borderBottom="1px solid #eee" pb="20px">
          <Text my="1" color="#44C768" fontWeight="700" fontSize="1.1em">Referral </Text>
          <Text fontSize="0.9em">Your Referral link: <Reactlink to={`/ref/${user.username}`}><Text color="#44C768">{process.env.REACT_APP_WEB_APP_URL}/ref/{user.username}</Text></Reactlink></Text>
          <Text fontSize="0.9em">Your Referralal Code: <Text color="#44C768" fontWeight="bold">{user.username}</Text></Text>
        </Box>
        <Box pt="20px">
          <Text my="1" color="#44C768" fontWeight="700" fontSize="1.1em">Referral Levels </Text>
          <Text fontSize="0.9em">You are on the <strong>{user.level_name}</strong> Level</Text>
        </Box>
        {/* <Button
          alignSelf="center"
          bgColor="#44C768"
          _hover={{ bgColor: '#4eed7a' }}
          color="#fff"
          p="6"
          fontSize="1.2em"
          width="8em"
        >
          Invite
        </Button> */}
      </Flex>


      <Flex direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['4', '8']}>
        <Box borderBottom="1px solid #eee" pb="20px">
          <Text my="1" color="#44C768" fontWeight="700" fontSize="1.1em">Referral Statistics </Text>
          <Text fontSize="0.9em">Your Referrer: {user.upline_data === undefined || user.upline_data === null ? (<>No Referrer</>) : (<>
              {user.upline_data.fname} {user.upline_data.lname}
            </> )}
          </Text>
          <Text fontSize="0.9em">No Referrals: {every.refs.length}</Text>
        </Box>
        <Box pt="20px">
          <Text my="1" color="#44C768" fontWeight="700" fontSize="1.1em">Referral Bonus </Text>
          {/* <Text fontSize="0.9em">No Bonuses: 0</Text> */}
          <Text fontSize="0.9em">Total Amount: {settings.symbol}{refDeposit}</Text>
        </Box>
        {/* <Button
          alignSelf="center"
          bgColor="#44C768"
          _hover={{ bgColor: '#4eed7a' }}
          color="#fff"
          p="6"
          fontSize="1.2em"
          width="8em"
        >
          Invite
        </Button> */}
      </Flex>

    </SimpleGrid>


      <br/>
      <Flex direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['4', '8']}>
        <Heading fontSize="1em" my="3">
          Referred Users
        </Heading>
        <Text opacity="0.3" my="4" fontWeight="500" fontSize="1em">
          You have a total of {every.refs === 'You Do Not Have Any Referrals' ? 0 : every.refs.length} referral(s).
        </Text>

          <RefTable items={every.refs} title="All Referrals" />


        {/* <SimpleGrid columns={[1, 2, 2, 3]} spacing='10px' width={["100%", "100%", "100%", "100%"]}>
          {every.refs === 'You Do Not Have Any Referrals' ? (
            <Text color="#d7d7d7">No Referrals...</Text>
          ) : (
            every.refs.map((item) => {
              return (
                <Flex
                  p="6"
                  w=""
                  rounded="lg"
                  bg="#EEEEEE"
                  color="#000000"
                  fontWeight="400"
                  direction="column"
                  fontSize="1.2em"
                  mr="10px"
                  _hover={{
                    bgGradient: 'linear(131deg, rgba(66, 139, 255, 0.7) 11%, rgba(68, 199, 103,0.8) 79%)',
                    color: '#fff',
                  }}
                >
                  <UserCard
                    fname={item.fname}
                    lname={item.lname}
                    username={item.username}
                    email={item.email}
                  ></UserCard>
                </Flex>
              );
            })
          )}
        </SimpleGrid> */}
      </Flex>
    </Flex>
  );
};

export default Referral;
