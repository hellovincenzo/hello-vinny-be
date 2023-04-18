const generateConfig = (url: string, accessToken: string) => {
  return {
    method: 'get',
    url,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-type': 'application/json',
    },
  };
};

export { generateConfig };
