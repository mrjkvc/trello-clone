import { get, post, put, remove } from "../client";

const baseConfig = {
  baseURL: process.env.REACT_APP_TRELLOCLONE_URL + "card/",
};

const addCard = async (listId, name, position, description) => {
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

const addLabel = async (idCard, idLabel) => {
  const response = await post(
    baseConfig.baseURL + idCard + "/idLabels" + "?" + "value=" + idLabel,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

const removeLabel = async (idCard, idLabel) => {
  const response = await remove(
    baseConfig.baseURL + idCard + "/idLabels/" + idLabel + "?",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
const addMember = async (idCard, idMember) => {
  const response = await post(
    baseConfig.baseURL + idCard + "/idMembers" + "?" + "value=" + idMember,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};

const removeMember = async (idCard, idMember) => {
  const response = await remove(
    baseConfig.baseURL + idCard + "/idMembers/" + idMember + "?",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const addComment = async (idCard, commentText) => {
  const response = await post(
    baseConfig.baseURL +
      idCard +
      "/actions/comments" +
      "?" +
      "text=" +
      commentText,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};
const cardService = {
  addCard,
  updateCard,
  addLabel,
  removeLabel,
  addMember,
  removeMember,
  addComment,
};

export default cardService;
