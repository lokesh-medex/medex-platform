"use client";

import { useRef } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input, type InputProps } from "antd";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ErrorLabel from "@/app/_components/form/ErrorLabel";

interface IProps<T extends FieldValues> extends Omit<
  InputProps,
  "name" | "value" | "onChange" | "type"
> {
  required?: boolean;
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
}

/** Same shape as {@link AppInput}, built on antd's `Input.Password` for the show/hide toggle. */
function AppPasswordInput<T extends FieldValues>(props: IProps<T>) {
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
              <Input.Password
                id={name}
                ref={inputRef}
                status={error?.message ? "error" : undefined}
                size="large"
                className={error ? "border border-danger" : undefined}
                title={label}
                value={value}
                onChange={onChange}
                placeholder={_placeholder}
                iconRender={(visible) => (visible ? <FiEye /> : <FiEyeOff />)}
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

export default AppPasswordInput;
