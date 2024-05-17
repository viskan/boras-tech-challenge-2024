import type { Dispatch, ReactNode, SetStateAction } from "react";
import { cn } from "~/lib/utils";

const InputField = <A,>({
  title,
  placeholder,
  object,
  setObject,
  leftAttachment,
  fieldKey,
  className,
}: {
  title: string;
  placeholder?: string;
  object: A;
  setObject: Dispatch<SetStateAction<A>>;
  leftAttachment?: ReactNode;
  fieldKey: keyof A;
  className?: string;
}) => {
  const valueType = typeof object[fieldKey];
  const inputType: "input" | "switch" =
    valueType === "boolean" ? "switch" : "input";
  const defaultValue = object[fieldKey];
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setObject((prevState) => {
      const newValue =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      if (prevState) {
        return { ...prevState, [e.target.name]: newValue };
      }

      return prevState;
    });
  };
  return (
    <div>
      <label>{title}</label>
      {inputType === "input" && (
        <>
        {leftAttachment}
        <input
          defaultValue={defaultValue as string}
          type="text"
          onChange={onChange}
          id={fieldKey.toString()}
          name={fieldKey.toString()}
          placeholder={placeholder}
          className={cn("w-full max-w-md rounded-3xl border px-3 py-2 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 bg-secondary text-primary placeholder:text-primary", className)}
        />
        </>
      )}

      {inputType === "switch" && (
        <input
          defaultChecked={defaultValue as boolean}
          id={fieldKey.toString()}
          name={fieldKey.toString()}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputField;
