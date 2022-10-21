import React, { useState } from 'react';
import { Flex, Text, Heading, Grid, Box, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import PerformanceData from '../data/PerformancData';
import { Link as Reactlink } from 'react-router-dom';

const Performance = (props) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="10">
      
      <Heading as="h1" my="10" fontSize="1.6em">
        Partner Performance Index (PPI) in the program Line Profit Team
      </Heading>
      <Flex direction="column" bgColor="#fff" p="6" border="1px solid #e7e7e7" borderRadius="5px">
        <Box>
          <Text mb="8">
            Partner Perfomance Index (PPI) – is a value which your earnings from the example platform are multiplied by.
            It depends directly on the products you have sold personally under the Line Profit Team program.
          </Text>
        </Box>
        <Grid templateColumns={['repeat(1, 4fr)', 'repeat(2, 2fr)']} gap={6} fontWeight="600">
          <Box>
            <Text>Attracted last month: 0</Text>
          </Box>
          <Box>
            <Text>
              Your current performance index: <span style={{ color: '#44C768', fontSize: '1.1em' }}>0.9</span>
            </Text>
          </Box>
          <Box>
            <Text>Attracted last month: 0</Text>
          </Box>
          <Box>
            <Text>
              Projected index for next month: <span style={{ color: '#44C768', fontSize: '1.1em' }}>0.9</span>
            </Text>
          </Box>
        </Grid>
        <Box my="8">
          {isReadMore ? (
            <Text>
              The core business of the example platform is to provide an intermediary service to both consumers and
              sellers of various financial and innovative products and services. The example platform brings together
              people who want the tools to increase their income and companies that provide this opportunity. In other
              words, example is an advertising broker that charges a certain commission on the profit generated, both
              from the companies that promote their services or products and from the investors who use them.
            </Text>
          ) : (
            <Text>
              The core business of the example platform is to provide an intermediary service to both consumers and
              sellers of various financial and innovative products and services. The example platform brings together
              people who want the tools to increase their income and companies that provide this opportunity. In other
              words, example is an advertising broker that charges a certain commission on the profit generated, both
              from the companies that promote their services or products and from the investors who use them.
              <br />
              <br />
              Percentage of profit from the promotion of companies is a trade secret, which may not be disclosed at the
              initiative of the promoted partner companies. The parties shall conclude an appropriate non-disclosure
              agreement. Percentage of profits obtained from the IBPA shall be open to maximum transparency. example
              charges the IBPA with up to 10% of the revenue he or she receives, which it publicly declares.
              <br />
              <br />
              For calculation purposes, the company has introduced the Partner Performance Index (PPI), which directly
              affects the individual amount of commission retained by the example platform from the investor. By
              default, this factor is 0.9, i.e. the company holds a commission of 10% from the investor with this
              factor. This factor means that all income received under the investment and partner program is multiplied
              by 0.9.
            </Text>
          )}

          <Button
            mt="8"
            color="#44C768"
            border="1px solid #44C768"
            width={['40%', '20%']}
            borderRadius="5px"
            bgColor="#fff"
            _hover={{ bgColor: '#44C768', color: '#fff' }}
            onClick={toggleReadMore}
          >
            {isReadMore ? 'More' : 'Less'}
          </Button>
        </Box>
      </Flex>

      <Flex display={['none', 'flex']} my="10">
        <Table>
          <Thead>
            <Tr>
              <Th>Amount of products or services purchased by the first line</Th>
              <Th isNumeric>Partner Performance Index</Th>
            </Tr>
          </Thead>
          {PerformanceData.map((line, index) => {
            return (
              <Tbody key={index}>
                <Tr>
                  <Td>{line.title}</Td>
                  <Td isNumeric>{line.amount}</Td>
                </Tr>
              </Tbody>
            );
          })}
        </Table>
      </Flex>
    </Flex>
  );
};

export default Performance;
