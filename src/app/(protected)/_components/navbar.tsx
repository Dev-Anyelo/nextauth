"use client";

import Link from "next/link";
import { UserRole } from "@prisma/client";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCurrentRole } from "@/hooks/use-current-role";
import UserButton from "@/components/auth/user-button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DoorOpenIcon, MenuIcon, PencilLineIcon } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const role = useCurrentRole();

  return (
    <nav className="fixed top-0 w-full py-4 bg-gray-900 flex items-center justify-between px-4 md:px-6 lg:px-16">
      <h1 className="text-lg sm:text-xl">
        <Link href="/">Auth</Link>
      </h1>
      <div className="sm:flex justify-center gap-x-4 items-center hidden">
        {role === UserRole.ADMIN ? (
          <>
            <Button
              asChild
              variant={pathname === "/dashboard" ? "secondary" : "custom"}
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button
              asChild
              variant={pathname === "/create" ? "secondary" : "custom"}
            >
              <Link href="/create">Create user</Link>
            </Button>
          </>
        ) : null}
      </div>
      <div className="flex gap-x-2 justify-center items-center">
        <UserButton />
        {role === UserRole.ADMIN ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="block sm:hidden text-white text-sm">
              <MenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mt-3 border-none" align="end">
              <>
                <DropdownMenuItem
                  className={pathname === "/dashboard" ? "bg-sky-50" : ""}
                >
                  <Link href="/dashboard">
                    <DoorOpenIcon
                      className="mr-2 text-muted-foreground inline"
                      size="18px"
                    />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={pathname === "/create" ? "bg-sky-50" : ""}
                >
                  <Link href="/create">
                    <PencilLineIcon
                      className="mr-2 text-muted-foreground inline"
                      size="18px"
                    />
                    Create user
                  </Link>
                </DropdownMenuItem>
              </>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
