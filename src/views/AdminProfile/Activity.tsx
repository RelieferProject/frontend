import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Icon } from '@iconify/react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

interface Props {}

const ActivityWrapper = styled.div`
  .item-activity {
    display: grid;
    grid-template-columns: 5rem 1fr 1fr 1fr;
    width: 100%;
    gap: 0.5rem;
  }
`;

const timeList = ['Monthly', 'Weekly', 'Today'];

const initialData = [
  { type: 'Withdraw', time: '06:24:45 AM', value: '-542 THB', status: 'Pending' },
  { type: 'Copying Fees', time: '05:24:45 AM', value: '+153 THB', status: 'Complete' },
  { type: 'Withdraw', time: '03:24:45 AM', value: '-942 THB', status: 'Canceled' },
  { type: 'Extra Bonus', time: '02:24:45 AM', value: '-542 THB', status: 'Complete' },
  { type: 'Withdraw', time: '06:24:45 AM', value: '-542 THB', status: 'Pending' },
  { type: 'Copying Fees', time: '05:24:45 AM', value: '+153 THB', status: 'Complete' },
  { type: 'Withdraw', time: '03:24:45 AM', value: '-942 THB', status: 'Canceled' },
  { type: 'Extra Bonus', time: '02:24:45 AM', value: '-542 THB', status: 'Complete' },
  { type: 'Withdraw', time: '03:24:45 AM', value: '-942 THB', status: 'Canceled' },
  { type: 'Extra Bonus', time: '02:24:45 AM', value: '-542 THB', status: 'Complete' },
];

const StatusColor = {
  Pending: 'text-gray-500',
  Complete: 'text-green-500',
  Canceled: 'text-red-500',
};

function Activity(props: Props) {
  const [select, setSelect] = useState('Today');
  const [more, setMore] = useState(false);
  const [data, setData] = useState([...initialData].splice(0, 5));

  const onClickTime = (val) => {
    setSelect(val);
  };

  const onClickMore = () => {
    if (!more) {
      setData([...data, ...initialData.slice(5)]);
      setMore(true);
    } else {
      setData([...data].splice(0, 5));
      setMore(false);
    }
  };

  return (
    <ActivityWrapper className="col-span-full lg:col-span-2 bg-white py-6 shadow-lg relative transition-all">
      <div className="flex px-6 w-full justify-between items-center mb-6">
        <div>
          <h2 className="text-black text-2xl">My Activity</h2>
          <p className="text-xl lg:text-base text-text-gray">
            Your historical bonus from Ape Insight{' '}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          {timeList.map((e) => {
            return (
              <div
                onClick={() => onClickTime(e)}
                className={`font-semibold text-xl px-2 py-2 rounded-xl cursor-pointer hover:bg-bg-dark-dark hover:text-white transition-all ${
                  select === e ? 'bg-bg-dark-dark text-white' : 'bg-white text-black'
                }`}
              >
                {e}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col w-full">
        {data.map((e) => (
          <div className="item-activity py-2 px-4 items-center">
            <div className="w-[3rem] border-2 border-gray-200 rounded-lg h-[3rem] flex items-center justify-center text-2xl">
              {e.type === 'Withdraw' ? (
                <AiOutlineArrowDown className="icon-green" />
              ) : (
                <AiOutlineArrowUp className="icon-purple" />
              )}
            </div>
            <div className="text-xl lg:text-base font-semibold text-black">
              <div>{e.type}</div>
              <div className="text-xl lg:text-base text-black">{e.time}</div>
            </div>
            <div className="text-xl lg:text-base text-black text-right">{e.value}</div>
            <div className={`text-xl lg:text-base ${StatusColor[e.status]} text-right`}>
              {e.status}
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={onClickMore}
        className="cursor-pointer hover:bg-gray-100 transition-all absolute -bottom-[6] left-1/2 -translate-x-6 bg-white w-12 h-12 rounded-full shadow-xl shadow-inner flex justify-center items-center text-2xl"
      >
        <Icon
          icon="ant-design:caret-down-filled"
          className={`${more ? 'rotate-180' : 'rotate-0'} transition-all`}
        />
      </div>
    </ActivityWrapper>
  );
}

export default Activity;
