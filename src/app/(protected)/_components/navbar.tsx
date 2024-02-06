"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { usePathname } from "next/navigation";
import UserButton from "@/components/auth/user-button";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full h-16 bg-gray-900 flex items-center justify-between px-4 md:px-6 lg:px-16">
      <h1 className="text-xl">
        <Link href="/">Acme</Link>
      </h1>
      <div className="flex justify-center gap-x-4 items-center">
        <Button asChild variant={pathname === "/admin" ? "secondary" : "custon"}>
          <Link href="/admin">Admin</Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/client" ? "secondary" : "custon"}
        >
          <Link href="/client">Clients</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/server" ? "secondary" : "custon"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "secondary" : "custon"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
