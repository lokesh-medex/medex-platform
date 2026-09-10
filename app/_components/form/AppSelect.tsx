"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Select, type SelectProps } from "antd";
import ErrorLabel from "@/app/_components/form/ErrorLabel";

interface IProps<T extends FieldValues> extends Omit<
  SelectProps,
  "name" | "value" | "onChange"
> {
  required?: boolean;
  label: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
}

/** Select counterpart to {@link AppInput}: same `Controller` + label/error shape, wrapping antd `Select`. */
function AppSelect<T extends FieldValues>(props: IProps<T>) {
  const { required, label, name, placeholder, control, ...restProps } = props;
  const _placeholder = placeholder || `Select ${label}`;

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
              <Select
                id={name}
                status={error?.message ? "error" : undefined}
                size="large"
                className="w-full"
                value={value ?? undefined}
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

export default AppSelect;
