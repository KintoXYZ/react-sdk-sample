import { Animation, AnimationName } from 'components/shared';
import React from 'react';
import styled from 'styled-components';

interface GlobalLoaderProps {
  size?: number;
  text?: any;
  className?: string;
}

const GlobalLoader = ({ className, size, text }: GlobalLoaderProps) => {
  return (
    <GlobalLoaderWrapper className={className}>
      <Animation name={AnimationName.kintoloader} loop size={size || 300} />
      {text && <LoaderText>{text}</LoaderText>}
    </GlobalLoaderWrapper>
  );
};

const GlobalLoaderWrapper = styled.div`
  width: 100%;
  height: 70vh;
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const LoaderText = styled.div`
  font-size: 20px;
  font-family: 'SpaceGrotesk';
  font-weight: 500;
  margin: 40px 0 10px;
  width: auto;
  text-align: center;
  color: var(--primary);
  width: 100%;
  padding: 0 30px;
`;

export default React.memo(GlobalLoader);
