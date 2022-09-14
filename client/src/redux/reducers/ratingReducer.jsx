import { RATING_TYPES } from "../actions/ratingAction";
import { EditData } from "../actions/globalTypes";

const initialState = {
    loading: false,
    rating: [],
    result: 0
}

const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        case RATING_TYPES.LOADING_RATE:
            return {
                ...state,
                loading: action.payload
            };
        case RATING_TYPES.UPDATE_RATING:
            return {
                ...state,
                rating: EditData(state.rating, action.payload._id, action.payload)
            };
        case RATING_TYPES.GET_USER_RATING:
            return {
                ...state,
                rating: action.payload.rating,
                result: action.payload.result
            };
        case RATING_TYPES.GET_POST_RATING:
            return {
                ...state,
                rating: action.payload.rating,
                result: action.payload.result
            };
        default:
            return state;
    }
}

export default ratingReducer