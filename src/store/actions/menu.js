import { TOGGLE_MENU } from '../actionTypes'

export const toggleMenu = ({
  menuVisible = false,
}) => ({
  type: TOGGLE_MENU,
  payload: { menuVisible }
});