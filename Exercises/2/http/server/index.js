/* eslint-disable max-len */
/* eslint-disable no-tabs */

const http = require('http');
const url = require('url');
const port = process.env.PORT || 3031;
const data = require('../../data');
const controller = require('../../controller.js');
const totalNumOfTIckets = 10;

// const data = [{ id: 1, first_name: 'elad', last_name: 'itzhak', numOfTickets: 1 }, { id: 2, first_name: 'moshe', last_name: 'afya', numOfTickets: 1 }];

const server = http.createServer(controller);

server.listen(port, () => console.log(`listening on port ${port}`));
