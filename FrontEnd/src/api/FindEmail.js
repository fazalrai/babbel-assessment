const axios = require("axios").default;

// Make a request for a user with a given ID
export const searchEmail = (params) =>
  axios.get("http://localhost:3005", {
    params,
  });
