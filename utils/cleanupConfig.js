const cleanupConfig = (config) => ({
  name: config.name,
  description: config.description,
  outputType: config.outputType,
  params: config.params.map((param) => {
    if (param.type !== 'flag') {
      return {
        name: param.name,
        description: param.description,
        type: param.type,
        required: param.required,
      };
    }

    if (!param.hasLinkedValue) {
      return {
        name: param.name,
        description: param.description,
        type: param.type,
        required: param.required,
        value: param.value,
        hasLinkedValue: param.hasLinkedValue,
      };
    }

    if (param.linkedValue.type !== 'select') {
      return {
        name: param.name,
        description: param.description,
        type: param.type,
        required: param.required,
        value: param.value,
        hasLinkedValue: param.hasLinkedValue,
        linkedValue: {
          name: param.linkedValue.name,
          type: param.linkedValue.type,
        },
      };
    }

    return {
      name: param.name,
      description: param.description,
      type: param.type,
      required: param.required,
      value: param.value,
      hasLinkedValue: param.hasLinkedValue,
      linkedValue: param.linkedValue,
    };
  }),
});

export default cleanupConfig;
