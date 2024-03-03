import { Metadata } from "next";
import PasswordForm from "@/components/auth/new-password-form";

export const metadata: Metadata = { title: "New Password" };

const NewPasswordPage = () => {
  return <PasswordForm />;
};

export default NewPasswordPage;
