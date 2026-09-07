@AGENTS.md

# Project Conventions

- Always use `react-icons` for icons.
- Always use `react-hook-form` for forms — do not use antd's `Form` component.
- Always prefer building reusable form components over one-off, inline form markup.
  - If a reusable form component for the needed input type doesn't exist yet, create one following this pattern (react-hook-form `Controller` wrapping the underlying field, with label, required marker, and error handling):

    ```tsx
    function AppInput(props: IProps) {
      const { required, label, name, placeholder, control, ...restProps } = props;
      const _placeholder = placeholder || `Enter ${label}`;

      const inputRef = useRef(null);

      return (
        <div className='flex flex-col gap-1'>
          <label className='font-bold' htmlFor=''>
            {label}
            {required && '*'}
          </label>
          <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <div className='w-full'>
                  <Input
                    ref={inputRef}
                    status={error?.message && 'error'}
                    size='large'
                    className={error && 'border border-danger'}
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
    ```
- Always delete Playwright-created test assets (screenshots, traces, temp files, etc.) once the task they were created for is complete.
