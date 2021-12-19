const send = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const get = async (url, options) => {
  const response = await send(url, {
    ...options,
    method: "GET",
  });
  return response;
};

const post = async (url, options) => {
  console.log(localStorage.getItem("token"));
  const response = await send(url, {
    ...options,
    method: "POST",
  });
  return response;
};

const put = async (url, options) => {
  console.log("url " + url);
  const response = await send(url, {
    ...options,
    method: "PUT",
    headers: {
      Authorization: localStorage.getItem("token")
        ? "Bearer " + localStorage.getItem("token")
        : "",
    },
  });
  return response;
};

const remove = async (url, options) => {
  const response = await send(url, {
    ...options,
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("token")
        ? "Bearer " + localStorage.getItem("token")
        : "",
    },
  });
  return response;
};

export { get, post, put, remove };
