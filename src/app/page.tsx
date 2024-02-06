import { Onest } from "next/font/google";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";

const font = Onest({
  subsets: ["latin"],
  weight: ["600"],
});

const Home = () => {
  return (
    <main
      className={`flex min-h-screen items-center justify-center p-24 ${font.className} bg-gray-950`}
    >
      <div className="space-y-6 text-center">
        <h1 className="text-5xl font-semibold">nextauth</h1>
        <p className="text-muted-foreground first-letter:text-sm">
          A simple authentication service
        </p>

        <LoginButton mode="modal" asChild>
          <Button variant="secondary" size="lg"  className="mt-5">Sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
};

export default Home;
