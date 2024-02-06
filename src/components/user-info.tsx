import { ExtendedUser } from "@/next-auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



interface UserInfoProps {
  user?: ExtendedUser | null;
  label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Table className="mt-32 max-w-6xl mx-auto">
      <TableCaption>{label}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Role</TableHead>
          <TableHead className="text-right">
            Two Factor Authentication
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">{user?.id}</TableCell>
          <TableCell>{user?.name}</TableCell>
          <TableCell>{user?.email}</TableCell>
          <TableCell className="text-right">{user?.role}</TableCell>
          <TableCell className="text-right">
            <Badge
              variant={user?.isTwoFactorEnabled ? "secondary" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "ON" : "OFF"}
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default UserInfo;
