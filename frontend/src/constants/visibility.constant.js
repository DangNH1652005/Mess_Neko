import { Globe, Lock, Users } from "lucide-react";

export const VISIBILITY = {
  PUBLIC: "public",
  FRIENDS: "friends",
  PRIVATE: "private",
};

export const visibilityConfig = {
  [VISIBILITY.PUBLIC]: {
    icon: Globe,
    label: "Public",
    className: "badge-success",
  },
  [VISIBILITY.FRIENDS]: {
    icon: Users,
    label: "Friends",
    className: "badge-info",
  },
  [VISIBILITY.PRIVATE]: {
    icon: Lock,
    label: "Only me",
    className: "badge-neutral",
  },
};

export const getVisibilityConfig = (visibility) => {
  return visibilityConfig[visibility] ?? visibilityConfig[VISIBILITY.PUBLIC];
};
