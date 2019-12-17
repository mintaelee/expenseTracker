import { TOGGLE_LOADER } from '../actionTypes'

export const toggleLoader = ({ loaderVisible = false, trigger }) => ({
    type: TOGGLE_LOADER,
    payload: { loaderVisible },
    meta: { trigger }
})