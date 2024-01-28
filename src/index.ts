import fs from 'fs/promises';
import http from 'http';
import dotenv from 'dotenv';
import { logger } from './utils/logger';

dotenv.config();

const port = process.env.PORT || 3000;
const projectRoot = process.cwd();
logger.info(`Root path is ${projectRoot}`);

// const server = http.createServer((req, res) =>{
//     res.writeHead(200, {
//         'Content-Type': 'text/html; charset=utf-8'
//     });
//     res.write('<h1>Node.js Server</h1>');
//     res.end('<p>http module</p>');
// }).listen(port, () =>{
//     logger.info(`Server is running on port ${port}`);
// });

const server = http.createServer(async (req, res) =>{
    // console.log({req, res});
    try {
        const f = await fs.readFile(`${projectRoot}/src/server/fs.html`);
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end(f);
    } catch (error: any) {
        logger.error('Server create error', {error});
        res.writeHead(500, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        const message = error?.message ?? 'Server create error.';
        res.end(message);
    }
}).listen(port, () =>{
    logger.info(`File system server is running on port ${port}`);
});

server.on('listening', () =>{
    logger.info(`Server is listening on port ${port}...`);
});
server.on('error', (error) =>{
    logger.error(`Server error`, {error});
});


export {
    server
}