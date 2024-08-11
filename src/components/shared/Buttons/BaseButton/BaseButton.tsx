import { BREAKPOINTS } from 'config';
import Button from '@mui/material/Button';
import React from 'react';
import styled from 'styled-components';
import { IconName } from 'models';
import { Icon } from 'components/shared/Icons/Icon';

interface BaseButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: string;
  className?: string;
  children: React.ReactNode;
  color: string;
  background: string;
  ml?: number;
  mr?: number;
  height?: number;
  minWidth?: number;
  leftIcon?: IconName;
  rightIcon?: IconName;
}

const BaseButton = ({
  onClick,
  className,
  background,
  disabled,
  leftIcon,
  rightIcon,
  color,
  children,
  ml = 0,
  mr = 0,
  height = 50,
  minWidth = 100,
}: BaseButtonProps) => {
  return (
    <StyledPrimaryButton
      className={className}
      mr={mr}
      ml={ml}
      bcolor={color}
      height={height}
      minwidth={minWidth}
      background={background}
      onClick={onClick}
      disabled={disabled}
    >
      {leftIcon && (
        <Icon name={leftIcon} color={color} size={25} />
      )}
      <div>
        {children}
      </div>
      {rightIcon && (
        <Icon name={rightIcon} color={color} size={25} />
      )}
    </StyledPrimaryButton>
  );
};

const StyledPrimaryButton = styled(Button)<{
  bcolor: string;
  className: string | undefined;
  children: React.ReactNode,
  background: string;
  mr: number;
  ml: number;
  height: number;
  minwidth: number;
}>`
  margin-right: ${(props) => props.mr};
  margin-left: ${(props) => props.ml};
  height: ${(props) => props.height}px;
  min-width: ${(props) => props.minwidth}px;
  padding: 16px 24px;
  line-height: 24px;
  border-radius: 50px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  gap: 6px;
  cursor: pointer;
  background-color: ${(props) => props.background};
  color: ${(props) => `${props.bcolor}`};
  transition: background-color 0.6s cubic-bezier(0.25, 0.1, 0.4, 1.5), color 0.6s cubic-bezier(0.25, 0.1, 0.4, 1.5);

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 12px;
  }

  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), #D0CCC8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-color: transparent;
  }

  &:focus {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), #D0CCC8;
    border-color: transparent;
  }

  &:disabled {
    opacity: 0.3;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), #D0CCC8;
    color: var(--light-grey);
    cursor: not-allowed;
    border-color: transparent;
  }

`;

export default React.memo(BaseButton);
