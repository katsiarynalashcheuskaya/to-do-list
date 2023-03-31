import {AppRootStateType} from "../store";

export const filterSelector = (state: AppRootStateType, todolistID: string) => state.tasks[todolistID].filter