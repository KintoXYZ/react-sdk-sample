import React from 'react';

import styled from 'styled-components';

const AppHeader = () => {

  const getSubdomain = () => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    if (parts.length >= 3) {
      return parts[0];
    }
    return null;
  }

  return (
    <>
      <HeaderWrapper>
        <ContainerLarge>
          <StyledHeader>
            <LogoWrapper onClick={() => window.open('https://kinto.xyz')}>
              <LogoImg src={'/logo-horizontal-black.svg'} alt="kinto-logo-full" width="129" height="50" />
            </LogoWrapper>
            <NavLinkWrapperMain>
              <NavLinkItem href={'https://engen.kinto.xyz/developers'}>Dev Portal</NavLinkItem>
              <NavLinkItem href={"https://explorer.kinto.xyz"}>
                Block Explorer
              </NavLinkItem>
              <NavLinkItem href="https://docs.kinto.xyz">
                Docs
              </NavLinkItem>
            </NavLinkWrapperMain>
          </StyledHeader>
        </ContainerLarge>
      </HeaderWrapper>
    </>
  );
};

const HeaderWrapper = styled.div`
  align-items: flex-end;
  background-color: var(--night);
  display: flex;
  justify-content: center;
  width: 100%;
`;

const NavLinkWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  gap: 32px;
  align-items: center;
`;

const NavLinkWrapperMain = styled(NavLinkWrapper)`
  padding-left: 0;
  width: 100%;

  @media only screen and (max-width: 400px}) {
    > a {
      display: none;
    }

    > a:nth-child(2) {
      display: block;
    }
  }
`;

const NavLinkItem = styled.a<{ selected?: boolean }>`
  font-size: 18px;
  line-height: 23px;
  display: flex;
  align-items: center;
  padding: 16px 0px;
  gap: 10px;
  align-items: center;
  color: var(--light-grey);
  letter-spacing: 0.01em;
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.6s cubic-bezier(0.25, 0.1, 0.4, 1.5);

  &:hover {
    cursor: ${(p) => (p.selected ? 'default' : 'pointer')};
    text-decoration: none;
    border-bottom: 2px solid var(--light-grey);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ContainerLarge = styled.div`
  position: relative;
  max-width: var(--screen-lg-min);
  width: 100%;
  padding: 0 40px;

  @media only screen and (max-width: 1440px) {
    padding: 0 100px;
  }

  @media only screen and (max-width: 992px) {
    padding: 0 45px 0 30px;
  }

  @media only screen and (max-width: 598px) {
    padding: 0 15px;
  }
`;

const LogoImg = styled.img`
  height: 50px;
  object-fit: fill;

  @media only screen and (max-width: 1240px) {
    height: 40px;
  }

  @media only screen and (max-width: 400px) {
    height: 35px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  height: 56px;

  @media only screen and (max-width: 1240px) {
    height: 40px;
  }

  @media only screen and (max-width: 400px) {
    height: 35px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;

  @media only screen and (max-width: 992px) {
    height: 66px;
  }
`;

export default React.memo(AppHeader);
