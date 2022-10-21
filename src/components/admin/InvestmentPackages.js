import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Heading,
  Box,
  Button,
  Switch,
  InputGroup,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Grid,
} from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';
import $ from 'jquery';
import { http, btnProcessing } from '../../funcs';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import EditInvestmentCard from '../cards/EditInvestmentCard';

const mySwal = withReactContent(Swal);

const InvestmentPackages = ({ forced }) => {
  const [packages, setPackages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [percent, setPercent] = useState('');
  const [run, setRun] = useState('');
  const [time, setTime] = useState('');
  const [bonus, setBonus] = useState('');

  useEffect(() => {
    http
      .get(`/api/package`)
      .then(({ data }) => {
        setPackages(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [forced]);

  const createInfo = (e) => {
    e.preventDefault();
    const prev = e.target.innerHTML;
    btnProcessing(e.target, () => {
      http.defaults.withCredentials = true;
      http.get('/sanctum/csrf-cookie').then((response) => {
        // Update PATCH REQUEST
        http
          .post(`api/package`, {
            title: title,
            description: desc,
            img: img,
            min: min,
            max: max,
            percent: percent,
            run: run,
            time_hours: time,
            bonus: bonus,
            status: checked === true ? 1 : 0,
          })
          .then(({ data }) => {
            const closes = $('.chakra-modal__close-btn');
            for (let i = 0; i < closes.length; i++) {
              closes[i].click();
            }

            setChecked(false);
            setTitle('');
            setDesc('');
            setImg('');
            setMin('');
            setMax('');
            setPercent('');
            setRun('');
            setTime('');
            setBonus('');
            // Sweet Alert
            mySwal.fire({
              title: <p>Update Investment Pack</p>,
              html: '<p>' + data.result + '</p>',
              icon: 'success',
            });
            e.target.innerHTML = prev;
            e.target.removeAttribute('disabled');
            forced();
          })
          .catch((error) => console.log('FAILED. ' + error));
      });
    });
  };
  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="10" pb="10" width={['80vw', '60vw']}>
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Box borderBottom="2px solid #44C768" w={['50%', '50%', '25%', '17%']} pb="4">
          <Reactlink to="/admin">Admin</Reactlink>
        </Box>
      </Box>
      <Flex justifyContent="space-between">
        <Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
          Edit Investment Pacakages
        </Heading>
        <Button alignSelf="center" bgColor="#44C768" color="#fff" _hover={{ bgColor: '#4eed7a' }} onClick={onOpen}>
          + New Inv.
        </Button>
      </Flex>
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 7fr)']} gap={8}>
        {packages.map((item) => {
          return <EditInvestmentCard key={item.id} id={item.id} item={item} bgColor="#7F8EA4" reload={forced} />;
        })}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Package</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <Text opacity="0.5">Title</Text>
            </InputGroup>
            <InputGroup>
              <Input defaultValue={title} onChange={(e) => setTitle(e.target.value)}></Input>
            </InputGroup>
            <InputGroup>
              <Text opacity="0.5">Description</Text>
            </InputGroup>
            <InputGroup>
              <Input defaultValue={desc} onChange={(e) => setDesc(e.target.value)}></Input>
            </InputGroup>
            <InputGroup>
              <Text opacity="0.5">Image URL</Text>
            </InputGroup>
            <InputGroup>
              <Input defaultValue={img} onChange={(e) => setImg(e.target.value)}></Input>
            </InputGroup>
            <InputGroup>
              <Text opacity="0.5">Min</Text>
            </InputGroup>
            <InputGroup>
              <Input defaultValue={min} onChange={(e) => setMin(e.target.value)}></Input>
            </InputGroup>
            <InputGroup>
              <Text opacity="0.5">Max</Text>
            </InputGroup>
            <InputGroup>
              <Input defaultValue={max} onChange={(e) => setMax(e.target.value)}></Input>
            </InputGroup>
            <InputGroup>
              <Text opacity="0.5">Percent</Text>
            </InputGroup>
            <InputGroup>
              <Input defaultValue={percent} onChange={(e) => setPercent(e.target.value)}></Input>
            </InputGroup>
            <InputGroup>
              <Text opacity="0.5">Run</Text>
            </InputGroup>
            <InputGroup>
              <Input defaultValue={run} onChange={(e) => setRun(e.target.value)}></Input>
            </InputGroup>
            <InputGroup>
              <Text opacity="0.5">Time (in hours)</Text>
            </InputGroup>
            <InputGroup>
              <Input defaultValue={time} onChange={(e) => setTime(e.target.value)}></Input>
            </InputGroup>
            <InputGroup>
              <Text opacity="0.5">Bonus</Text>
            </InputGroup>
            <InputGroup>
              <Input defaultValue={bonus} onChange={(e) => setBonus(e.target.value)}></Input>
            </InputGroup>
            <InputGroup>
              <Text opacity="0.5">Status</Text>
            </InputGroup>
            <InputGroup>
              <Switch isChecked={checked} onChange={(e) => setChecked(!checked)} />
            </InputGroup>
            <InputGroup>
              <Button my="4" onClick={createInfo}>
                Create Package
              </Button>
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Text>Create a new package</Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default InvestmentPackages;
