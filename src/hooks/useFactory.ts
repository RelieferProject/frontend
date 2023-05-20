import { useCallback, useEffect, useState } from 'react';
import useActiveWeb3React from './useActiveWeb3React';
import { getCampaignContract, useFactoryContract } from './useContract';

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
  address: String;
  startTime: Number;
  endTime: Number;
  durationToEarn: Number;
  status: String;
  totalTokenAmount: Number;
  rewardTokenAmount: Number;
  rewardToken: String;
  users: String[];
  maxUser: Number;
}

export const useFactoryGetList = () => {
  const factory = useFactoryContract();
  const { account, active, library } = useActiveWeb3React();
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const fetchCampaing = useCallback(async () => {
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
      };
      setCampaigns((prev) => [...prev, campaignData]);
    });
  }, [account, active]);

  useEffect(() => {
    fetchCampaing();
  }, [fetchCampaing]);

  return campaigns;
};
