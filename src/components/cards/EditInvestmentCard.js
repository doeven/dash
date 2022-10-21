import $ from 'jquery';
import { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';

import { http, btnProcessing } from '../../funcs';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

const InvestmentCard = ({ item, bgColor, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState(false);
  const [desc, setDesc] = useState(false);
  const [img, setImg] = useState(false);
  const [min, setMin] = useState(false);
  const [max, setMax] = useState(false);
  const [percent, setPercent] = useState(false);
  const [run, setRun] = useState(false);
  const [time, setTime] = useState(false);
  const [bonus, setBonus] = useState(false);

  useEffect(() => {
    setChecked(item.status === 0 ? false : true);
    setTitle(item.title);
    setDesc(item.description);
    setImg(item.img);
    setMin(item.min);
    setMax(item.max);
    setPercent(item.percent);
    setRun(item.run);
    setTime(item.time_hours);
    setBonus(item.bonus);
  }, [item]);

  const updateInfo = (e) => {
    e.preventDefault();
    const prev = e.target.innerHTML;
    btnProcessing(e.target, () => {
      http.defaults.withCredentials = true;
      http.get('/sanctum/csrf-cookie').then((response) => {
        // Update PATCH REQUEST
        http
          .patch(`api/package/${item.id}`, {
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
            // Sweet Alert
            mySwal.fire({
              title: <p>Update Investment Pack</p>,
              html: '<p>' + data.result + '</p>',
              icon: 'success',
            });
            e.target.innerHTML = prev;
            e.target.removeAttribute('disabled');
            reload();
          })
          .catch((error) => console.log('FAILED. ' + error));
      });
    });
  };

  return (
    <>
      <Flex
        direction="column"
        bgColor="#fff"
        cursor="default"
        _hover={{ boxShadow: 'xl', transform: 'translateY(-3px)', transition: 'all .3s' }}
      >
        <Flex justifyContent="center" alignItems="center" p={[10]} bgColor={bgColor} borderRadius="5px  5px 0 0">
          <Heading fontWeight="500" color="white" fontSize="3.5em">
            ${min}-{max}
          </Heading>
        </Flex>
        <Text my={[6]} px={[8]} fontWeight="600" fontSize="1.2em">
          {title}
        </Text>
        <Flex justifyContent="space-between" px={[8]}>
          <Flex direction="column">
            <Text fontWeight="600" fontSize="1.2em">
              {percent}%
            </Text>
            <Text>
              Increment to basic daily <br /> yield
            </Text>
          </Flex>
          <Flex direction="column" ml={[8]}>
            <Text fontWeight="600" fontSize="1.2em">
              {time / 24} day(s)
            </Text>
            <Text>Operation period</Text>
          </Flex>
        </Flex>
        <Box mb="6" px={[8]}>
          <Text>{bonus}</Text>
          <Text>Number of levels by linear bonus</Text>
        </Box>
        <hr />
        <Flex justifyContent="space-between" px={[8]} py={[4]}>
          <Text>Cost</Text>
          <Text fontWeight="600" color="#44C768" fontSize="1.4em">
            ${min}
          </Text>
          <Text fontWeight="600" color="#44C768" fontSize="1.4em">
            ${max}
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
          EDIT
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Package</ModalHeader>
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
              <Button my="4" onClick={updateInfo}>
                Update Info
              </Button>
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Text>Update Info</Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InvestmentCard;
