"use client";

import { toast } from "sonner";
import { loadUsers } from "@/lib/data";
import { ExtendedUser } from "@/next-auth";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-errors";
import { PencilIcon, TrashIcon } from "lucide-react";
import EditUserButton from "@/components/edit-user-button";
import DeleteUserButton from "@/components/delete-user-button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UsersTable = ({ query }: { query: string }) => {
  const [users, setUsers] = useState<ExtendedUser[] | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await loadUsers(query);
      if (data) {
        setUsers(data);
      }
    };
    fetchUsers();
  }, [query]);

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("User deleted successfully");
        if (users) {
          setUsers(users.filter((user) => user.id !== userId));
        }
      } else {
        console.log(data.error);
      }
    } catch (error) {
      return null;
    }
  };

  return (
    <Table className="w-full mx-auto shadow-lg rounded-lg overflow-hidden">
      <TableHeader className="bg-gray-100 text-center">
        <TableRow>
          <TableHead className="w-[100px] px-4 py-2">ID</TableHead>
          <TableHead className="px-4 py-2 text-center">Role</TableHead>
          <TableHead className="px-4 py-2">Name</TableHead>
          <TableHead className="px-4 py-2 text-center">Email</TableHead>
          <TableHead className="text-center px-4 py-2">
            Two Factor Authentication
          </TableHead>
          <TableHead className="px-4 py-2 text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white text-black w-full">
        {!users ? (
          <TableRow className="w-full text-center">
            <TableCell
              colSpan={6}
              className="mx-auto py-6 text-muted-foreground w-full"
            >
              <div className="flex justify-center items-center w-full text-lg">
                <ClipLoader size="18px" className="mr-2" />
                Loading users...
              </div>
            </TableCell>
          </TableRow>
        ) : users?.length === 0 ? (
          <TableRow className="w-full text-center">
            <TableCell
              colSpan={6}
              className="mx-auto py-6 text-gray-700 w-full"
            >
              <div className="w-full flex justify-center items-center gap-2 text-muted-foreground text-lg">
                <FormError message="No users found" />
              </div>
            </TableCell>
          </TableRow>
        ) : (
          users?.map((user) => (
            <TableRow key={user.id} className="w-full">
              <TableCell className="px-4 py-2">{user.id}</TableCell>
              <TableCell className="px-4 py-2 text-center">
                <Badge
                  variant="secondary"
                  className={`${
                    user.role === "ADMIN"
                      ? "bg-sky-500 hover:bg-sky-500 text-white"
                      : "bg-slate-200 hover:bg-slate-300 text-gray-500"
                  }`}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-2">{user.name}</TableCell>
              <TableCell className="px-4 py-2 text-center">
                {user.email}
              </TableCell>
              <TableCell className="px-4 py-2 text-center">
                <Switch disabled checked={user.isTwoFactorEnabled} />
              </TableCell>
              <TableCell className="px-4 py-2 flex justify-center gap-x-5 items-center">
                <div className="flex justify-center items-center gap-1">
                  <EditUserButton
                    userData={user}
                    userId={user.id as string}
                    username={user.name as string}
                  >
                    <Button
                      variant="ghost"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <PencilIcon className="w-4 h-4 mr-2 inline" /> Edit
                    </Button>
                  </EditUserButton>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <DeleteUserButton
                    username={user.name as string}
                    onClick={() => handleDeleteUser(user.id as string)}
                  >
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-600"
                    >
                      <TrashIcon className="w-4 h-4 mr-2 inline" /> Delete
                    </Button>
                  </DeleteUserButton>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
