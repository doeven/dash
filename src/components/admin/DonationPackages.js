import React from 'react';
import {
    Flex,
    Heading,
    Text,
    Box,
    Button,
   
} from "@chakra-ui/react";
import { Link as Reactlink} from 'react-router-dom';

import Layout from '../layout/Layout';



const DonationPackages = () => {
    return (
        <Layout>
            <Flex
                flex={['2']}
                direction='column'
                mr={['0', '0', '10','10']}
                mt='10'
                pb='10'
                width={['80vw','60vw']}
                >
                    <Box
                    border='1px solid #e7e7e7'
                    bgColor='#fff'
                    px='4'
                    pt='4'
                    borderRadius='5px'
                    >
                        <Box borderBottom='2px solid #44C768' width='17%' pb='4'>
                        <Reactlink   to='/' >Line Profit Team</Reactlink>
                        </Box>
                    </Box>
                    <Flex justifyContent='space-between'>
                    <Heading width='100%' as='h1'  my='10' fontSize='1.6em'>Donation Packages</Heading>
                    <Button alignSelf='center' px='6' bgColor='#44C768' color='#fff' _hover={{bgColor:'#4eed7a'}}> + New Don. Pack</Button>
                    </Flex>
                    <Text opacity='0.5'>There are 0 Donation package(s) available for you.</Text>

            </Flex>
           
        </Layout>
    )
}

export default DonationPackages;
