import React, {createContext} from 'react'

export const initialState = {
    todo: { list: [], item: {} },
    lists: { list: [], item: {}}
  };
export const Store = createContext(initialState)