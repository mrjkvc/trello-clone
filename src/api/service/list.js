import { get, post, put, remove } from "../client";

const baseConfig = {
  baseURL: process.env.REACT_APP_TRELLOCLONE_URL + "list/",
};

const updateList = async (listId, name, position, closed) => {
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
