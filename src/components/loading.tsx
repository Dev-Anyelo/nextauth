import {
  TableCell,
  TableRow
} from "@/components/ui/table";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <TableRow className="w-full text-center">
      <TableCell
        colSpan={6}
        className="mx-auto py-6 w-full h-full"
      >
        <div className="flex justify-center items-center w-full text-sm sm:text-lg text-muted-foreground">
          <ClipLoader size="18px" className="mr-2" />
          Loading users...
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Loading;
