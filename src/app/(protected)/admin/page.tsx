"use client";

import { toast } from "sonner";
import { admin } from "@/actions/admin";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { RoleGate } from "@/components/auth/role";
import { FormSuccess } from "@/components/form-success";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("You are allowed");
      } else {
        toast.error("You are not allowed");
      }
    });
  };

  const onServerActionClick = () => {
    admin()
      .then((data) => {
        
        if(data.error){
          toast.error(data.error)
        }

        if(data.success){
          toast.success(data.success)
        }
      })
  }

  return (
    <Card className=" mt-32 w-[600px] mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-semibold text-center">Admin</h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <p className="text-center">Welcome to the admin page</p>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
