const multilevel = require('multilevel');
const db = multilevel.client();

module.exports.db = db;
Object.keys(db.methods).forEach(function expose(key) {
  module.exports[key] = db[key];
});

const net = require('net');
const conn = net.connect({
  port: Number(process.env.DATABASE_PORT_3000_TCP_PORT),
  host: process.env.DATABASE_PORT_3000_TCP_ADDR
});

conn.pipe(db.createRpcStream()).pipe(conn);
