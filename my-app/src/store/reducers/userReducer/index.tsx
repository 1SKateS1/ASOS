import { IUser } from "../../actions/userActions/types";
import { UserActionTypes, UserActions, UserState } from "./types";
const userTemp: IUser = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  image: "",
  roles: "",
  discountsAndSales: false,
  country: "",
  state: "",
  street: "",
  zipCode: "",
  city: "",
};
const initialState: UserState = {
  message: null,
  loading: false,
  isAuth: false,
  email: "",
  user: userTemp,
};

const UserReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.START_REQUESTS_USER: {
      return {
        ...state,
        loading: true,
        message: null,
      };
    }
    case UserActionTypes.SET_USER_EMAIL: {
      return {
        ...state,
        email: action.payload,
      };
    }
    case UserActionTypes.LOGIN_USER: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    }
    case UserActionTypes.REGISTER_USER: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    }
    default: {
      return state;
    }
  }
};
export default UserReducer;
