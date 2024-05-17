import type { Dispatch, SetStateAction } from "react";

const Input = <A,>({
  title,
  object,
  setObject,
  fieldKey,
  ...rest
}: {
  title: string;
  object: A;
  setObject: Dispatch<SetStateAction<A>>;
  fieldKey: keyof A;
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
    <div className="flex h-scree justify-center">
      <label>{title}</label>
      {inputType === "input" && (
        <input
          defaultValue={defaultValue as string}
          {...rest}
          type="text"
          onChange={onChange}
          id={fieldKey.toString()}
          name={fieldKey.toString()}
          className="w-full max-w-md rounded-md border px-3 py-2 text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {inputType === "switch" && (
        <input
          defaultChecked={defaultValue as boolean}
          {...rest}
          id={fieldKey.toString()}
          name={fieldKey.toString()}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
