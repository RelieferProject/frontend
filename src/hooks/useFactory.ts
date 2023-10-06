import { useCallback, useEffect, useState } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { getCampaignContract, useFactoryContract } from './useContract';
import { selectCount } from '@states/counter/counterSlice';
import { useCounter } from '@states/counter/hooks';

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

export interface CampaignInterface {
  address: string;
  startTime: Number;
  endTime: Number;
  durationToEarn: Number;
  status: any;
  totalTokenAmount: Number;
  rewardTokenAmount: Number;
  rewardToken: String;
  users: String[];
  maxUser: Number;
  owner: string;
}

export const useFactoryGetList = () => {
  const factory = useFactoryContract();
  const { account, active, library } = useActiveWeb3React();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const count = useCounter();

  const fetchCampaign = useCallback(async () => {
    setCampaigns([]);
    if (!factory) return;
    const campaignsLists = await factory.getCampaigns();
    campaignsLists.map(async (campaign: any) => {
      const campaignContract = getCampaignContract(campaign, library, account);
      const campaignFetch = await campaignContract.getData();
      console.log(campaignFetch);
      const campaignData: CampaignInterface = {
        address: campaign,
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
      };
      setCampaigns((prev) => [...prev, campaignData]);
    });
  }, [account, active, count]);

  useEffect(() => {
    fetchCampaign();
  }, [fetchCampaign]);

  return campaigns;
};
