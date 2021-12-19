import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./board.js";
import organizationReducer from "./organization.js";

export default configureStore({
  reducer: {
    board: boardReducer,
    organization: organizationReducer,
  },
});
