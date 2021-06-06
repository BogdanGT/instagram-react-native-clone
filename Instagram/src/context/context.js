import React, {useReducer,createContext} from 'react'

export default (reducer,initialState,actions) => {
    const Context = createContext()
    const [state, dispatch] = useReducer(reducer,initialState)

    const Provider = ({children}) => {
    const boundActions = {}

    for(let key in actions){
        boundActions[key] = actions[key](dispatch)
    }
    console.log(boundActions)

        return <Context.Provider value={{state, ...boundActions}}>
            {children}
        </Context.Provider>
    }

    return {Context,Provider}
}