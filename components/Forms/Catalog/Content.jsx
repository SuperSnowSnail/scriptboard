"use client";

import { forwardRef } from "react";
import { FormikProvider, FieldArray } from "formik";
import { Editor } from "@monaco-editor/react";

import { useCatalogFormContext } from "@/context/CatalogFormContext";

import TextInput from "@/components/Inputs/TextInput";
import Select from "@/components/Inputs/Select";
import Textarea from "@/components/Inputs/Textarea";
import Checkbox from "@/components/Inputs/Checkbox";
import Icon from "@/components/Icon";

const Content = forwardRef(function Content(props, contentBlockRef) {
  const {
    editMode,
    editedParamIndex,
    paramFormik,
    scriptCode,
    setScriptCode,
    mounted,
  } = useCatalogFormContext();

  if (!mounted) {
    return (
      <div className="hidden h-full w-full animate-pulse rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:order-3 lg:block lg:max-w-[calc(100vw_-_39rem)] lg:flex-1 lg:overflow-auto xl:max-w-[calc(100vw_-_43rem)]"></div>
    );
  }

  if (!editMode) {
    return (
      <div className="hidden h-full w-full rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:order-3 lg:block lg:max-w-[calc(100vw_-_39rem)] lg:flex-1 lg:overflow-auto xl:max-w-[calc(100vw_-_43rem)]"></div>
    );
  }

  const isLinkedValueSelect =
    paramFormik.values.type === "flag" &&
    paramFormik.values.hasLinkedValue &&
    paramFormik.values.linkedValue.type === "select";

  return (
    <div
      ref={contentBlockRef}
      className={`${
        editedParamIndex === null ? "p-0" : "p-4"
      } h-full w-full max-w-[calc(100vw_-_2rem)] rounded-lg border border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:max-w-[calc(100vw_-_18rem)] lg:order-3 lg:max-w-[calc(100vw_-_39rem)] lg:flex-1 lg:overflow-auto xl:max-w-[calc(100vw_-_43rem)]`}
    >
      {editedParamIndex === null && (
        <Editor
          defaultLanguage="shell"
          defaultValue={scriptCode}
          onChange={(value) => {
            setScriptCode(value);
          }}
          theme="vs-dark"
          className="h-96 lg:h-full"
        />
      )}
      {editedParamIndex !== null && (
        <FormikProvider value={paramFormik}>
          <div className="min-h flex justify-end">
            <button
              className="flex items-center justify-center rounded-lg border border-green-700 p-2 text-green-700 hover:bg-green-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-800"
              type="button"
              onClick={() => {
                paramFormik.submitForm();
              }}
            >
              <Icon name="save" size={5} />
            </button>
          </div>
          <div className="mb-4">
            <TextInput
              path="name"
              formik={paramFormik}
              label="Parameter name"
              placeholder="Test param"
            />
          </div>
          <div className="mb-4">
            <Select
              path="type"
              formik={paramFormik}
              label="Parameter type"
              options={[
                { name: "Input", value: "input" },
                { name: "Textarea", value: "textarea" },
                { name: "Flag", value: "flag" },
              ]}
            />
          </div>
          <div className="mb-4">
            <Textarea
              path="description"
              formik={paramFormik}
              label="Parameter description"
              placeholder="This is test parameter"
              rows={2}
            />
          </div>
          <div className="mb-4">
            <Checkbox
              path="required"
              formik={paramFormik}
              label="Required parameter"
            />
          </div>

          {paramFormik.values.type === "flag" && (
            <>
              <div className="mb-4">
                <TextInput
                  path="value"
                  formik={paramFormik}
                  label="Flag value"
                  placeholder="-f"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className={`flex w-full items-center justify-center rounded-lg border p-2 hover:text-white focus:outline-none focus:ring-4 dark:hover:text-white ${
                    paramFormik.values.hasLinkedValue
                      ? "border-red-700 text-red-700 hover:bg-red-800  focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                      : "border-green-700 text-green-700 hover:bg-green-800  focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                  }`}
                  type="button"
                  onClick={() => {
                    if (paramFormik.values.hasLinkedValue) {
                      paramFormik.setFieldValue("linkedValue", {});
                      paramFormik.setFieldValue("hasLinkedValue", false);
                    } else {
                      paramFormik.setFieldValue("linkedValue", {
                        name: "",
                        type: "input",
                      });
                      paramFormik.setFieldValue("hasLinkedValue", true);
                    }
                  }}
                >
                  {paramFormik.values.hasLinkedValue
                    ? "Delete linked value"
                    : "Add linked value"}
                </button>
              </div>
              {paramFormik.values.hasLinkedValue && (
                <>
                  <div className="my-4">
                    <TextInput
                      path="linkedValue.name"
                      formik={paramFormik}
                      label="Linked value name"
                      placeholder="Test linked value"
                    />
                  </div>
                  <div className="mb-4">
                    <Select
                      path="linkedValue.type"
                      formik={paramFormik}
                      label="Linked value type"
                      options={[
                        { name: "Input", value: "input" },
                        { name: "Select", value: "select" },
                      ]}
                    />
                  </div>
                </>
              )}
            </>
          )}

          {isLinkedValueSelect && (
            <FieldArray
              name="linkedValue.options"
              render={(arrayHelper) => (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold dark:text-white md:text-2xl">
                      Options
                    </h3>
                    <button
                      className="flex items-center justify-center rounded-lg border border-green-700 p-2 text-green-700 hover:bg-green-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-800"
                      type="button"
                      onClick={() => {
                        arrayHelper.push({
                          name: "",
                          value: "",
                        });
                      }}
                    >
                      <Icon name="plus" size={4} />
                    </button>
                  </div>
                  {paramFormik.values.linkedValue.options && (
                    <div className="mt-4 flex flex-col gap-4">
                      {paramFormik.values.linkedValue.options.map(
                        (option, i) => (
                          <div
                            key={i}
                            className="flex flex-col-reverse items-center justify-between rounded-lg border border-gray-300 p-4 dark:border-gray-600 xl:flex-row xl:gap-4"
                          >
                            <div className="grid w-full gap-4 xl:grid-cols-2 xl:gap-6">
                              <div>
                                <TextInput
                                  path={`linkedValue.options[${i}].name`}
                                  formik={paramFormik}
                                  label="Option name"
                                  placeholder="Test option"
                                />
                              </div>
                              <div>
                                <TextInput
                                  path={`linkedValue.options[${i}].value`}
                                  formik={paramFormik}
                                  label="Option value"
                                  placeholder="option"
                                />
                              </div>
                            </div>
                            <div className="flex w-full justify-end xl:w-auto">
                              <button
                                className="flex items-center justify-center rounded-lg border border-red-700 p-2 text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-800"
                                type="button"
                                onClick={() => arrayHelper.remove(i)}
                              >
                                <Icon name="trashBin" size={3} />
                              </button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </>
              )}
            />
          )}
        </FormikProvider>
      )}
    </div>
  );
});

export default Content;
