"use client";

import { isEqual } from "lodash";
import { Dropdown, Tooltip } from "flowbite-react";

import { useCatalogFormContext } from "@/context/CatalogFormContext";

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

const Indicator = ({ index }) => {
  const { editFormik, editedParamIndex, initialParam } =
    useCatalogFormContext();

  if (index === editedParamIndex) {
    return <span className="flex h-3 w-3 rounded-full bg-yellow-300"></span>;
  }

  if (isEqual(editFormik.values.params[index], initialParam)) {
    return <span className="flex h-3 w-3 rounded-full bg-red-500"></span>;
  }

  return null;
};

const Button = ({ index, arrayHelper }) => {
  const {
    config,
    editMode,
    paramFormik,
    editFormik,
    initialParam,
    editedParamIndex,
    setEditedParamIndex,
  } = useCatalogFormContext();

  const dropdownTheme = {
    floating: {
      style: {
        auto: "border border-gray-200 bg-white text-gray-900 dark:border-gray-900 dark:bg-gray-800 dark:text-white",
      },
    },
  };

  if (!editMode) {
    return (
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
    );
  }

  return (
    <Dropdown
      theme={dropdownTheme}
      renderTrigger={() => {
        return (
          <button
            className="inline-flex items-center rounded-lg bg-gray-50 p-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-500"
            type="button"
          >
            <Icon name="threeDots" size={5} />
          </button>
        );
      }}
    >
      <Dropdown.Item
        onClick={() => {
          if (editedParamIndex !== index) {
            setEditedParamIndex(index);
            paramFormik.setValues(editFormik.values.params[index]);
          } else {
            setEditedParamIndex(null);
            paramFormik.setValues(initialParam);
          }
        }}
      >
        <span className="inline-flex items-baseline justify-center gap-2 text-gray-700 dark:text-gray-50">
          {editedParamIndex === index ? (
            <>
              <Icon name="back" size={3} />
              Cancel
            </>
          ) : (
            <>
              <Icon name="pen" size={3} />
              Edit
            </>
          )}
        </span>
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          if (editedParamIndex === index) {
            setEditedParamIndex(null);
          } else if (editedParamIndex !== null) {
            setEditedParamIndex(editedParamIndex - 1);
          }
          arrayHelper.remove(index);
        }}
      >
        <span className="inline-flex items-baseline justify-center gap-2 text-red-700 dark:text-red-400">
          <Icon name="trashBin" size={3} />
          Delete
        </span>
      </Dropdown.Item>
    </Dropdown>
  );
};

const Param = ({ param, index, arrayHelper }) => {
  const { editMode, execFormik } = useCatalogFormContext();

  const getRingClasses = () => {
    if (editMode) {
      return "";
    }

    return `${
      execFormik.values[index].value === true &&
      "ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
    } ${param.type === "flag" && !param.required && "cursor-pointer"}`;
  };

  return (
    <div
      className={`relative flex flex-none flex-col rounded-lg border border-gray-300 bg-gray-50 p-6 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${getRingClasses()}`}
      onClick={() => {
        if (!editMode && param.type === "flag" && !param.required) {
          execFormik.setFieldValue(
            `[${index}].value`,
            !execFormik.values[index].value,
          );
        }
      }}
    >
      {editMode && (
        <div className="absolute left-2 top-2">
          <Indicator index={index} />
        </div>
      )}
      <div className="absolute right-1 top-1">
        <Button index={index} arrayHelper={arrayHelper} />
      </div>
      {param.type === "input" && (
        <TextInput
          isDummy={editMode}
          path={editMode ? `params[${index}]` : `[${index}].value`}
          formik={!editMode && execFormik}
          label={param.name !== "" ? param.name : "New parameter"}
          placeholder="Enter value"
        />
      )}
      {param.type === "textarea" && (
        <Textarea
          isDummy={editMode}
          path={editMode ? `params[${index}]` : `[${index}].value`}
          formik={!editMode && execFormik}
          label={param.name}
          placeholder="Enter value"
          rows={2}
        />
      )}
      {param.type === "flag" && (
        <>
          <Checkbox
            isDummy={editMode}
            path={editMode ? `params[${index}]` : `[${index}].value`}
            formik={!editMode && execFormik}
            label={param.name}
            required={param.required}
            index={index}
          />
          {param.hasLinkedValue &&
            (editMode ? param.required : execFormik.values[index].value) && (
              <div className="mt-4">
                {param.linkedValue.type === "input" && (
                  <TextInput
                    isDummy={editMode}
                    path={
                      editMode
                        ? `params[${index}].linkedValue`
                        : `[${index}].linkedValue`
                    }
                    formik={!editMode && execFormik}
                    label={param.linkedValue.name}
                    placeholder={"Enter value"}
                  />
                )}
                {param.linkedValue.type === "select" && (
                  <Select
                    isDummy={editMode}
                    path={
                      editMode
                        ? `params[${index}].linkedValue`
                        : `[${index}].linkedValue`
                    }
                    formik={!editMode && execFormik}
                    label={param.linkedValue.name}
                    options={param.linkedValue.options}
                  />
                )}
              </div>
            )}
        </>
      )}
    </div>
  );
};

export default Param;
