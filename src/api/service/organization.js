import { get, post, put, remove } from "../client";

const baseConfig = {
  baseURL: process.env.REACT_APP_TRELLOCLONE_URL,
};

const getOrganizations = async (memberId) => {
  const response = await get(
    baseConfig.baseURLbaseURL + "members/" + memberId + "/organizations?",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const getBoards = async (memberId) => {
  const response = await get(
    baseConfig.baseURL + "members/" + memberId + "/boards?",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const getMember = async (memberId) => {
  const response = await get(
    baseConfig.baseURL + "members/" + memberId + "/?",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const organizationService = { getOrganizations, getBoards, getMember };

export default organizationService;
