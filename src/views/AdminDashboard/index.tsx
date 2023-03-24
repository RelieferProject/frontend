import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Icon } from '@iconify/react';
import GraphGradient from '@components/Graph/GraphGradient';
import { BtcGraph1, BtcGraph2 } from './data';
import GraphCryptoStatics from '@components/Graph/GraphCryptoStatics';
import QuickTranfers from './QuickTranfers';
import Order from './Order';
import ModalPopup from '@components/ModalPopup/ModalPopup';
import ModalFirstForm from './ModalFirstForm';

interface Props extends SimpleComponent {}

const AdminDashboardWrapper = styled.div``;

function AdminDashboard(props: Props) {
  const [active, setActive] = useState(true);

  const chartTop = [
    {
      positive: true,
      color: ['#FFF72D', '#FFAB2D'],
      distance: '4% (30 days)',
      value: '$65,123',
      data: BtcGraph1,
      icon: <Icon className="icon-white text-5xl" icon={'clarity:document-solid'} />,
      name: 'TMB50',
    },
    {
      positive: false,
      color: ['#3693FF', '#3693FF'],
      distance: '-19% (30 days)',
      value: '$10,123',
      data: BtcGraph2,
      icon: <Icon className="icon-white text-5xl" icon={'ant-design:bank-filled'} />,
      name: 'SCBSMART2A',
    },
    {
      positive: true,
      color: ['#7679AF', '#8E91C7'],
      distance: '10% (30 days)',
      value: '$200,123',
      data: BtcGraph1,
      icon: <Icon className="icon-white text-5xl" icon={'fluent:gift-card-money-20-filled'} />,
      name: 'TTB ME SAVE',
    },
    {
      positive: false,
      color: ['#AC4CBC', '#E062F5'],
      distance: '-19% (30 days)',
      value: '$10,123',
      data: BtcGraph2,
      icon: <Icon className="icon-white text-5xl" icon={'tabler:pig-money'} />,
      name: 'TTB Easy Saver 15/9',
    },
  ];

  return (
    <AdminDashboardWrapper className="w-fulll pb-20">
      <ModalPopup
        title={
          <div>
            <h2 className="text-white text-3xl">Ape Insight Assessment</h2>
            <p className="text-2xl text-white mt-2">
              Please provide your real information, changing data may require proof
            </p>
          </div>
        }
        show={active}
        onClose={() => setActive(null)}
      >
        <ModalFirstForm
          callback={() => {
            setActive(false);
          }}
          active={active}
        />
      </ModalPopup>

      {/*  */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-8">
        {chartTop.map((e, i) => (
          <div key={`chart-top-${i}`} className="w-full bg-white rounded-lg shadow-lg">
            <div className="flex px-4 py-4 items-center justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Icon
                    icon={'ant-design:caret-up-filled'}
                    className={`${e.positive ? 'icon-green' : 'icon-red rotate-180'}`}
                  />
                  <span className="text-text-gray text-base">{e.distance}</span>
                </div>
                <h2 className="text-black text-2xl mt-2">{e.name}</h2>
                <h2 className="text-black text-3xl mt-2">{e.value}</h2>
              </div>
              <div className="flex items-center">{e.icon}</div>
            </div>
            <GraphGradient data={e.data} color={e.color} index={i} />
          </div>
        ))}
      </div>

      {/*  */}
      <div className="w-full grid grid-cols-1 gap-8 mt-8">
        <GraphCryptoStatics />
      </div>

      {/*  */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <QuickTranfers />
        <div className="w-full grid grid-cols-2 gap-8">
          <Order sell={true} />
          <Order />
        </div>
      </div>
    </AdminDashboardWrapper>
  );
}

export default AdminDashboard;
