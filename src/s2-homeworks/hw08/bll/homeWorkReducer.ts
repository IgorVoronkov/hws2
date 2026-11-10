import { UserType } from "../HW8";

type ActionType =
  | { type: "sort"; payload: "up" | "down" }
  | { type: "check"; payload: number };

export const homeWorkReducer = (
  state: UserType[],
  action: ActionType,
): UserType[] => {
  switch (action.type) {
    case "sort": {
      const stateCopy = [...state];
      // by name
      return action.payload === "up"
        ? stateCopy.sort((u1, u2) => (u1.name > u2.name ? 1 : -1))
        : stateCopy.sort((u1, u2) => (u1.name > u2.name ? -1 : 1));
    }
    case "check": {
      return state.filter((u) => u.age >= action.payload); // need to fix
    }
    default:
      return state;
  }
};
