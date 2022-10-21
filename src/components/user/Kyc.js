import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text, Box, Input, Button, Select, FormControl } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';
import { http, submitKYCData, btnProcessing } from '../../funcs';
import $ from 'jquery';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// For the Sweet Alerts
const mySwal = withReactContent(Swal);

const Kyc = (props) => {
  const [kycData, setKycData] = useState([]);
  const [counter, setCounter] = useState(true);

  useEffect(() => {
    http
      .get('/api/kyc/logged/user')
      .then(({ data }) => {
        setKycData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [counter]);

  const submitKYC = (e) => {
    const prev = e.target.innerHTML;
    const elem = e.target;

    let fd = new FormData(e.target);

  //   for (var value of fd.entries()) {
  //     console.log(value[0]+ ', '+ value[1] + ' ' + typeof(value[1]));
  //  }

  //  return;

    btnProcessing(elem, async () => {
      const dataBack = await submitKYCData(fd);
      if (dataBack.error) {
        console.log(dataBack.error);
        // Sweet Alert
        mySwal.fire({
          title: <p>Error</p>,
          html: `<p>Make sure all fields are correctly filled, and image must be not more than 2MB in any of (jpeg,png,jpg) format</p>`,
          footer: 'An error occured',
          icon: 'error',
        });
      } else {
        // Sweet Alert
        mySwal.fire({
          title: <p>KYC Uploaded</p>,
          html: `${dataBack}</br>`,
          footer: `<p>Uploaded Successfully. Wait for review</p>`,
          icon: 'success',
        });
        $('#kyc-form')[0].reset();
        setCounter(!counter);
      }

      elem.removeAttribute('disabled');
      elem.innerHTML = prev;
    });

    props.forced();
  };

  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="0" pb="10">
      
      <Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
        Update KYC Document
      </Heading>

      <Flex
        direction="column"
        border="1px solid #e7e7e7"
        bgColor="#fff"
        // width='80vw'
        p={['4', '8']}
      >
        <Text my="6" fontSize="1.2em" fontWeight="600">
          Update KYC Document
        </Text>

        {kycData.length === 0 ? (
          <Form />
        ) : kycData.length === undefined && kycData.status === 0 ? (
          <Pending />
        ) : kycData.length === undefined && kycData.status === 1 ? (
          <Approved />
        ) : kycData.length === undefined && kycData.status === 2 ? (
          <>
            <Rejected /> <Form />
          </>
        ) : null}
      </Flex>
    </Flex>
  );

  function Form() {
    return (
      <form action="#" encType="multipart/form-data" id="kyc-form" onSubmit={submitKYC}>
        <Flex direction={['column']}>
          <Box>
            <label>Select Document Type:</label>
            <FormControl>
              <Select id="type" name="type">
                <option>Select Document Type</option>
                <option defaultValue="1" value="1">
                  International Passport
                </option>
                <option defaultValue="2" value="2">
                  National ID
                </option>
                <option defaultValue="3" value="3">
                  Drivers License
                </option>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <label>Select Front Image:</label>
            <FormControl>
              <Input type="file" id="front" name="front" />
            </FormControl>
          </Box>

          <Box>
            <label>Select Back Image:</label>
            <FormControl>
              <Input type="file" id="back" name="back" />
            </FormControl>
          </Box>

          <Box>
            <label>Enter ID. Number:</label>
            <FormControl>
              <Input type="text" id="number" name="number" />
            </FormControl>
          </Box>
        </Flex>

        <Button
          my="8"
          width={['50%', '25%']}
          bgColor="#44C768"
          color="#fff"
          py={[6]}
          fontSize="1.1em"
          fontWeight="600"
          _hover={{ bgColor: '#4eed7a' }}
          type="submit"
        >
          Submit KYC Data
        </Button>
      </form>
    );
  }

  function Pending() {
    return (
      <div className="buysell wide-xs m-auto">
        <div className="buysell-title text-center">
          <h2 className="title">Your Submitted KYC is under review. </h2>
        </div>
      </div>
    );
  }

  function Approved() {
    return (
      <div className="buysell wide-xs m-auto">
        <div className="buysell-title text-center">
          <h2 className="title">Hurray! Your Submitted KYC has been approved.</h2>
        </div>
      </div>
    );
  }

  function Rejected() {
    return (
      <div className="buysell wide-xs m-auto">
        <div className="alert alert-danger buysell-title text-center">
          <h6 className="title">Your Submitted KYC is was rejected. Use the Form Below to Submit a Valid Dcoument. </h6>
        </div>
      </div>
    );
  }
};

export default Kyc;
