"use client";

import { Dropdown } from "flowbite-react";

import { useCatalogFormContext } from "@/context/CatalogFormContext";

import TextInput from "@/components/Inputs/TextInput";
import Select from "@/components/Inputs/Select";
import Textarea from "@/components/Inputs/Textarea";
import Checkbox from "@/components/Inputs/Checkbox";
import Icon from "@/components/Icon";

const Button = () => {
  const { execFormik, editFormik, editMode, setEditMode, isReady, role } =
    useCatalogFormContext();

  if (role === "USER" || role === "PREMIUM") {
    return (
      <button
        className="flex items-center justify-center rounded-lg border border-green-700 p-2 text-green-700 hover:bg-green-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-800"
        type="button"
        onClick={() => {
          execFormik.submitForm();
        }}
      >
        <Icon name="run" size={5} />
      </button>
    );
  }

  const dropdownTheme = {
    floating: {
      style: {
        auto: "border border-gray-200 bg-white text-gray-900 dark:border-gray-900 dark:bg-gray-800 dark:text-white",
      },
    },
  };

  if (!editMode) {
    return (
      <Dropdown
        theme={dropdownTheme}
        renderTrigger={() => {
          return (
            <button
              className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              type="button"
            >
              <Icon name="threeDots" size={5} />
            </button>
          );
        }}
      >
        <Dropdown.Item
          onClick={() => {
            setEditMode(true);
          }}
        >
          <span className="inline-flex items-baseline justify-center gap-2 text-gray-700 dark:text-gray-50">
            <Icon name="cog" size={3} />
            Configure
          </span>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            execFormik.submitForm();
          }}
        >
          <span className="inline-flex items-baseline justify-center gap-2 text-green-700 dark:text-green-500">
            <Icon name="run" size={3} />
            Run
          </span>
        </Dropdown.Item>
      </Dropdown>
    );
  }

  return (
    <Dropdown
      theme={dropdownTheme}
      renderTrigger={() => {
        return (
          <button
            className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <Icon name="threeDots" size={5} />
          </button>
        );
      }}
    >
      <Dropdown.Item
        onClick={() => {
          if (isReady) {
            setEditMode(false);
            editFormik.resetForm();
          }
        }}
      >
        <span
          className={`${
            isReady ? "" : "cursor-not-allowed opacity-50"
          } inline-flex items-baseline justify-center gap-2 text-gray-700 dark:text-gray-50`}
        >
          <Icon name="back" size={3} />
          Cancel
        </span>
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          editFormik.submitForm();
        }}
      >
        <span className="inline-flex items-baseline justify-center gap-2 text-green-700 dark:text-green-500">
          <Icon name="save" size={3} />
          Save
        </span>
      </Dropdown.Item>
    </Dropdown>
  );
};

const Inner = () => {
  const { editFormik, config, editMode } = useCatalogFormContext();

  if (!editMode) {
    return (
      <>
        <div className="mb-4 flex flex-nowrap items-baseline justify-between">
          <h1 className="text-2xl dark:text-white">{config.name}</h1>
          <Button />
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {config.description}
        </p>
      </>
    );
  }

  return (
    <div className="text-sm text-gray-600 dark:text-gray-300">
      <div className="mb-4 grid md:grid-cols-3 md:gap-6">
        <div className="mb-2 md:col-span-2 md:mb-0">
          <TextInput
            path="name"
            formik={editFormik}
            label="Script name"
            placeholder="Test script"
          />
        </div>
        <div>
          <Select
            path="outputType"
            formik={editFormik}
            label="Output type"
            options={[
              { name: "Plain", value: "plain" },
              { name: "Beautified", value: "beautify" },
              { name: "None", value: "none" },
            ]}
          />
        </div>
      </div>
      <div className="mb-4 grid md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        <div className="mb-4 md:mb-0 xl:col-span-2">
          <Textarea
            path="description"
            formik={editFormik}
            label="Script description"
            placeholder="This is test script"
            rows={4}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <TextInput
              path="directory"
              formik={editFormik}
              label="Working directory"
              placeholder="test_dir"
            />
          </div>
          <Checkbox path="listed" formik={editFormik} label="Listed script" />
          <Checkbox path="premium" formik={editFormik} label="Premium script" />
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const { editMode, mounted } = useCatalogFormContext();

  if (!mounted) {
    return (
      <div className="flex h-32 animate-pulse flex-col rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:order-2 lg:max-w-[calc(100vw_-_39rem)] lg:flex-none xl:max-w-[calc(100vw_-_43rem)]"></div>
    );
  }

  return (
    <div className="flex flex-col rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:order-2 lg:max-w-[calc(100vw_-_39rem)] lg:flex-none xl:max-w-[calc(100vw_-_43rem)]">
      {editMode && (
        <div className="flex justify-end">
          <Button />
        </div>
      )}
      <Inner />
    </div>
  );
};

export default Header;
