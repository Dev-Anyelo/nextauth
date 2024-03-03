import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteUserButtonProps {
  username: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const DeleteUserButton = ({
  username,
  children,
  onClick,
}: DeleteUserButtonProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="p-6 w-auto bg-white rounded-lg shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-semibold text-gray-900 text-center">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 mt-2 text-wrap w-full text-center flex flex-col gap-y-2">
            This will permanently delete user:
            <span className="text-blue-700 font-semibold">{username}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <div className="flex w-full gap-x-5 justify-center items-center">
            <AlertDialogCancel className="rounded text-gray-900">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="rounded" onClick={onClick}>
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserButton;
