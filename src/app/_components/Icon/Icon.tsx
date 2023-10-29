import {
  ChevronDownIcon,
  DonationIcon,
  HoursIcon,
  InstitutionIcon,
  SocialFacebook,
  SocialInstagram,
  SocialLinkedIn,
  SocialX,
  TherapyIcon,
  UsersIcon,
  QuoteIcon,
  WeightIcon,
  WomanIcon,
} from "./icons";

import styles from "./Icon.module.scss";

export enum eIcons {
  chevronDown,
  donation,
  hours,
  socialFacebook,
  socialInstagram,
  socialLinkedIn,
  socialX,
  therapy,
  institution,
  users,
  quote,
  weight,
  woman,
}

export const Icon = ({
  icon,
  width = 24,
  height = 24,
}: {
  icon: eIcons;
  width?: number;
  height?: number;
}) => {
  const renderIcon = () => {
    switch (icon) {
      case eIcons.chevronDown:
        return <ChevronDownIcon />;
      case eIcons.donation:
        return <DonationIcon />;
      case eIcons.hours:
        return <HoursIcon />;
      case eIcons.institution:
        return <InstitutionIcon />;
      case eIcons.socialFacebook:
        return <SocialFacebook />;
      case eIcons.socialInstagram:
        return <SocialInstagram />;
      case eIcons.socialLinkedIn:
        return <SocialLinkedIn />;
      case eIcons.socialX:
        return <SocialX />;
      case eIcons.therapy:
        return <TherapyIcon />;
      case eIcons.users:
        return <UsersIcon />;
      case eIcons.quote:
        return <QuoteIcon />;
      case eIcons.weight:
        return <WeightIcon />;
      case eIcons.woman:
        return <WomanIcon />;
    }
  };

  return (
    <div className={styles.icon} style={{ height, width }}>
      {renderIcon()}
    </div>
  );
};
