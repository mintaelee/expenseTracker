import { useSelector } from "react-redux";

export function useCalendar() {
  return useSelector(state => state.calendar);
}
