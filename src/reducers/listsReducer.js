import { CONSTANTS } from "../actions";

let listID = 8;
let cardID = 123;
const initialState = [
  {
    title: "Prva lista",
    id: 0,
    cards: [
      {
        id: 1,
        text: "Prvi task ",
        description: "Opis taska",
      },
      {
        id: 2,
        text: "Drugi task ",
        description: "Opis taska",
      },
      {
        id: 11,
        text: "Prvi task ",
        description: "Opis taska",
      },
    ],
  },
  {
    title: "Druga lista",
    id: 3,
    cards: [
      {
        id: 4,
        text: "First task ",
        description: "Opis taska",
      },
    ],
  },
  {
    title: "Treca lista",
    id: 6,
    cards: [
      {
        id: 7,
        text: "First task ",
        description: "Opis taska",
      },
      {
        id: 78888,
        text: "Second task ",
        description: "Opis taska",
      },
    ],
  },
];
const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: listID,
      };
      listID += 1;
      return [...state, newList];
    case CONSTANTS.ADD_CARD:
      const newCard = {
        text: action.payload.text,
        id: cardID,
      };
      console.log(action.payload);
      const newState = state.map((list) => {
        console.log(list.id, "", action.payload.listId);
        if (list.id === action.payload.listId) {
          return { ...list, cards: [...list.cards, newCard] };
        } else {
          return list;
        }
      });
      cardID += 1;

      return newState;

    case CONSTANTS.DRAG_HAPPENED: {
      const {
        type,
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
      } = action.payload;
      const newState = [...state];
      console.log(type);
      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
      }
      //ista lista

      if (type === "card") {
        if (droppableIdStart === droppableIdEnd) {
          const list = newState.find((list) => droppableIdStart == list.id);
          const card = list.cards.splice(droppableIndexStart, 1);
          list.cards.splice(droppableIndexEnd, 0, ...card);
          console.log(state, "???", newState);
        }

        //pomjereno u drugu listu
        else {
          const startList = newState.find(
            (list) => droppableIdStart == list.id
          );
          const card = startList.cards.splice(droppableIndexStart, 1);
          const endList = newState.find((list) => droppableIdEnd == list.id);
          endList.cards.splice(droppableIndexEnd, 0, ...card);
          console.log(endList.cards);
        }
      }
      return newState;
    }
    default:
      return state;
  }
};

export default listsReducer;
