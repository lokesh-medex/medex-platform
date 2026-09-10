"use client";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Button, Upload, type UploadFile, type UploadProps } from "antd";
import { FiPaperclip } from "react-icons/fi";
import ErrorLabel from "@/app/_components/form/ErrorLabel";

interface IProps<T extends FieldValues> extends Omit<
  UploadProps,
  "name" | "fileList" | "onChange"
> {
  required?: boolean;
  label: string;
  name: Path<T>;
  control: Control<T>;
}

/** Attachment counterpart to {@link AppInput}: same Controller + label/error
 * shape, wrapping antd `Upload`. No backend exists in this app yet, so
 * `beforeUpload` always cancels the network attempt — files just sit in
 * form state until a real upload endpoint exists to swap in. */
function AppUpload<T extends FieldValues>(props: IProps<T>) {
  const { required, label, name, control, ...restProps } = props;

  return (
    <div className="flex flex-col gap-1">
      <label className="font-bold text-sm text-slate-700">
        {label}
        {required && "*"}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="w-full">
            <Upload
              fileList={(value as UploadFile[] | undefined) ?? []}
              beforeUpload={() => false}
              onChange={({ fileList }) => onChange(fileList)}
              multiple
              {...restProps}
            >
              <Button icon={<FiPaperclip size={14} />}>Attach files</Button>
            </Upload>
            {error && <ErrorLabel>{error.message}</ErrorLabel>}
          </div>
        )}
      />
    </div>
  );
}

export default AppUpload;
