import Link from "next/link";

import { 
  LogOutIcon, 
  ServerIcon, 
  SettingsIcon, 
  UserIcon, 
  UsersIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";

const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-gray-700">
            <UserIcon className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mt-3" align="end">
        <DropdownMenuLabel>
          <span>{user?.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profille">
          <DropdownMenuItem>
            <UserIcon className="h-4 w-4 mr-2" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/client">
          <DropdownMenuItem>
            <UsersIcon className="h-4 w-4 mr-2" />
            Clients
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/settings">
          <DropdownMenuItem>
            <SettingsIcon className="h-4 w-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/server">
          <DropdownMenuItem>
            <ServerIcon className="h-4 w-4 mr-2" />
            Server
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem>
            <LogOutIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;