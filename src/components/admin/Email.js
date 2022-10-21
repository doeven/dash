import React from 'react';
import {
    Flex,
    Heading,
    Text,
    Button,
  
   
} from "@chakra-ui/react";

import Layout from '../layout/Layout';



const Email = () => {
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
                    {/* <Box
                    border='1px solid #e7e7e7'
                    bgColor='#fff'
                    px='4'
                    pt='4'
                    borderRadius='5px'
                    > */}
                  
                    <Heading width='100%' as='h1'   fontSize='2em'>Send Email</Heading>
                    <Text >Send Email to All Users from this page.</Text>

            </Flex>
           
        </Layout>
    )
}

export default Email;
