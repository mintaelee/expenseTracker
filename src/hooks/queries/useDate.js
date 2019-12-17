import { useSelector } from "react-redux";

export function useDate() {
  return useSelector(state => state.date);
}
