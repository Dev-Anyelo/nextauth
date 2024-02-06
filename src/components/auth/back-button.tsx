"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string
}

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button asChild size="sm" variant="link"  className="w-full font-normal" >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}

export default BackButton;