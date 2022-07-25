const socket = io()
let name;
let unique;
let textarea = document.querySelector('#textarea')
let typing = document.querySelector('#typing')

do {
    name = prompt('Please enter your name: ')
    unique = prompt('Please enter your room id: ')

} while(!name)
let uuid={
    room:unique,
    user:name
}
socket.emit('message',uuid )

socket.emit('new',uuid)


textarea.addEventListener('keyup', (e) => {
    
        sendMessage(e.target.value)
        
})

// if(socket.on('new'))
//         {
//             sendMessage(textarea.value)
//         }
    

function sendMessage(message) {
    let msg = {
        room:unique,
        user: name,
        message: message.trim()
    }
    // Append 
    // appendMessage(msg, 'outgoing')
    // textarea.value = ''
    // scrollToBottom()
    // Send to server 
    socket.emit('message', msg)

}

// function appendMessage(msg, type) {
//     let mainDiv = document.createElement('div')
//     let className = type
//     mainDiv.classList.add(className, 'message')
//     let markup = `
//         <h4>${msg.user}</h4>
//         <p>${msg.message}</p>
//     `
//     mainDiv.innerHTML = markup
//     messageArea.appendChild(mainDiv)
// }
// Recieve messages 
// socket.on('typing',(msg) => {
//     typing.value =`${msg.user} is coding`    
// })
socket.on('newconn',() => {
    // appendMessage(msg, 'incoming')
    sendMessage(textarea.value) 
    
})
socket.on('message', (msg) => {
    // appendMessage(msg, 'incoming')
    textarea.value = msg.message
    scrollToBottom()
})

function scrollToBottom() {
    textarea.scrollTop = textarea.scrollHeight
}
