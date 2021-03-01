/* eslint-disable @typescript-eslint/no-explicit-any */
import 'module-alias/register';
import express from 'express';
import bodyParser from 'body-parser';
import Speechify from './speechify';
import fetch from 'node-fetch';

import cors from 'cors';
import { Server, Socket } from 'socket.io';

const app = express();

if (!(globalThis as any).fetch) {
  (globalThis as any).fetch = fetch;
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port: number = Number(process.env.PORT) || 8050;

const server = app.listen(port);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const speechify = new Speechify();

app.post('/api/addToQueue', (req, res) => {
  const success = speechify.addToQueue(req.body.id, req.body.data);
  res.send({ success });
});

app.get('/api/getNextChunk', (req, res) => {
  res.send({ ...speechify.getNextChunk() });
});

io.on('connection', (socket: Socket) => {
  speechify.addObserver({ id: socket.id, signal: () => socket.emit('onEnqueue') });

  socket.on('disconnect', () => speechify.removeObserver(socket.id));
})

console.log(`App listening on ${port}`);
