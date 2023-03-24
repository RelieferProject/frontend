import ButtonStyled from '@components/ButtonStyled';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Icon } from '@iconify/react';

interface Props {}

const QuickTranfersWrapper = styled.div``;

function QuickTranfers(props: Props) {
  // const example = [
  //   'blackCat',
  //   'blackCat2',
  //   'catRich',
  //   'catSwag',
  //   'fox',
  //   'oldCat',
  //   'orangeCat',
  //   'pinkCat',
  //   'whitecat',
  // ];

  const example = [
    {
      positive: true,
      color: ['#FFF72D', '#FFAB2D'],
      distance: '4% (30 days)',
      value: '$65,123',
      icon: <Icon className="icon-purple text-5xl" icon={'clarity:document-solid'} />,
      name: 'TMB50',
    },
    {
      positive: false,
      color: ['#3693FF', '#3693FF'],
      distance: '-19% (30 days)',
      value: '$10,123',
      icon: <Icon className="icon-purple text-5xl" icon={'ant-design:bank-filled'} />,
      name: 'SCBSMART2A',
    },
    {
      positive: true,
      color: ['#7679AF', '#8E91C7'],
      distance: '10% (30 days)',
      value: '$200,123',
      icon: <Icon className="icon-purple text-5xl" icon={'fluent:gift-card-money-20-filled'} />,
      name: 'TTB ME SAVE',
    },
    {
      positive: false,
      color: ['#AC4CBC', '#E062F5'],
      distance: '-19% (30 days)',
      value: '$10,123',
      icon: <Icon className="icon-purple text-5xl" icon={'tabler:pig-money'} />,
      name: 'TTB Easy Saver',
    },
  ];
  return (
    <QuickTranfersWrapper className="bg-white p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black text-2xl">Quick Order</h2>
          <span className="text-base text-text-gray">Buy Or Sell Assets</span>
        </div>
        <div className="flex items-center space-x-4"></div>
      </div>

      {/* recent */}
      <div className="flex w-full justify-between my-4">
        <p>Recent Contacts</p>
        <p className="text-base text-text-gray cursor-pointer hover:text-purple-500">View More</p>
      </div>

      <div className="w-full max-w-full grid grid-cols-2 lg:grid-cols-4 gap-4 overflow-scroll">
        {example.map((e) => (
          <div className="bg-gray-100 w-full flex flex-col items-center p-4 rounded cursor-pointer hover:bg-gray-200 transition-all">
            {/* <img className="w-12 h-12" src={`/src/assets/images/avatar/${e}.svg`} alt="blackCat" /> */}
            {e.icon}
            <p className="mt-2 text-lg font-semibold">{e.name}</p>
            {/* <p className="text-base text-text-gray">@{e}</p> */}
          </div>
        ))}
      </div>

      <p className="text-base text-text-gray mt-8 text-center">Amount</p>
      <h2 className="text-4xl text-center font-semibold text-black mb-8">8,621.22 THB</h2>

      <ButtonStyled className="w-full">Order</ButtonStyled>
    </QuickTranfersWrapper>
  );
}

export default QuickTranfers;
