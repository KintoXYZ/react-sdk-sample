import styled from 'styled-components';
import React from 'react';
import KintoLink from './KintoLink/KintoLink';
import { DOCS_URL, LITEPAPER_URL, MAIN_DISCORD_INVITE_LINK } from 'config';

const AppFooter = () => {
  return (
    <FooterWrapper isApp>
      <ContainerLarge>
        <LogoSection>
          <LogoImg src={'/logo-horizontal-black.svg'} alt="kinto-logo-full" height="64" />
          <BottomLinks>
            <KintoLink to={"https://kinto.xyz"}>
              KINTO.XYZ
            </KintoLink>
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">DOCS</a>
            <KintoLink to={MAIN_DISCORD_INVITE_LINK}>
              JOIN OUR DEVELOPER CHANNEL
            </KintoLink>
            <KintoLink to={"https://kinto.xyz/privacy"}>
              PRIVACY POLICY
            </KintoLink>
            <KintoLink to={"https://kinto.xyz/terms"}>
              Terms of Service
            </KintoLink>
          </BottomLinks>
        </LogoSection>
        <TermsPrivacy>
          © 2024 KINTO
        </TermsPrivacy>
      </ContainerLarge>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div<{ isApp: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  background: ${({ isApp }) => isApp ? 'var(--dark-grey)' : 'url("/mountain.webp") no-repeat, linear-gradient(to bottom,transparent 0%,transparent 2000px,#4C7EA0 2000px,#4C7EA0 100%)'};
  background-size: cover;
  background-position-y: -100vh;
  position: relative;
  align-items: center;

  @media only screen and (max-width: 1280px) {
    margin-top: 60px;
    background-size: contain;
    background-position: center -200px;
    background-color: ${({ isApp }) => isApp ? 'var(--dark-grey)' : '#4C7EA0'};
  }

  @media only screen and (max-width: 1024px) {
    margin-top: 0px;
  }
`;

const ContainerLarge = styled.div`
  width: 100%;
  max-width: var(--screen-lg-min);
  padding: 0 100px;
  box-sizing: border-box;

  a {
    font-size: 18px;
    line-height: 23px;
    color: var(--white);
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    padding-bottom: 16px;
    border-bottom: 2px solid transparent;
    &:hover {
      border-color: var(--white);
    }
  }

  @media only screen and (max-width: 1024px) {
    padding: 0 16px;
  }
`

const LogoSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 140px;

  @media only screen and (max-width: 1024px) {
    flex-flow: column nowrap;
    height: auto;
    align-items: flex-start;
    width: 100%;
    padding-bottom: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
`

const LogoImg = styled.img`
  height: 64px;
  object-fit: fill;

  @media only screen and (max-width: 1024px) {
    padding: 30px 0;
    height: 63px;
  }
`;

const BottomLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0px;
  gap: 32px;

  @media only screen and (max-width: 1024px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`
const TermsPrivacy = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row nowrap;
  padding: 40px 0 60px 0;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.01em;
  text-align: left;
  color: var(--white);
  text-transform: uppercase;
  align-items: center;

  @media only screen and (max-width: 1024px) {
    justify-content: flex-start;
  }
`

export default React.memo(AppFooter);
