import { currentUser } from "@/lib/auth";
import UserInfo from "@/components/user-info";

const ServerPage = async () => {
  const user = await currentUser();

  return <UserInfo user={user} label="User Information" />;
};

export default ServerPage;
