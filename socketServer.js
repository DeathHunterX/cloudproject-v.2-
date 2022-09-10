let users = []

const SocketServer = (socket) => {
    // Connect - Disconnect
    socket.on('joinUser', id => {
        users.push({id, socketId: socket.id})
        // console.log({users})
        
    })
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id)
        // console.log({users})    
    })

    //Rating


    //Message
    socket.on('addMessage', msg => {
        const user = users.find(user => user.id === msg.recipient)
        user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg)
    })

    // Check User Online / Offline
    socket.on('checkUserOnline', () => {
        users.forEach(client => 
            socket.emit('checkUserOnlineToClient', client.id)
        )
    })
}

module.exports = SocketServer