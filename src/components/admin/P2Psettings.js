import React, { useEffect, useState } from 'react';
import { Flex, Heading, Text, Box, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { http, btnProcessing } from '../../funcs';
import $ from 'jquery';
import { Link } from 'react-router-dom';

const P2Psettings = ({ settings }) => {
  const update = (e) => {
    const elem = $(e.target);
    const prev = elem.html();

    let data = {};
    elem
      .closest('div.preview-block')
      .find('input')
      .map((i, v) => {
        data[v.id] = v.value;
      });

    btnProcessing(elem[0], () => {
      http
        .patch('/api/settings/p2p', data)
        .then((res) => {
          console.log(res);
          elem.removeAttr('disabled');
          elem.html(prev);
        })
        .catch((err) => {
          alert('An error occured');
          elem.removeAttr('disabled');
          elem.html(prev);
        });
    });
  };

  const { nplbn, ref_deep_bonus, guiders_bonus } = settings;
  const data = {
    nplbn: nplbn,
    ref_deep_bonus: ref_deep_bonus,
    guiders_bonus: guiders_bonus,
  };

  const toggleCheck = (e) => {
    let checkVal = e.target.checked ? 1 : 0;
    let checkName = e.target.id;

    let data = {};
    data[checkName] = checkVal;

    http
      .patch('/api/settings/p2p', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert('An error occured');
      });
  };

  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="10" pb="10" width={['80vw', '60vw']}>
      <Heading width="100%" as="h1" mb="6" fontSize="1.9em">
        Peer-to-Peer Settings
      </Heading>
      <Text fontWeight="500" fontSize="1.4em">
        Peer-to-Peer Site Settings
      </Text>
      <Text>Edit and change all p2p site settings from this page.</Text>

      <Flex
        border="1px solid #e7e7e7"
        bgColor="#fff"
        direction="column"
        borderRadius="5px"
        p="6"
        my="8"
        fontWeight="bold"
      >
        {/* site identity */}
        <Text fontWeight="700" fontSize="1.2em" mb="4" opacity="0.6">
          P2P SITE CONFIRGURATION
        </Text>
        <Flex mb="8">
          <Box flex="1" mr="8">
            <label mb="4">Site Title</label>
            <InputGroup mt="2" mb="6">
              <Input type="text" placeholder="Edit site name" defaultValue={settings.nplbn_time} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
          </Box>
        </Flex>
        <Flex>
          <Button bgColor="#44C768" _hover={{ bgColor: '#4eed7a' }} color="#fff" width="30%" p={[6]} mr="10" onClick={update}>
            Save
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default P2Psettings;
