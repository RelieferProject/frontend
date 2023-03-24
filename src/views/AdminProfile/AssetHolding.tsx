import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Icon } from '@iconify/react';
import ModalPopup from '@components/ModalPopup/ModalPopup';
import ModalActiveFollow from './ModalActiveFollow';
import { toast } from 'react-toastify';

interface Props {}

const AssetHoldingWrapper = styled.div`
  .icon-green * {
    color: #2bc155;
  }
  .icon-red * {
    color: #ff3e3e;
  }

  .icon-white * {
    color: white;
  }
`;

function AssetHolding(props: Props) {
  const [red, setRed] = useState(false);
  const [data, setData] = useState([
    {
      color: '#AC4CBC',
      icon: <Icon className="icon-white text-3xl" icon={'clarity:document-solid'} />,
      name: 'TMB50',
      name_detail: 'TMB SET50 FUND',
      val: '68,331.09 THB',
      valPer: '0.5%',
      price: {
        positive: true,
        sell: 96.52,
        buy: 96.33,
      },
      isMore: false,
    },
    {
      color: '#FFAB2D',
      icon: <Icon className="icon-white text-3xl" icon={'ant-design:bank-filled'} />,
      name: 'SCBSMART2A',
      name_detail: 'SCB Smart Plan 2 Fund (Accumulation)',
      val: '48,500.00 THB',
      valPer: '-0.301%',
      price: {
        positive: false,
        sell: 10.29,
        buy: 10.22,
      },
      isMore: false,
    },
    {
      color: '#3693FF',
      icon: <Icon className="icon-white text-3xl" icon={'fluent:gift-card-money-20-filled'} />,
      name: 'TTB ME SAVE',
      name_detail: 'APY 1.1% Flexible Saving',
      val: '38,442.12 THB',
      valPer: '0.015%',
      week: true,
      price: {
        positive: true,
        sell: 5.222,
        buy: 5.2333,
      },
      isMore: true,
    },
    {
      color: '#5B5D81',
      icon: <Icon className="icon-white text-3xl" icon={'tabler:pig-money'} />,
      name: 'TTB Easy Saver 15/9',
      name_detail: '1% Dividend Annual',
      val: '24,000 THB',
      valPer: '1%',
      price: {
        positive: true,
        sell: 9.222,
        buy: 9.2333,
      },
      isMore: true,
    },
  ]);

  const [active, setActive] = useState(null);

  let timer;

  const updateCount = () => {
    timer =
      !timer &&
      setInterval(() => {
        const randomNum = Math.random() * 10 * 0.01;
        setRed((prev) => {
          // console.log(prev);
          return !prev ? true : false;
        });
        const dataClone = [...data];
        dataClone.forEach((e, i) => {
          e.price.buy += randomNum;
          e.price.sell += randomNum;
        });
        setData(dataClone);
      }, 500);
  };

  useEffect(() => {
    updateCount();

    return () => clearInterval(timer);
  }, []);

  const toasting = () => {
    toast.info('Ape Insight Alert!!! Your Master #4428 has sold the investment unit');
  };

  return (
    <AssetHoldingWrapper className="col-span-2 lg:col-span-3 bg-white p-6 shadow-lg">
      <ModalPopup
        title={
          active ? (
            <div className="text-white text-2xl p-6 rounded border-yellow-400 border-2">
              Ape Insight Alert!!! Your Master #4428 has sold the investment unit
              <p className="text-yellow-500 mt-2">Product : {active.name_detail}</p>
            </div>
          ) : (
            ''
          )
        }
        show={active}
        onClose={() => setActive(null)}
      >
        <ModalActiveFollow
          callback={() => {
            setActive(null);
          }}
          active={active}
        />
      </ModalPopup>
      <div className="flex w-full justify-between items-center mb-6">
        <h2 className="text-black text-2xl">Asset Holding</h2>
        <Icon icon={'carbon:overflow-menu-vertical'} />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.map((e) => (
          <div
            key={e.name}
            className="item-asset border rounded-xl"
            style={{ borderColor: e.color }}
          >
            <div className="py-8 px-5 rounded-lg" style={{ backgroundColor: e.color }}>
              <div className="h-full flex">
                <div className="w-12 mr-2 flex items-start justify-center">{e.icon}</div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">{e.name}</h2>
                  <span className="text-lg text-white">{e.name_detail}</span>
                </div>
              </div>
              <div className="flex flex-wrap w-full">
                <div className="w-12 mr-2 flex items-end justify-center">
                  <Icon className="icon-white text-2xl" icon={'foundation:graph-bar'} />
                </div>
                <div className="w-full flex-1 flex mt-4 justify-between">
                  <p className="text-white text-xl">{e.val}</p>
                  <div className="flex items-center space-x-2">
                    <Icon
                      icon={'ant-design:caret-up-filled'}
                      className={`${
                        e.price.positive ? 'icon-green' : 'icon-red rotate-180'
                      } text-sm`}
                    />
                    <span className="text-white text-lg">{e.valPer}</span>
                  </div>
                  <span className="text-white text-lg">{e.week ? 'This week' : 'This month'}</span>
                </div>
              </div>
            </div>
            {/*  */}
            {e.isMore ? (
              <div className="flex justify-end w-full py-3 text-lg px-2">
                <div className="text-text-gray cursor-pointer">More Detail</div>
              </div>
            ) : (
              <div className="flex justify-between w-full py-3 text-lg px-2">
                <div onClick={toasting} className="flex text-black font-semibold">
                  BUY
                  <span className={`mx-2 text-lg ${!red ? 'text-green-500' : 'text-red-500'}`}>
                    {e.price.buy.toFixed(2)}
                  </span>
                  THB
                </div>
                <div onClick={toasting} className="flex text-black font-semibold">
                  SELL
                  <span className={`mx-2 text-lg ${red ? 'text-green-500' : 'text-red-500'}`}>
                    {e.price.sell.toFixed(2)}
                  </span>
                  THB
                </div>
                <div className="text-text-gray cursor-pointer" onClick={() => setActive(e)}>
                  More Detail
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </AssetHoldingWrapper>
  );
}

export default AssetHolding;
