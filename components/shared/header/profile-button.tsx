<<<<<<< HEAD
import { useSession } from "next-auth/react";
=======
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
import React from "react";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
=======
import { authClient } from "@/lib/auth-client";
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  onClickSignIn,
  className,
}) => {
<<<<<<< HEAD
  const { data: session } = useSession();
=======
  const { data: session, isPending } = authClient.useSession();

>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
  return (
    <div className={className}>
      {!session ? (
        <Button
<<<<<<< HEAD
          loading={session === undefined}
          onClick={onClickSignIn}
          variant={session === undefined ? "default" : "outline"}
          className="flex items-center gap-1 w-[95px]"
        >
          <User size={16} />
          Увійти
=======
          loading={isPending}
          onClick={onClickSignIn}
          variant={isPending ? "default" : "outline"}
          className="flex items-center gap-1 w-[95px]"
        >
          <User size={16} />
          Sign in
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
<<<<<<< HEAD
            Профіль
=======
            Profile
>>>>>>> 1ad4e97 (migrated from next auth to better auth, improved ui)
          </Button>
        </Link>
      )}
    </div>
  );
};
