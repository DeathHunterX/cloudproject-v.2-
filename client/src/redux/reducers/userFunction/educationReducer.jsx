import { EDUCATION_TYPES } from "../../actions/userFunction/educationAction";
import { EditData, DeleteData } from "../../actions/globalTypes";
const initialState = {
    loading: false,
    educations: [],
    result: 0,
}

const educationReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDUCATION_TYPES.CREATE_EDUCATION:
            return {
                ...state,
                educations: [action.payload, ...state.educations]
            };
        case EDUCATION_TYPES.LOADING_EDUCATION:
            return {
                ...state,
                loading: action.payload
            };
        case EDUCATION_TYPES.GET_EDUCATION:
            return {
                ...state,
                educations: action.payload.educations,
                result: action.payload.result
            };
        case EDUCATION_TYPES.UPDATE_EDUCATION:
            return {
                ...state,
                educations: EditData(state.educations, action.payload._id, action.payload)
            };
        case EDUCATION_TYPES.DELETE_EDUCATION:
            return {
                ...state,
                educations: DeleteData(state.educations, action.payload._id)
            };
        default:
            return state;
    }
}

export default educationReducer