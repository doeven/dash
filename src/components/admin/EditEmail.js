import React, { useState, useEffect } from 'react';
import { http, btnProcessing } from '../../funcs';
import $ from 'jquery';
import { Editor } from '@tinymce/tinymce-react';
import { Flex, Heading, Button, Input, Box } from '@chakra-ui/react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

function EditEmail({ location, history }) {
  const [email, setEmail] = useState({
    title: '',
    body: '',
    slug: '',
  });

  useEffect(() => {
    http
      .get(`api/email/${location.state.id}`)
      .then((response) => {
        setEmail({ ...response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location.state.id]);

  const handleOnChange = (e) => {
    const name = $(e.target).attr('name');
    const value = $(e.target).val();

    const data = { ...email };
    data[name] = value;
    setEmail(data);
  };
  const handleEditorChange = (content, editor) => {
    const data = { ...email };
    console.log('Content was updated:', content);
    data['body'] = content;
    setEmail(data);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const prev = e.target.innerHTML;
    btnProcessing(e.target, () => {
      http
        .patch(`api/email/${location.state.id}`, email)
        .then(({ data }) => {
          mySwal
            .fire({
              title: <p>Updated</p>,
              html: `<p>${data.result}</p>`,
              icon: 'success',
            })
            .then(() => {
              history.push(`/admin/emails`);
            });
          e.target.innerHTML = prev;
          e.target.removeAttribute('disabled');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <Flex mb="10" minHeight="100vh" direction="column">
      <Flex color="#333" mt="10">
        <Heading as="h4">Edit Email: {email.title}</Heading>
      </Flex>
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Input
          my="4"
          type="text"
          id="title"
          name="title"
          placeholder="Enter Email Title"
          defaultValue={email.title}
          onChange={handleOnChange}
        />

        <Editor
          value={email.body}
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

        <Input
          my="4"
          type="text"
          id="slug"
          name="slug"
          placeholder="Enter the Email Slug"
          defaultValue={email.slug}
          onChange={handleOnChange}
        />

        <Button
          color="white"
          bgColor="green"
          mb="3"
          style={{ display: 'block' }}
          _hover={{ bgColor: 'green.500' }}
          onClick={handleOnSubmit}
        >
          Update Email
        </Button>
      </Box>
    </Flex>
  );
}

export default EditEmail;
