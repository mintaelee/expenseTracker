import { useSelector } from "react-redux";

export function useFile() {
  return useSelector(state => state.file);
}
