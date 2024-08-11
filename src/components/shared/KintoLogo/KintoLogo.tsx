import React from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from 'config';

export enum LogoType {
  black = '/logo-horizontal-black.svg'
}

interface KintoLogoProps {
  type: LogoType;
  background?: string;
  height?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const KintoLogo = ({ type, background, height, onClick }: KintoLogoProps) => {
  const actualHeight = height || 75;
  return (
    <KintoLogoWrapper 
      onClick={onClick}
      backgroundCSS={background || 'transparent'} height={actualHeight}>
      <LogoImg src={type} alt="kinto-logo" height={actualHeight} />
    </KintoLogoWrapper>
  );
};


const KintoLogoWrapper = styled.div<{backgroundCSS: string, height: number}>`
  display: flex;
  height: ${({ height }) => height ? `${height}px` : 'auto'};
  background: ${({ backgroundCSS }) => backgroundCSS};
`;

const LogoImg = styled.img<{ height: number }>`
  height: ${({ height }) => height ? `${height}px` : 'auto'};

  object-fit: fill;

  @media only screen and (max-width: 1240px) {
    height: ${({ height }) => height ? `${height * 0.8}px` : 'auto'};
  }

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    height: ${({ height }) => height ? `${height * 0.6}px` : 'auto'};
  }
`;


export default React.memo(KintoLogo);
