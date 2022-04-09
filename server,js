
const fs = require('fs');
var dgram = require('dgram');

// users details

const db_users = [
  {
    username: 'aridon',
    password: 'aridonaridon',
    permissions: { read: true, write: true, execute: false },
  },

  {
    username: 'edon',
    password: 'edonedon',
    permissions: { read: true, write: true, execute: false },
  },
];

function findUser(user, password) {
  for (let i = 0; i < db_users.length; i++) {
    if (user == db_users[i].username && password == db_users[i].password) {
      return db_users[i];
    }
  }
  // user does not exits
  return null;
}

let PORT = 8882;
let HOST = '127.0.0.1';

// Create udp server socket object.
let server = dgram.createSocket('udp4');

// When udp server started and listening.
server.on('listening', function () {
  // Get and print udp server listening ip address and port number in log console.
  let address = server.address();
  console.log(
    'UDP Server listening on ' + address.address + ': ' + address.port
  );
});


// When udp server receive message.
server.on('message', function (message, remote) {
  console.log(' ' + remote.address + ' : ' + remote.port + ' - ');
  console.log('Message data: ' + message);
  let msg = String(message);

  let userd = msg.split(' ');

  const [request, usr, pwd] = userd;

  const user = findUser(usr, pwd);

  const { read, write, execute } = user.permissions;

  console.log('Users info: ');
  console.log(user);

  switch (request.slice(0, request.length - 1)) {
    case 'read': {
      if (read != true) {
        console.log('User is not allowed to read file ');
      } else {
        // READ FILE: TODO:
        console.log('User is allowed to read file ');
      }

      break;
    }
    case 'write': {
      if (write != true) {
        console.log('User is not allowd to write file ');
      } else {
        // WRITE FILE: TODO:
        console.log('User is allowed to write files ');
      }
      break;
    }
    case 'execute': {
      if (execute != true) {
        console.log('User is not allowed  to execute files ');
      } else {
        // EXECUTE FILE: TODO:
        console.log('User is allowed to exe files ');
      }
      break;
    }

    default: {
      console.log('Wrong command ');
    }
  }



  let msgResponse = 'Request sent successfully ';

  server.send(
    msgResponse,
    0,
    msgResponse.length,
    remote.port,
    remote.address,
    function (err, bytes) {
      if (err) throw err;
      console.log(
        'UDP server message send to ' + remote.address + ':' + remote.port
      );
    }
  );
});

server.bind(PORT, HOST);
