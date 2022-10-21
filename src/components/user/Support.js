import React, { useEffect, useState } from 'react';
import { Flex, Button, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';
import { http, timestampFormatted } from '../../funcs';
import TicketItems from './TicketItems';

const Support = ({ user, props, settings }) => {
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState({});
  // const [showChats, setShowChats] = useState(false);
  const [fTime, setFTime] = useState(false);
  // const [comment, setComment] = useState('');
  // const [refetch, setRefetch] = useState(false);
  const [filter, setFilter] = useState('open');

  // const [date, month, year] = timestampFormatted(currentTicket.created_at);

  // const sender = user.id && `${user.fname} ${user.lname} (You)`;

  // const initials = user.id && `${user.fname[0]}${user.lname[0]}`;
  useEffect(() => {
    http.get(`/api/tickets/mine/${filter}`).then(({ data }) => {
      if (data === 'You do not have any Tickets') {
        setTickets([]);
      } else {
        setTickets(data);
      }
    });
  }, [filter]);
  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="0" pb="10">

      <Button as={Reactlink} to="/support/new" p={[6]} my="6" width="50%" border="1px solid #4eed7a">
        Open new ticket
      </Button>

      <Flex border="1px solid #e7e7e7" bgColor="#fff" direction="column" borderRadius="5px" p="6">
        <Tabs>
          <TabList>
            <Tab onClick={(e) => setFilter('open')}>Active</Tab>
            <Tab onClick={(e) => setFilter('closed')}>Closed</Tab>
            <Tab onClick={(e) => setFilter('all')}>All</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TicketItems items={tickets} />
            </TabPanel>
            <TabPanel>
              <TicketItems items={tickets} />
            </TabPanel>
            <TabPanel>
              <TicketItems items={tickets} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default Support;
