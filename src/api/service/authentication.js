import { get, post, put, remove } from "../client";

const baseConfig = {
  baseURL: "http://localhost:8080/api/v1/", //environment().baseServiceUrl,
};

const login = async (credentials) => {
  console.log(credentials);
  Buffer.from("Hello World").toString("base64");
  const response = await get(baseConfig.baseURL + "token", {
    headers: {
      Authorization:
        "Basic " + btoa(credentials.username + ":" + credentials.password),
    },
  });

  console.log("Response: " + response);
  return response;
};

/*const otp = async (credentials) => {
  const response = await post(baseConfig.baseURL + "otp", {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
        ? "Bearer " + localStorage.getItem("token")
        : "",
    },
    body: JSON.stringify(credentials),
  });
  console.log("Response: " + response);
  return response;
};

const signup = async (data) => {
  console.log("R: ", JSON.stringify(data));
  const response = await post(baseConfig.baseURL + "signup", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("Response: " + response);
  return response;
};*/

const loginService = { login };

export default loginService;
