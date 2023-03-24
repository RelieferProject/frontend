import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Icon } from '@iconify/react';
import { FaSort } from 'react-icons/fa';
import { dataLeader, randomNumberGraph } from './data';
import LeaderGraph from './LeaderGraph';
import { random } from 'lodash';
// import MonkeySvg from '@assets/images/avartar/monkey.svg';
import MonkeySvg from '@assets/images/avatar/monkey.svg';

interface Props extends SimpleComponent {}

const AdminLeaderboardWrapper = styled.div`
  .icon-social {
    width: auto;
    height: auto;
    ${tw`border-gray-500 rounded-3xl px-4 py-3 border flex justify-center items-center transition-all cursor-pointer`}
  }

  .icon-social * {
    color: white;
    font-size: 1.4rem;
    ${tw`text-bg-purple-card`}
  }
  .icon-social:hover {
    * {
      color: white;
    }
    ${tw`bg-bg-purple-card text-white`}
  }

  .item-leader {
    display: grid;
    width: 100%;
    grid-template-columns: 5rem 1fr 1fr 1fr 1fr 1.5fr;
    gap: 0.5rem;
  }
`;

function AdminLeaderboard(props: Props) {
  const [data, setData] = useState([...dataLeader]);
  const [search, setSearch] = useState('');
  const button = [
    {
      value: (
        <div className="icon-social flex items-center text-lg">
          <Icon className="mr-2" icon="akar-icons:download" />
          Get Report
        </div>
      ),
    },
    {
      value: (
        <div className="icon-social flex items-center text-lg">
          <Icon className="mr-2" icon="fe:money" />
          Income 20,000 - 25,000 THB
        </div>
      ),
    },
    {
      value: <div className="icon-social flex items-center text-lg">Newest</div>,
    },
  ];

  const header = ['Rank', 'Coin', 'Last Gain', 'Change(24h)', 'total Fees', 'Graph'];

  const onSearch = (e: any) => {
    setSearch(e.target.value);
    setData([
      ...[...dataLeader].filter((v) => v.coin.toLowerCase().includes(e.target.value.toLowerCase())),
    ]);
  };

  return (
    <AdminLeaderboardWrapper className="mb-20">
      <div className="flex justify-between items-center">
        <form className="bg-white shadow-lg rounded-2xl flex items-center py-2 px-6">
          <BiSearch className="fill-gray-600 text-4xl" />
          <input
            className="input-blank bg-white text-2xl w-full ml-6 px-6 py-1 bg-transparent focus:bg-bg-white
         hover:bg-white transition"
            placeholder="Search here"
            value={search}
            onChange={onSearch}
          />
        </form>

        <div className="flex gap-2 justify-center flex-wrap">{button.map((e) => e.value)}</div>
      </div>

      <div className="mt-7 w-full bg-white py-4 min-h-[50rem]">
        <div className="item-leader mb-6 px-4">
          {header.map((e) => (
            <div key={e} className="flex items-center text-text-purple text-2xl">
              {e} <FaSort className="text-sm text-gray-200" />
            </div>
          ))}
        </div>

        {data.map((e, i) => (
          <div
            key={`leader` + i}
            className="item-leader py-4 px-4 hover:bg-gray-100 cursor-pointer text-xl"
          >
            <div
              className={`text-text-purple w-[4rem] h-[4rem] py-4 
            rounded-full flex justify-center items-center ${
              i <= 2 ? 'font-semibold bg-[#EBE9FF]' : ''
            }`}
            >
              #{i + 1}
            </div>

            <div className="flex items-center">
              <img className="w-10 h-10 rounded-full mr-2" src={MonkeySvg} alt="" />
              <div>{e.coin}</div>
            </div>

            <div className="flex items-center font-semibold">{e.last}</div>
            <div
              className={`flex items-center font-semibold justify-start ${
                e.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {e.change.toFixed(2)}%
            </div>
            <div className="flex items-center">{e.fee}</div>
            <div className="w-full flex justify-between items-center">
              <div className="w-[80%] h-full">
                <LeaderGraph />
              </div>
              <div className="font-semibold">{e.graphPercent}%</div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-8 mb-20 flex w-full justify-end gap-4 text-2xl">
        <div className="icon-social flex items-center">Previous</div>
        <div className="icon-social flex items-center bg-text-purple text-white">1</div>
        <div
          className="icon-social flex items-center bg-[#EBE9FF]"
          style={{ borderColor: 'transparent' }}
        >
          2
        </div>
        <div
          className="icon-social flex items-center bg-[#EBE9FF]"
          style={{ borderColor: 'transparent' }}
        >
          3
        </div>
        <div className="icon-social flex items-center border-transparent">Next</div>
      </div>
    </AdminLeaderboardWrapper>
  );
}

export default AdminLeaderboard;
