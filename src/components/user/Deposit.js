import React from 'react';
import { Flex, Heading, Text, Box, Input, Select, Grid, Button, Textarea } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postProcessed, depositFund, transferFund, btnProcessing } from '../../funcs';
import $ from 'jquery';

import { QRCode } from 'react-qr-svg';


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

const Deposit = (props) => {
  const [btcPrice, setBtcPrice] = useState([]);

  
  
  useEffect(() => {
    axios
      .get('https://www.blockchain.com/ticker')
      .then((response) => {
        console.log((1 / response.data.USD.last).toFixed(8));
        setBtcPrice((1 / response.data.USD.last).toFixed(8));
        props.forced();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // For the Sweet Alerts
  const mySwal = withReactContent(Swal);

  const deposit = (e) => {
    const prev = e.target.innerHTML;
    const elem = e.target;
    // Create the Anchor Link Element
    btnProcessing(elem, async () => {
      const dataBack = await depositFund(e);

      if (dataBack.error) {
        // Sweet Alert
        mySwal.fire({
          title: <p>Error</p>,
          html: `<p>An error occurred. Try Again</p>`,
          footer: 'An error occured',
          icon: 'error',
        });
      } else {
        // Sweet Alert
        console.log(dataBack);
        if (dataBack.address === 'CoinGate') {
          let pay_url = dataBack.coingate.payment_url;
          window.location = pay_url;
        }

        mySwal.fire({
          title: <p>Send Your Payment</p>,
          html: `Make Payment to the adress below<br/><br/><img src="http://api.qrserver.com/v1/create-qr-code/?data=${dataBack.address}&size=150x150&bgcolor=ffffff" alt="" style="margin: 0 auto"/><br/>Address: ${dataBack.address}<br/><br/>BTC Amount: ${dataBack.btc_amount} BTC (${dataBack.total} USD)<br/><br/>Fee: $${dataBack.fee} (${dataBack.percentage}% Trans. fee + $${dataBack.fixed_fee} fixed fee.)<br\>`,
          footer: `<p>Deposit the above amount BTC to the address & have your account balance credited.</p>`,
          icon: 'success',
        });
      }

      elem.removeAttribute('disabled');
      elem.innerHTML = prev;
    });

    props.forced();
  };

  const transfer = (e) => {
    const prev = e.target.innerHTML;
    const elem = e.target;
    // Create the Anchor Link Element
    btnProcessing(elem, async () => {
      const dataBack = await transferFund(e);

      if (dataBack.data.status === 'error') {
        console.log(dataBack.data.result);
        // Sweet Alert
        mySwal.fire({
          title: <p>Error</p>,
          html: `<p>${dataBack.data.result}</p>`,
          footer: 'An error occured',
          icon: 'error',
        });
      } else {
        // Sweet Alert
        console.log(dataBack);
        mySwal.fire({
          title: <p>Transfer Successful</p>,
          html: `User has been Credited`,
          footer: `<p>Deposited.</p>`,
          icon: 'success',
        });
      }

      elem.removeAttribute('disabled');
      elem.innerHTML = prev;
    });

    props.forced();
  };
  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="0" pb="10">
      
      <Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
        Deposit Fund
      </Heading>

      <Flex direction="column" border="1px solid #e7e7e7" bgColor="#fff" p={['4', '8']}>
        <Text my="6" fontSize="1.2em" fontWeight="600">
          Deposit to your Wallet
        </Text>
        <Flex>
          <Box mr="10">
            <label>Specify Amount:</label>
            <Input type="text" id="amount" />
          </Box>
          <input type="hidden" id="gateway_id" name="gateway_id" value={props.settings.dp} />
          <Box>
            <label>Denomination:</label>
            <Select defaultValue="BTC">
              <option value="BTC">BTC </option>\
            </Select>
          </Box>
        </Flex>

        <Button
          my="8"
          // width="35%"
          bgColor="#44C768"
          color="#fff"
          py={[6]}
          fontSize="1.1em"
          fontWeight="600"
          _hover={{ bgColor: '#4eed7a' }}
          onClick={(e) => deposit(e)}
        >
          Make Deposit
        </Button>
        <Box>
          <Text fontSize="1em" fontWeight="500" opacity="0.5">
            Top-up of the Transaction wallet is an irreversible process. Your Transaction wallet can be used to send
            transfers to other partners or buy investment products.
          </Text>
        </Box>
      </Flex>
      {/* cards */}

      
      {/*<Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
        Internal Transfers
      </Heading> */}

{/*
      <Flex direction="column" border="1px solid #e7e7e7" bgColor="#fff" p={['4', '8']}>
        <Text my="6" fontSize="1.2em" fontWeight="600">
          Transfer of funds to a partner
        </Text>
        <Flex>
          <Box mr="10">
            <label>Partner Username:</label>
            <Input type="text" id="rec-username" />
            <label>Specify Amount:</label>
            <Input type="number" id="rec-amount" />
          </Box>
        </Flex>

        <Box mt="6">
          <Text fontSize="1em" fontWeight="400" opacity="0.5">
            You can transfer funds only to other users on the platform, using their user names.
            <br />
          </Text>
        </Box>
        <Button
          my="8"
          width="35%"
          bgColor="#44C768"
          color="#fff"
          py={[6]}
          fontSize="1.1em"
          fontWeight="600"
          _hover={{ bgColor: '#4eed7a' }}
          onClick={transfer}
        >
          Make a transaction
        </Button>
      </Flex>
      */}
    </Flex>
  );
};

export default Deposit;
