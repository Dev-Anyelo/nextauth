import { Metadata } from "next";
import ProfileForm from "@/components/profile-form";

export const metadata: Metadata = { title: "Profile" };

const SettingsPage = () => {
  return <ProfileForm />;
};

export default SettingsPage;
