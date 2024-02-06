"use client";

import Social from "./social";
import HeaderComponent from "@/components/auth/header";
import BackButton from "@/components/auth/back-button";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";

interface cardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backbButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backbButtonHref,
  showSocial,
}: cardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <HeaderComponent label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton label={backButtonLabel} href={backbButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
