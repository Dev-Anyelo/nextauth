"use client";

import { DoorOpenIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";

const CardHeaderDashboard = () => {
  const user = useCurrentUser();
  const role = useCurrentRole();

  return (
    <CardHeader className="bg-gray-100 text-center py-4 flex justify-between items-center">
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-center items-center gap-x-2 select-none w-fit text-xl sm:text-2xl md:text-3xl text-muted-foreground">
          <DoorOpenIcon className="w-6 h-6 inline" /> Dashboard
        </div>
        <div className="flex justify-center items-center w-fit">
          <p className="text-lg sm:text-xl select-none  text-muted-foreground">
            {user?.name}
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
  );
};

export default CardHeaderDashboard;
