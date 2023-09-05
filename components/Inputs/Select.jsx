import { get, has } from "lodash";
import { Label, Select as FlowbiteSelect } from "flowbite-react";

const selectTheme = {
  field: {
    select: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
      colors: {
        gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-700 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-700 dark:focus:ring-blue-700",
      },
    },
  },
};

const Select = ({
  isDummy,
  path,
  formik,
  label,
  options = [{ name: "Default", value: "default" }],
}) => {
  if (isDummy) {
    return (
      <>
        <div className="mb-2 block">
          <Label htmlFor={path} disabled value={label} color="gray" />
        </div>
        <FlowbiteSelect id={path} color="gray" disabled theme={selectTheme}>
          {options &&
            options.map((opt, index) => (
              <option key={index} value={opt.value}>
                {opt.name}
              </option>
            ))}
        </FlowbiteSelect>
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
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <FlowbiteSelect
        id={path}
        color={`${isInvalid ? "failure" : "gray"}`}
        helperText={get(formik.errors, path, "")}
        required
        onChange={formik.handleChange}
        value={get(formik.values, path, "")}
        onBlur={formik.handleBlur}
        onClick={(e) => e.stopPropagation()}
        theme={selectTheme}
      >
        {options &&
          options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.name}
            </option>
          ))}
      </FlowbiteSelect>
    </>
  );
};

export default Select;
