import { createContext } from "react";
import type { FileManagerState, FileManagerAction } from "./FileManagerTypes";

// Creating a context for our store
export const FileManagerContext = createContext<[FileManagerState, React.Dispatch<FileManagerAction>] | undefined>(undefined);

// Defining the reducer function
export function FileManagerReducer(state: FileManagerState, action: FileManagerAction): FileManagerState {
  switch (action.type) {
    case 'SET_SOFTWARE_BINARY_FILE':
      return { ...state, softwareBinary: action.payload };
    case 'REMOVE_SOFTWARE_BINARY_FILE':
      return { ...state, softwareBinary: null };
    default:
      return state;
  }
}