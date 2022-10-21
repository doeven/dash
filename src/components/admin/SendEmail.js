import React, { useState, useEffect } from 'react';
import { http, btnProcessing } from '../../funcs';
import $ from 'jquery';
import { Editor } from '@tinymce/tinymce-react';
import { Flex, Heading, Button, Input, Box } from '@chakra-ui/react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function SendEmail(props) {
  const [email, setEmail] = useState({
    subject:'',
    message:'',
});

const handleOnChange = e=>{
    const name = $(e.target).attr('name');
    const value = $(e.target).val();

    const data = {...email}
    data[name] = value;
    setEmail(data);
}

const handleEditorChange = (content, editor) => {
    const data = {...email}
    // console.log('Content was updated:', content);
    data['message'] = content;
    setEmail(data);
}

  const handleOnSubmit = e => {
    e.preventDefault();
    const prev = e.target.innerHTML;
    btnProcessing(e.target, ()=>{
    http.post('api/admin/email/all/users', email).then( response => {
        e.target.innerHTML = prev;
        e.target.removeAttribute('disabled');
        MySwal.fire({
            title: <p>Email Alert</p>,
            html: '<p>'+response.data+'</p>',
            icon: 'success',
        })
    })
    .catch(error => { 
        e.target.innerHTML = prev;
        e.target.removeAttribute('disabled');
        MySwal.fire({
            title: <p>Email Alert</p>,
            html: '<p>'+error.response.data.message+'</p>',
            icon: 'error',
        })
    });
    })
}

  return (
    <Flex mb="10" minHeight="100vh" direction="column">
      <Flex color="#333" mt="10">
        <Heading as="h4">Send Bulk Email</Heading>
      </Flex>
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Input
          my="4"
          type="text"
          id="subject"
          name="subject"
          placeholder="Email Subject"
          defaultValue={email.subject}
          onChange={handleOnChange}
        />

        <Editor
          value={email.message}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat | help',
          }}
          onEditorChange={handleEditorChange}
        />

        <Button
          color="white"
          bgColor="green"
          mb="3"
          style={{ display: 'block' }}
          _hover={{ bgColor: 'green.500' }}
          onClick={handleOnSubmit}
        >
          Send Email
        </Button>
      </Box>
    </Flex>
  );
}

export default SendEmail;
