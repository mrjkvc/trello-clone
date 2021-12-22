import { get, post, put, remove } from "../client";

const baseConfig = {
  baseURL: "http://localhost:8080/api/v1/card/", //environment().baseServiceUrl,
};

const addCard = async (listId, name, position, description) => {
  console.log("Daj da idem spavati2");

  const response = await post(
    baseConfig.baseURL +
      "?" +
      (listId != null ? "listId=" + listId + "&" : "") +
      (name != null ? "name=" + name + "&" : "") +
      (position != null ? "position=" + position + "&" : "") /* +
      (description != null ? "description=" + description + "&" : "")*/,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const updateCard = async (id, listId, name, description, position) => {
  console.log(name, position, description);
  const response = await put(
    baseConfig.baseURL +
      id +
      "/?" +
      (name != null ? "name=" + name + "&" : "") +
      (position != null ? "position=" + position + "&" : "") +
      (description != null ? "description=" + description + "&" : "") +
      (listId != null ? "listId=" + listId + "&" : ""),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
const cardService = { addCard, updateCard };

export default cardService;
