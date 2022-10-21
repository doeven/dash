import React, { useEffect, useState } from 'react';
import { http, btnProcessing } from '../../funcs';
import { Flex, Heading, Text, Box, Input, InputGroup, InputRightElement, Button, Select } from '@chakra-ui/react';
import $ from 'jquery';
import { AiOutlineHome } from 'react-icons/ai';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

const SiteSettings = ({ settings }) => {
  const [depoitGateway, setDepoitGateway] = useState(settings.dp);

  const update = (e) => {
    const elem = $(e.target);
    const prev = elem.html();

    let data = { dp: depoitGateway };
    elem
      .closest('#site-s')
      .find('input')
      .map((i, v) => {
        data[v.id] = v.value;
      });

    btnProcessing(elem[0], () => {
      http
        .patch('/api/settings', data)
        .then(({ data }) => {
          console.log(data);

          // Sweet Alert
          mySwal.fire({
            title: <p>Settings Update</p>,
            html: `<p>${data.result}</p>`,
            icon: 'success',
          });

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

  const purgeCache = (e) => {
    const elem = $(e.target);
    const prev = elem.html();

    btnProcessing(elem[0], () => {
      http
        .get('/api/settings/purge')
        .then((res) => {
          console.log(res);

          // Sweet Alert
          mySwal.fire({
            title: <p>Cache Update</p>,
            html: `<p>${res.data.result}</p>`,
            icon: 'success',
          });

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

  const { email_toggle, sms_toggle, ref_deep_bonus, user_level_bonus } = settings;
  const data = {
    email_toggle: email_toggle,
    sms_toggle: sms_toggle,
    ref_deep_bonus: ref_deep_bonus,
    user_level_bonus: user_level_bonus,
  };

  const toggleCheck = (e) => {
    let checkVal = e.target.checked ? 1 : 0;
    let checkName = e.target.id;

    let data = {};
    data[checkName] = checkVal;

    http
      .patch('/api/settings', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert('An error occured');
      });
  };
  useEffect(() => {
    for (let i in data) {
      if (data[i] === 1 ? true : false) {
        $(`#${i}`).attr('checked', '');
      }
    }
  }, [settings]);
  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="10" pb="10" width={['80vw', '60vw']}>
      <Heading width="100%" as="h1" mb="6" fontSize="1.9em">
        Settings
      </Heading>
      <Text fontWeight="500" fontSize="1.4em">
        Site Settings
      </Text>
      <Text>Edit and change all site settings from this page.</Text>

      <Flex
        id="site-s"
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
          SITE IDENTITY
        </Text>
        <Flex mb="8">
          <Box flex="1" mr="8">
            <label mb="4">Site Title</label>
            <InputGroup mt="2" mb="6">
              <Input id="title" type="text" placeholder="Edit site name" defaultValue={settings.title} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
            <label>Site Email</label>
            <InputGroup mt="2" mb="6">
              <Input id="email" type="email" placeholder="brand@brand.com" defaultValue={settings.email} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
            <label mb="4">Address</label>
            <InputGroup mt="2">
              <Input id="address" type="text" placeholder="Address" defaultValue={settings.address} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
          </Box>
          <Box flex="1">
            <label mb="4">Site Tagline</label>
            <InputGroup mt="2" mb="6">
              <Input id="tagline" type="text" placeholder="Edit tagline" defaultValue={settings.tagline} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
            <label>Phone Number</label>
            <InputGroup mt="2" mb="6">
              <Input id="mobile" type="tel" placeholder="Mobile" defaultValue={settings.mobile} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
            <label mb="4">Logo URL</label>
            <InputGroup mt="2">
              <Input id="logo" type="text" placeholder="logo.png" defaultValue={settings.logo} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
          </Box>
        </Flex>
        <hr />
        {/* socials */}
        <Text fontWeight="700" mt="6" mb="4" opacity="0.6" fontSize="1.2em">
          SOCIALS
        </Text>
        <Flex mb="8">
          <Box flex="1" mr="8">
            <label mb="4">Facebook URL</label>
            <InputGroup mt="2" mb="6">
              <Input id="facebook" type="text" placeholder="facebook" defaultValue={settings.facebook} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
            <label>Linkedin URL</label>
            <InputGroup mt="2" mb="6">
              <Input id="linkedin" type="text" placeholder="LinkedIn" defaultValue={settings.linkedin} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
            <label mb="4">Youtube URL</label>
            <InputGroup mt="2">
              <Input id="youtube" type="text" placeholder="youtube.com" defaultValue={settings.youtube} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
          </Box>
          <Box flex="1">
            <label mb="4">Twitter URL</label>
            <InputGroup mt="2" mb="6">
              <Input id="twitter" type="text" placeholder="Twitter" defaultValue={settings.twitter} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
            <label>Instagram URL</label>
            <InputGroup mt="2" mb="6">
              <Input id="instagram" type="text" placeholder="Instagram" defaultValue={settings.instagram} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
          </Box>
        </Flex>
        <hr />
        {/* transaction settings */}
        <Text mt="6" fontWeight="700" mb="4" opacity="0.6" fontSize="1.2em">
          TRANSACTION SETTINGS
        </Text>
        <Flex mb="4">
          <Box flex="1" mr="8">
            <label mb="4">Minimum Withdrawal Amount</label>
            <InputGroup mt="2" mb="6">
              <Input id="min_wd" type="number" placeholder="200" defaultValue={settings.min_wd} />
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
          </Box>
          <Box flex="1">
            <label mb="4">Deposit Gateway</label>
            <InputGroup mt="2" mb="6">
              <Select id="dp" defaultValue={settings.dp} onChange={(e) => setDepoitGateway(e.target.value)}>
                <option value="1">Block.IO</option>
                <option value="4">AlfaCoins</option>
                <option value="5">CoinGate</option>
              </Select>
              <InputRightElement pointerEvents="none" children={<AiOutlineHome color="gray.300" />} />
            </InputGroup>
          </Box>
        </Flex>
        <Flex>
          <Button
            bgColor="#44C768"
            _hover={{ bgColor: '#4eed7a' }}
            color="#fff"
            width="30%"
            p={[6]}
            mr="10"
            onClick={update}
          >
            Save Settings
          </Button>
          <Button p={[6]} border="1px solid #4eed7a" onClick={purgeCache}>
            Purge Cache
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SiteSettings;
