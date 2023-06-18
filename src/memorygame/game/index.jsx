import React, { memo, useReducer, useMemo, useEffect } from "react";

import { Field } from "./components/GameField";
import { GameFieldView, GameView, SwitchView } from "./components/Styled";
import {
  GameReducer,
  initialState,
  NEW_LEVEL,
  FIELD_HIDE,
  FIELD_SHOW,
  RESET_LEVEL
} from "./game.reducer";
import { generateGameField } from "./game.utils";
import Switch from "rc-switch";

import "rc-switch/assets/index.css";

function Game({ toggleTheme }) {
  const [{ level, showHidden, showField, levelConfig }, dispatch] = useReducer(
    GameReducer,
    initialState
  );
}

export default memo(Game);
