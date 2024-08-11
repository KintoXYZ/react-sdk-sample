import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArbitrumIcon } from './icons/arbitrum.svg';
import { ReactComponent as OptimismIcon } from './icons/optimism.svg';
import { ReactComponent as BaseIcon } from './icons/base.svg';
import { ReactComponent as EthereumIcon } from './icons/ethereum.svg';
import { ReactComponent as KintoIcon } from './icons/kinto.svg';

export enum Chain {
  arbitrum = 'arbitrum',
  base = 'base',
  optimism = 'optimism',
  kinto = 'kinto',
  ethereum = 'ethereum',
}

type IconType = {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export type KintoIconName = keyof Chain;

const Icons:IconType = {
  '42161': ArbitrumIcon,
  '8453': BaseIcon,
  '10': OptimismIcon,
  '7887': KintoIcon,
  '1': EthereumIcon
};


const getIconByChainId = (chainId:number) => {
  return Icons[chainId.toString()];
};

const getIconByChain = (chain:Chain) => {
  switch (chain) {
    case Chain.arbitrum:
      return ArbitrumIcon;
    case Chain.base:
      return BaseIcon;
    case Chain.optimism:
      return OptimismIcon;
    case Chain.kinto:
      return KintoIcon;
    case Chain.ethereum:
      return EthereumIcon;
    default:
      return BaseIcon;
  }
}

interface ChainIconProps {
  chainId?: number;
  chain?: Chain;
  size?: number;
  className?: string;
  rotate?: number;
}

const ChainIcon = ({ chainId, chain, size, rotate, className }: ChainIconProps) => {
  const Comp = chainId ? getIconByChainId(chainId): getIconByChain((chain || Chain.ethereum) as Chain);
  if (!Comp) {
    return <div />;
  }
  return (
    <IconWrapper size={size || 30} className={className} rotate={rotate}>
      <Comp />
    </IconWrapper>
  );
};

const IconWrapper = styled.div<{ size: number; rotate: number | undefined }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  svg {
    ${(p) => (p.rotate ? `transform: rotate(${p.rotate}deg);` : '')}
    width: ${(p) => p.size}px;
    height: ${(p) => p.size}px;

    path {
      fill: ${(p) => p.color};
    }
  }
`;

export default React.memo(ChainIcon);
