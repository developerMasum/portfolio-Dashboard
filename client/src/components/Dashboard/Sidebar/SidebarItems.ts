import { USER_ROLE } from "@/constants/role";
import { ISidebarItem, UserRole } from "@/types";

import { UserCog } from "lucide-react";

import { Home, Users, FileKey } from "lucide-react";

export const drawerItems = (role: UserRole): ISidebarItem[] => {
  // console.log(role);
  const roleMenus: ISidebarItem[] = [];

  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Skills",
          path: `${role}`,
          icon: Home,
        },
        {
          title: "Projects",
          path: `${role}/projects`,
          icon: Users,
        },
        {
          title: "Blogs",
          path: `${role}/blogs`,
          icon: UserCog,
        }
      );
      break;
    default:
      break;
  }

  return [...roleMenus];
};
