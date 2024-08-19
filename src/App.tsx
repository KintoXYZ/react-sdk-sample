import { useEffect, useState } from 'react';
import { createKintoSDK, KintoAccountInfo } from 'kinto-web-sdk';
import {
  encodeFunctionData, Address, getContract,
  defineChain, createPublicClient, http
} from 'viem';
import styled from 'styled-components';
import AppHeader from 'components/shared/AppHeader';
import AppFooter from 'components/shared/AppFooter';
import {
  BaseScreen, BaseHeader, LearnLink, KintoAddress,
  GlobalLoader, PrimaryButton
} from 'components/shared';
import { BREAKPOINTS } from 'config';
import { ReactComponent as CreditImage } from './credit.svg';
import numeral from 'numeral';
import contractsJSON from '../public/abis/7887.json';
import './App.css';

interface KYCViewerInfo {
  isIndividual: boolean;
  isCorporate: boolean;
  isKYC: boolean;
  isSanctionsSafe: boolean;
  getCountry: string;
  getWalletOwners: Address[];
}

export const counterAbi = [{ "type": "constructor", "inputs": [], "stateMutability": "nonpayable" }, { "type": "function", "name": "count", "inputs": [], "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }], "stateMutability": "view" }, { "type": "function", "name": "increment", "inputs": [], "outputs": [], "stateMutability": "nonpayable" }];

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
  const [kycViewerInfo, setKYCViewerInfo] = useState<any | undefined>(undefined);
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
    try {
      const response = await kintoSDK.sendTransaction([{ to: counterAddress, data, value: BigInt(0) }]);
      await fetchCounter();
    } catch (error) {
      console.error('Failed to login/signup:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchKYCViewerInfo() {
    if (!accountInfo?.walletAddress) return;

    const client = createPublicClient({
      chain: kinto,
      transport: http(),
    });
    const kycViewer = getContract({
      address: contractsJSON.contracts.KYCViewer.address as Address,
      abi: contractsJSON.contracts.KYCViewer.abi,
      client: { public: client }
    });

    try {
      const [isIndividual, isCorporate, isKYC, isSanctionsSafe, getCountry, getWalletOwners] = await Promise.all([
        kycViewer.read.isIndividual([accountInfo.walletAddress]),
        kycViewer.read.isCompany([accountInfo.walletAddress]),
        kycViewer.read.isKYC([accountInfo.walletAddress]),
        kycViewer.read.isSanctionsSafe([accountInfo.walletAddress]),
        kycViewer.read.getCountry([accountInfo.walletAddress]),
        kycViewer.read.getWalletOwners([accountInfo.walletAddress])
      ]);

      setKYCViewerInfo({
        isIndividual,
        isCorporate,
        isKYC,
        isSanctionsSafe,
        getCountry,
        getWalletOwners
      } as KYCViewerInfo);
    } catch (error) {
      console.error('Failed to fetch KYC viewer info:', error);
    }

    console.log('KYCViewerInfo:', kycViewerInfo);
  }

  async function fetchAccountInfo() {
    try {
      setAccountInfo(await kintoSDK.connect());
    } catch (error) {
      console.error('Failed to fetch account info:', error);
    }
  };

  useEffect(() => {
    fetchAccountInfo();
    fetchCounter();
  });

  useEffect(() => {
    if (accountInfo?.walletAddress) {
      fetchKYCViewerInfo();
    }
  }, [accountInfo]);

  // todo: add info about the dev portal and link
  return (
    <WholeWrapper>
      <AppWrapper>
        <ContentWrapper>
          <AppHeader />
          <BaseScreen>
            {accountInfo && (
              <BgWrapper>
                <CounterWrapper>
                  <BaseHeader
                    title="Kinto Wallet SDK Sample App" />
                  {!accountInfo.walletAddress && (
                    <PrimaryButton onClick={kintoLogin}>
                      Login/Signup
                    </PrimaryButton>
                  )}
                  <WalletRows>
                    <WalletRow key="chain">
                      <WalletRowName>Chain</WalletRowName>
                      <WalletRowValue>
                        <StyledCreditImage />
                        <KintoLabel>Kinto (ID: 7887)</KintoLabel>
                      </WalletRowValue>
                    </WalletRow>
                    <WalletRow key="app">
                      <WalletRowName>App</WalletRowName>
                      <WalletRowValue>
                        <StyledMainAddress chainId={7887} address={counterAddress} showExplorer showClipboard />
                      </WalletRowValue>
                    </WalletRow>
                    <WalletRow key="address">
                      <WalletRowName>Wallet</WalletRowName>
                      <WalletRowValue>
                        <StyledMainAddress chainId={7887} address={accountInfo.walletAddress as Address} showExplorer showClipboard />
                      </WalletRowValue>
                    </WalletRow>
                    <WalletRow key="Application Key">
                      <WalletRowName>App Key</WalletRowName>
                      <WalletRowValue>
                        <StyledMainAddress chainId={7887} address={accountInfo.appKey as Address} showExplorer showClipboard />
                      </WalletRowValue>
                    </WalletRow>
                    {kycViewerInfo && (
                      <>
                        <WalletRow key="isIndividual">
                          <WalletRowName>Is Individual</WalletRowName>
                          <WalletRowValue>
                            <ETHValue>{kycViewerInfo.isIndividual ? 'Yes' : 'No'}</ETHValue>
                          </WalletRowValue>
                        </WalletRow>
                        <WalletRow key="isCorporate">
                          <WalletRowName>Is Corporate</WalletRowName>
                          <WalletRowValue>
                            <ETHValue>{kycViewerInfo.isCorporate ? 'Yes' : 'No'}</ETHValue>
                          </WalletRowValue>
                        </WalletRow>
                        <WalletRow key="isKYC">
                          <WalletRowName>Is KYC</WalletRowName>
                          <WalletRowValue>
                            <ETHValue>{kycViewerInfo.isKYC ? 'Yes' : 'No'}</ETHValue>
                          </WalletRowValue>
                        </WalletRow>
                        <WalletRow key="isSanctionsSafe">
                          <WalletRowName>Is Sanctions Safe</WalletRowName>
                          <WalletRowValue>
                            <ETHValue>{kycViewerInfo.isSanctionsSafe ? 'Yes' : 'No'}</ETHValue>
                          </WalletRowValue>
                        </WalletRow>
                        <WalletRow key="country">
                          <WalletRowName>Country</WalletRowName>
                          <WalletRowValue>
                            <ETHValue>{kycViewerInfo.getCountry}</ETHValue>
                          </WalletRowValue>
                        </WalletRow>
                      </>
                    )}
                    <WalletRow key="counter">
                      <WalletRowName>Counter</WalletRowName>
                      <WalletRowValue>
                        <ETHValue>{counter}</ETHValue>
                      </WalletRowValue>
                    </WalletRow>
                  </WalletRows>
                  {accountInfo && (
                    <PrimaryButton onClick={increaseCounter}>
                      Increase Counter
                    </PrimaryButton>
                  )}
                  <LearnLink link={"https://docs.kinto.xyz"} text="Learn more about the Kinto Wallet SDK" />
                </CounterWrapper>
              </BgWrapper>
            )}
            {!accountInfo && (
              <GlobalLoader />
            )}
          </BaseScreen>
          <AppFooter />
        </ContentWrapper>
      </AppWrapper>
    </WholeWrapper>
  );
}

const WholeWrapper = styled.div`
  flex-flow: column nowrap;
  height: auto;
  align-items: center;
  width: 100%;
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
  position: relative;
`;

const AppWrapper = styled.div`
  flex-flow: column nowrap;
  height: auto;
  align-items: center;
  width: 100%;
  display: flex;
  min-height: 85vh;
  min-width: 100vw;

  @media only screen and (max-width: 400px) {
    min-height: 90vh;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  height: auto;
  min-height: 100vh;
  width: 100%;
  background: url(engen/commitment.svg) no-repeat;
  background-position-x: right;
  background-size: auto;
  overflow: hidden;
`;

const BgWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  justify-content: center;
`;

const CounterWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  gap: 32px;
  padding: 16px 0;
`;

const WalletRows = styled.div`
  display: flex;
  padding-top: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  max-width: 800px;
  border-top: 1px solid var(--light-grey3);
`;

const WalletRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding-bottom: 16px;
  align-items: center;
  gap: 32px;
  align-self: stretch;
  border-bottom: 1px solid var(--light-grey3);
  width: 100%;
  overflow: hidden;
`;

const WalletRowName = styled.div`
  width: 150px;
  color: var(--night);
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    width: 60px;
    font-size: 14px;
  }
`;

const WalletRowValue = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  font-size: 24px;
  font-weight: 700;
  line-height: 120%;

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 20px;
  }
`;

const StyledCreditImage = styled(CreditImage)`
  height: 28px;
  width: 28px;
`;

const KintoLabel = styled.div`
  color: var(--night);
  font-size: 24px;
  font-weight: 400;
  line-height: 120%; /* 28.8px */
  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 20px;
  }
`;

const StyledMainAddress = styled(KintoAddress)`
  > div {
    font-size: 24px;
    font-weight: 700;
  }
  gap: 16px;
  svg {
    width: 32px;
    height: 32px;
  }
  div {
    border: none;
    padding: 0;
    justify-content: flex-start;

    div div {
      width: calc(100% - 84px);
    }
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;

const WalletNotice = styled.div`
  color: var(--dark-grey);
  font-size: 18px;
  font-weight: 400;
  width: 95%;

  span {
    color: var(--orange);
    font-weight: 700;
  }
`;

const ETHValue = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 400;
  line-height: 120%;
  color: var(--night);

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 24px;
  }

`;

function App() {
  return (
    <div className="App">
      <KintoConnect />
    </div>
  );
}

export default App;
