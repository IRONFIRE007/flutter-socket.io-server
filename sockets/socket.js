
const {io} = require('../index');

io.on('connection', client => {
    console.log('Cliente Conectado');

    client.on('disconnect', () => { console.log('Cliente Desconectado'); });
 
      client.on('message', (payload)=> { console.log('Message ',payload)});

   io.emit('message',{admin:'New Message'})

  });
