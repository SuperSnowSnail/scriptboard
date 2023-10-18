"use client";

import { Tooltip } from "flowbite-react";

import { useArchiveFormContext } from "@/context/ArchiveFormContext";

import TextInput from "@/components/Inputs/TextInput";
import Select from "@/components/Inputs/Select";
import Textarea from "@/components/Inputs/Textarea";
import Checkbox from "@/components/Inputs/Checkbox";
import Icon from "@/components/Icon";

const tooltipTheme = {
  base: "max-w-[15rem] absolute inline-block z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm",
  style: {
    auto: "border border-gray-200 bg-white text-gray-900 dark:border-gray-900 dark:bg-gray-800 dark:text-white",
  },
};

const Param = ({ param, index }) => {
  const { config, formik } = useArchiveFormContext();

  return (
    <div
      className={`relative flex flex-none flex-col rounded-lg border border-gray-300 bg-gray-50 p-6 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${
        formik.values[index].value === true &&
        "ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
      }`}
    >
      <div className="absolute right-1 top-1">
        <Tooltip
          content={config.params[index].description}
          placement="left"
          style="auto"
          arrow={false}
          theme={tooltipTheme}
        >
          <button
            className="inline-flex items-center rounded-lg bg-gray-50 p-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
            type="button"
          >
            <Icon name="questionmark" size={5} />
          </button>
        </Tooltip>
      </div>
      <div className="opacity-50">
        {param.type === "input" && (
          <TextInput
            path={`[${index}].value`}
            formik={formik}
            label={param.name !== "" ? param.name : "New parameter"}
            placeholder="Enter value"
          />
        )}
        {param.type === "textarea" && (
          <Textarea
            path={`[${index}].value`}
            formik={formik}
            label={param.name}
            placeholder="Enter value"
            rows={2}
          />
        )}
        {param.type === "flag" && (
          <>
            <Checkbox
              path={`[${index}].value`}
              formik={formik}
              label={param.name}
              required={param.required}
              index={index}
            />
            {param.hasLinkedValue && formik.values[index].value && (
              <div className="mt-4">
                {param.linkedValue.type === "input" && (
                  <TextInput
                    path={`[${index}].linkedValue`}
                    formik={formik}
                    label={param.linkedValue.name}
                    placeholder={"Enter value"}
                  />
                )}
                {param.linkedValue.type === "select" && (
                  <Select
                    path={`[${index}].linkedValue`}
                    formik={formik}
                    label={param.linkedValue.name}
                    options={param.linkedValue.options}
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Param;
