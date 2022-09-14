import { putDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const RATING_TYPES = {
    LOADING_RATE: 'LOADING_RATE',
    UPDATE_RATING: 'UPDATE_RATING',
    GET_USER_RATING: 'GET_USER_RATING',
    GET_POST_RATING: 'GET_POST_RATING',
}

export const ratingEmployees = (data, auth) => async(dispatch) => {
    // console.log(data)
    // console.log(token)
    try {
        const res = await putDataAPI('ratings/user', data, auth.token)
        // console.log(res.data)

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

export const ratingPost = (data, auth) => async(dispatch) => {
    try {
        const res = await putDataAPI('ratings/post', data, auth.token)
        // console.log(res.data)

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

// export const getPostRating = (token) => async(dispatch) => {
//     try {
//         dispatch({ type: RATING_TYPES.LOADING_RATE, payload: true })
//         const res = await getDataAPI('getRating/post?', token)
//         dispatch({
//             type: RATING_TYPES.GET_USER_RATING,
//             payload: res.data
//         })

//         dispatch({ type: RATING_TYPES.LOADING_RATE, payload: false })
//     } catch (err) {
//         dispatch({
//             type: GLOBALTYPES.ALERT, 
//             payload: ({
//                 error: err.response.data.msg
//             })
//         })
//     }
// }