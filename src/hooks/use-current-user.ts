import { useSession } from "next-auth/react";
import { unstable_noStore as noStore } from "next/cache";

export const useCurrentUser = () => {
  noStore();
  const session = useSession();

  return session.data?.user;
};
