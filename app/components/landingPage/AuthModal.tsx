import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import Logo from "@/public/logo.png";
import Image from "next/image";

import { signIn } from "@/app/lib/auth";
import { GitHubAuthButton, GoogleAuthButton } from "../SubmitButton";

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Experimente gratuitamente</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader className="flex-row justify-center items-center gap-x-2">
          <Image src={Logo} className="size-10" alt="Logo" />
          <h4 className="text-3xl font-semibold">
            Sched<span className="text-primary">Meet</span>
          </h4>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-5">
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <GoogleAuthButton />
          </form>

          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <GitHubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
