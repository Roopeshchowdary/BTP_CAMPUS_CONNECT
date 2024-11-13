import { Label, TextInput } from "flowbite-react";

const InputWithError = ({
  type,
  name,
  value,
  handleChange,
  handleBlur,
  className,
  placeholder,
  error,
  sizing,
  label,
  handleReset,
}) => {
  return (
    <>
      <div>
        <Label className="font-extrabold text-left" htmlFor={name}>
          {label}
        </Label>
        <TextInput
          id={name}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          onReset={handleReset}
          className={className}
          sizing={sizing ? sizing : "sm"}
          type={type}
          helperText={
            <>
              {error && <span className="text-sm text-red-500">{error}</span>}
            </>
          }
        />
      </div>
    </>
  );
};

export default InputWithError;
