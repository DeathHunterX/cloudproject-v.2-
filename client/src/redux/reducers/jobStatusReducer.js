import { JOB_TYPES } from "../actions/jobAction";
import { EditData } from "../actions/globalTypes";
const initialState = {
    loading: false,
    jobs: [],
    result: 0,
}

const jobStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case JOB_TYPES.APPLY_JOB:
            return {
                ...state,
                jobs: [action.payload, ...state.jobs]
            };
        case JOB_TYPES.LOADING_JOB:
            return {
                ...state,
                loading: action.payload
            };
        case JOB_TYPES.GET_JOBS:
            return {
                ...state,
                jobs: action.payload.jobs,
                result: action.payload.result
            };
        case JOB_TYPES.GET_DETAIL_JOB:
            return {
                ...state,
                jobs: action.payload.job,
                result: action.payload.result
            };
        case JOB_TYPES.UPDATE_JOBS:
            return {
                ...state,
                jobs: EditData(state.jobs, action.payload._id, action.payload)
            };
        case JOB_TYPES.GET_CANDIDATES:
            return {
                ...state,
                jobs: action.payload.jobApplicant,
                result: action.payload.result
            };
        default:
            return state;
    }
}

export default jobStatusReducer