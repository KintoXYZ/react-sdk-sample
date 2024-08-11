import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as LinkImage } from './link.svg';
import { IconName } from 'models';
import { Icon } from 'components/shared';
import { BREAKPOINTS, EXPLORER_URL } from 'config';

interface AddressProps {
  address: string;
  chainId: number;
  showExplorer?: boolean;
  showClipboard?: boolean;
  className?: string;
}

const KintoAddress = ({ address,className, chainId, showClipboard, showExplorer }: AddressProps) => {
  const [showCopied, setShowCopied] = useState(false);
  const explorerUrl = EXPLORER_URL;

  const copy = () => {
    navigator.clipboard.writeText(address);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  }

  return (
    <AddressClipboardWrapper className={className}>
      <AddressText>
        {address}
      </AddressText>
      {showClipboard && (
        <div onClick={(e) => copy()}>
          <StyledClip name={IconName.clipboard} size={24} copied={showCopied} />
      </div>
      )}
      {showExplorer && (
        <div onClick={(e) => window.open(`${explorerUrl}/address/${address}/`)}>
          <StyledIcon name={IconName.explore} size={24} />
        </div>
      )}
    </AddressClipboardWrapper>
  );
};

const AddressClipboardWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const AddressText = styled.div`
  color: var(--dark-grey);
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.24px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;

  span {
    transition: opacity 1s ease-in-out;
    opacity: 1;
  }

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.14px;
  }
`;

const StyledClip = styled(Icon)<{copied: boolean}>`
  cursor: pointer;
  width: 24px;
  height: auto;

  svg fill, svg path {
    fill: ${props => props.copied ? 'var(--green)' : 'var(--dark-grey)'};
  }

  &:hover {
    opacity: 0.9;
  }
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  svg fill, svg path {
    fill: var(--dark-grey)}
`;


export default React.memo(KintoAddress);
