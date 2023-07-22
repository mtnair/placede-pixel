import axios from 'axios';
import React, { Dispatch, PropsWithChildren, useEffect } from 'react';
import toml from 'toml';

import { TargetConfig } from './interfaces/target-config';

const initialTargetConfigState: TargetConfig = {
  'add-x': 0,
  'add-y': 0,
  allowed_colors: [],
  default_prio: 0,
  width: 0,
  height: 0,
  ignored_colors: [],
  structure: [],
};

const TargetConfigContext = React.createContext<TargetConfig>(initialTargetConfigState);
const TargetConfigDispatchContext = React.createContext<Dispatch<Partial<TargetConfig>>>(
  () => null
);

export function useTargetConfig(): [TargetConfig, Dispatch<Partial<TargetConfig>>] {
  return [React.useContext(TargetConfigContext), React.useContext(TargetConfigDispatchContext)];
}

const targetConfigReducer = (state: TargetConfig, action: Partial<TargetConfig>): TargetConfig => {
  return {
    ...state,
    ...action,
  };
};

/**
 * Global State provider & hooks
 */
export const TargetConfigProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = React.useReducer(targetConfigReducer, initialTargetConfigState);

  const targetConfigUrl =
    'https://raw.githubusercontent.com/PlaceDE-Official/pixel/main/target_config.toml';

  useEffect(() => {
    axios.get(targetConfigUrl).then((res) => {
      try {
        const targetConfig: TargetConfig = toml.parse(res.data);

        console.log(targetConfig);

        dispatch(targetConfig);
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  return (
    <TargetConfigContext.Provider value={state}>
      <TargetConfigDispatchContext.Provider value={dispatch}>
        {children}
      </TargetConfigDispatchContext.Provider>
    </TargetConfigContext.Provider>
  );
};
