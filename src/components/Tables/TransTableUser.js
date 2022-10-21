import { Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { http, timestampFormatted, transName } from '../../funcs';
import axios from 'axios';

import { CgArrowTopRightO, CgArrowBottomLeftO } from 'react-icons/cg';


function TransTable({ items, title }) {

  const btcPriceTicker = {
    "AUD": {
      "15m": 54989.0,
      "last": 54989.0,
      "buy": 54989.0,
      "sell": 54989.0,
      "symbol": "AUD"
    },
    "BRL": {
      "15m": 204790.34,
      "last": 204790.34,
      "buy": 204790.34,
      "sell": 204790.34,
      "symbol": "BRL"
    },
    "CAD": {
      "15m": 51187.99,
      "last": 51187.99,
      "buy": 51187.99,
      "sell": 51187.99,
      "symbol": "CAD"
    },
    "CHF": {
      "15m": 37955.31,
      "last": 37955.31,
      "buy": 37955.31,
      "sell": 37955.31,
      "symbol": "CHF"
    },
    "CLP": {
      "15m": 3.259759858E7,
      "last": 3.259759858E7,
      "buy": 3.259759858E7,
      "sell": 3.259759858E7,
      "symbol": "CLP"
    },
    "CNY": {
      "15m": 264467.23,
      "last": 264467.23,
      "buy": 264467.23,
      "sell": 264467.23,
      "symbol": "CNY"
    },
    "CZK": {
      "15m": 908717.64,
      "last": 908717.64,
      "buy": 908717.64,
      "sell": 908717.64,
      "symbol": "CZK"
    },
    "DKK": {
      "15m": 297192.45,
      "last": 297192.45,
      "buy": 297192.45,
      "sell": 297192.45,
      "symbol": "DKK"
    },
    "EUR": {
      "15m": 36565.96,
      "last": 36565.96,
      "buy": 36565.96,
      "sell": 36565.96,
      "symbol": "EUR"
    },
    "GBP": {
      "15m": 30773.64,
      "last": 30773.64,
      "buy": 30773.64,
      "sell": 30773.64,
      "symbol": "GBP"
    },
    "HKD": {
      "15m": 315078.08,
      "last": 315078.08,
      "buy": 315078.08,
      "sell": 315078.08,
      "symbol": "HKD"
    },
    "HRK": {
      "15m": 271685.59,
      "last": 271685.59,
      "buy": 271685.59,
      "sell": 271685.59,
      "symbol": "HRK"
    },
    "HUF": {
      "15m": 1.615369522E7,
      "last": 1.615369522E7,
      "buy": 1.615369522E7,
      "sell": 1.615369522E7,
      "symbol": "HUF"
    },
    "INR": {
      "15m": 3127487.45,
      "last": 3127487.45,
      "buy": 3127487.45,
      "sell": 3127487.45,
      "symbol": "INR"
    },
    "ISK": {
      "15m": 5805858.14,
      "last": 5805858.14,
      "buy": 5805858.14,
      "sell": 5805858.14,
      "symbol": "ISK"
    },
    "JPY": {
      "15m": 4812364.48,
      "last": 4812364.48,
      "buy": 4812364.48,
      "sell": 4812364.48,
      "symbol": "JPY"
    },
    "KRW": {
      "15m": 4.966347842E7,
      "last": 4.966347842E7,
      "buy": 4.966347842E7,
      "sell": 4.966347842E7,
      "symbol": "KRW"
    },
    "NZD": {
      "15m": 58914.27,
      "last": 58914.27,
      "buy": 58914.27,
      "sell": 58914.27,
      "symbol": "NZD"
    },
    "PLN": {
      "15m": 171181.87,
      "last": 171181.87,
      "buy": 171181.87,
      "sell": 171181.87,
      "symbol": "PLN"
    },
    "RON": {
      "15m": 185634.87,
      "last": 185634.87,
      "buy": 185634.87,
      "sell": 185634.87,
      "symbol": "RON"
    },
    "RUB": {
      "15m": 4203505.9,
      "last": 4203505.9,
      "buy": 4203505.9,
      "sell": 4203505.9,
      "symbol": "RUB"
    },
    "SEK": {
      "15m": 381693.39,
      "last": 381693.39,
      "buy": 381693.39,
      "sell": 381693.39,
      "symbol": "SEK"
    },
    "SGD": {
      "15m": 55132.65,
      "last": 55132.65,
      "buy": 55132.65,
      "sell": 55132.65,
      "symbol": "SGD"
    },
    "THB": {
      "15m": 1353527.28,
      "last": 1353527.28,
      "buy": 1353527.28,
      "sell": 1353527.28,
      "symbol": "THB"
    },
    "TRY": {
      "15m": 598013.7,
      "last": 598013.7,
      "buy": 598013.7,
      "sell": 598013.7,
      "symbol": "TRY"
    },
    "TWD": {
      "15m": 1020925.79,
      "last": 1020925.79,
      "buy": 1020925.79,
      "sell": 1020925.79,
      "symbol": "TWD"
    },
    "USD": {
      "15m": 40528.89,
      "last": 40528.89,
      "buy": 40528.89,
      "sell": 40528.89,
      "symbol": "USD"
    }
  }

  const [btcPriceData, setBtcPriceData] = useState([])

  useEffect(() => {
    axios
      .get('https://www.blockchain.com/ticker')
      .then((response) => {
        setBtcPriceData((response.data));

        // console.log(response)
        
      })
      .catch((error) => {
        setBtcPriceData(btcPriceTicker)
        // console.log(error);
      });
  }, []);


  return (
    <>
      <Heading float="left"  fontSize={["1em", "1em", "1em", "1em"]} my="8">
        {title}
      </Heading>
      <Table size="sm" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th pl="30px">Details</Th>
            <Th display={["none", "none", "none", "revert"]}>Tx. ID</Th>
            <Th>Amount</Th>
            <Th display={["none", "none", "none", "revert"]}>Balance</Th>
            {/* <Th display={["none", "none", "none", "revert"]}>Fee</Th> */}
            <Th>BTC</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((value, index) => {
            const [date, month, year, time] = timestampFormatted(value.created_at);

            return (
              <Tr key={index}>
                {/* <Box mb="5px"> */}
                    <Td>
                      <Box>
                        <Flex fontWeight="500">
                          {value.type < 10 ? <CgArrowTopRightO pr="10px" color="green" fontSize="1em" style={{ padding: "0 4px 0 0"}}/> : <CgArrowBottomLeftO pr="10px" color="red" /> }  {transName(value.type.toString())}
                          <br/>
                        </Flex>
                        <Flex fontWeight="300" color="#999">
                           {value.description}
                        </Flex>
                        <Text opacity="0.5" fontSize={["1em", "1em", "1em", "1em"]}>{date}/{month}/{year}</Text>
                        
                      </Box>
                    </Td>
                    <Td display={["none", "none", "none", "revert"]}>
                      {value.tx_id}
                      {/* <Box>
                        <Text borderRadius="10px" bg="#44C768" color="#333" p="2">
                          {value.description}
                        </Text>
                      </Box> */}
                    </Td>
                    <Td>${value.amount}</Td>
                    <Td display={["none", "none", "none", "revert"]}>${value.balance}</Td>
                    {/* <Td display={["none", "none", "none", "revert"]}>${value.fee}</Td> */}
                    <Td><Flex color="green"> <Text fontSize="1em">{(value.amount/btcPriceData.USD?.last).toFixed(8)} </Text> BTC</Flex></Td>

                {/* </Box> */}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

export default TransTable;
