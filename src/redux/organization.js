import { createSlice } from "@reduxjs/toolkit";
import organizationService from "../api/service/organization.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

var groupBy = function (data, key) {
  // `data` is an array of objects, `key` is the key (or property accessor) to group by
  // reduce runs this anonymous function on each element of `data` (the `item` parameter,
  // returning the `storage` parameter at the end
  return data.reduce(function (storage, item) {
    // get the first instance of the key by which we're grouping
    var group = item[key];

    // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
    storage[group] = storage[group] || [];

    // add this item to its group within `storage`
    storage[group].push(item);

    // return the updated storage to the reduce function, which will then loop through the next
    console.log(JSON.stringify(storage));
    return storage;
  }, {}); // {} is the initial value of the storage
};

export const getBoards = createAsyncThunk(
  "organization/getBoards",
  async (userId, thunkAPI) => {
    const response = await organizationService.getBoards(userId);
    return response;
  }
);

export const organizationSlice = createSlice({
  name: "organization",
  initialState: {
    status: "idle",
    boards: [],
    selectedBoardId: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        if (action.payload.error === undefined) {
          state.boards = groupBy(action.payload, "idOrganization");
        }
        state.status = "idle";
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export default organizationSlice.reducer;
