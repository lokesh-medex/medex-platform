"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "antd";
import AppInput from "@/app/_components/form/AppInput";
import AppPasswordInput from "@/app/_components/form/AppPasswordInput";
import AppCheckbox from "@/app/_components/form/AppCheckbox";

const signupSchema = z.object({
  fullName: z.string().min(1, "Enter your full name"),
  email: z.email("Enter a valid email address"),
  phone: z.string().min(1, "Enter your phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  agreeTerms: z
    .boolean()
    .refine(
      (v) => v,
      "You must agree to the Terms of Service and Privacy Policy"
    ),
});

type SignupValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  /** Reserved for wiring a real submit handler once the auth API exists. */
  onSubmit?: (values: SignupValues) => void;
}

export default function SignupForm({ onSubmit }: SignupFormProps) {
  const { control, handleSubmit, formState } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      agreeTerms: false,
    },
  });

  const submit = (values: SignupValues) => {
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <h2 className="font-heading text-slate-900 font-bold text-2xl mb-1.5">
        Create your account
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Book across hospitals, labs and wellness studios in minutes.
      </p>

      <div className="mb-4">
        <AppInput
          name="fullName"
          control={control}
          label="Full name"
          placeholder="Sita Rai"
        />
      </div>

      <div className="mb-4">
        <AppInput
          name="email"
          control={control}
          label="Email address"
          placeholder="you@example.com"
        />
      </div>

      <div className="mb-4">
        <AppInput
          name="phone"
          control={control}
          label="Phone number"
          placeholder="+977 98XXXXXXXX"
        />
      </div>

      <div className="mb-5">
        <AppPasswordInput
          name="password"
          control={control}
          label="Password"
          placeholder="At least 8 characters"
        />
      </div>

      <div className="mb-6">
        <AppCheckbox
          name="agreeTerms"
          control={control}
          label={
            <>
              I agree to the{" "}
              <a href="#" className="font-semibold text-secondary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-semibold text-secondary">
                Privacy Policy
              </a>
            </>
          }
        />
      </div>

      <Button
        type="primary"
        htmlType="submit"
        block
        disabled={!formState.isValid}
        className="h-auto! py-3.5! text-[15px]! font-sans"
      >
        Create account
      </Button>
    </form>
  );
}
