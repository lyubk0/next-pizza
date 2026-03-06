<<<<<<< HEAD
import { getServerSession } from "next-auth";
import { authOptions } from "../constanst/authOptions";

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);
=======
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
  return session?.user ?? null;
};
