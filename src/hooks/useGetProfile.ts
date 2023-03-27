import { useAppDispatch } from '@states/hooks';
import { SETPROFILE } from '@states/profile/action';
import { useToken } from '@states/profile/hooks';
import axios from 'axios';
import { useEffect } from 'react';

export default function useGetProfile() {
  const dispatch = useAppDispatch();
  const token = useToken();
  useEffect(() => {
    if (token) {
      getProfileFunc();
    }
  }, [token]);

  const getProfileFunc = async () => {
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(SETPROFILE(res.data.data));
      });
  };
}
