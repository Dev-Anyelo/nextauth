"use client";

import { UserRole } from "@prisma/client";
import { FormError } from "@/components/form-errors";
import { useCurrentRole } from "@/hooks/use-current-role";

interface RoleProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You don't have permission to view this content" />
    );
  }

  return <>{children}</>;
};
