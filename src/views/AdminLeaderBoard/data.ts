export const randomNumberGraph = (len: number) => {
  const result = [];
  for (let i = 0; i < len; i++) {
    result.push({
      date: '1',
      value: Math.floor(Math.random() * 10 + 1),
    });
  }
  return result;
};

export const dataLeader = [
  {
    coin: 'Ape Master',
    last: '+1,911.48 THB',
    change: 2.54,
    fee: '183,007 THB',
    graphPercent: '0.4',
  },
  {
    coin: 'Ape Boy',
    last: '+1,011.22 THB',
    change: 2.5,
    fee: '173,000 THB',
    graphPercent: '1.1',
  },
  {
    coin: 'Cat lady',
    last: '+911.00 THB',
    change: 2.4,
    fee: '170,000 THB',
    graphPercent: '1.2',
  },
  {
    coin: 'Jame',
    last: '+800.40 THB',
    change: 2.33,
    fee: '163,007 THB',
    graphPercent: '1.5',
  },
  {
    coin: 'Johny',
    last: '+798.48 THB',
    change: 2.2,
    fee: '153,007 THB',
    graphPercent: '1.9',
  },
  {
    coin: 'France',
    last: '+749.48 THB',
    change: 2.0,
    fee: '143,000 THB',
    graphPercent: '2.1',
  },
  {
    coin: 'Tokyo',
    last: '+702.48 THB',
    change: 1.9,
    fee: '123,000 THB',
    graphPercent: '4.0',
  },
  {
    coin: 'David',
    last: '+500.79 THB',
    change: 1.8,
    fee: '113,000 THB',
    graphPercent: '2.0',
  },
  {
    coin: 'Sarah',
    last: '+500.45 THB',
    change: 1.74,
    fee: '103,000 THB',
    graphPercent: '4.2',
  },
  {
    coin: 'Hana',
    last: '+411.88 THB',
    change: 1.7,
    fee: '100,022 THB',
    graphPercent: '1.8',
  },
];
