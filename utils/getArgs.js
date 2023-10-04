const getArgs = (parsedConfig, userData) => {
  const { params } = parsedConfig;

  const values = params.map((param) => {
    if (param.hasOwnProperty("value")) {
      return param.value;
    }

    return null;
  });

  return values.reduce((acc, val, i) => {
    if (val === null && userData[i].value !== "") {
      return [...acc, userData[i].value];
    }

    if (userData[i].value === true) {
      const arg = userData[i].hasOwnProperty("linkedValue")
        ? `${val}=${userData[i].linkedValue}`
        : val;
      return [...acc, arg];
    }

    return acc;
  }, []);
};

export default getArgs;
