const send = async (url, options) => {
  console.log(url);
  var finalUrl = url + "&key=" + process.env.REACT_APP_TRELLOCLONE_APP_KEY;
  if (url != process.env.REACT_APP_TRELLOCLONE_URL + "token") {
    finalUrl += localStorage.getItem("token")
      ? "&token=" + localStorage.getItem("token")
      : "";
  }
  console.log(finalUrl);
  const response = await fetch(finalUrl, options);

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
  const response = await send(url, {
    ...options,
    method: "POST",
  });
  return response;
};

const put = async (url, options) => {
  const response = await send(url, {
    ...options,
    method: "PUT",
  });
  return response;
};

const remove = async (url, options) => {
  const response = await send(url, {
    ...options,
    method: "DELETE",
  });
  return response;
};

export { get, post, put, remove };
