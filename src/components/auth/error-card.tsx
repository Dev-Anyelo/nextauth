import { FaExclamationTriangle } from "react-icons/fa";
import CardWrapper from "@/components/auth/card-wrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Something went wrong"
      backButtonLabel="Back to login"
      backbButtonHref="/auth/login"
    >
      <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <FaExclamationTriangle className="w-4 h-4 text-red-500" />
        <span>Please check your credentials and try again.</span>
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
