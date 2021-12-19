import { createSlice } from "@reduxjs/toolkit";
import boardService from "../api/service/board.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

let listID = 8;
let cardID = 123;

export const getBoard = createAsyncThunk(
  "board/getBoard",
  async (boardId, thunkAPI) => {
    const response = await boardService.getBoard(boardId);
    return response;
  }
);

export const getLists = createAsyncThunk(
  "board/getLists",
  async (boardId, thunkAPI) => {
    const response = await boardService.getLists(boardId);
    return response;
  }
);

export const addList = createAsyncThunk(
  "board/addList",
  async (name, thunkAPI) => {
    const lists = thunkAPI.getState().board.board.lists;
    var position = 0;
    if (lists.length > 0) {
      position = lists.at(-1).position + 1;
    }
    const response = await boardService.addList(
      thunkAPI.getState().board.board.id,
      name,
      position
    );
    return response;
  }
);

export const updateList = createAsyncThunk(
  "board/updateList",
  async (listId, position, name, closed, thunkAPI) => {
    const response = await boardService.updateList(
      listId,
      name,
      position,
      closed
    );
    return response;
  }
);

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    state: "idle",
    board: {
      lists: [],
    },
  },

  reducers: {
    add_list: (state, action) => {
      listID += 1;
      state.board.lists.push({
        title: action.payload,
        cards: [],
        id: listID,
      });
    },
    add_card: (state, action) => {
      cardID += 1;

      state.board.lists.forEach((list) => {
        if (list.id === action.payload.listId) {
          list.cards.push({
            name: action.payload.taskText,
            id: cardID,
          });
        }
      });
    },
    drag_happened: (state, action) => {
      const {
        type,
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
      } = action.payload;
      if (type === "list") {
        const list = state.board.lists.splice(droppableIndexStart, 1);
        state.board.lists.splice(droppableIndexEnd, 0, ...list);
      }
      if (type === "card") {
        if (droppableIdStart === droppableIdEnd) {
          const list = state.board.lists.find(
            (list) => droppableIdStart == list.id
          );
          const card = list.cards.splice(droppableIndexStart, 1);
          list.cards.splice(droppableIndexEnd, 0, ...card);
        } else {
          const startList = state.board.lists.find(
            (list) => droppableIdStart == list.id
          );
          const card = startList.cards.splice(droppableIndexStart, 1);
          const endList = state.board.lists.find(
            (list) => droppableIdEnd == list.id
          );
          endList.cards.splice(droppableIndexEnd, 0, ...card);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        if (action.payload.error === undefined) {
          state.board = action.payload;
          state.board.lists = [];
        }
      })
      .addCase(getBoard.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(getLists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLists.fulfilled, (state, action) => {
        if (action.payload.error === undefined) {
          state.board.lists = action.payload.sort(
            (a, b) => a.position - b.position
          );
          state.board.lists.forEach((list) => {
            list.id = "L" + list.id;
            list.cards.sort((a, b) => a.position - b.position);
          });
        }
        state.status = "idle";
      })
      .addCase(getLists.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(addList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addList.fulfilled, (state, action) => {
        if (action.payload.error === undefined) {
          const list = action.payload;
          list.id = "L" + list.id;
          state.board.lists.push(list);
        }
        state.status = "idle";
      })
      .addCase(addList.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const { add_list, add_card, drag_happened } = boardSlice.actions;
export default boardSlice.reducer;
