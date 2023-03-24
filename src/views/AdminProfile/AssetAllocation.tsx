import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Icon } from '@iconify/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from 'recharts';

interface Props {}

const AssetAllocationWrapper = styled.div``;

const data = [
  { name: 'Flex Saving', value: 25, color: '#FFAB2D' },
  { name: 'SCBSMART2A', value: 25, color: '#3C8AFF' },
  { name: 'TMB50_Fund', value: 25, color: '#6F7191' },
  { name: 'TTB Easy Saver', value: 15, color: '#00972d' },
  { name: 'Cash', value: 25, color: '#AC4CBC' },
];

const CustomizedLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="flex w-full flex-wrap gap-4">
      {payload.map((entry, index) => (
        <li key={`item-${index}`}>
          <div className="flex items-center">
            <div
              style={{ backgroundColor: entry.payload.fill }}
              className="w-4 h-4 rounded-md mr-2"
            />
            <div className="text-base text-black font-bold">{entry.value}</div>
          </div>
          {/* <div className="text-base">{entry.payload.value}</div> */}
        </li>
      ))}
    </ul>
  );
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  console.log(RADIAN);
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  console.log('midAngle', midAngle);
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 10;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={3} textAnchor="middle" className="text-base font-bold" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {payload.name !== 'No Data Found' && (
        <React.Fragment>
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

          <text
            className="text-2xl font-bold"
            x={ex + (cos >= 0 ? 1 : -1) * 0}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="black"
          >
            {`${(percent * 100).toFixed(2)}%`}
          </text>
        </React.Fragment>
      )}
    </g>
  );
};

function AssetAllocation(props: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };
  return (
    <AssetAllocationWrapper className="col-span-3 lg:col-span-2  py-6 px-6 bg-white shadow-lg rounded flex flex-col items-center">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-black text-xl">Asset Allocation (%)</h2>
        <Icon icon={'carbon:overflow-menu-vertical'} />
      </div>
      <div className="h-[45rem] lg:h-[28rem] w-full mt-4">
        <ResponsiveContainer className={'flex justify-center'}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx={'50%'}
              cy={'50%'}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend content={<CustomizedLegend />} />
            {/* <Tooltip /> */}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </AssetAllocationWrapper>
  );
}

export default AssetAllocation;
