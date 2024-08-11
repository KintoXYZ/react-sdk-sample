import React from 'react';
import styled from 'styled-components';

interface TextLinkProps {
  children: React.ReactNode;
  className?: string;
  hasIcon?: boolean;
  to: string;
}

const KintoLink = ({ to, hasIcon, className, children }: TextLinkProps) => {

  const renderContents = () => {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <LinkWrapper className={className}>
      {renderContents()}
    </LinkWrapper>
  );
};

const LinkWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 10px 0px 0px;
  gap: 16px;
  font-weight: 500;
  font-size: 28px;
  line-height: 130%;
  a {
    color: var(--night);
  }

  svg {
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.2, 2, 0.4, 0.8);
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }

  a:active {
    color: var(--sand);
  }

  &:visited {
    color: var(--sand);
  }

`

export default React.memo(KintoLink);
