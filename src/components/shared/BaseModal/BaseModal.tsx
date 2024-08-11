import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import React from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from 'config';
import { Icon } from 'components/shared/Icons/Icon';
import { IconName } from 'models';

export enum ModalBg {
  white = 'var(--white)',
  black = 'var(--primary)'
}

interface BaseModalProps {
  header?: string;
  children: React.ReactNode;
  width: string;
  background?: ModalBg;
  isOpen: boolean;
  className?: string;
  hideClose?: boolean;
  toggleModal?: () => void;
}

function BaseModal({ width, header, background = ModalBg.black, children, hideClose, isOpen, toggleModal, className }: BaseModalProps) {
  const closeModal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (toggleModal) {
      toggleModal();
    }
  };
  
  return (
    <StyledModal width={width} open={isOpen} isOpen={isOpen}>
      <ModalCard width={width} background={background} className={className}>
        {!hideClose && (
          <CloseWrapper
            onClick={closeModal}>
              <Icon
                color={background === ModalBg.black ? "var(--white)" :  'var(--primary)'}
                name={IconName.exit}
              />
          </CloseWrapper>
        )}
        <ModalHeadingRow>
          {header}
        </ModalHeadingRow>
        <ModalContentWrapper>{children}</ModalContentWrapper>
    </ModalCard>
    </StyledModal>
  );
}

const StyledModal = styled(Dialog)<{ width: string, isOpen: boolean }>``;

const ModalHeadingRow = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 130%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  min-height: 38px;
`;

const ModalCard = styled(Card)<{ width: string, background: ModalBg }>`
  overflow-x: hidden;
  overflow-y: auto;
  height: auto;
  max-height: 90vh;
  background: ${(p) => `${p.background === ModalBg.white ? 'var(--white)' : 'var(--primary)'}`};
  color: ${(p) => `${p.background === ModalBg.white ? 'var(--primary)' : 'var(--white)'}`};
  border-radius: 16px;
  width: ${(p) => `${p.width}`};
  padding: 30px;
  isolation: isolate;
  box-sizing: border-box;
  position: relative;

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    margin: 10px;
    width: 96%;
    box-sizing: border-box;
  }

`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: auto;
`;

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 30px;
  cursor: pointer;
  position: absolute;
  z-index: 2;
  right: 30px;
  &:hover {
    opacity: 0.7;
  }
`

export default React.memo(BaseModal);
