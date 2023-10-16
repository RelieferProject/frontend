import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Resizer from 'react-image-file-resizer';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Image, Modal } from 'antd';
import axios from 'axios';
import { useToken } from '@states/profile/hooks';

export interface imageInterface {
  url: string;
  public_id: string;
}

interface Props {
  fileList: imageInterface[];
  setFileList: React.Dispatch<React.SetStateAction<imageInterface[]>>;
}

const ImageUploadWrapper = styled.div``;

// const resizeFile = (file) =>
//   new Promise((resolve) => {
//     Resizer.imageFileResizer(
//       file,
//       300,
//       400,
//       'JPEG',
//       80,
//       0,
//       (uri) => {
//         resolve(uri);
//       },
//       'base64'
//     );
//   });

// const dataURIToBlob = (dataURI) => {
//   const splitDataURI = dataURI.split(',');
//   const byteString =
//     splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
//   const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
//   const ia = new Uint8Array(byteString.length);
//   for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
//   return new Blob([ia], { type: mimeString });
// };

const resizeFile = async (imgToCompress, resizingFactor, quality): Promise<any> => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const originalWidth = imgToCompress.width;
  const originalHeight = imgToCompress.height;

  const canvasWidth = originalWidth * resizingFactor;
  const canvasHeight = originalHeight * resizingFactor;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(
    imgToCompress,
    0,
    0,
    originalWidth * resizingFactor,
    originalHeight * resizingFactor
  );

  // reducing the quality of the image
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
  return blob;
};

function fileToDataUri(field) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(field);
  });
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const ImageUpload: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const token = useToken();

  const input_file = useRef();
  const onChange = async (event) => {
    const file = event.target.files[0];
    const origin = document.querySelector('#originalImage');
    (origin as any).src = await fileToDataUri(file);

    origin.addEventListener('load', async () => {
      setLoading(true);
      const image = await resizeFile(origin, 0.8, 0.6);
      // console.log({ image });
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/image/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res);
        if (res.data.isSuccess) {
          props.setFileList([...props.fileList, res.data.data]);
        }

        // const data = await res.json();
        // if (data.Location) {
        //   props.setFileList([...props.fileList, data.Location]);
        // }
      }
      setLoading(false);
    });
  };

  const onClickBtn = () => {
    if (input_file.current) {
      (input_file.current as any).click();
    }
  };

  const handleRemove = (index: number) => {
    const clone = [...props.fileList];
    clone.splice(index, 1);
    props.setFileList(clone);
  };

  const uploadButton = (
    <div
      onClick={onClickBtn}
      className="w-24 h-24 p-2 m-2 flex transition-all flex-col cursor-pointer justify-center items-center rounded-md border-2 border-gray-500"
    >
      {!loading ? <PlusOutlined /> : <LoadingOutlined />}
      <div className="font-bold">Upload</div>
    </div>
  );
  const handleCancel = () => {
    setPreviewVisible(false);
    setPreviewImage('');
  };

  const handlePreview = (index: number) => {
    setPreviewImage(props.fileList[index].url);
    setPreviewVisible(true);
  };

  return (
    <ImageUploadWrapper className="flex flex-col">
      <img id="originalImage" src="" style={{ display: 'none' }} />
      <input
        style={{ display: 'none' }}
        ref={input_file}
        onChange={onChange}
        type="file"
        accept="image/*"
        onError={(err) => console.log(err)}
      />

      <div className="flex w-full flex-wrap items-center transition-all">
        {props.fileList.map((e, index) => (
          <div className="flex justify-center items-center p-2 relative" key={`image-${index}`}>
            <img
              onClick={() => handlePreview(index)}
              className="w-16 h-16 object-contain"
              alt={`image-${index}`}
              src={e.url}
            />
            <div
              onClick={() => handleRemove(index)}
              className="w-4 h-4 absolute top-0 right-0 text-[0.5rem] rounded-full bg-red-500 text-white flex justify-center items-center"
            >
              X
            </div>
          </div>
        ))}
        <div className="w-full flex justify-center">{uploadButton}</div>
      </div>
      <Modal visible={previewVisible} title={'ตัวอย่าง'} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </ImageUploadWrapper>
  );
};

export default ImageUpload;
