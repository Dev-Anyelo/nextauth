import { Metadata } from "next";
import CreateUserForm from "@/components/create-user";

export const metadata: Metadata = { title: "Create User" };


const CreateUserPage = () => {
  return <CreateUserForm />;
};

export default CreateUserPage;
