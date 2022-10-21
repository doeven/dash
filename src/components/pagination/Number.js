import React, { useEffect, useCallback } from 'react';
import { Flex, Heading, Text, Box, Grid } from '@chakra-ui/react';
import $ from 'jquery';

function Number(props, { changePage }) {
  return (
    <>
      <Flex
        justifyContent="center"
        flex={['2']}
        direction="row"
        mr={['0', '0', '10', '10']}
        mt="5"
        pb="55"
        width={['80vw', '60vw']}
      >
        {/*  <li className="page-item"><a className="page-link" href="#">Prev</a></li> */}
        {props.pages.pages.map((value) => {
          return (
            <li style={{ listStyle: 'none', marginRight: '5px' }}>
              <a
                className="page-link"
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  props.changePage(value);
                  // $('a').removeClass('page-link-active');
                  // $(e.target).addClass('page-link-active');
                }}
              >
                {value}
              </a>
            </li>
          );
        })}
        {/* <li className="page-item"><a className="page-link" href="#">Next</a></li> */}
      </Flex>
    </>
  );
}
export default Number;
