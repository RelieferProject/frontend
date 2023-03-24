import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Icon } from '@iconify/react';

interface Props {
  sell?: boolean;
}

const OrderWrapper = styled.div`
  .item-sell:hover {
    ${tw`bg-blue-200`}
    * {
      ${tw`text-blue-500 font-semibold`}
    }
  }

  .item-sell-active {
    ${tw`bg-blue-200`}
    * {
      ${tw`text-blue-500 font-semibold`}
    }
  }

  .item-buy:hover {
    ${tw`bg-yellow-100`}
    * {
      ${tw`text-yellow-500 font-semibold`}
    }
  }

  .item-buy-active {
    ${tw`bg-yellow-100`}
    * {
      ${tw`text-yellow-500 font-semibold`}
    }
  }
`;

function Order(props: Props) {
  const SellList = [
    {
      price: 82.3,
      amount: 0.15,
      total: '$122',
    },
    {
      price: 82.3,
      amount: 0.15,
      total: '$122',
    },
    {
      price: 82.3,
      amount: 0.15,
      total: '$122',
    },
    {
      price: 82.3,
      amount: 0.15,
      total: '$122',
    },
    {
      price: 82.3,
      amount: 0.15,
      total: '$122',
    },
    {
      price: 82.3,
      amount: 0.15,
      total: '$122',
    },
    {
      price: 82.3,
      amount: 0.15,
      total: '$122',
    },
  ];
  return (
    <OrderWrapper className="bg-white h-full p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-black text-2xl">{props.sell ? 'Sell' : 'Buy'} Order</h2>
        <Icon icon={'carbon:overflow-menu-vertical'} />
      </div>
      <div className="w-full px-2 py-2 flex justify-between items-center  my-4 bg-gray-100 hover:bg-gray-200 cursor-pointer">
        <div className="flex items-center ">
          <Icon className="icon-purple text-5xl" icon={'tabler:pig-money'} />
          <p className="text-black ml-4">TTB Easy Saver</p>
        </div>
        <Icon icon="akar-icons:chevron-down" />
      </div>

      <div className="w-full grid grid-cols-3 text-base ">
        <p className="text-center text-text-gray">Price</p>
        <p className="text-center text-text-gray">Amount</p>
        <p className="text-center text-text-gray">Total</p>
      </div>

      {SellList.map((e, i) => (
        <div
          className={`w-full grid grid-cols-3 text-base py-3 my-1 cursor-pointer ${
            props.sell ? 'item-sell' : 'item-buy'
          } ${i == 2 ? (props.sell ? 'item-sell-active' : 'item-buy-active') : ''}`}
        >
          <p className="text-center ">{e.price}</p>
          <p className="text-center ">{e.amount}</p>
          <p className="text-center ">{e.total}</p>
        </div>
      ))}
    </OrderWrapper>
  );
}

export default Order;
