import React, { useReducer, useCallback } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

// React.memo - if it takes the same object as before, don't rerender.
// useCallback
// useMemo

// if you use a string, you have a risky of getting a typo and not finding the error. If you mispelled a constant, lint you inform you that constant is wrong.
const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

const reducer = (state, action) => {
  if (action.type === GRUDGE_ADD) {
    return [action.payload, ...state];
  }
  if (action.type === GRUDGE_FORGIVE) {
    return state.map((grudge) => {
      if (grudge.id !== action.payload.id) return grudge;
      return { ...grudge, forgiven: !grudge.forgiven };
    });
  }
  return state;
};

const Application = () => {
  //the dispatch function has the same memory reference on every render. It will be the same one every time.
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = useCallback(
    ({ person, reason }) => {
      //the mandatory field for a dispatch is type. All the other data does in payload. This comes from the flux convention.
      dispatch({
        type: GRUDGE_ADD,
        payload: {
          person,
          reason,
          forgiven: false,
          id: id()
        }
      });
      // grudge.id = id();
      // grudge.forgiven = false;
      // setGrudges([grudge, ...grudges]);
    },
    [dispatch]
  );

  const toggleForgiveness = useCallback(
    (id) => {
      dispatch({
        type: GRUDGE_FORGIVE,
        payload: { id }
      });
      // setGrudges(
      //   grudges.map((grudge) => {
      //     if (grudge.id !== id) return grudge;
      //     return { ...grudge, forgiven: !grudge.forgiven };
      //   })
      // );
    },
    [dispatch]
  );

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
