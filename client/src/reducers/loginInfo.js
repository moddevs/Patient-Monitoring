export default (
  loginInfo = {
    isLoggedIn: "",
    accountType: "",
    userName: "",
    displayId: "",
  },

  action
) => {
  switch (action.type) {
    case "UPDATE_LOGIN":
      return action.payload;
    case "UPDATE_ID":
      return action.payload;

    default:
      return loginInfo;
  }
};

//UPDATE_LOGIN
