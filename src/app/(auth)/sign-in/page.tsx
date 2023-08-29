import SignIn from "@/components/SignIn";

const AuthPage = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto  items-center justify-center gap-20">
        <SignIn />
      </div>
    </div>
  );
};

export default AuthPage;
