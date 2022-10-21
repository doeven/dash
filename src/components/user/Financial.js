import React from 'react';
import {
    Flex,
    Heading,
    Text,
    Box,
    Button,
    Select,
    Input
  
   
} from "@chakra-ui/react";
import { Link as Reactlink} from 'react-router-dom';

import Layout from '../layout/Layout';



const Financial = () => {
    return (
        <Layout>
            <Flex
                flex={['2']}
                direction='column'
                mr={['0', '0', '10','10']}
                mt='10'
                pb='10'
                width='55vw'
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
                    <Heading width='100%' as='h1'  my='10' fontSize='1.6em'>Financial Operations</Heading>


                    <Flex
                    direction='column'
                    border='1px solid #e7e7e7'
                    bgColor='#fff'
                    
                    p={['4','8']}
                    >
                        <Text my='6' fontSize='1.2em' fontWeight='600'>
                        Operation history
                        </Text>
                        <Text mb='8'>You can browse through all financial transactions that were made within your personal account in this section.</Text>
                        <Flex mb='10'>
                            <Box
                            mr='6'
                            >
                                <label>September 2021</label>
                                <Select placeholder="September 2021">
                                    <option value="option3">September 2021</option>
                                    <option value="option1">August 2021</option>
                                </Select>
                               

                            </Box>
                            <Box  mr='6'>
                                <label>Select balance:</label>
                                <Select placeholder="All operations except for linear bonus">
                                    <option value="option1">All operations except for linear bonus </option>
                                    <option value="option2">Linear bonus</option>
                                    <option value="option3">Balance deposits</option>
                                    <option value="option2">Withdrawals</option>
                                    <option value="option3">Deposit to Transaction wallet</option>
                                    <option value="option3">Transfer of funds</option>
                                    <option value="option3">Buy investment package</option>
                       

                                </Select>
                               

                            </Box>
                            <Box>
                                <label>Partner ID:</label>
                                <Input type='text'></Input>
                            </Box>
                        </Flex>
                       
                        <Button my='6' width='30%' bgColor='#44C768' color='#fff' py={[6]} fontSize='1.1em' fontWeight='600' _hover={{bgColor:'#4eed7a'}}>View history</Button>
                        <Text opacity='0.5'>Daily transaction data can be displayed with a slight time delay.</Text>
                    </Flex>
            </Flex>
           
        </Layout>
    )
}

export default Financial;
