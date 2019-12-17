import { useSelector } from "react-redux";

export function useMenu() {
  return useSelector(state => state.menu);
}
