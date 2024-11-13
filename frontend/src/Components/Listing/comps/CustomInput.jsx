import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export default function CustomInput({
  title,
  inputSetter,
  desc,
  type,
  inputType,
  placeholder,
  mandotary,
  options,
  value,
  className,
}) {
  function inputSetterHandler(newValue) {
    inputSetter(newValue);
  }

  function selectSetterHandler(newValue) {
    inputSetter(newValue);
  }

  function typeSetter() {
    switch (type) {
      case "input":
        return (
          <Input
            placeholder={placeholder}
            onChange={(e) => inputSetterHandler(e.target.value)}
            type={inputType}
            value={value}
            className={className}
          />
        );

      case "textArea":
        return (
          <Textarea
            placeholder={placeholder}
            onChange={(e) => inputSetterHandler(e.target.value)}
            value={value}
          />
        );

      case "select":
        return (
          <Select onValueChange={(value) => selectSetterHandler(value)}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} className={className} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map((option, i) => (
                  <SelectItem value={option.value} key={i}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );

      default:
        break;
    }
  }

  return (
    <div className="w-full">
      <span className="font-bold">{mandotary ? `${title}*` : `${title}`}</span>
      {desc ? "" : <span>{desc}</span>}
      {typeSetter()}
    </div>
  );
}
