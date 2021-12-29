import { get, post, put, remove } from "../client";

const baseConfig = {
  baseURL: process.env.REACT_APP_TRELLOCLONE_URL + "board/",
};

const getBoard = async (boardId) => {
  const response = await get(baseConfig.baseURL + boardId + "?", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const getLists = async (boardId) => {
  const response = await get(
    baseConfig.baseURL + boardId + "/lists?cards=all",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const addList = async (boardId, name, position) => {
  const response = await post(
    baseConfig.baseURL +
      boardId +
      "/lists?name=" +
      name +
      "&position=" +
      position,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const boardService = { getBoard, getLists, addList };

export default boardService;
