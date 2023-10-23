import {
  ChevronDownIcon,
  DonationIcon,
  HoursIcon,
  InstitutionIcon,
  TherapyIcon,
  UsersIcon,
  WeightIcon,
  WomanIcon,
} from "./icons";

import styles from "./Icon.module.scss";

export enum IconEnum {
  chevronDown,
  donation,
  hours,
  therapy,
  institution,
  users,
  weight,
  woman,
}

export const Icon = ({
  icon,
  width = 20,
  height = 20,
}: {
  icon: IconEnum;
  width: number;
  height: number;
}) => {
  const renderIcon = () => {
    switch (icon) {
      case IconEnum.chevronDown:
        return <ChevronDownIcon />;
      case IconEnum.donation:
        return <DonationIcon />;
      case IconEnum.hours:
        return <HoursIcon />;
      case IconEnum.institution:
        return <InstitutionIcon />;
      case IconEnum.therapy:
        return <TherapyIcon />;
      case IconEnum.users:
        return <UsersIcon />;
      case IconEnum.weight:
        return <WeightIcon />;
      case IconEnum.woman:
        return <WomanIcon />;
    }
  };

  return (
    <div className={styles.icon} style={{ height, width }}>
      {renderIcon()}
    </div>
  );
};
