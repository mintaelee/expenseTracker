import { useSelector } from "react-redux";

export function useCategory() {
  return useSelector(state => state.category);
}
