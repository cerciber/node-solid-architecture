exports.success = (status, message, body) => {
  return {
    status,
    message,
    error: false,
    body,
  };
};

exports.error = (status, message, body) => {
  // eslint-disable-next-line no-console
  console.log('Controlled error:');
  // eslint-disable-next-line no-console
  console.dir(
    {
      status,
      message,
      error: true,
      body,
    },
    { depth: null }
  );
  return {
    status,
    message,
    error: true,
    body,
  };
};
