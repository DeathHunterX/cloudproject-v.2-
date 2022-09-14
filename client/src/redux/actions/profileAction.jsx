import { GLOBALTYPES } from './globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imgUpload'

import { patchDataAPI } from '../../utils/fetchData'

export const PROFILE_TYPES =  {
    LOADING: 'LOADING_PROFILE',
    GET_USER: 'GET_PROFILE_USER',
    GET_ID: 'GET_PROFILE_ID'
}

export const getProfileUsers = ({ id, auth }) => async(dispatch)  => {
    dispatch({type: PROFILE_TYPES.GET_ID, payload: id})
    // console.log({id, auth})
    try {
        dispatch({type: PROFILE_TYPES.LOADING, payload: true})
        const res = await getDataAPI(`/user/${id}`, auth.token)
        dispatch({
            type: PROFILE_TYPES.GET_USER,
            payload: res.data
        })
        dispatch({type: PROFILE_TYPES.LOADING, payload: false})
        }
        
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {error: err.response.data.msg}})
    }
    
}

export const updateProfileUser = ({ userData, avatar, auth }) => async(dispatch)  => {
    if(!userData.fullname)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Please add your full name."}})

    if(userData.fullname.length > 25)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your full name too long."}})

    if(userData.description.length > 5000)
    return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your description too long."}})

    try {
        let media;
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        if(avatar) media = await imageUpload([avatar], auth.token)
        
        const res = await patchDataAPI("update", {
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...userData,
                    avatar: avatar ? media[0].url : auth.user.avatar,
                }
            }
        })

        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {error: err.response.data.msg}
        })
    }
}