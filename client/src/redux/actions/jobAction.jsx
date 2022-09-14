import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI, postDataAPI, putDataAPI } from "../../utils/fetchData";

export const JOB_TYPES = {
    LOADING_JOB: 'LOADING_JOB',
    APPLY_JOB: 'APPLY_JOB',
    GET_JOBS: 'GET_JOBS',
    GET_DETAIL_JOB: 'GET_DETAIL_JOB',
    UPDATE_JOBS: 'UPDATE_JOBS',
    GET_CANDIDATES: 'GET_CANDIDATES',

}

export const applyJob = (data, auth, status) => async(dispatch) => {
    if (data.sop.length < 10) return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your reason to apply is too short"}})
    // console.log(data)
    // console.log(status._id)
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})
        const res = await postDataAPI(`post/${status._id}/job`, data, auth.token)
        // console.log(res)

        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: false }})
        dispatch({ 
            type: JOB_TYPES.APPLY_JOB, 
            payload: {...res.data.newJobApply, user: auth.user} 
        })
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                success: res.data.msg
            })
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }   
}

export const getJobs = (token) => async(dispatch) => {
    try {
        dispatch({type: JOB_TYPES.LOADING_JOB, payload: true })
        const res = await getDataAPI('jobs', token)
        dispatch({
            type: JOB_TYPES.GET_JOBS,
            payload: res.data
        })
        dispatch({ type: JOB_TYPES.LOADING_JOB, payload: false })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }
}

export const getDetailJob = (id, token) => async(dispatch) => {
    try {
        dispatch({type: JOB_TYPES.LOADING_JOB, payload: true })
        const res = await getDataAPI(`post/${id}/job`, token)
        dispatch({
            type: JOB_TYPES.GET_DETAIL_JOB,
            payload: res.data
        })
        dispatch({ type: JOB_TYPES.LOADING_JOB, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }
}

export const updateJob = (data, id, auth) => async(dispatch) => {
    // console.log(data)
    try {
        
        dispatch({type: JOB_TYPES.LOADING_JOB, payload: true })
        const res =  await putDataAPI(`jobs/${id}`, data, auth.token)

        dispatch({ type: JOB_TYPES.LOADING_JOB, payload: false })
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                success: res.data.msg
            })
        })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }
}

export const getCandidate = (id, token) => async(dispatch) => {
    try {
        dispatch({type: JOB_TYPES.LOADING_JOB, payload: true })
        const res = await getDataAPI(`candidates/${id}`, token)
        
        dispatch({
            type: JOB_TYPES.GET_CANDIDATES,
            payload: res.data
        })
        dispatch({ type: JOB_TYPES.LOADING_JOB, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }
}