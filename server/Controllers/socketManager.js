
const disconnectSocket = (socket) => {
    console.log(`socket ${socket.id} is disconnected`)
}

const onConnection = (socket) => {
    console.log(`socket ${socket.id} is connected`)
    socket.on('disconnect', ()=>{
        disconnectSocket(socket)
    })
}

module.exports = {onConnection}