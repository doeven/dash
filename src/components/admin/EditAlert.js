import React, { useState, useEffect } from 'react';
import { http, btnProcessing } from '../../funcs';
import $ from 'jquery';
import { Editor } from '@tinymce/tinymce-react';
import { Flex, Heading, Button, Input, Box } from '@chakra-ui/react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

function EditAlert({ location, history }) {
  const [alert, setAlert] = useState({
    title: '',
    body: '',
    slug: '',
    meta_title: '',
    meta_desc: '',
  });

  useEffect(() => {
    http
      .get(`api/alert/${location.state.id}`)
      .then(({ data }) => {
        setAlert({ ...data });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location.state.id]);

  const handleOnChange = (e) => {
    const name = $(e.target).attr('name');
    const value = $(e.target).val();

    const data = { ...alert };
    data[name] = value;
    setAlert(data);
  };
  const handleEditorChange = (content, editor) => {
    const data = { ...alert };
    console.log('Content was updated:', content);
    data['body'] = content;
    setAlert(data);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const prev = e.target.innerHTML;
    btnProcessing(e.target, () => {
      http
        .patch(`api/alert/${location.state.id}`, alert)
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
        <Heading as="h4">Edit Alert: {alert.title}</Heading>
      </Flex>
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Input
          my="4"
          type="text"
          id="title"
          name="title"
          placeholder="Enter Alert Title"
          defaultValue={alert.title}
          onChange={handleOnChange}
        />

        <Editor
          value={alert.body}
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
          placeholder="Enter the Alert Slug"
          defaultValue={alert.slug}
          onChange={handleOnChange}
        />

        <Input
          my="4"
          type="text"
          id="meta_title"
          name="meta_title"
          placeholder="Enter the Alert Meta title"
          defaultValue={alert.meta_title}
          onChange={handleOnChange}
        />

        <Input
          my="4"
          type="text"
          id="meta_desc"
          name="meta_desc"
          placeholder="Enter the Alert Meta Description"
          defaultValue={alert.meta_desc}
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
          Update Alert
        </Button>
      </Box>
    </Flex>
  );
}

export default EditAlert;
