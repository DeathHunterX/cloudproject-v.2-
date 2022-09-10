import { GLOBALTYPES } from './globalTypes'
import { postDataAPI } from '../../utils/fetchData'
import validation from '../../utils/validation'
import emailValidation from '../../utils/emailValidation'
import passwordValidation from '../../utils/passwordValidation'


export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        const res = await postDataAPI('login', data)
        dispatch({
            type: GLOBALTYPES.AUTH, 
            payload: ({
                token:  res.data.access_token,
                user: res.data.user
            })
        })
        localStorage.setItem("firstLogin", true)
        
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                success: res.data.msg
            })
        })
    }
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: ({
                error: err.response.data.msg
            })
        })
    }
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if(firstLogin){
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })

        try {
            const res = await postDataAPI('refresh_token')
            dispatch({
                type: GLOBALTYPES.AUTH, 
                payload: {
                    token:  res.data.access_token,
                    user: res.data.user
                }
            })
            dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
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

export const register = (data) => async (dispatch) => {
    const check = validation(data)
        if(check.errLength > 0)
        return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg})
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})

        const res = await postDataAPI('register', data)
        // console.log(res)

        dispatch({
            type: GLOBALTYPES.AUTH, 
            payload: ({
                token:  res.data.access_token,
                user: res.data.user
            })
        })
        localStorage.setItem("firstLogin", true)

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

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        await postDataAPI('logout')
        window.location.href = "/"
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}

export const forgotPassword = (data) => async (dispatch) => {
    const emailCheck = emailValidation(data)
    if(emailCheck.errLength > 0) return dispatch({type: GLOBALTYPES.ALERT, payload: emailCheck.errMsg})
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})
        const res = await postDataAPI('forgot', data)
        // console.log(res)
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

export const resetPassword = (data, token) => async (dispatch) => {
    const passwordCheck = passwordValidation(data)
    if(passwordCheck.errLength > 0) return dispatch({type: GLOBALTYPES.ALERT, payload: passwordCheck.errMsg})

    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})
        const res = await postDataAPI('reset', data, token)
        // console.log(res)

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