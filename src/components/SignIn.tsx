import React from "react";
import { Icons } from "./Icon";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignIn = () => {
  return (
    <div className="container mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[400px] ">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.Logo className="mx-auto h-20 w-full " />
        <h1 className="text-2xl font-semibold tracking-tight ">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Roi-D Store account and agree to
          our User Agreement and privacy policy
        </p>

        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          New to Roi-D store?{" "}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
