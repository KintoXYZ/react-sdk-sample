import React from 'react';
import { BaseButton } from '../BaseButton';
import styled from 'styled-components';
import { IconName } from 'models';

interface OutlineWhiteButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: string;
  className?: string;
  children: React.ReactNode;
  rightIcon?: IconName;
  leftIcon?: IconName;
}

const OutlineWhiteButton = ({ leftIcon, rightIcon, onClick, disabled, className, children, type }: OutlineWhiteButtonProps) => {
  return (
    <StyledBaseButton
      color={'var(--white)'}
      className={className}
      background={'transparent'}
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

const StyledBaseButton = styled(BaseButton)`
  border: 1px solid var(--white);
`;

export default React.memo(OutlineWhiteButton);
