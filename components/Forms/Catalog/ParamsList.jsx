"use client";

import { FormikProvider, FieldArray } from "formik";

import { useCatalogFormContext } from "@/context/CatalogFormContext";

import Param from "@/components/Forms/Catalog/Param";
import Icon from "@/components/Icon";

const ParamsList = () => {
  const {
    editMode,
    editFormik,
    config,
    initialParam,
    editedParamIndex,
    setEditedParamIndex,
    mounted,
  } = useCatalogFormContext();

  if (!mounted) {
    return (
      <div className="flex h-[calc(100vh_-_15rem)] w-full animate-pulse flex-col gap-8 rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:order-1 lg:h-[calc(100vh_-_4rem)] lg:max-w-xs lg:overflow-y-auto xl:max-w-sm"></div>
    );
  }

  if (!editMode) {
    return (
      <div className="flex h-full w-full flex-col gap-8 rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:order-1 lg:max-w-xs lg:overflow-y-auto xl:max-w-sm">
        {config.params &&
          config.params.map((param, index) => (
            <Param key={index} param={param} index={index} />
          ))}
      </div>
    );
  }

  return (
    <FormikProvider value={editFormik}>
      <FieldArray
        name="params"
        render={(arrayHelper) => (
          <div className="flex h-full w-full flex-col gap-8 rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:order-1 lg:max-w-xs lg:overflow-y-auto xl:max-w-sm">
            <button
              className="flex w-full items-center justify-center rounded-lg border border-green-700 p-2 text-green-700 hover:bg-green-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-800"
              onClick={() => {
                arrayHelper.push(initialParam);
                if (editedParamIndex === null) {
                  setEditedParamIndex(editFormik.values.params.length);
                }
              }}
              type="button"
            >
              <Icon name="plus" size={4} />
            </button>
            {editFormik.values?.params &&
              editFormik.values.params.map((param, index) => (
                <Param
                  key={index}
                  param={param}
                  index={index}
                  arrayHelper={arrayHelper}
                />
              ))}
          </div>
        )}
      />
    </FormikProvider>
  );
};

export default ParamsList;
