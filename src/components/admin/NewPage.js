import React, { useState, useEffect } from 'react';
import { http, btnProcessing } from '../../funcs';
import $ from 'jquery';
import { Editor } from '@tinymce/tinymce-react';
import { Flex, Heading, Button, Input, Box } from '@chakra-ui/react';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const mySwal = withReactContent(Swal);

function NewPage({ history }) {
  const [page, setPage] = useState({
    title: '',
    body: '',
    slug: '',
    meta_title: '',
    meta_desc: '',
  });

  const handleOnChange = (e) => {
    const name = $(e.target).attr('name');
    const value = $(e.target).val();

    const data = { ...page };
    data[name] = value;
    setPage(data);
  };
  const handleEditorChange = (content, editor) => {
    const data = { ...page };
    console.log('Content was updated:', content);
    data['body'] = content;
    setPage(data);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const prev = e.target.innerHTML;
    btnProcessing(e.target, () => {
      http
        .post(`api/page/`, page)
        .then(({ data }) => {
          mySwal
            .fire({
              title: <p>Updated</p>,
              html: `<p>${data.result}</p>`,
              icon: 'success',
            })
            .then(() => {
              history.push(`/admin/pages`);
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
        <Heading as="h4">Create a Page</Heading>
      </Flex>
      <Box border="1px solid #e7e7e7" bgColor="#fff" px="4" pt="4" borderRadius="5px">
        <Input
          my="4"
          type="text"
          id="title"
          name="title"
          placeholder="Enter Page Title"
          defaultValue={page.title}
          onChange={handleOnChange}
        />

        <Editor
          value={page.body}
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
          placeholder="Enter the Page Slug"
          defaultValue={page.slug}
          onChange={handleOnChange}
        />

        <Input
          my="4"
          type="text"
          id="meta_title"
          name="meta_title"
          placeholder="Enter the Page Meta title"
          defaultValue={page.meta_title}
          onChange={handleOnChange}
        />

        <Input
          my="4"
          type="text"
          id="meta_desc"
          name="meta_desc"
          placeholder="Enter the Page Meta Description"
          defaultValue={page.meta_desc}
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
          Create Page
        </Button>
      </Box>
    </Flex>
  );
}

export default NewPage;
