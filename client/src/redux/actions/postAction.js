import { GLOBALTYPES } from "./globalTypes"
import { imageUpload } from "../../utils/imgUpload"
import { getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI } from "../../utils/fetchData"
import axios from "axios"

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    LOADING_POST: 'LOADING_POST',
    GET_POSTS: 'GET_POSTS',
    UPDATE_POST: 'UPDATE_POST',
    GET_POST: 'GET_POST',
    DELETE_POST: 'DELETE_POST'
   
}

export const createPost = (data, images, auth) => async(dispatch) => {
    // console.log({data, images}, auth)

    let media = []
    
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})

        if(images.length > 0) media = await imageUpload(images, auth.token)
        const newData = {...data, images: media}

        const res = await postDataAPI('posts', newData, auth.token)
        
        dispatch({ 
            type: POST_TYPES.CREATE_POST, 
            payload: {...res.data.newPost, user: auth.user} 
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

export const getPosts = (token) => async(dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true })
        const res = await getDataAPI('posts', token)
        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: res.data
        })

        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }
}

export const getAllPosts = (search) => async(dispatch) => {
    try {
        dispatch({type: POST_TYPES.LOADING_POST, payload: true })
        const res = await axios.get(`/api/allposts${search}`)
        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: res.data
        })

        dispatch({ type: POST_TYPES.LOADING_POST, payload: false})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }
}


export const updatePost = (data, images, auth, status) => async(dispatch) => {
    let media = []

    const imgNewURL = images.filter(img => !img.url)
    const imgOldURL = images.filter(img => img.url)

    if (status === data && imgNewURL.length === 0 && imgOldURL.length === status.images.length) return;
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})
        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL, auth.token)
        const newData = {...data, images: [...imgOldURL, ...media] }
        
        const res = await patchDataAPI(`post/${status._id}`, newData, auth.token)
        // console.log(res)
        dispatch({ 
            type: POST_TYPES.UPDATE_POST, 
            payload: res.data.newPost
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

export const getPost = ({detailPost, id, auth}) => async(dispatch) => {
    if (detailPost.every(post => post._id !== id)) {
        try {
            const res = await getDataAPI(`post/${id}`, auth.token)
            dispatch({type: POST_TYPES.GET_POST, payload: res.data.post})
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, 
                payload: ({
                    error: err.response.data.msg
                })
            })
        }
    }
}

export const deletePost = ({post, auth}) => async(dispatch) => {
    dispatch({type: POST_TYPES.DELETE_POST, payload: post})

    try {
        await deleteDataAPI(`post/${post._id}`, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }
}
