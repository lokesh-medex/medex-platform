"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "antd";
import AppInput from "@/app/_components/form/AppInput";
import AppPasswordInput from "@/app/_components/form/AppPasswordInput";
import AppCheckbox from "@/app/_components/form/AppCheckbox";

const loginSchema = z.object({
  identifier: z.string().min(1, "Enter your email or phone number"),
  password: z.string().min(1, "Enter your password"),
  rememberMe: z.boolean(),
});

type LoginValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  /** Reserved for wiring a real submit handler once the auth API exists. */
  onSubmit?: (values: LoginValues) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const { control, handleSubmit } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "", rememberMe: false },
  });

  const submit = (values: LoginValues) => {
    onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate>
      <h2 className="font-heading text-slate-900 font-bold text-2xl mb-1.5">
        Welcome back
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Log in to manage your bookings and family members.
      </p>

      <div className="mb-4">
        <AppInput
          name="identifier"
          control={control}
          label="Email or phone number"
          placeholder="you@example.com"
        />
      </div>

      <div className="mb-3">
        <AppPasswordInput
          name="password"
          control={control}
          label="Password"
          placeholder="Enter your password"
        />
      </div>

      <div className="flex items-center justify-between mb-6 mt-2">
        <AppCheckbox name="rememberMe" control={control} label="Remember me" />
        <a href="#" className="text-[13px] font-semibold text-primary">
          Forgot password?
        </a>
      </div>

      <Button
        type="primary"
        htmlType="submit"
        block
        className="h-auto! py-3.5! text-[15px]! font-sans"
      >
        Log in
      </Button>
    </form>
  );
}
