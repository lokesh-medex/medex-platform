"use client";

import type { ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Checkbox } from "antd";
import ErrorLabel from "@/app/_components/form/ErrorLabel";

interface IProps<T extends FieldValues> {
  required?: boolean;
  label: ReactNode;
  name: Path<T>;
  control: Control<T>;
}

/** Checkbox counterpart to {@link AppInput}: same `Controller` + error-handling shape, laid out inline with its label. */
function AppCheckbox<T extends FieldValues>(props: IProps<T>) {
  const { required, label, name, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <div className="flex flex-col gap-1">
            <label className="flex items-start gap-2 text-sm text-slate-600 cursor-pointer leading-snug">
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
              />
              <span>
                {label}
                {required && "*"}
              </span>
            </label>
            {error && <ErrorLabel>{error.message}</ErrorLabel>}
          </div>
        );
      }}
    />
  );
}

export default AppCheckbox;
