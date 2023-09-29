import SignIn from "@/components/SignIn";

const AuthPage = () => {
  return (
    <div className="h-screen w-full">
      <div className="h-full flex  items-center justify-center gap-20">
        <SignIn />
      </div>
    </div>
  );
};

export default AuthPage;
