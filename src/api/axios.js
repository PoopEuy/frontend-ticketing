import axios from "axios";

const baseURLBackEnd = process.env.REACT_APP_BASE_URL_BACKEND;
const baseURLBECreateJson = process.env.REACT_APP_BASE_URL_BE_CREATEJSON;
// const baseURLFRAME = process.env.REACT_APP_BASE_URL_FRAME;
console.log("baseURL_BE = " + baseURLBackEnd);
console.log("baseURLBECreateJson = " + baseURLBECreateJson);
export const instanceBackEnd = axios.create({
  baseURL: baseURLBackEnd,
});

export const instanceBECreateJson = axios.create({
  baseURL: baseURLBECreateJson,
});

// export const instanceFrame = axios.create({
//   baseURL: baseURLFRAME,
// });
