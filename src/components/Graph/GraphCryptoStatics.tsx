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
import { Switch } from 'antd';

interface Props {}

const GraphCryptoStaticsWrapper = styled.div`
  width: 100%;
`;

const data = [
  {
    date: 'Jan',
    tmb50: 100,
    scbs: 150,
    ttbSave: 200,
    ttbEasy: 250,
    ltc: 300,
  },
  {
    date: 'Feb',
    tmb50: 150,
    scbs: 200,
    ttbSave: 250,
    ttbEasy: 350,
  },
  {
    date: 'Mar',
    tmb50: 100,
    scbs: 150,
    ttbSave: 200,
    ttbEasy: 250,
  },
  {
    date: 'Apr',
    tmb50: 150,
    scbs: 300,
    ttbSave: 250,
    ttbEasy: 350,
  },
  {
    date: 'June',
    tmb50: 100,
    scbs: 150,
    ttbSave: 200,
    ttbEasy: 300,
  },
  {
    date: 'July',
    tmb50: 150,
    scbs: 200,
    ttbSave: 250,
    ttbEasy: 100,
  },
];

const tokenEnum = {
  tmb50: 'TMB50',
  scbs: 'SCBSMART2A',
  ttbSave: 'TTB ME SAVE',
  ttbEasy: 'TTB Easy Saver 15/9',
};

const tokenColorEnum = {
  tmb50: '#FFAB2D',
  scbs: '#3693FF',
  ttbSave: '#8E91C7',
  ttbEasy: '#E062F5',
};

function GraphCryptoStatics(props: Props) {
  const [state, setState] = useState({
    tmb50: true,
    scbs: false,
    ttbSave: true,
    ttbEasy: true,
  });

  const onChange = (checked: boolean) => {};

  const onClickToken = (key: string) => {
    setState({ ...state, [key]: state[key] ? false : true });
  };

  return (
    <GraphCryptoStaticsWrapper className="bg-white p-8 rounded-lg w-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-black text-2xl">Assets Statics</h2>
          <span className="text-base text-text-gray">Asset MarketCap val.</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-2 text-text-purple">Date</span>
            <Switch defaultChecked onChange={onChange} size="small" />
          </div>
          <div className="flex items-center">
            <span className="mr-2 text-text-purple">Value</span>
            <Switch defaultChecked onChange={onChange} size="small" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-4 w-full justify-between">
        {Object.entries(state).map(([key, value]) => (
          <div
            className={`flex cursor-pointer text-2xl`}
            key={`token-${key}`}
            onClick={() => onClickToken(key)}
            style={{ color: tokenColorEnum[key] }}
          >
            <div>
              {state[key] ? (
                <Icon icon={'akar-icons:circle-check'}></Icon>
              ) : (
                <Icon icon={'akar-icons:circle'}></Icon>
              )}
            </div>
            <div className="ml-3">
              <p style={{ color: tokenColorEnum[key] }} className="text-lg ">
                {tokenEnum[key]}
              </p>
              <span style={{ color: tokenColorEnum[key] }} className="text-base">
                {key.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[30rem] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 0,
              right: 10,
              left: 20,
              bottom: 0,
            }}
          >
            <defs>
              {Object.entries(tokenColorEnum).map(([key]) => {
                return (
                  <linearGradient id={`color-token-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={tokenColorEnum[key]} stopOpacity={1} />
                    <stop offset="60%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                );
              })}
            </defs>
            <XAxis dataKey="date" />
            {/* <YAxis /> */}
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            {Object.entries(state).map(([key, value]) => {
              return value ? (
                <Area
                  type="monotone"
                  dataKey={key}
                  stroke={tokenColorEnum[key]}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill={`url(${`#color-token-${key}`})`}
                />
              ) : null;
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GraphCryptoStaticsWrapper>
  );
}

export default GraphCryptoStatics;
