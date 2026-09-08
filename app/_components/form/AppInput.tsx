"use client";

import { useRef } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input, type InputProps } from "antd";
import ErrorLabel from "@/app/_components/form/ErrorLabel";

interface IProps<T extends FieldValues> extends Omit<
  InputProps,
  "name" | "value" | "onChange"
> {
  required?: boolean;
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
}

/** Reusable text field: label + antd `Input` wired through react-hook-form's `Controller`, with error handling. */
function AppInput<T extends FieldValues>(props: IProps<T>) {
  const { required, label, name, placeholder, control, ...restProps } = props;
  const _placeholder = placeholder || `Enter ${label}`;

  const inputRef = useRef(null);

  return (
    <div className="flex flex-col gap-1">
      <label className="font-bold text-sm text-slate-700" htmlFor={name}>
        {label}
        {required && "*"}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <div className="w-full">
              <Input
                id={name}
                ref={inputRef}
                status={error?.message ? "error" : undefined}
                size="large"
                className={error ? "border border-danger" : undefined}
                title={label}
                value={value}
                onChange={onChange}
                placeholder={_placeholder}
                {...restProps}
              />
              {error && <ErrorLabel>{error.message}</ErrorLabel>}
            </div>
          );
        }}
      />
    </div>
  );
}

export default AppInput;
