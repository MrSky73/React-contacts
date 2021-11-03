import { createStore } from "redux";

const loggedin = localStorage.getItem("isLoggedIn") === "1" ? false : true;
const nameInBrowser = localStorage.getItem("name");

const initialState = {
  isLoggedin: loggedin,
  name: nameInBrowser,
};

const loginReducer = (state = initialState, action) => {
  if ((action.type = "LOGIN")) {
    console.log(state);
    return {
      isLoggedin: !state.isLoggedin,
      name: action.payload,
    };
  }
  if ((action.type = "LOGOUT")) {
    return {
      isLoggedin: !state.isLoggedin,
      name: "",
    };
  }
};

const store = createStore(loginReducer);

export default store;
