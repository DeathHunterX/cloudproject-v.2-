import { combineReducers } from "redux";

import auth from './authReducer'
import alert from './alertReducer'
import theme from './themeReducer'
import profile from './profileReducer'
import status from './statusReducer'
import homePosts from './postReducer'
import modal from './modalReducer'
import detailPost from './detailPostReducer'
import jobStatus from './jobStatusReducer'
import rating from './ratingReducer'
import suggestionPosts from './suggestionPostsReducer'
import socket from './socketReducer'

import message from './messageReducer' 
import online from './onlineReducer'
import education from './userFunction/educationReducer'
import experience from './userFunction/experienceReducer'
export default combineReducers({
    auth,
    alert,
    theme,
    profile,
    homePosts,
    status,
    modal,
    detailPost,
    jobStatus,
    rating,
    suggestionPosts,
    socket,

    message,
    online,
    education,
    experience
})