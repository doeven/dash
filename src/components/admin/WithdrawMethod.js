import React, { useEffect, useState } from 'react';
import { Flex, Heading, Text, Grid } from '@chakra-ui/react';
import { http } from '../../funcs';

import WithdrawMethodCard from '../cards/WithdrawMethodCard';

const WithdrawMethod = () => {
  const [every, setEveryState] = useState({ gatewayList: [] });
  const [reload, setReload] = useState(false);
  useEffect(() => {
    http
      .get('api/gateway')
      .then(({ data }) => {
        setEveryState({
          gatewayList: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [reload]);

  const reloader = () => {
    setReload(!reload);
  };
  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="0" pb="10">
      <Heading width="100%" as="h1" fontSize="2em">
        Payment Gateways
      </Heading>
      <Text>There are {every.gatewayList.length} Payment Gateway(s) available for you..</Text>

      <Grid templateColumns={['repeat(1, auto)', 'repeat(3, 2fr)']} gap={6} mt="8">
        {every.gatewayList.map((item, index) => {
          return <WithdrawMethodCard key={index} item={item} reload={reloader} />;
        })}
        {/* <WithdrawMethodCard
          title="Block.IO"
          tag="B"
          fixedFee="0.00"
          percent="0"
          exchange="0.00"
          min="100"
          max="1000"
          status="Active"
          bgColor="#44C768"
        /> */}
      </Grid>
    </Flex>
  );
};

export default WithdrawMethod;
