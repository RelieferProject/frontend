import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Resizer from 'react-image-file-resizer';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Image } from 'antd';

interface Props {
  fileList: string[];
  setFileList: React.Dispatch<React.SetStateAction<string[]>>;
}

const TestWrapper = styled.div``;

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      400,
      'JPEG',
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64'
    );
  });

const dataURIToBlob = (dataURI) => {
  const splitDataURI = dataURI.split(',');
  const byteString =
    splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
  return new Blob([ia], { type: mimeString });
};

function Test(props: Props) {
  const [loading, setLoading] = useState(false);
  const input_file = useRef();
  const onChange = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const image = await resizeFile(file);
    console.log(image);
    const newFile = dataURIToBlob(image);
    const formData = new FormData();
    formData.append('file', newFile);
    const res = await fetch(import.meta.env.VITE_BASE_URL + '/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.Location) {
      props.setFileList([...props.fileList, data.Location]);
    }
    setLoading(false);
  };

  const onClickBtn = () => {
    if (input_file.current) {
      (input_file.current as any).click();
    }
  };

  const uploadButton = (
    <div
      onClick={onClickBtn}
      className="flex cursor-pointer justify-center space-x-4 my-2 items-center w-full px-4 rounded-md py-2 border-2 border-gray-500"
    >
      {!loading ? <PlusOutlined /> : <LoadingOutlined />}
      <div>Upload</div>
    </div>
  );

  return (
    <TestWrapper>
      <input
        style={{ display: 'none' }}
        ref={input_file}
        onChange={onChange}
        type="file"
        accept="image/*"
        onError={(err) => console.log(err)}
      />
      <div></div>
    </TestWrapper>
  );
}

export default Test;
