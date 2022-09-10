import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../../utils/fetchData"
import { GLOBALTYPES } from "../globalTypes"

export const EXPERIENCE_TYPES = {
    CREATE_EXPERIENCE: 'CREATE_EXPERIENCE',
    GET_EXPERIENCE: 'GET_EXPERIENCE',
    LOADING_EXPERIENCE: 'LOADING_EXPERIENCE',
    UPDATE_EXPERIENCE: 'UPDATE_EXPERIENCE',
    DELETE_EXPERIENCE: 'DELETE_EXPERIENCE'
}

export const createExperience = (data, auth) => async(dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})
        const res = await postDataAPI('experience', data, auth.token)
        dispatch({ 
            type: EXPERIENCE_TYPES.CREATE_EXPERIENCE, 
            payload: {...res.data.experiences, user: auth.user} 
        })

        
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false} })
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

export const getExperience = (id, token) => async(dispatch) => {
    try {
        dispatch({ type: EXPERIENCE_TYPES.LOADING_EXPERIENCE, payload: true })
        const res = await getDataAPI(`experience/${id}?sort=startYear`, token)
        dispatch({
            type: EXPERIENCE_TYPES.GET_EXPERIENCE,
            payload: res.data
        })

        dispatch({ type: EXPERIENCE_TYPES.LOADING_EXPERIENCE, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }
}

export const updateExperience = (data, id, token) => async(dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})
        const res = await patchDataAPI(`experience/${id}`, data, token)
        // console.log(res)
        dispatch({
            type: EXPERIENCE_TYPES.UPDATE_EXPERIENCE,
            payload: res.data
        })

        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: false }})
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

export const deleteExperience = (experience, token) => async(dispatch) => {
    dispatch({type: EXPERIENCE_TYPES.DELETE_EXPERIENCE, payload: experience})

    try {
        await deleteDataAPI(`experience/${experience._id}`, token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }
}