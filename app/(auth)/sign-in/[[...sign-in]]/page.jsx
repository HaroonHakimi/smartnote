import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (

  <div className="d-flex align-items-center justify-content-center h-screen">
    <SignIn />
  </div>
  );
}
