import ButtonStyled from '@components/ButtonStyled';
import InputStyled from '@components/InputStyled';
import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import useConfirm from '@hooks/useConfirm';
import { useFactoryContract, useValidatorContract } from '@hooks/useContract';
import usePopup from '@hooks/usePopup';
import { useToken } from '@states/profile/hooks';
import { addressParse } from '@utils';
import { DatePicker, Form } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { TimePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import ImageUpload, { imageInterface } from '@components/ImageUpload';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import web3 from '@utils/web3';

interface Props extends SimpleComponent {}

const CampaignAddWrapper = styled.div``;

function CampaignAdd(props: Props) {
  const token = useToken();
  const validationContract = useValidatorContract();
  const factoryContract = useFactoryContract();
  const popup = usePopup();
  const { isConfirmed } = useConfirm();
  const [images, setImages] = useState<imageInterface[]>([]);
  const navigate = useNavigate();

  const initialValues = {
    _rewardTokenAmount: 10,
    _maxUser: 10,
    name: '',
    description: '',
  };

  const [state, setState] = useState({
    ...initialValues,
    _startTime: moment(),
    _endTime: moment().add(1, 'hours'),
    _durationToEarn: moment('01:00', 'HH:mm'),
  });

  const onChangeTime = (name, time: any, timeString: string) => {
    if (!time) return;
    // console.log(name, time, timeString);
    if (name === '_durationToEarn') {
      setState({
        ...state,
        [name]: time,
      });
    } else {
      const getHour = timeString.split(':')[0];
      const getMinute = timeString.split(':')[1];

      setState({
        ...state,
        [name]: state[name].hour(getHour).minute(getMinute),
      });
    }
  };

  const onChangeDate = (name, date: any, dateString: string) => {
    if (!date) return;
    // console.log(name, date, dateString);
    const getYear = dateString.split('-')[0];
    const getMonth = dateString.split('-')[1];
    const getDay = dateString.split('-')[2];

    setState({
      ...state,
      [name]: state[name].year(getYear).month(getMonth).date(getDay),
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (e) => {
    setState({
      ...state,
      ...e,
    });
  };

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    const payloadContract = {
      startTime: state._startTime.unix(),
      endTime: state._endTime.unix(),
      durationToEarn:
        (state._durationToEarn.get('hour') * 60 + state._durationToEarn.get('minute')) * 60,
      rewardTokenAmount: web3.utils.toWei(values._rewardTokenAmount, 'ether'),
      maxUser: values._maxUser,
    };

    const confirm = await isConfirmed({ text: `Confirm to create campaign` });
    if (confirm) {
      popup.loading({ text: 'Loading', disable: true });
      let address = '';
      try {
        const result = await factoryContract.createCampaign(
          payloadContract.startTime,
          payloadContract.endTime,
          payloadContract.durationToEarn,
          payloadContract.rewardTokenAmount,
          payloadContract.maxUser
        );
        await result.wait().then((res) => {
          address = res.events[0].address;
        });
        // popup.success({ text: 'Create Campaign Success' });
      } catch (error: any) {
        // console.log(Object.keys(error));
        // console.log(error.reason)
        popup.error({ text: error.reason || 'Verify Failed' });
        return;
      }

      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/campaign/create`,
          {
            name: values.name,
            description: values.description,
            picture: images,
            startTime: state._startTime,
            endTime: state._endTime,
            durationToEarn:
              (state._durationToEarn.get('hour') * 60 + state._durationToEarn.get('minute')) * 60,
            rewardTokenAmount: values._rewardTokenAmount,
            address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await popup.success({ text: 'Create Success' });
        navigate('/campaign');
      } catch (error: any) {
        // console.log(error);
        popup.error({ text: error.response.data.message || 'Create Failed' });
      }
    }
  };

  return (
    <CampaignAddWrapper>
      <LayoutsContainer>
        <div className="mx-auto w-[50rem] p-8 rounded-md shadow-xl">
          <Form
            initialValues={initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            autoComplete="off"
            // form={props.form}
            layout={'vertical'}
            className="my-4"
          >
            <div className="flex flex-col items-center w-full mt-4">
              <Form.Item
                name="name"
                className="w-full"
                label="Name of Campaign"
                rules={[
                  {
                    required: true,
                    message: 'please fill name of campaign!',
                  },
                ]}
              >
                <InputStyled
                  className="w-auto"
                  type={'text'}
                  placeholder="Name of Campaign"
                ></InputStyled>
              </Form.Item>
              <Form.Item
                name="description"
                className="w-full"
                label="Description of Campaign"
                rules={[
                  {
                    required: true,
                    message: 'please fill description of campaign!',
                  },
                ]}
              >
                <TextArea className="w-auto" rows={4} placeholder="description of campaign" />
              </Form.Item>

              <div className="w-full grid grid-cols-3 mb-6">
                <div className="w-full">
                  <p className="text-[15px] mb-4">* Start Time</p>
                  <div className="mb-4">
                    <DatePicker
                      name="_startTime"
                      value={state._startTime}
                      onChange={(a, b) => onChangeDate('_startTime', a, b)}
                    />
                  </div>
                  <TimePicker
                    format={'HH:mm'}
                    value={state._startTime}
                    onChange={(a, b) => onChangeTime('_startTime', a, b)}
                    // onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
                  />
                </div>
                <div className="w-full">
                  <p className="text-[15px] mb-4">* End Time</p>
                  <div className="mb-4">
                    <DatePicker
                      name="_endTime"
                      value={state._endTime}
                      onChange={(a, b) => onChangeDate('_endTime', a, b)}
                    />
                  </div>
                  <TimePicker
                    format={'HH:mm'}
                    value={state._endTime}
                    onChange={(a, b) => onChangeTime('_endTime', a, b)}
                  />
                </div>
                <div className="w-full">
                  <p className="text-[15px]">* Duration (HH:mm)</p>
                  <div className="mt-4">
                    <TimePicker
                      name="_durationToEarn"
                      format={'HH:mm'}
                      showNow={false}
                      value={state._durationToEarn}
                      onChange={(a, b) => onChangeTime('_durationToEarn', a, b)}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <Form.Item
                  name="_rewardTokenAmount"
                  className="w-full"
                  label="Amount of Reward Token"
                  rules={[
                    {
                      required: true,
                      message: 'please fill Amount of Reward Token!',
                    },
                  ]}
                >
                  <InputStyled
                    className="w-auto"
                    type={'number'}
                    placeholder="Amount of Reward Token"
                  ></InputStyled>
                </Form.Item>

                <Form.Item
                  name="_maxUser"
                  className="w-full"
                  label="Amount of max user"
                  rules={[
                    {
                      required: true,
                      message: 'please fill Amount of max user!',
                    },
                  ]}
                >
                  <InputStyled
                    className="w-auto"
                    type={'number'}
                    placeholder="Amount of max user"
                  ></InputStyled>
                </Form.Item>
              </div>

              <div className="w-full mt-4">
                <span className="text-[15px]">* Image</span>
                <ImageUpload fileList={images} setFileList={setImages} />
              </div>
            </div>
            <div className="mt-4">
              <ButtonStyled
                // disabled={!checked || !checked2}
                className="w-full"
              >
                Create Campaign
              </ButtonStyled>
            </div>
          </Form>
        </div>
      </LayoutsContainer>
    </CampaignAddWrapper>
  );
}

export default CampaignAdd;
