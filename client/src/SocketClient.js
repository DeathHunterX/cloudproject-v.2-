import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import { MESS_TYPES } from './redux/actions/messageAction'

const SocketClient = () => {
    const {auth, socket, online} = useSelector(state => state)
    const dispatch = useDispatch()
    
    // joinUser
    useEffect(() => {
        socket.emit('joinUser', auth.user._id)
    }, [auth.user._id, socket])
    

    //Message
    useEffect(() => {
        socket.on('addMessageToClient', msg =>{
            dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: msg})

            dispatch({
                type: MESS_TYPES.ADD_USER, 
                payload: {
                    ...msg.user, 
                    text: msg.text, 
                    media: msg.media
                }
            })
        })

        return () => socket.off('addMessageToClient')
    },[socket, dispatch])
    


    // Check User Online / Offline
    useEffect(() => {
        socket.emit('checkUserOnline', auth.user)
    },[socket, auth.user])

    useEffect(() => {
        socket.on('checkUserOnlineToClient', id =>{
            if(!online.includes(id)){
                dispatch({type: GLOBALTYPES.ONLINE, payload: id})
            }
        })

        return () => socket.off('checkUserOnlineToClient')
    },[socket, dispatch, online])


    // Check User Offline
    useEffect(() => {
        socket.on('CheckUserOffline', id =>{
            dispatch({type: GLOBALTYPES.OFFLINE, payload: id})
        })

        return () => socket.off('CheckUserOffline')
    },[socket, dispatch])
    
    
    return <></>
}

export default SocketClient