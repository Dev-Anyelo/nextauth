"use client";

import Link from "next/link";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useCurrentRole } from "@/hooks/use-current-role";

import { usePathname } from "next/navigation";
import UserButton from "@/components/auth/user-button";

const Navbar =  () => {
  const pathname = usePathname();
  const role =  useCurrentRole();
  
  return (
    <nav className="fixed top-0 w-full py-4 bg-gray-900 flex items-center justify-between px-4 md:px-6 lg:px-16">
      <h1 className="text-xl">
        <Link href="/">Auth</Link>
      </h1>
      <div className="flex justify-center gap-x-4 items-center">
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
            {/* <Button
              asChild
              variant={pathname === "/admin" ? "secondary" : "custom"}
            >
              <Link href="/admin">Admin</Link>
            </Button>

            <Button
              asChild
              variant={pathname === "/client" ? "secondary" : "custom"}
            >
              <Link href="/client">Clients</Link>
            </Button>

            <Button
              asChild
              variant={pathname === "/server" ? "secondary" : "custom"}
            >
              <Link href="/server">Server</Link>
            </Button> */}
          </>
        ) : null}

        <Button
          asChild
          variant={pathname === "/settings" ? "secondary" : "custom"}
        >
          <Link href="/settings">Profile</Link>
        </Button>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
