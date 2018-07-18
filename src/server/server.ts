import * as express from 'express';
import * as SocketIO from 'socket.io';

// App setup
const app = express();
const server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
const io = SocketIO(server);

io.on('connection', (socket: SocketIO.Socket) => {
    console.log('made socket connection', socket.id);
    // Handle chat event
    socket.on('chat', (data: Message) => {
        console.log(`Socket: ${socket.id} | Handle: ${data.handle} | Message: ${data.message}`);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', (data: any) => {
        socket.broadcast.emit('typing', data);
    });
});