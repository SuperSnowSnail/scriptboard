import { has } from "lodash";

const getExecValues = (config) => {
  if (!config.params || config.params.length === 0) {
    return [];
  }

  return config.params.map((param) => ({
    value: param.type === "flag" ? param.required : "",
    ...(param.hasLinkedValue && {
      linkedValue:
        param.linkedValue.type === "select"
          ? param.linkedValue.options[0].value
          : "",
    }),
  }));
};

const getEditValues = (config, directory, state, tier) => ({
  name: config?.name ?? "",
  description: config?.description ?? "",
  outputType: config?.outputType ?? "plain",
  directory: directory ?? "",
  listed: state === "LISTED",
  premium: tier === "PREMIUM",
  params: config?.params ?? [],
});

const getParamValues = (config, index) => {
  if (index === null || !config || !has(config.params, `[${index}]`)) {
    return {
      name: "",
      description: "",
      type: "input",
      required: false,
      hasLinkedValue: false,
      linkedValue: {},
    };
  }

  return {
    name: config.params[index].name,
    description: config.params[index].description,
    type: config.params[index].type,
    required: config.params[index].required,
    hasLinkedValue: config.params[index].hasLinkedValue,
    linkedValue: config.params[index]?.linkedValue ?? {},
  };
};

export { getExecValues, getEditValues, getParamValues };
