import React from 'react';
import { BaseButton } from '../BaseButton';
import { IconName } from 'models';

interface PrimaryButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: string;
  children: React.ReactNode;
  className?: string;
  rightIcon?: IconName;
  leftIcon?: IconName;
}

const PrimaryButton = ({ leftIcon, rightIcon, onClick, className, disabled, children, type }: PrimaryButtonProps) => {
  return (
    <BaseButton
      color={'var(--white)'}
      className={className}
      background={'var(--primary)'}
      type={type}
      onClick={onClick}
      disabled={disabled}
      rightIcon={rightIcon}
      leftIcon={leftIcon}
    >
      {children}
    </BaseButton>
  );
};

export default React.memo(PrimaryButton);
