import { LikeActionTypes, LikeActions, LikeState } from "./type";

const initialState: LikeState = {
    likesProductsId: [],
    loader: false
};
const LikeReducer = (state = initialState, action: LikeActions): LikeState => {
    switch (action.type) {
        case LikeActionTypes.START_REQUESTS_LIKE: {
            return {
                ...state,
                loader: true,
            };
        }
        case LikeActionTypes.BAG_REQUEST_LIKE: {
            return {
                ...state,
                loader: false,
            };
        }
        case LikeActionTypes.SUCCESSFUL_REQUEST_DELETE_LIKE: {
            return {
                ...state,
                loader: false,
                likesProductsId: state.likesProductsId.filter(item => action.payload !== item),
            };
        }
        case LikeActionTypes.SUCCESSFUL_REQUEST_ADD_LIKE: {
            return {
                ...state,
                loader: false,
                likesProductsId: [...state.likesProductsId, action.payload]
            };
        }
        default: {
            return state;
        }
    }
};
export default LikeReducer;