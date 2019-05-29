import { listener, io } from '../index';

io.on('connection', (self) => {
    self.emit('message');
});

listener.close();
