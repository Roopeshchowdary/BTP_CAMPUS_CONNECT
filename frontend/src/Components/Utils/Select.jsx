import React, { useEffect, useState } from "react";
import SelectComponent from "react-select";
import lodash from "lodash";
import { Label } from "flowbite-react";

const Select = ({
  handleChange,
  handleBlur,
  placeholder,
  value,
  label,
  error,
  name,
  className,
  fields,
}) => {
  const options = fields?.map((field) => ({
    value: field,
    label: lodash.startCase(field),
  }));

  return (
    <>
      <div className={className}>
        <Label htmlFor={name} className="font-extrabold">
          {label}
        </Label>
        <SelectComponent
          onChange={handleChange}
          options={options}
          onBlur={handleBlur}
          placeholder={placeholder}
          value={{ label: lodash.startCase(value), value: value }}
          id={name}
          name={name}
          styles={{
            menuList: (base, state) => ({
              ...base,
              maxHeight: "200px",
            }),
          }}
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    </>
  );
};

export default Select;
