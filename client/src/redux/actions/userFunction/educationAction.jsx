import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../../utils/fetchData"
import { GLOBALTYPES } from "../globalTypes"

export const EDUCATION_TYPES = {
    CREATE_EDUCATION: 'CREATE_EDUCATION',
    GET_EDUCATION: 'GET_EDUCATION',
    LOADING_EDUCATION: 'LOADING_EDUCATION',
    UPDATE_EDUCATION: 'UPDATE_EDUCATION',
    DELETE_EDUCATION: 'DELETE_EDUCATION'
}

export const createEducation = (data, auth) => async(dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})
        const res = await postDataAPI('education', data, auth.token)

        dispatch({ 
            type: EDUCATION_TYPES.CREATE_EDUCATION, 
            payload: {...res.data.educations, user: auth.user} 
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

export const getEducation = (id, token) => async(dispatch) => {
    try {
        dispatch({ type: EDUCATION_TYPES.LOADING_EDUCATION, payload: true })
        const res = await getDataAPI(`education/${id}?sort=startYear`, token)
        dispatch({
            type: EDUCATION_TYPES.GET_EDUCATION,
            payload: res.data
        })

        dispatch({ type: EDUCATION_TYPES.LOADING_EDUCATION, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }
}

export const updateEducation = (data, id, token) => async(dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})
        const res = await patchDataAPI(`education/${id}`, data, token)
        // console.log(res)
        dispatch({
            type: EDUCATION_TYPES.UPDATE_EDUCATION,
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

export const deleteEducation = (education, token) => async(dispatch) => {
    dispatch({type: EDUCATION_TYPES.DELETE_EDUCATION, payload: education})

    try {
        await deleteDataAPI(`education/${education._id}`, token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }
}