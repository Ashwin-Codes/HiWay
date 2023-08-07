<div align="center">
  <p align="center">
    <img src="./readme/header.png" alt="HiWay Header" width="750px" />
  </p>
</div>
<br />
<div>
  <p align="center">
    A P2P Group Video Chat WebApp
  </p>
</div>

# 💡 What is HiWay?

HiWay is a P2P Group Video Chat WebApp that users can access for free. It utilizes the browser's WebRTC capabilities to establish a peer-to-peer mesh network for data transmission. HiWay employs JWT Authentication and socket.io to enable the creation of the network via WebRTC.

# 💻 HiWay Live Demonstration

<b>Live at: </b> https://hiway.ashwincodes.com <br>
Testing username : tester<br>
Testing password : tester

# ☕️ Features

-   Group video call support.
-   Peer to peer audio and video transmission via webRTC for security.
-   Real-time text chat support via socket.io
-   JWT Authentication.
-   Responsive design.
-   Free to use.

# ☕️ Tech Stack and Approaches

React, Redux, Tailwind, Simple-peer(WebRTC), Socket.io, NodeJS, Express, MongoDB Atlas, JWT Auth.

# 🕺 Want To Run Your Own HiWay Instance ?

Clone the repository and run 'prebuild' npm command to install node modules in client and both microservices.

All the commands need to be run from the HiWay repository.

> **_NOTE:_** Browsers do not allow any WebRTC connection until the connection is secure (over HTTPS); hence, SSL is required. To test the product locally, set the 'Insecure origins treated as secure' flag in Chrome. Follow this [stackoverflow](https://stackoverflow.com/questions/40696280/unsafely-treat-insecure-origin-as-secure-flag-is-not-working-on-chrome#:~:text=In%20Google%20Chrome%2C%20you%20simply,wish%20to%20treat%20as%20secure.) post for more info.

```bash
$ git clone https://github.com/Ashwin-Codes/HiWay.git
$ cd HiWay
$ npm run prebuild
```

## 🤖 Setting Up Client

Run this command to build the react frontend client.

```bash
$ npm run build
```

## 🤖 Setting Up Servers

There are two microservices, one for auth and another for socket.io and serving the client.

Set up .env file for both the servers by following the instructions present in 'dotenv-example.env' file in respective repos in server folder.

To run auth server :

```bash
$ npm run authServer
```

To run socket.io and client server :

```bash
$ npm run ioServer
```

# 💻 Develop

<br>

Feel free to submit pull requests for new feature or bug fixes.

To run react app via development server (react-scripts), run :

```bash
$ npm run client
```
