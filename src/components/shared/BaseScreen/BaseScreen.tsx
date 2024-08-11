import React from 'react';
import { BREAKPOINTS } from 'config';
import styled from 'styled-components';

interface BaseScreenProps {
  children: React.ReactNode;
  className?: string;
}

const BaseScreen = ({ children, className }: BaseScreenProps) => {
  return (
    <BaseScreenContainer className={className}>
      {children}
    </BaseScreenContainer>
  );
};

const BaseScreenContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: var(--screen-lg-min);
  padding: 64px 128px 128px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 64px;
  box-sizing: border-box;
  min-height: 440px;

  @media only screen and (max-width: ${BREAKPOINTS.standard}) {
    padding: 64px;
    gap: 48px;
  }

  @media only screen and (max-width: ${BREAKPOINTS.tablet}) {
    padding: 64px 32px;
  }
  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    padding: 64px 24px;
  }
`;

export default React.memo(BaseScreen);
