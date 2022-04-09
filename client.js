var dgram = require('dgram');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Execute command: ', (cmd) => {

    const user = {
        username: 'user',
        password: 'password',
        permissions: {
          read: true,
          write: false,
          execute: false,
        },
        details() {
          const { read, write, execute } = this.permissions;
          return [this.username, this.password, read, write, execute].join(" ");
        },
      };
  
let PORT = 8882;
let HOST = '127.0.0.1' ;

// Buffers in Node.js is used to perform operations on raw binary data

var message = new Buffer(`${cmd}: ` + user.details());

// Create a udp socket client object.
let client = dgram.createSocket('udp4');

client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {

    if (err) throw err;

    console.log('UDP client message sent to ' + HOST + ':' + PORT);

});

client.on('message', function (message, remote) {

    console.log(remote.address + ':' + remote.port + ' - ' + message);

    client.close();

});

  readline.close();
});

