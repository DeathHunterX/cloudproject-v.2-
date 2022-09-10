import { EXPERIENCE_TYPES } from "../../actions/userFunction/experienceAction";
import { EditData, DeleteData } from "../../actions/globalTypes";
const initialState = {
    loading: false,
    experiences: [],
    result: 0,
}

const experienceReducer = (state = initialState, action) => {
    switch (action.type) {
        case EXPERIENCE_TYPES.CREATE_EXPERIENCE:
            return {
                ...state,
                experiences: [action.payload, ...state.experiences]
            };
        case EXPERIENCE_TYPES.LOADING_EXPERIENCE:
            return {
                ...state,
                loading: action.payload
            };
        case EXPERIENCE_TYPES.GET_EXPERIENCE:
            return {
                ...state,
                experiences: action.payload.experiences,
                result: action.payload.result
            };
        case EXPERIENCE_TYPES.UPDATE_EXPERIENCE:
            return {
                ...state,
                experiences: EditData(state.experiences, action.payload._id, action.payload)
            };
        case EXPERIENCE_TYPES.DELETE_EXPERIENCE:
            return {
                ...state,
                experiences: DeleteData(state.experiences, action.payload._id)
            };
        default:
            return state;
    }
}

export default experienceReducer