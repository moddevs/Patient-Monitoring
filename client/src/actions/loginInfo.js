export const updateLoginInfo = (loginInfo) => (dispatch) => {
  dispatch({ type: "UPDATE_LOGIN", payload: loginInfo });
};
