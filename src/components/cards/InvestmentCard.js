import $ from 'jquery';
import { useState } from 'react';
import {
  Flex,
  Text,
  Heading,
  Box,
  Button,
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
} from '@chakra-ui/react';

import { http, btnProcessing } from '../../funcs';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

const InvestmentCard = ({ item, bgColor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [amount, setAmount] = useState(0);

  const investNow = (e) => {
    e.preventDefault();
    const btn = e.target;
    const prev = btn.innerHTML;

    if (+item.amount < +item.min || +item.amount > +item.max) {
      // Sweet Alert
      mySwal.fire({
        title: <p>Investment Error Alert</p>,
        html: `<p>Amount should be in range ${item.min} to ${item.max}</p>`,
        icon: 'error',
      });
      return;
    }

    btnProcessing(btn, () => {
      http.get('/sanctum/csrf-cookie').then((response) => {
        http
          .post('/api/investment/create', {
            amount: amount,
            package_id: item.id,
            run: 1,
          })
          .then(({ data }) => {
            $('.chakra-modal__close-btn')[0].click();
            if (data === 'Investment Created Successfully') {
              // Sweet Alert
              mySwal.fire({
                title: <p>Investment Alert</p>,
                html: '<p>' + data + '</p>',
                icon: 'success',
              });
            } else {
              // Sweet Alert
              mySwal.fire({
                title: <p>Investment Error</p>,
                html: '<p>' + data + '</p>',
                icon: 'error',
              });
            }
            btn.innerHTML = prev;
            $(btn).attr('disabled', false);
          })
          .catch((error) => {
            console.log(error);
            // Display an info toast with no title
            mySwal.fire({
              title: <p>Investment Alert</p>,
              html: '<p>' + error.response.data.message + '</p>',
              icon: 'error',
            });
            btn.innerHTML = prev;
            $(btn).attr('disabled', false);
          });
      });
    });
  };
  const handleChange = (e) => {
    setAmount(+e.target.value);
  };
  return (
    <>
      <Flex
        direction="column"
        bgColor="#fff"
        cursor="default"
        _hover={{ boxShadow: 'xl', transform: 'translateY(-3px)', transition: 'all .3s' }}
        border="1px solid #bbb"
        borderRadius="6px"
      >
        <Flex justifyContent="center" alignItems="center" p={[10]} bgColor={bgColor} borderRadius="5px  5px 0 0">
          <Heading fontWeight="500" color="white" fontSize={["1.5em", "1.5em", "2.5em", "2.5em"]}>
            ${item.min}-{item.max}
          </Heading>
        </Flex>
        <Text my={[6]} px={[8]} fontWeight="600" fontSize="1.2em">
          {item.title}
        </Text>
        <Flex justifyContent="space-between" px={[8]}>
          <Flex direction="column">
            <Text fontWeight="600" fontSize="1.2em">
              {item.percent}%
            </Text>
            <Text>
              Increment to basic daily <br /> yield
            </Text>
          </Flex>
          <Flex direction="column" ml={[8]}>
            <Text fontWeight="600" fontSize="1.2em">
              {item.time_hours / 24} day(s)
            </Text>
            <Text>Operation period</Text>
          </Flex>
        </Flex>
        <Box mb="6" px={[8]}>
          <Text>{item.bonusCount}</Text>
          <Text>Number of levels by linear bonus</Text>
        </Box>
        <hr />
        <Flex justifyContent="space-between" px={[8]} py={[4]}>
          <Text>Cost</Text>
          <Text fontWeight="600" color="#44C768" fontSize="1.4em">
            ${item.min}
          </Text>
          <Text fontWeight="600" color="#44C768" fontSize="1.4em">
            ${item.max}
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
          Buy
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Investment Request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <Text opacity="0.5">Amount</Text>
            </InputGroup>
            <InputGroup>
              <Input defaultValue={amount} onChange={handleChange}></Input>
            </InputGroup>
            <InputGroup>
              <Button
                    my="4"
                    width="35%"
                    bgColor="#44C768"
                    color="#fff"
                    py={[6]}
                    fontSize="1.1em"
                    fontWeight="600"
                    _hover={{ bgColor: '#4eed7a' }}
                    onClick={investNow}
                  >
                Invest Now
              </Button>
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Text>Invest Now</Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InvestmentCard;
