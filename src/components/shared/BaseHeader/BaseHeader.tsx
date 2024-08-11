import React from 'react';
import { BREAKPOINTS } from 'config';
import styled from 'styled-components';

interface BaseHeaderProps {
  title?: string;
  subtitle?: string;
  error?: string;
}

const BaseHeader = ({ title, subtitle, error  }: BaseHeaderProps) => {
  return (
    <BaseHeaderWrapper>
      {title && (
        <Title>
          {title}
        </Title>
      )}
      {subtitle && (
        <Content>
          {subtitle}
        </Content>
      )}
      {error && (
        <WalletError>
          {error}
        </WalletError>
      )}
    </BaseHeaderWrapper>
  );
};

const BaseHeaderWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
  width: 100%;
  max-width: 700px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
  line-height: 120%;
  width: 100%;

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 28px;
  }
`;

const Content = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
  width: 100%;

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 16px;
  }
`;

const WalletError = styled.div`
  font-size: 18px;
  color: var(--orange);
  font-weight: 500;
  line-height: 150%;

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 16px;
  }
`;

export default React.memo(BaseHeader);
