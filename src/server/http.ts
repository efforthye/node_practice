import http from 'http';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) =>{
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.write('<h1>Node.js Server</h1>');
    res.end('<p>http module</p>');
}).listen(port, () =>{
    logger.info(`Server is running on port ${port}`);
});

server.on('listening', () =>{
    logger.info(`Server is running on port ${port}...`);
});
server.on('error', (error) =>{
    logger.error(`server error`, {error});
});

export {
    server
}