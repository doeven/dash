import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

import {notifPointer, transURL, timestampFormatted} from '../../funcs';




function NotificationItem(props) {
    return (
        <>
        {  props.notifItem.map(value => {
        const [date, month, year, timeValue] = timestampFormatted(value.created_at);
                return  <a href={transURL(String(value.type))} key={value.id}>
                                <Flex direction="row" p="5px" borderBottom="1px solid #ddd">
                                    <Box direction="column" p="5px">
                                        {notifPointer(value.type)}
                                    </Box>
                                    <Box  direction="column" px="3px">
                                        <Text fontSize="15px" fontWeight="bold">{value.description}</Text>
                                        <Text fontSize="12px" color="#999">{`${date} ${month} ${year} ${timeValue} `}</Text>
                                    </Box>
                                </Flex>
                        </a>
        }) }
        </>
    );
}


export default NotificationItem;