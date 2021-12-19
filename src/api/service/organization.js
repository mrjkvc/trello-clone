import { get, post, put, remove } from "../client";

const baseConfig = {
  baseURL: "http://localhost:8080/api/v1/", //environment().baseServiceUrl,
};

const getOrganizations = async (memberId) => {
  const response = await get(
    baseConfig.baseURLbaseURL + "members/" + memberId + "/organizations",
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
    baseConfig.baseURL + "members/" + memberId + "/boards",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

const organizationService = { getOrganizations, getBoards };

export default organizationService;
