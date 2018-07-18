class Chat {
    constructor () {
        this.message = document.getElementById('message');
        this.handle = document.getElementById('handle');
        this.btn = document.getElementById('send');
        this.output = document.getElementById('output');
        this.feedback = document.getElementById('feedback');
   }
   start(){
        const socket = io.connect('http://localhost:4000');
        const message = this.message;
        const handle = this.handle;
        const feedback = this.feedback;
        const output = this.output;
        // Emit events
        this.btn.addEventListener('click', function(){
            if (message.value) {
                socket.emit('chat', {
                    message: message.value,
                    handle: handle.value
                });
                message.value = "";
            }
        });
        // Listen for Enter and Keypress
        this.message.addEventListener('keypress', function(e){
            if (e.key === 'Enter' && message.value) {
                socket.emit('chat', {
                    message: message.value,
                    handle: handle.value
                });
                message.value = "";
            } else {
                socket.emit('typing', handle.value);
            }
        })
        // Listen for events
        socket.on('chat', function(data){
            feedback.innerHTML = '';
            output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
            document.getElementById('chat-window').scrollTop += 100;
        });

        socket.on('typing', function(data){
            feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
            document.getElementById('chat-window').scrollTop += 100;
        });
   }
}

window.onload = () => {
    let chat = new Chat();
    chat.start();
};