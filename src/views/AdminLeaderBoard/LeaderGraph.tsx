import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {}

const LeaderGraphWrapper = styled.div``;

function LeaderGraph(props: Props) {
  const data = [
    {
      name: 'Jan',
      uv: Math.floor(Math.random() * 10 + 1),
    },
    {
      name: 'Feb',
      uv: Math.floor(Math.random() * 10 + 1),
    },
    {
      name: 'March',
      uv: Math.floor(Math.random() * 10 + 1),
    },
    {
      name: 'April',
      uv: Math.floor(Math.random() * 10 + 1),
    },
    {
      name: 'May',
      uv: Math.floor(Math.random() * 10 + 1),
    },
    {
      name: 'June',
      uv: Math.floor(Math.random() * 10 + 1),
    },
    {
      name: 'July',
      uv: Math.floor(Math.random() * 10 + 1),
    },
  ];
  return (
    <LeaderGraphWrapper className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          // width={200}
          // height={100}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={5}
        >
          {/* <XAxis dataKey="date" scale="point" padding={{ left: 10, right: 10 }} /> */}
          {/* <YAxis /> */}
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="uv" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    </LeaderGraphWrapper>
  );
}

export default LeaderGraph;
