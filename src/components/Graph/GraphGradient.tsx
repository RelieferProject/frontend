import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  data: any[];
  color: any[];
  index: any;
}

const GraphGradientWrapper = styled.div`
  height: 5rem;
  width: 100%;
`;

function GraphGradient(props: Props) {
  return (
    <GraphGradientWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={props.data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id={`colorUv-${props.index}`} x1="0" y1="0" x2="0" y2="2">
              <stop offset="0%" stopColor={props.color[0]} stopOpacity={1} />
              <stop offset="100%" stopColor={props.color[1]} stopOpacity={1} />
            </linearGradient>
          </defs>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <XAxis dataKey="name" /> */}
          {/* <YAxis /> */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="transparent"
            fill={`url(${`#colorUv-${props.index}`})`}
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </GraphGradientWrapper>
  );
}

export default GraphGradient;
