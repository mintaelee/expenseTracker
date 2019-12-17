export function loadState() {
    try {
        let serializedState = localStorage.getItem('app-state')
        if (serializedState === null){
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (error) {
        return undefined
    }
}

export function saveState(state){
    try {
        let serializedState = JSON.stringify(state)
        localStorage.setItem('app-state', serializedState)
    }
    catch (error) {
        return undefined
    }
}