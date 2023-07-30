import * as yup from "yup";

const getExecSchema = (config) => {
  const baseSchemas = {
    input: yup.string().strict().trim().max(100, "No more than 100 characters"),
    textarea: yup
      .string()
      .strict()
      .trim()
      .max(500, "No more than 500 characters"),
    flag: yup.bool().strict().required("Required"),
    linkedValue: yup
      .string()
      .strict()
      .trim()
      .max(100, "No more than 100 characters")
      .required("Required"),
  };

  if (!config.params || config.params.length === 0) {
    return yup.array().length(0);
  }

  return yup.tuple(
    config.params.map((param) =>
      yup.object().shape({
        value:
          param.type === "flag"
            ? param.required
              ? baseSchemas.flag.oneOf([true], "Required flag")
              : baseSchemas.flag
            : param.required
            ? baseSchemas.input.required("Required")
            : baseSchemas.input,
        ...(param.hasLinkedValue && {
          linkedValue:
            param.linkedValue.type === "select"
              ? baseSchemas.linkedValue.oneOf(
                  param.linkedValue.options.map(({ value }) => value),
                  "Not one of options",
                )
              : baseSchemas.linkedValue,
        }),
      }),
    ),
  );
};

const getParamSchema = () =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("Required")
      .min(3, "At least 3 characters")
      .max(20, "No more than 20 characters"),
    description: yup
      .string()
      .trim()
      .required("Required")
      .max(100, "No more than 100 characters"),
    required: yup.bool().required("Required"),
    type: yup
      .string()
      .oneOf(["input", "textarea", "flag"], "Unknown param type")
      .required("Required"),
    value: yup
      .string()
      .trim()
      .min(2, "At least 2 characters")
      .max(20, "No more than 20 characters")
      .matches(/^-\S+/gi, "Should start with hyphens")
      .when("type", ([type], schema) => {
        return type === "flag" ? schema.required("Required") : schema;
      }),
    hasLinkedValue: yup.bool().when("type", ([type], schema) => {
      return type === "flag" ? schema.required("Required") : schema;
    }),
    linkedValue: yup
      .object()
      .when("hasLinkedValue", ([hasLinkedValue], schema) => {
        return hasLinkedValue
          ? schema
              .shape({
                name: yup
                  .string()
                  .trim()
                  .required("Required")
                  .min(3, "At least 3 characters")
                  .max(20, "No more than 20 characters"),
                type: yup
                  .string()
                  .oneOf(["input", "select"], "Unknown linked value type")
                  .required("Required"),
                options: yup
                  .array()
                  .of(
                    yup.object().shape({
                      name: yup
                        .string()
                        .trim()
                        .required("Required")
                        .min(1, "At least 1 characters")
                        .max(10, "No more than 10 characters"),
                      value: yup
                        .string()
                        .trim()
                        .required("Required")
                        .min(1, "At least 1 characters")
                        .max(50, "No more than 50 characters"),
                    }),
                  )
                  .when("type", ([type], schema) => {
                    return type === "select"
                      ? schema.min(1, "At least 1 option").required("Required")
                      : schema;
                  }),
              })
              .required("Required")
          : schema;
      }),
  });

const getEditSchema = () =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("Required")
      .min(3, "At least 3 characters")
      .max(20, "No more than 20 characters"),
    description: yup
      .string()
      .trim()
      .required("Required")
      .max(300, "No more than 300 characters"),
    outputType: yup
      .string()
      .oneOf(["plain", "beautify", "none"], "Unknown input type")
      .required("Required"),
    directory: yup
      .string()
      .strict()
      .trim()
      .required("Required")
      .max(50, "No more than 50 characters")
      .matches(
        /^[^\s^\x00-\x1f\\?*:"";<>|\/.][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$/g,
        "Not valid directory name",
      ),
    listed: yup.bool().required("Required"),
    premium: yup.bool().required("Required"),
    params: yup.array().of(getParamSchema()),
  });

export { getExecSchema, getEditSchema, getParamSchema };
