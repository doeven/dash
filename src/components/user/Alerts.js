import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text, Box, Input, Radio, Button, Link, Grid, InputRightElement, InputGroup, RadioGroup } from '@chakra-ui/react';
import { Link as Reactlink } from 'react-router-dom';
import { http } from '../../funcs';
import toastr from 'toastr';
import $ from 'jquery';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Alerts = (props) => {

  const [alertNum, setAlertNum] = useState(1);
  const [perScreen, setPerScreen] = useState(10);
  const [every, setEveryState] = useState({ pagination: {}, alerts: [], alertsD: [] });

  const _alerts = () => {
    let _whole = every.pagination.total / perScreen;
    let _decimal = parseInt(_whole.toString().split('.')[1]);
    return _decimal === 0 || isNaN(_decimal) ? parseInt(_whole) : parseInt(_whole) + 1;
  };

  // Change the Alert Number
  const changeAlert = (alertNum) => {
    setAlertNum(alertNum);
  };

  useEffect(() => {
    http
      .get(`api/alert`)
      .then(({ data }) => {
        const { total, current_page, per_page } = data;
        setEveryState({
          pagination: {
            total: total,
            current_page: current_page,
            pageSize: per_page,
          },
          alerts: data === 'no alerts' ? [] : data.data,
          alertsD: data,
        });

        // Update the Alert Notification for each User
        http
        .patch('/api/user/update/profile', {alert: 0})
        .then(( response ) => {
          console.log('Alert Status Updated');
        })
        .catch((e) => {
        });

      })
      .catch((error) => {
        console.log(error);
      });
  }, [alertNum]);



  // For the Sweet Alerts
  const mySwal = withReactContent(Swal);
  

  return (
    <Flex flex={['2']} direction="column" mr={['0', '0', '10', '10']} mt="0" pb="10">
      
      <Heading width="100%" as="h1" my="10" fontSize={["1.2em", "1.6em", "1.6em", "1.6em"]} textAlign={["center", "center", "left", "left"]}>
        User Alerts (10 Recent Admin Notifications)
      </Heading>


      {every.alerts.map((value, index) => {
        {console.log(value.body)}
            return (<>
              <AlertEach value={value} index={index} />

              </>
              );
            })}


      
<br/>

      
    </Flex>
  );


  function AlertEach({value, index}){
    return (

      <>
        <Flex
          direction="column"
          border="1px solid #e7e7e7"
          bgColor="#fff"
          // width='80vw'
          p={['4', '8']}
          key={index}
        >
          <Text fontSize="1em" borderBottom="1px solid #e7e7e7">
           <strong>{value.title}</strong> <small style={{ color:"red" }}>{value.updated_at}</small>
          </Text>
          {alert && <div dangerouslySetInnerHTML={{ __html: `${value.body}` }} />}
          
        </Flex>
        <br/>

      </>
  
    );
}


};

export default Alerts;
