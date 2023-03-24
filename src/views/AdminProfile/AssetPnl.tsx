import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Icon } from '@iconify/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {}

const data = [
  {
    date: 'Jan',
    Flex_Saving: 2,
    SCBSMART2A: 1,
  },
  {
    date: 'Feb',
    Flex_Saving: 4,
    SCBSMART2A: 2,
  },
  {
    date: 'Mar',
    Flex_Saving: 2,
    SCBSMART2A: 1,
  },
  {
    date: 'Apr',
    Flex_Saving: 2,
    SCBSMART2A: 10,
  },
  {
    date: 'June',
    Flex_Saving: 4,
    SCBSMART2A: 9,
  },
  {
    date: 'July',
    Flex_Saving: 7,
    SCBSMART2A: 2,
  },
];

const tokenColorEnum = {
  Flex_Saving: '#3C8AFF',
  SCBSMART2A: '#FFAB2D',
};

const AssetPnlWrapper = styled.div``;

function AssetPnl(props: Props) {
  const [state, setState] = useState({
    Flex_Saving: true,
    SCBSMART2A: true,
  });
  return (
    <AssetPnlWrapper className="col-span-2 lg:col-span-1 py-6 px-6 bg-white shadow-lg rounded flex flex-col items-center">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-black text-xl">Asset PnL (%)</h2>
        <Icon icon={'carbon:overflow-menu-vertical'} />
      </div>

      <div className="h-[20rem] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 15,
              bottom: 0,
            }}
          >
            <defs>
              {Object.entries(tokenColorEnum).map(([key]) => {
                return (
                  <linearGradient id={`color-asset-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={tokenColorEnum[key]} stopOpacity={1} />
                    <stop offset="60%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                );
              })}
            </defs>
            <XAxis dataKey="date" fontSize={'0.8rem'} />
            {/* <YAxis /> */}
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip />
            {Object.entries(state).map(([key, value]) => {
              return value ? (
                <Area
                  type="monotone"
                  dataKey={key}
                  stroke={tokenColorEnum[key]}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(${`#color-asset-${key}`})`}
                />
              ) : null;
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </AssetPnlWrapper>
  );
}

export default AssetPnl;
