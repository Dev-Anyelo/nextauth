"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex justify-center items-center w-full gap-x-2">
      <Button
        size="sm"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle size={20} />
      </Button>
      <Button
        size="sm"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub size={20} />
      </Button>
    </div>
  );
};

export default Social;
