const express = require('express');
const os = require('os');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/home', (req, res) => {
  res.send('Hello, World! you are on home page');
});

// Retrieve the local IPv4 address dynamically
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const interfaceInfo = interfaces[interfaceName];
    for (const iface of interfaceInfo) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost'; // fallback to localhost if no IPv4 address is found
}

const ip = getLocalIpAddress();
const server = app.listen(port, ip, () => {
  console.log(`Server is running on http://${ip}:${port}`);
});
