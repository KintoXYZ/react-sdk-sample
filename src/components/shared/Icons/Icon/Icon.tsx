import { IconName } from 'models';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowDownDarkIcon } from './icons/arrow-down-dark.svg';
import { ReactComponent as ArrowLeftDarkIcon } from './icons/arrow-left-dark.svg';
import { ReactComponent as ArrowRightDarkIcon } from './icons/arrow-right-dark.svg';
import { ReactComponent as ArrowUpDarkIcon } from './icons/arrow-up-dark.svg';
import { ReactComponent as BlogDarkIcon } from './icons/blog-dark.svg';
import { ReactComponent as CheckDarkIcon } from './icons/check-dark.svg';
import { ReactComponent as ChevronDownDarkIcon } from './icons/chevron-down-dark.svg';
import { ReactComponent as ChevronLeftDarkIcon } from './icons/chevron-left-dark.svg';
import { ReactComponent as ChevronRightDarkIcon } from './icons/chevron-right-dark.svg';
import { ReactComponent as ChevronUpDarkIcon } from './icons/chevron-up-dark.svg';
import { ReactComponent as ClipboardIcon } from './icons/clipboard-dark.svg';
import { ReactComponent as DiscordDarkIcon } from './icons/discord-dark.svg';
import { ReactComponent as DownloadDarkIcon } from './icons/download-dark.svg';
import { ReactComponent as ExploreIcon } from './icons/explore-dark.svg';
import { ReactComponent as ErrorDarkIcon } from './icons/error-dark.svg';
import { ReactComponent as ExitDarkIcon } from './icons/exit-dark.svg';
import { ReactComponent as FavoriteDarkIcon } from './icons/favorite-dark.svg';
import { ReactComponent as GithubDarkIcon } from './icons/github-dark.svg';
import { ReactComponent as MenuDarkIcon } from './icons/menu-dark.svg';
import { ReactComponent as MoneyDarkIcon } from './icons/money-dark.svg';
import { ReactComponent as PlusDarkIcon } from './icons/plus-dark.svg';
import { ReactComponent as SearchDarkIcon } from './icons/search-dark.svg';
import { ReactComponent as TwitterDarkIcon } from './icons/twitter-dark.svg';
import { ReactComponent as TrashDarkIcon } from './icons/trash-dark.svg';
import { ReactComponent as UserDarkIcon } from './icons/user-dark.svg';
import { ReactComponent as WalletKeyFullIcon } from './icons/wallet-key-full-dark.svg';
import { ReactComponent as WalletKeyEmptyIcon } from './icons/wallet-key-empty-dark.svg';
import { ReactComponent as WebsiteIcon } from './icons/website-dark.svg';
import { ReactComponent as XIcon } from './icons/x-dark.svg';

interface IconProps {
  color?: string;
  name: IconName;
  size?: number;
  className?: string;
  rotate?: number;
}

type IconType = {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};


const Icons:IconType = {
  'arrow-down-dark': ArrowDownDarkIcon,
  'arrow-left-dark': ArrowLeftDarkIcon,
  'arrow-right-dark': ArrowRightDarkIcon,
  'arrow-up-dark': ArrowUpDarkIcon,
  'error-dark': ErrorDarkIcon,
  'blog-dark': BlogDarkIcon,
  'check-dark': CheckDarkIcon,
  'chevron-down-dark': ChevronDownDarkIcon,
  'chevron-left-dark': ChevronLeftDarkIcon,
  'chevron-right-dark': ChevronRightDarkIcon,
  'chevron-up-dark': ChevronUpDarkIcon,
  'clipboard-dark': ClipboardIcon,
  'discord-dark': DiscordDarkIcon,
  'download-dark': DownloadDarkIcon,
  'explore-dark': ExploreIcon,
  'exit-dark': ExitDarkIcon,
  'favorite-dark': FavoriteDarkIcon,
  'github-dark': GithubDarkIcon,
  'menu-dark': MenuDarkIcon,
  'money-dark': MoneyDarkIcon,
  'plus-dark': PlusDarkIcon,
  'search-dark': SearchDarkIcon,
  'trash-dark': TrashDarkIcon,
  'twitter-dark': TwitterDarkIcon,
  'user-dark': UserDarkIcon,
  'wallet-key-full-dark': WalletKeyFullIcon,
  'wallet-key-empty-dark': WalletKeyEmptyIcon,
  'website-dark': WebsiteIcon,
  'x-dark': XIcon,
};

const getIconByName = (name: IconName) => {
  return Icons[name + '-' + 'dark'];
};

const Icon = ({ color, name, size, rotate, className }: IconProps) => {
  const Comp = getIconByName(name);
  if (!Comp) {
    return <div />;
  }
  return (
    <IconWrapper color={color} size={size || 30} className={className} rotate={rotate}>
      <Comp />
    </IconWrapper>
  );
};

const IconWrapper = styled.div<{ color?: string; size: number; rotate: number | undefined }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;

  svg {
    ${(p) => (p.rotate ? `transform: rotate(${p.rotate}deg);` : '')}
    width: ${(p) => p.size}px;
    height: ${(p) => p.size}px;

    path, g {
      fill: ${(p) => p.color};
    }
  }
`;

export default React.memo(Icon);
