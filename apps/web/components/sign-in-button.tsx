"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { CircleNotchIcon, GithubLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function SignInButton() {
  const { data: session } = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    try {
      setIsLoading(true);
      await authClient.signIn.social({ provider: "github" });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  async function handleSignOut() {
    try {
      setIsLoading(false);
      await authClient.signOut();
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  if (session) {
    return (
      <Button
        onClick={handleSignOut}
        variant="destructive"
        size="lg"
        className="gap-2 font-semibold"
      >
        {isLoading && <CircleNotchIcon className="size-4 animate-spin" />}
        Sign out
      </Button>
    );
  }

  return (
    <Button onClick={handleSignIn} variant="default" size="lg" className="gap-2 font-semibold">
      {isLoading ? (
        <CircleNotchIcon className="size-4 animate-spin" />
      ) : (
        <GithubLogoIcon weight="duotone" className="size-6 rounded-full p-0.5" />
      )}
      Sign in with GitHub
    </Button>
  );
}
