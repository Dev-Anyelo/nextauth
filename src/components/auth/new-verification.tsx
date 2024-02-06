"use client";

import { BeatLoader } from "react-spinners";
import { FormError } from "@/components/form-errors";
import { FormSuccess } from "@/components/form-success";
import CardWrapper from "@/components/auth/card-wrapper";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";

const NewVerificationForm = () => {

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {

    if(success || error ) return;

    if (!token) {
      setError("Missing token");
      return;
    }

    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Verify your email address"
      backButtonLabel="Back to login"
      backbButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center flex-col gap-y-3">
        {!error && !success && <BeatLoader color="#2563EB" />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
