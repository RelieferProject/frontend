import { useAppDispatch, useAppSelector } from '@states/hooks';
import styled from 'styled-components';
import { increment, decrement } from '@states/counter/counterSlice';
import { UserStatusCampaign, useCampaignByAddress } from '@hooks/useFactory';
import { useParams, useRoutes } from 'react-router-dom';
import Loading from '@components/Loading';
import LayoutsContainer from '@components/Layouts/LayoutsContainer';
import { addressParse } from '@utils';

interface Props extends SimpleComponent {}

const CampaignUserPageWrapper = styled.div``;

function CampaignUserPage(props: Props) {
  const params = useParams();
  const address = params['id'];
  const campaign = useCampaignByAddress(address);
  return (
    <CampaignUserPageWrapper>
      <LayoutsContainer>
        {!campaign ? (
          <div className="w-full flex justify-center">
            <Loading />
          </div>
        ) : (
          <div>
            <h1>{campaign.name}</h1>
            <div className="flex flex-col gap-4 w-full">
              <div className="grid grid-cols-3 px-12 items-center w-full p-4 bg-white">
                <h3 className="text-blue-800">Name</h3>
                <h3 className="text-blue-800">Address</h3>
                <h3 className="text-blue-800">Status</h3>
              </div>
            </div>
            {campaign.userStatus.map((user) => {
              return (
                <div key={user.user}>
                  <div className="grid grid-cols-3 items-center border-2 w-full p-4 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col ml-4">
                      <span className="text-black text-lg font-bold">
                        {user.detail.name || '-'}
                      </span>
                    </div>
                    <div className="flex flex-col ml-4">
                      <span className="text-black text-lg font-bold">
                        {addressParse(user.detail.address) || '-'}
                      </span>
                    </div>
                    <div className="flex flex-col ml-4">
                      <span className="text-black text-lg font-bold">{UserStatusCampaign[user.status]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </LayoutsContainer>
    </CampaignUserPageWrapper>
  );
}

export default CampaignUserPage;
