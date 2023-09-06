import { get } from "lodash";
import { Label, Checkbox as FlowbiteCheckbox } from "flowbite-react";

const checkboxTheme = {
  root: {
    base: "h-4 w-4 rounded focus:ring-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-700 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 bg-gray-100",
    color: {
      default: "focus:ring-blue-600 text-blue-600",
    },
  },
};

const labelTheme = {
  root: {
    base: "text-md font-medium",
  },
};

const Checkbox = ({ isDummy, path, formik, label, required, index }) => {
  if (isDummy) {
    return (
      <div className="flex items-center gap-2">
        <FlowbiteCheckbox
          id={path}
          checked={required}
          disabled
          theme={checkboxTheme}
        />
        <Label disabled value={label} htmlFor={path} theme={labelTheme} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <FlowbiteCheckbox
        id={path}
        onChange={formik.handleChange}
        checked={get(formik.values, path, false)}
        disabled={required}
        label={label}
        theme={checkboxTheme}
      />
      <Label
        disabled={required}
        value={label}
        htmlFor={path}
        theme={labelTheme}
      />
    </div>
  );
};

export default Checkbox;
