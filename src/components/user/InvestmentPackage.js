import React, { useState, useEffect, useCallback } from 'react';
import { http } from '../../funcs';
import { Flex, Heading, Text, Box, Button, Grid, Select } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';

import InvestmentCard from '../cards/InvestmentCard';

const InvestmentPackage = (props) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    http
      .get(`/api/package`)
      .then(({ data }) => {
        setPackages(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="0" pb="10">
      
      <Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
        Buy Investment Package
      </Heading>
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 7fr)']} gap={8}>
        {packages.map((item) => {
          return <InvestmentCard key={item.id} id={item.id} item={item} bgColor="#7F8EA4" />;
        })}
      </Grid>
    </Flex>
  );
};

export default InvestmentPackage;
