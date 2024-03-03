
import { Metadata } from "next";
import { Onest } from "next/font/google";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";

const font = Onest({
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = { title: "Home" };


const Home = () => {
  return (
    <main
      className={`flex min-h-screen items-center justify-center p-24 ${font.className} bg-gray-950`}
    >
      <div className="space-y-6 text-center bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h1 className="text-5xl font-semibold text-gray-900">nextauth</h1>
        <p className="text-gray-600 first-letter:text-sm">
          A simple authentication service
        </p>

        <LoginButton mode="modal" asChild>
          <Button
            variant="secondary"
            size="lg"
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
};

export default Home;
