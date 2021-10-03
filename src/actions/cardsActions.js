import { CONSTANTS } from ".";
export const addCard = (listId, text) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { listId, text },
  };
};
