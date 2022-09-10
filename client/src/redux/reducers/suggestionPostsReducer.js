import { SUGGEST_TYPES } from "../actions/suggestionPostsAction";

const initialState = {
    loading: false,
    posts: []
}

const suggestionPostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUGGEST_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SUGGEST_TYPES.GET_POSTS:
            return {
                ...state,
                posts: action.payload.posts,
            };
        default:
            return state;
    }
}

export default suggestionPostsReducer