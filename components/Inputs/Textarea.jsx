import { get, has } from "lodash";
import { Label, Textarea as FlowbiteTextarea } from "flowbite-react";

const textareaTheme = {
  base: "block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 text-sm",
  colors: {
    gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-700 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-700 dark:focus:ring-blue-700",
  },
};

const Textarea = ({ isDummy, path, formik, label, placeholder, rows }) => {
  if (isDummy) {
    return (
      <>
        <div className="mb-2 block">
          <Label htmlFor={path} disabled value={label} color="gray" />
        </div>
        <FlowbiteTextarea
          id={path}
          placeholder={placeholder}
          disabled
          color="gray"
          rows={rows}
          theme={textareaTheme}
        />
      </>
    );
  }

  const isInvalid = has(formik.errors, path) && has(formik.touched, path);

  return (
    <>
      <div className="mb-2 block">
        <Label
          htmlFor={path}
          value={label}
          color={`${isInvalid ? "failure" : "gray"}`}
        />
      </div>
      <FlowbiteTextarea
        id={path}
        placeholder={placeholder}
        color={`${isInvalid ? "failure" : "gray"}`}
        helperText={get(formik.errors, path, "")}
        required
        rows={rows}
        onChange={formik.handleChange}
        value={get(formik.values, path, "")}
        onBlur={formik.handleBlur}
        theme={textareaTheme}
      />
    </>
  );
};

export default Textarea;
