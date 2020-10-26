import React, { useContext, useReducer } from 'react';
import { GrudgeContext } from './GrudgeContext';

import Grudges from './Grudges';
import initialState from './initialState';
import NewGrudge from './NewGrudge';

const Application = () => {
  const { undo, isPast, redo, isFuture } = useContext(GrudgeContext);

  return (
    <div className="Application">
      <NewGrudge />
      <section>
        <button disabled={!isPast} onClick={undo}>
          Undo
        </button>
        <button disabled={!isFuture} onClick={redo}>
          Redo
        </button>
      </section>
      <Grudges />
    </div>
  );
};

export default Application;
