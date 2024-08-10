import { useEffect, useState } from 'react';
import { createKintoSDK } from './sdk';
import { encodeFunctionData, Address, getContract,
  defineChain, createPublicClient, http } from 'viem';
import { counterAbi, KintoAccountInfo } from './utils';
import './App.css';

const kinto = defineChain({
  id: 7887,
  name: 'Kinto',
  network: 'kinto',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.kinto-rpc.com/'],
      webSocket: ['wss://rpc.kinto.xyz/ws'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://kintoscan.io' },
  },
});

const KintoConnect = () => {
  const [accountInfo, setAccountInfo] = useState<KintoAccountInfo | undefined>(undefined);
  const [counter, setCounter] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const kintoSDK = createKintoSDK('0x14A1EC9b43c270a61cDD89B6CbdD985935D897fE');
  const counterAddress = "0x14A1EC9b43c270a61cDD89B6CbdD985935D897fE" as Address;

  async function kintoLogin() {
    try {
      await kintoSDK.createNewWallet();
    } catch (error) {
      console.error('Failed to login/signup:', error);
    }
  }

  async function fetchCounter() {
    const client = createPublicClient({
      chain: kinto,
      transport: http(),
    });
    const counter = getContract({
      address: counterAddress as Address,
      abi: counterAbi,
      client: { public: client }
    });
    const count = await counter.read.count([]) as BigInt;
    setCounter(parseInt(count.toString()));
  }

  async function increaseCounter() {
    const data = encodeFunctionData({
      abi: counterAbi,
      functionName: 'increment',
      args: []
    });
    setLoading(true);
    const response = await kintoSDK.sendTransaction([{ to: counterAddress, data, value: BigInt(0) }]);
    await fetchCounter();
    setLoading(false);
  }

  useEffect(() => {
    const fetchAccountInfo = async () => {
      setAccountInfo(await kintoSDK.connect());
    };
    fetchAccountInfo();
    fetchCounter();
  }, []);

  // todo: add info about the dev portal and link
  return (
    <>
      {accountInfo && (
        <div>
          {!accountInfo.walletAddress && (
            <button onClick={kintoLogin}>
              Login/Signup
            </button>
          )}
          {accountInfo.walletAddress && (
            <p>Connected with wallet address: {accountInfo.walletAddress}</p>
          )}
          {!accountInfo.appKey && (
            <>
              <p>Need to approve this application before sending the first transaction</p>
            </>
          )}
          {accountInfo.appKey && (
            <>
              <p>App approved: {accountInfo.approval}</p>
              <p>App key: {accountInfo.appKey} </p>
            </>
          )}
          {accountInfo && (
            <button onClick={increaseCounter}>
              Increase Counter
            </button>
          )}
          <p>Counter: {counter}</p>
        </div>
      )}
      {!accountInfo && (
        <>Loading Kinto...</>
      )}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <KintoConnect />
    </div>
  );
}

export default App;
