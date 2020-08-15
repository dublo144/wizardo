import React from 'react';
import { apiUtils } from '../helpers/apiUtils';
import { getUserinfo } from '../helpers/JwtTokenParser';
import { gqlQueries } from '../helpers/graphqlQueries';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected'
};

const initialState = {
  jwtToken: '',
  userId: '',
  username: '',
  isLoggedIn: false,
  status: status.IDLE,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    // Sign in
    case 'SIGN_IN': {
      return { ...state, status: status.PENDING };
    }
    case 'SIGN_IN_SUCCESS': {
      // Maybe move to cookie or state??
      localStorage.setItem('jwtToken', action.payload.jwtToken);
      return {
        ...state,
        status: status.RESOLVED,
        userId: action.payload.userId,
        username: action.payload.username,
        jwtToken: action.payload.jwtToken,
        isLoggedIn: true
      };
    }
    case 'SIGN_IN_FAILED':
      return { status: status.REJECTED, error: action.payload.error };
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
};

const init = (initialState) => {
  const token = localStorage.getItem('jwtToken');

  if (token) {
    const { username } = getUserinfo(token);
    return {
      ...initialState,
      jwtToken: token,
      username: username,
      isLoggedIn: true
    };
  }

  return initialState;
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState, init);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
};

const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
};

const signIn = async (email, password, dispatch) => {
  dispatch({ type: 'SIGN_IN' });
  const reqBody = {
    query: gqlQueries.LOGIN(email, password)
  };
  try {
    const opts = apiUtils.makeOpts(reqBody);
    const res = await apiUtils.fetchData(opts);
    const { username, jwtToken } = res.data.login;
    dispatch({
      type: 'SIGN_IN_SUCCESS',
      payload: {
        username,
        jwtToken
      }
    });
  } catch (e) {
    dispatch({ type: 'SIGN_IN_FAILED', payload: e });
  }
};

export { AuthProvider, useAuthState, useAuthDispatch, signIn };
