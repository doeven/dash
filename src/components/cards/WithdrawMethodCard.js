import React, { useState } from 'react';
import {
  Flex,
  Text,
  Heading,
  Box,
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalBody,
  Switch,
  ModalCloseButton,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Grid,
} from '@chakra-ui/react';
import { http, btnProcessing } from '../../funcs';

const WithdrawMethodCard = ({ item, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentItem, setCurrentItem] = useState({
    name: item.name,
    img: item.img,
    min: item.min,
    max: item.max,
    fixed_fee: item.fixed_fee,
    perc_fee: item.perc_fee,
    exchange: item.exchange,
    val1: item.val1,
    val2: item.val2,
    val3: item.val3,
    currency: item.currency,
    status: item.status,
  });

  const updateInfo = (e) => {
    e.preventDefault();
    const prev = e.target.innerHTML;
    btnProcessing(e.target, () => {
      http.defaults.withCredentials = true;
      http.get('/sanctum/csrf-cookie').then((response) => {
        // Update PATCH REQUEST
        http
          .patch(`api/gateway/${item.id}`, {
            name: currentItem.name,
            img: currentItem.img,
            min: currentItem.min,
            max: currentItem.max,
            fixed_fee: currentItem.fixedFee,
            perc_fee: currentItem.percFee,
            exchange: currentItem.exchange,
            val1: currentItem.val1,
            val2: currentItem.val2,
            val3: currentItem.val3,
            currency: currentItem.currency,
            status: currentItem.status,
          })
          .then((response) => {
            e.target.innerHTML = prev;
            e.target.removeAttribute('disabled');
            reload();
          })
          .catch((error) => console.log('FAILED. ' + error));
      });
    });
  };

  return (
    <Flex
      direction="column"
      bgColor="#fff"
      cursor="default"
      _hover={{ boxShadow: 'xl', transform: 'translateY(-3px)', transition: 'all .3s' }}
    >
      <Flex justifyContent="center" alignItems="center" p={[10]} bgColor="#44C768" borderRadius="5px  5px 0 0">
        <Heading fontWeight="500" color="white" fontSize="3.5em">
          {item.name[0]}
        </Heading>
      </Flex>
      <Text my={[6]} px={[8]} fontWeight="600" fontSize="1.2em">
        {item.name}
      </Text>
      <Flex justifyContent="space-between" px={[8]}>
        <Flex direction="column">
          <Text>Fixed fee:</Text>
          <Text fontWeight="600" fontSize="1.2em">
            {item.fixed_fee}
          </Text>
        </Flex>
        <Flex direction="column" ml={[8]}>
          <Text>Percent fee:</Text>
          <Text fontWeight="600" fontSize="1.2em">
            {item.perc_fee}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="column" ml={[8]}>
        <Text>Exchange:</Text>
        <Text fontWeight="600" fontSize="1.2em">
          {item.exchange}
        </Text>
      </Flex>
      <Flex my={[8]}>
        <Box px={[8]}>
          <Text fontWeight="600" fontSize="1.2em">
            ${item.min}
          </Text>
          <Text>Min</Text>
        </Box>
        <Box mb="6" px={[8]}>
          <Text fontWeight="600" fontSize="1.2em">
            ${item.max}
          </Text>
          <Text>Max</Text>
        </Box>
      </Flex>
      <hr />
      <Flex justifyContent="space-between" px={[8]} py={[4]}>
        <Text>Status</Text>
        <Text fontWeight="600" color="#44C768" fontSize="1.4em">
          {item.status === 1 ? 'Active' : 'InActive'}
        </Text>
      </Flex>
      <Button
        borderRadius=" 0 0 5px  5px"
        bgColor="#44C768"
        color="#fff"
        py={[8]}
        fontSize="1.2em"
        fontWeight="600"
        _hover={{ bgColor: '#4eed7a' }}
        onClick={onOpen}
      >
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} backgroundColor="#fff" isCentered={true} size="xl">
        <ModalOverlay />

        <ModalContent p="6">
          <ModalHeader borderBottom="none" fontSize="1.5em">
            Update Payment Gateway
          </ModalHeader>
          <ModalCloseButton color="#ff0000" />
          <ModalBody>
            <FormControl>
              <FormLabel>Donation Package Title</FormLabel>
              <Input
                placeholder="Enter Gateway Name"
                defaultValue={currentItem.name}
                onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image Url</FormLabel>
              <Input
                placeholder="Enter Image URL"
                defaultValue={currentItem.img}
                onChange={(e) => setCurrentItem({ ...currentItem, img: e.target.value })}
              />
            </FormControl>
            <Flex my="8">
              <FormControl mr="6">
                <FormLabel>Min. Amount (USD)</FormLabel>
                <Input
                  placeholder="100"
                  defaultValue={currentItem.min}
                  onChange={(e) => setCurrentItem({ ...currentItem, min: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Max. Amount (USD)</FormLabel>
                <Input
                  placeholder="1000"
                  defaultValue={currentItem.max}
                  onChange={(e) => setCurrentItem({ ...currentItem, max: e.target.value })}
                />
              </FormControl>
            </Flex>
            <Grid templateColumns={['repeat(2, 3fr)', 'repeat(3, 2fr)']} gap={2}>
              <FormControl>
                <FormLabel>Fixed Fee</FormLabel>
                <Input
                  placeholder="0.00"
                  defaultValue={currentItem.fixed_fee}
                  onChange={(e) => setCurrentItem({ ...currentItem, fixed_fee: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Perc Fee</FormLabel>
                <Input
                  placeholder="0"
                  defaultValue={currentItem.perc_fee}
                  onChange={(e) => setCurrentItem({ ...currentItem, perc_fee: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Ex. Rate (USD)</FormLabel>
                <Input
                  placeholder="1.0"
                  defaultValue={currentItem.exchange}
                  onChange={(e) => setCurrentItem({ ...currentItem, exchange: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Val 1</FormLabel>
                <Input
                  placeholder="dfed-a4c3-9d75-c24d"
                  defaultValue={currentItem.val1}
                  onChange={(e) => setCurrentItem({ ...currentItem, val1: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Val 2</FormLabel>
                <Input
                  placeholder="12344567"
                  defaultValue={currentItem.val2}
                  onChange={(e) => setCurrentItem({ ...currentItem, val2: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Val 3</FormLabel>
                <Input
                  placeholder="0"
                  defaultValue={currentItem.val3}
                  onChange={(e) => setCurrentItem({ ...currentItem, val3: e.target.value })}
                />
              </FormControl>
            </Grid>
            <FormControl my="8">
              <FormLabel>Currency</FormLabel>
              <Input
                placeholder="USD"
                defaultValue={currentItem.currency}
                onChange={(e) => setCurrentItem({ ...currentItem, currency: e.target.value })}
              />
            </FormControl>
            <FormControl display="flex">
              <Switch
                size="lg"
                mr="4"
                isChecked={currentItem.status === 1 ? true : false}
                onChange={(e) => setCurrentItem({ ...currentItem, status: currentItem.status === 1 ? 0 : 1 })}
              />
              <FormLabel>Activate (OFF/ON)</FormLabel>
            </FormControl>

            <Flex mt="6">
              <Button mr="8" colorScheme="blue" onClick={updateInfo}>
                Update Gateway
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default WithdrawMethodCard;
