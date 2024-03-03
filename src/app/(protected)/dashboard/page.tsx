"use client";

import Link from "next/link";
import Search from "@/components/search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UsersTable from "@/components/users-table";
import { KeyIcon, UserPlusIcon } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const DashboardPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const user = useCurrentUser();
  const role = useCurrentRole();

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Card className="w-full max-w-7xl mx-auto mt-20 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-100 text-center py-4font-semibold flex justify-between items-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-center items-center gap-x-2 select-none w-fit text-3xl font-semibold">
            <KeyIcon className="w-6 h-6 inline" /> Dashboard
          </div>
          <div className="flex justify-center items-center w-fit">
            <p className="text-xl select-none">
              <span className="text-gray-500">{user?.name}</span>
            </p>
            <Badge
              variant="default"
              className="bg-sky-500 hover:bg-sky-500 ml-2 select-none"
            >
              {role === "ADMIN" ? "ADMIN" : "USER"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex justify-between items-center">
        <Search placeholder="Search users" />
        <Link href="/create">
          <Button variant="default">
            <UserPlusIcon className="w-4 h-4 mr-2" /> Add user
          </Button>
        </Link>
      </CardContent>
      <UsersTable query={query} />
    </Card>
  );
};

export default DashboardPage;
