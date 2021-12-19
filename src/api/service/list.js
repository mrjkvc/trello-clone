import { get, post, put, remove } from "../client";

const baseConfig = {
  baseURL: "http://localhost:8080/api/v1/list/", //environment().baseServiceUrl,
};

const updateList = async (listId, name, position, closed) => {
  console.log(name, position, closed);
  const response = await put(
    baseConfig.baseURL +
      listId +
      "/?" +
      (name != null ? "name=" + name + "&" : "") +
      (position != null ? "position=" + position + "&" : "") +
      (closed != null ? "closed=" + closed + "&" : ""),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
const listService = { updateList };

export default listService;
