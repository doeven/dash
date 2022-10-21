import React, { useEffect, useState } from 'react';
import { http } from '../../funcs';
import TicketItems from './TicketItems';
import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';

const ViewSupport = (props) => {
  const [tickets, setTickets] = useState([]);

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    http.get('/api/tickets/' + filter).then(({ data }) => {
      if (data === 'You do not have any Tickets') {
        setTickets([]);
      } else {
        setTickets(data);
      }
    });
  }, []);

  const changeFilter = (e, active) => {
    e.preventDefault();
    setFilter(active);
  };

  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="10" pb="10" width={['80vw', '60vw']}>
      
      

      <Flex border="1px solid #e7e7e7" bgColor="#fff" direction="column" borderRadius="5px" p="6">
        <Tabs>
          <TabList>
            <Tab onClick={(e) => changeFilter(e, 'active')}>Active</Tab>
            <Tab onClick={(e) => changeFilter(e, 'closed')}>Closed</Tab>
            <Tab onClick={(e) => changeFilter(e, 'all')}>All</Tab>
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

export default ViewSupport;
