import { useSelector } from "react-redux";

export function useModal() {
  return useSelector(state => state.modal);
}
