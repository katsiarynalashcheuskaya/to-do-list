import {AppRootStateType} from "../store";

export const tasksSelector = (state: AppRootStateType, todolistID: string) => state.tasks[todolistID].data