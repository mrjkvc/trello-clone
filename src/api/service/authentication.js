import { get, post, put, remove } from "../client";

const baseConfig = {
  baseURL: process.env.REACT_APP_TRELLOCLONE_URL,
};

const login = async (credentials) => {
  Buffer.from("Hello World").toString("base64");
  const response = await get(baseConfig.baseURL + "token?", {
    headers: {
      Authorization:
        "Basic " + btoa(credentials.username + ":" + credentials.password),
    },
  });

  return response;
};

const loginService = { login };

export default loginService;
