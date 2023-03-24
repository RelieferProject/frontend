import { sample } from 'lodash';

if (
  !import.meta.env.VITE_APP_NODE_1 ||
  !import.meta.env.VITE_APP_NODE_2 ||
  !import.meta.env.VITE_APP_NODE_3
) {
  throw Error('One base RPC URL is undefined');
}

// Array of available nodes to connect to
export const nodes = [
  import.meta.env.VITE_APP_NODE_1,
  import.meta.env.VITE_APP_NODE_2,
  import.meta.env.VITE_APP_NODE_3,
];

console.log(nodes);

if (import.meta.env.NODE_ENV === 'production' && import.meta.env.VITE_APP_NODE_1) {
  nodes.push(import.meta.env.VITE_APP_NODE_1);
}

const getNodeUrl = () => {
  return sample(nodes);
};

export default getNodeUrl;
