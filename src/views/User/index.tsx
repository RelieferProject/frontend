import ButtonStyled from '@components/ButtonStyled';
import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import useConfirm from '@hooks/useConfirm';
import { useValidatorContract } from '@hooks/useContract';
import usePopup from '@hooks/usePopup';
import { useToken } from '@states/profile/hooks';
import { addressParse } from '@utils';
import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props extends SimpleComponent {}

const UserPageWrapper = styled.div``;

function UserPage(props: Props) {
  const [state, setState] = React.useState<any>([]);
  const token = useToken();
  const validationContract = useValidatorContract();
  const popup = usePopup();
  const { isConfirmed } = useConfirm();

  const fetchUser = async () => {
    if (!validationContract) return;
    setState([]);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.isSuccess) {
        res.data.data.map(async (user) => {
          const isValid = await validationContract.isUserValid(user.address);
          setState((prev) => [...prev, { ...user, isValid }]);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) fetchUser();
  }, [token, validationContract]);

  const verify = (address: string) => async () => {
    const confirm = await isConfirmed({ text: `Confirm to verify address ${address}` });
    if (confirm) {
      popup.loading({ text: 'Loading', disable: true });
      try {
        await validationContract.validate(address);
      } catch (error: any) {
        // console.log(Object.keys(error));
        // console.log(error.reason)
        popup.error({ text: error.reason || 'Verify Failed' });
        fetchUser();
        return;
      }

      try {
        await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/validate`,
          {
            address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchUser();
        await popup.success({ text: 'Verify Success' });
      } catch (error: any) {
        fetchUser();
        // console.log(error);
        popup.error({ text: error.response.data.message || 'Verify Failed' });
      }
    }
  };

  return (
    <UserPageWrapper>
      <LayoutsContainer>
        <h1 className="text-black text-3xl font-bold mb-6">USER</h1>
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-8 px-12 items-center w-full p-4 bg-white">
            <h3 className='text-blue-800 col-span-3'>ชื่อ</h3>
            <h3 className='text-blue-800'>รายละเอียด</h3>
            <h3 className='text-blue-800'>สถานะเคลม ETH</h3>
            <h3 className='text-blue-800'>สถานะส่งยืนยันตัวตน</h3>
            <h3 className='text-blue-800'>ยืนยันตัวตน</h3>
            <h3 className='text-blue-800'>ดำเนินการ</h3>
          </div>
          {state.map((user: any) => (
            <div key={user.address} className="">
              <div className="grid grid-cols-8 items-center border-2 w-full p-4 bg-white rounded-lg shadow-md">
                {/*  */}
                <div className="col-span-3 flex flex-col ml-4">
                  <span className="text-red-800 text-lg font-bold">บทบาท : {user.role || '-'}</span>
                  <span className="text-black text-lg font-bold">ชื่อ : {user.name || '-'}</span>
                  <span className="text-gray-500 text-lg">{addressParse(user.address)}</span>
                </div>
                {/*  */}
                {/*  */}
                <div className="flex flex-col ml-4">
                  <span className="text-black text-lg font-bold">คณะ : {user.faculty}</span>
                  <span className="text-purple-800 text-lg font-bold">
                    รหัสนักศึกษา : {user.student_id || '-'}
                  </span>
                </div>
                {/*  */}
                {/*  */}
                <div className="flex flex-col ml-4">
                  <span className={`text-3lg font-bold`}>{user.isClaimed ? '✅' : '❌'}</span>
                </div>
                {/*  */}
                {/*  */}
                <div className="flex flex-col ml-4">
                  <span className={`text-3lg font-bold`}>{user.isSendVerify ? '✅' : '❌'}</span>
                </div>
                {/*  */}
                {/*  */}
                <div className="flex flex-col ml-4">
                  <span className={`text-3lg font-bold`}>{user.isVerified ? '✅' : '❌'}</span>
                </div>
                {/*  */}
                <div className="flex flex-col ml-4">
                  {user.isSendVerify && !user.isVerified && (
                    <ButtonStyled onClick={verify(user.address)} className="w-full text-center">
                      ยืนยันตัวตน
                    </ButtonStyled>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </LayoutsContainer>
    </UserPageWrapper>
  );
}

export default UserPage;
