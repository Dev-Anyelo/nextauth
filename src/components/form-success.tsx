import { FaCheckCircle } from "react-icons/fa";

interface FormSuccess {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccess) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <FaCheckCircle className="w-4 h-4"  />
      <span>{message}</span>
    </div>
  );
};
