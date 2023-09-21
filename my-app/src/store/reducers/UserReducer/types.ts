import { IUser, ServiceResponse } from "../../actions/userActions/types";

export interface UserState {
  email: string;
  user: IUser;
  message: null | string;
  loading: boolean;
  isAuth: boolean;
}

export enum UserActionTypes {
  START_REQUESTS_USER = "START_REQUESTS_USER",
  SET_USER_EMAIL = "SET_USER_EMAIL",
  LOGIN_USER = "LOGIN_USER",
  REGISTER_USER = "REGISTER_USER",
  LOGOUT_USER = "LOGOUT_USER",
  LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL",
  SUCCESSFUL_REQUEST = "SUCCESSFUL_REQUEST",
  BAG_REQUEST = "BAG_REQUEST",
}
interface LoginSuccessfulAction {
  type: UserActionTypes.LOGIN_SUCCESSFUL;
  payload: ServiceResponse;
}
interface SuccessfulRequestAction {
  type: UserActionTypes.SUCCESSFUL_REQUEST;
}
interface StartRequestUserAction {
  type: UserActionTypes.START_REQUESTS_USER;
}
interface BadRequestUserAction {
  type: UserActionTypes.BAG_REQUEST;
  payload: string;
}
interface LogoutUserAction {
  type: UserActionTypes.LOGOUT_USER;
}
interface StartSetUserEmailAction {
  type: UserActionTypes.SET_USER_EMAIL;
  payload: string;
}
interface SuccessfulRequestRegisterUserAction {
  type: UserActionTypes.REGISTER_USER;
  payload: IUser;
}
interface SuccessfulRequestLoginUserAction {
  type: UserActionTypes.LOGIN_USER;
  payload: IUser;
}
export type UserActions =
  | StartRequestUserAction
  | StartSetUserEmailAction
  | SuccessfulRequestLoginUserAction
  | SuccessfulRequestRegisterUserAction
  | LogoutUserAction
  | LoginSuccessfulAction
  | BadRequestUserAction
  | SuccessfulRequestAction;
