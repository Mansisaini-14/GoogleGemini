import { createContext } from 'react'

const Context = createContext({})

const ContextProvider = ({ children }) => (
  <Context.Provider value={{}}>
    {children}
  </Context.Provider>
)

export { Context }
export default ContextProvider
