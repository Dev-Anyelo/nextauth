import Link from "next/link";
import { fetchTotalUsers, fetchUsersPages } from "@/lib/data";
import Search from "@/components/search";
import { UserPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import UsersTable from "@/components/users-table";
import PaginationComponent from "@/components/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CardHeaderDashboard from "@/components/card-header";

const DashboardPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchUsersPages(query);
  const totalUsers = await fetchTotalUsers();

  return (
    <Card className="w-full max-w-7xl mx-auto mt-20 shadow-lg rounded-lg overflow-hidden">
      <CardHeaderDashboard />
      <CardContent className="p-6 flex justify-between items-center">
        <p className="text-gray-500">Users ({totalUsers})</p>
        <Search placeholder="Search" />
        <Link href="/create">
          <Button
            variant="default"
            className="bg-blue-700 hover:bg-blue-700/85"
          >
            <UserPlusIcon className="w-4 h-4 mr-2" /> Add user
          </Button>
        </Link>
      </CardContent>
      <UsersTable query={query} currentPage={currentPage} />
      <CardFooter className="h-full w-full flex justify-end items-center py-4">
        <PaginationComponent totalPages={totalPages} />
      </CardFooter>
    </Card>
  );
};

export default DashboardPage;
