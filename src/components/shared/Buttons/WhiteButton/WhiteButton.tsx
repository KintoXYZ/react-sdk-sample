import React from 'react';
import { BaseButton } from '../BaseButton';
import styled from 'styled-components';
import { IconName } from 'models';

interface WhiteButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: string;
  className?: string;
  children: React.ReactNode;
  rightIcon?: IconName;
  leftIcon?: IconName;
}

const WhiteButton = ({ leftIcon, rightIcon, onClick, disabled, className, children, type }: WhiteButtonProps) => {
  return (
    <StyledBaseButton
      color={'var(--night)'}
      className={className}
      background={'var(--white)'}
      type={type}
      onClick={onClick}
      disabled={disabled}
      rightIcon={rightIcon}
      leftIcon={leftIcon}
    >
      {children}
    </StyledBaseButton>
  );
};

const StyledBaseButton = styled(BaseButton)``;

export default React.memo(WhiteButton);
