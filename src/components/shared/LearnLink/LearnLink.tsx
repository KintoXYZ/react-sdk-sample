import React from 'react';
import { Icon } from 'components/shared';
import { IconName } from 'models';
import { BREAKPOINTS } from 'config';
import styled from 'styled-components';

interface LearnLinkProps {
  link: string;
  text: string;
  className?: string;
}

const LearnLink = ({ link, text, className  }: LearnLinkProps) => {
  return (
    <LearnLinkWrapper className={className}>
      <Icon name={IconName.chevronRight} size={25} color={"var(--orange)"} />
      <a href={link} target="_blank" rel="noopener noreferrer">{text}</a>
    </LearnLinkWrapper>
  );
};

const LearnLinkWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  align-items: center;

  a, a:visited, a:focus, a:active {
    color: var(--primary);
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
  }

  a:hover {
    text-decoration: underline;
    color: var(--primary);
  }

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    margin-bottom: 60px;
  }
`;


export default React.memo(LearnLink);
