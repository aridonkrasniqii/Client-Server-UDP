
var dgram = require('dgram');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let str = `Menu: \nPress "read" to read file \n
Press "write" to write file \n
Press "execute" to open file \n
Press "ls" to list directories \n
Execute command: `;



readline.question(str , (cmd) => {



  const user = {
    username: 'arif',
    password: 'arifarif',
    permissions: {
      read: true,
      write: true,
      execute: false,
    },
    details() {
      const { read, write, execute } = this.permissions;
      return [this.username, this.password, read, write, execute].join(' ');
    },
  };

  let PORT = 8882;
  let HOST = '172.16.0.137';

  // Buffers in Node.js is used to perform operations on raw binary data

  var message = new Buffer.from(`${cmd}: ` + user.details());

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
