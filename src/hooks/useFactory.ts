import { useCallback, useEffect, useState } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { getCampaignContract, useFactoryContract } from './useContract';
import { selectCount } from '@states/counter/counterSlice';
import { useCounter } from '@states/counter/hooks';
import { useToken } from '@states/profile/hooks';
import axios from 'axios';
import { BigNumber } from 'ethers';
import { Dictionary } from '@reduxjs/toolkit';

export enum STATUS_ENUM {
  NOTSTARTED,
  START_JOIN,
  END_JOIN,
  STARTED_CAMPAIGN,
  END_CAMPAIGN,
  SUCCESS,
  CLAIM,
}

export enum USER_STATUS_ENUM {
  NOT_JOIN,
  JOIN,
  STARTED_CAMPAIGN,
  END_CAMPAIGN,
  CLAIM,
  FALSE_RULE,
}

export const StatusCampaignArray = [
  'NOTSTARTED',
  'START_JOIN',
  'END_JOIN',
  'STARTED_CAMPAIGN',
  'END_CAMPAIGN',
  'SUCCESS',
  'CLAIM',
];

export const UserStatusCampaignArray = [
  'NOT_JOIN',
  'JOIN',
  'STARTED_CAMPAIGN',
  'END_CAMPAIGN',
  'CLAIM',
  'FALSE_RULE',
];

export const StatusCampaign: Dictionary<string> = {
  NOTSTARTED: 'ยังไม่เปิดรับสมัคร',
  START_JOIN: 'รับสมัคร',
  END_JOIN: 'ปืดรับสมัคร',
  STARTED_CAMPAIGN: 'สามารถเข้าร่วมกิจกรรมได้',
  END_CAMPAIGN: 'ปิดกิจกรรม',
  SUCCESS: 'คำนวณรางวัลเรียบร้อย',
  CLAIM: 'สามารถรับรางวัลได้',
};

export const UserStatusCampaign: Dictionary<string> = {
  NOT_JOIN: 'เข้าร่วมแล้ว',
  JOIN: 'เข้าร่วมแล้ว',
  STARTED_CAMPAIGN: 'กำลังเข้าร่วม',
  END_CAMPAIGN: 'ออกจากการเข้าร่วมแล้ว',
  CLAIM: 'รับรางวัลแล้ว',
  FALSE_RULE: 'ผิดกฎ',
};

interface userStatus {
  user: string;
  status: string;
  detail: any;
}
export interface CampaignInterface {
  address: string;
  startTime: Number;
  endTime: Number;
  durationToEarn: Number;
  status: any;
  totalTokenAmount: BigNumber;
  rewardTokenAmount: Number;
  rewardToken: String;
  users: String[];
  maxUser: Number;
  owner: string;
  description: string;
  picture: any[];
  name: string;
  id: string;
  userStatus?: userStatus[];
}

export const getCampaignList = async (token) => {
  let result = [];
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/campaign/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.data.isSuccess) {
    result = res.data.data;
  }
  return result;
};

export const getCampaignListByAddress = async (token, address) => {
  const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/campaign/${address}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.data.isSuccess) {
    return undefined;
  }
  return res.data.data;
};

export const useCampaignByAddress = (address: string): CampaignInterface => {
  const [campaign, setCampaign] = useState<CampaignInterface>();
  // const factory = useFactoryContract();
  const { account, active, library } = useActiveWeb3React();
  const count = useCounter();
  const token = useToken();

  const fetchCampaign = useCallback(async () => {
    setCampaign(undefined);
    // if (!factory) return;
    const campaignsFromAPI = await getCampaignListByAddress(token, address);
    console.log(campaignsFromAPI);
    if (!campaignsFromAPI) return;

    const campaignContract = getCampaignContract(campaignsFromAPI.address, library, account);
    const campaignFetch = await campaignContract.getData();
    const userStatus = campaignFetch.users.map(async (user) => {
      const userStatus = await campaignContract.get_userStatus(account);
      const userDetail = await fetchUser(token, user);
      return {
        user,
        status: UserStatusCampaignArray[userStatus],
        detail: userDetail,
      };
    });
    const campaignData: CampaignInterface = {
      address: campaignsFromAPI.address,
      startTime: campaignFetch.startTime * 1000,
      endTime: campaignFetch.endTime * 1000,
      durationToEarn: campaignFetch.durationToEarn,
      status: StatusCampaignArray[campaignFetch.status],
      totalTokenAmount: campaignFetch.totalTokenAmount,
      rewardTokenAmount: campaignFetch.rewardTokenAmount,
      rewardToken: campaignFetch.rewardToken,
      users: campaignFetch.users,
      maxUser: campaignFetch.maxUser,
      owner: campaignFetch.owner,
      description: campaignsFromAPI.description,
      picture: campaignsFromAPI.picture,
      name: campaignsFromAPI.name,
      id: campaignsFromAPI.id,
      userStatus: await Promise.all(userStatus),
    };
    console.log(campaignData);
    setCampaign(campaignData);
  }, [account, active, count]);

  useEffect(() => {
    fetchCampaign();
  }, [fetchCampaign]);

  return campaign;
};

const fetchUser = async (token, address) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/${address}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.isSuccess) {
      return res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const useFactoryGetList = () => {
  const factory = useFactoryContract();
  const { account, active, library } = useActiveWeb3React();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const count = useCounter();
  const token = useToken();

  const fetchCampaign = useCallback(async () => {
    setCampaigns([]);
    if (!factory) return;
    const campaignsLists = await getCampaignList(token);

    campaignsLists.map(async (campaign: any) => {
      const campaignContract = getCampaignContract(campaign.address, library, account);
      const campaignFetch = await campaignContract.getData();
      console.log(campaignFetch);

      const campaignData: CampaignInterface = {
        address: campaign.address,
        startTime: campaignFetch.startTime * 1000,
        endTime: campaignFetch.endTime * 1000,
        durationToEarn: campaignFetch.durationToEarn,
        status: StatusCampaignArray[campaignFetch.status],
        totalTokenAmount: campaignFetch.totalTokenAmount,
        rewardTokenAmount: campaignFetch.rewardTokenAmount,
        rewardToken: campaignFetch.rewardToken,
        users: campaignFetch.users,
        maxUser: campaignFetch.maxUser,
        owner: campaignFetch.owner,
        description: campaign.description,
        picture: campaign.picture,
        name: campaign.name,
        id: campaign.id,
      };
      setCampaigns((prev) => [...prev, campaignData]);
    });
  }, [account, active, count]);

  useEffect(() => {
    fetchCampaign();
  }, [fetchCampaign]);

  return campaigns;
};
