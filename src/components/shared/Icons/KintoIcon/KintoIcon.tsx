import { ReactComponent as DefiBoxIcon } from './icons/defi-box.svg';
import { ReactComponent as DefiCircleIcon } from './icons/defi-circle.svg';
import { ReactComponent as EmailBoxIcon } from './icons/email-box.svg';
import { ReactComponent as EmailCircleIcon } from './icons/email-circle.svg';
import { ReactComponent as EthereumBoxIcon } from './icons/ethereum-box.svg';
import { ReactComponent as EthereumCircleIcon } from './icons/ethereum-circle.svg';
import { ReactComponent as FaceBoxIcon } from './icons/face-box.svg';
import { ReactComponent as FaceCircleIcon } from './icons/face-circle.svg';
import { ReactComponent as IdentificationBoxIcon } from './icons/identification-box.svg';
import { ReactComponent as IdentificationCircleIcon } from './icons/identification-circle.svg';
import { ReactComponent as NokeyBoxIcon } from './icons/nokey-box.svg';
import { ReactComponent as NokeyCircleIcon } from './icons/nokey-circle.svg';
import { ReactComponent as NophraseBoxIcon } from './icons/nophrase-box.svg';
import { ReactComponent as NophraseCircleIcon } from './icons/nophrase-circle.svg';
import { ReactComponent as NowebBoxIcon } from './icons/noweb-box.svg';
import { ReactComponent as NowebCircleIcon } from './icons/noweb-circle.svg';
import { ReactComponent as PasswordBoxIcon } from './icons/password-box.svg';
import { ReactComponent as PasswordCircleIcon } from './icons/password-circle.svg';
import { ReactComponent as SecuredBoxIcon } from './icons/secured-box.svg';
import { ReactComponent as SecuredCircleIcon } from './icons/secured-circle.svg';
import { ReactComponent as SecurityBoxIcon } from './icons/security-box.svg';
import { ReactComponent as SecurityCircleIcon } from './icons/security-circle.svg';
import { ReactComponent as SurveilanceBoxIcon } from './icons/surveilance-box.svg';
import { ReactComponent as SurveilanceCircleIcon } from './icons/surveilance-circle.svg';
import { ReactComponent as TradfiBoxIcon } from './icons/tradfi-box.svg';
import { ReactComponent as TradfiCircleIcon } from './icons/tradfi-circle.svg';
import { ReactComponent as UserBoxIcon } from './icons/user-box.svg';
import { ReactComponent as UserCircleIcon } from './icons/user-circle.svg';
import { ReactComponent as VerifiedBoxIcon } from './icons/verified-box.svg';
import { ReactComponent as VerifiedCircleIcon } from './icons/verified-circle.svg';

import { IconName } from 'models';
import React from 'react';
import styled from 'styled-components';

export enum IconShape {
  box = 'box',
  circle = 'circle',
}

interface IconProps {
  shape?: IconShape;
  name: IconName;
  size?: number;
  className?: string;
  rotate?: number;
}

type IconType = {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export type KintoIconName = keyof IconType;

const Icons:IconType = {
  'defi-box': DefiBoxIcon,
  'defi-circle': DefiCircleIcon,
  'email-box': EmailBoxIcon,
  'email-circle': EmailCircleIcon,
  'ethereum-box': EthereumBoxIcon,
  'ethereum-circle': EthereumCircleIcon,
  'face-box': FaceBoxIcon,
  'face-circle': FaceCircleIcon,
  'identification-box': IdentificationBoxIcon,
  'identification-circle': IdentificationCircleIcon,
  'nokey-box': NokeyBoxIcon,
  'nokey-circle': NokeyCircleIcon,
  'nophrase-box': NophraseBoxIcon,
  'nophrase-circle': NophraseCircleIcon,
  'noweb-box': NowebBoxIcon,
  'noweb-circle': NowebCircleIcon,
  'password-box': PasswordBoxIcon,
  'password-circle': PasswordCircleIcon,
  'secured-box': SecuredBoxIcon,
  'secured-circle': SecuredCircleIcon,
  'security-box': SecurityBoxIcon,
  'security-circle': SecurityCircleIcon,
  'surveilance-box': SurveilanceBoxIcon,
  'surveilance-circle': SurveilanceCircleIcon,
  'tradfi-box': TradfiBoxIcon,
  'tradfi-circle': TradfiCircleIcon,
  'user-box': UserBoxIcon,
  'user-circle': UserCircleIcon,
  'verified-box': VerifiedBoxIcon,
  'verified-circle': VerifiedCircleIcon,
};

const getIconByName = (name:KintoIconName, shape?: IconShape) => {
  return Icons[name + '-' + shape || 'box'];
};

const KintoIcon = ({ shape, name, size, rotate, className }: IconProps) => {
  const Comp = getIconByName(name, shape);
  if (!Comp) {
    return <div />;
  }
  return (
    <IconWrapper size={size || 30} className={className} rotate={rotate}>
      <Comp />
    </IconWrapper>
  );
};

const IconWrapper = styled.div<{ size: number; rotate: number | undefined }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  svg {
    ${(p) => (p.rotate ? `transform: rotate(${p.rotate}deg);` : '')}
    width: ${(p) => p.size}px;
    height: ${(p) => p.size}px;

    path {
      fill: ${(p) => p.color};
    }
  }
`;

export default React.memo(KintoIcon);
