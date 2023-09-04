import { get, has } from "lodash";
import { Label, TextInput as FlowbiteTextInput } from "flowbite-react";

const textinputTheme = {
  field: {
    input: {
      colors: {
        gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-700 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-700 dark:focus:ring-blue-700",
      },
    },
  },
};

const TextInput = ({ isDummy, path, formik, label, placeholder }) => {
  if (isDummy) {
    return (
      <>
        <div className="mb-2 block">
          <Label htmlFor={path} disabled value={label} color="gray" />
        </div>
        <FlowbiteTextInput
          id={path}
          placeholder={placeholder}
          disabled
          color="gray"
          type="text"
          theme={textinputTheme}
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
      <FlowbiteTextInput
        id={path}
        placeholder={placeholder}
        color={`${isInvalid ? "failure" : "gray"}`}
        helperText={get(formik.errors, path, "")}
        required
        type="text"
        onChange={formik.handleChange}
        value={get(formik.values, path, "")}
        onBlur={formik.handleBlur}
        theme={textinputTheme}
      />
    </>
  );
};

export default TextInput;
