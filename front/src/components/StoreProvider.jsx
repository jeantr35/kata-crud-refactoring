import React,  {useReducer} from 'react'
import { reducer } from './Reducer';
import { Store, initialState } from './Store';

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  
  }