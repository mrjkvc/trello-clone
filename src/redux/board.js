import { createSlice } from "@reduxjs/toolkit";
import boardService from "../api/service/board.js";
import cardService from "../api/service/card.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
  async (data, thunkAPI) => {
    const { name, sendMessage } = data;
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
    sendMessage({
      type: "LIST_CREATED",
      content: response,
    });
    return response;
  }
);

export const addCard = createAsyncThunk(
  "board/addCard",
  async (data, thunkAPI) => {
    const { card, sendMessage } = data;
    const cards = thunkAPI
      .getState()
      .board.board.lists.find((listF) => listF.id == card.listId).cards;

    var position = 0;
    if (cards.length > 0) {
      position = cards.at(-1).position + 1;
    }

    const response = await cardService.addCard(
      card.listId.substring(1),
      card.name,
      position
      //card.description
    );

    sendMessage({
      type: "CARD_CREATED",
      content: response,
    });
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

export const updateCard = createAsyncThunk(
  "board/updateCard",
  async (data, thunkAPI) => {
    const { card, sendMessage } = data;
    const { id, listId, name, description, position } = card;
    const response = await cardService.updateCard(
      id,
      listId,
      name,
      description,
      position
    );
    if (response.error == undefined) {
      sendMessage({
        type: "CARD_UPDATED",
        content: response,
      });
    }
    return response;
  }
);

export const updateCardLabels = createAsyncThunk(
  "board/updateCardLabels",
  async (data, thunkAPI) => {
    const { type, card, label, sendMessage } = data;
    var response = null;
    if (type == "delete") {
      response = await cardService.removeLabel(card.id, label.id);
    } else if (type == "add") {
      response = await cardService.addLabel(card.id, label.id);
    }
    if (response.error == undefined) {
      sendMessage({
        type: "CARD_UPDATED",
        content: response,
      });
    }
    return response;
  }
);

export const updateCardMembers = createAsyncThunk(
  "board/updateCardMembers",
  async (data, thunkAPI) => {
    const { type, card, member, sendMessage } = data;
    var response = null;
    if (type == "delete") {
      response = await cardService.removeMember(card.id, member.id);
    } else if (type == "add") {
      response = await cardService.addMember(card.id, member.id);
    }
    if (response.error == undefined) {
      sendMessage({
        type: "CARD_UPDATED",
        content: response,
      });
    }
    return response;
  }
);

export const updateCardComments = createAsyncThunk(
  "board/updateCardComments",
  async (data, thunkAPI) => {
    const { card, commentText, sendMessage } = data;
    const response = await cardService.addComment(card.id, commentText);
    if (response.error == undefined) {
      sendMessage({
        type: "CARD_UPDATED",
        content: response,
      });
    }
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
    selectedTask: {},
  },

  reducers: {
    set_selected_card: (state, action) => {
      state.selectedTask = action.payload;
    },
    add_list: (state, action) => {
      const list = action.payload;
      list.id = "L" + list.id;
      list.cards = [];
      state.board.lists.push(action.payload);
    },
    add_card: (state, action) => {
      state.board.lists.forEach((list) => {
        if (list.id === "L" + action.payload.listId) {
          list.cards.push(action.payload);
        }
      });
    },
    update_card: (state, action) => {
      const card = action.payload;
      const list = state.board.lists.find(
        (listF) => listF.id == "L" + card.listId
      );
      let index = list.cards.map((c) => c.id).indexOf(card.id);
      list.cards[index] = card;
      if (state.selectedTask.id == card.id) {
        state.selectedTask = card;
      }
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
          card.listId = "L" + droppableIdEnd;
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
          list.cards = [];
          state.board.lists.push(list);
        }
        state.status = "idle";
      })
      .addCase(addList.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(addCard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCard.fulfilled, (state, action) => {
        if (action.payload.error === undefined) {
          const card = action.payload;
          card.labels = [];
          card.members = [];
          card.comments = [];
          state.board.lists
            .find((listF) => listF.id == "L" + card.listId)
            .cards.push(card);
        }
        state.status = "idle";
      })
      .addCase(addCard.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateCard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        if (action.payload.error === undefined) {
          const card = action.payload;
          const list = state.board.lists.find(
            (listF) => listF.id == "L" + card.listId
          );
          let index = list.cards.map((c) => c.id).indexOf(card.id);
          list.cards[index] = card;
          if (state.selectedTask.id == card.id) {
            state.selectedTask = card;
          }
        }
        state.status = "idle";
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateCardLabels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCardLabels.fulfilled, (state, action) => {
        if (action.payload.error === undefined) {
          const card = action.payload;
          const list = state.board.lists.find(
            (listF) => listF.id == "L" + card.listId
          );
          let index = list.cards.map((c) => c.id).indexOf(card.id);
          list.cards[index] = card;
          if (state.selectedTask.id == card.id) {
            state.selectedTask = card;
          }
        }
        state.status = "idle";
      })
      .addCase(updateCardLabels.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateCardMembers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCardMembers.fulfilled, (state, action) => {
        if (action.payload.error === undefined) {
          const card = action.payload;
          const list = state.board.lists.find(
            (listF) => listF.id == "L" + card.listId
          );
          let index = list.cards.map((c) => c.id).indexOf(card.id);
          list.cards[index] = card;
          if (state.selectedTask.id == card.id) {
            state.selectedTask = card;
          }
        }
        state.status = "idle";
      })
      .addCase(updateCardMembers.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateCardComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCardComments.fulfilled, (state, action) => {
        if (action.payload.error === undefined) {
          const card = action.payload;
          const list = state.board.lists.find(
            (listF) => listF.id == "L" + card.listId
          );
          let index = list.cards.map((c) => c.id).indexOf(card.id);
          list.cards[index] = card;
          if (state.selectedTask.id == card.id) {
            state.selectedTask = card;
          }
        }
        state.status = "idle";
      })
      .addCase(updateCardComments.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const {
  add_list,
  add_card,
  drag_happened,
  update_card,
  set_selected_card,
} = boardSlice.actions;
export default boardSlice.reducer;
