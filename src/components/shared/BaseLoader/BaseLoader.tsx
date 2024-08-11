import React from 'react';
import styled from 'styled-components';
import { CircularProgress, CircularProgressProps } from '@mui/material';

interface BaseLoaderProps {
  size: number;
  color?: CircularProgressProps["color"];
  background?: string;
  text?: string;
  className?: string;
}

const BaseLoader = ({ size, color, background, className, text }: BaseLoaderProps) => {
  return (
    <BaseLoaderWrapper className={className}>
      <CircularProgress size={size} color={color} />
      {text && <LoaderText>{text}</LoaderText>}
    </BaseLoaderWrapper>
  );
};

const BaseLoaderWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const LoaderText = styled.div`
  font-size: 20px;
  margin: 40px 0 10px;
  width: auto;
  text-align: center;
  color: var(--primary);
  width: 100%;
  padding: 0 30px;
`;

export default React.memo(BaseLoader);
