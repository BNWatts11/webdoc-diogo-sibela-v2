import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = '/Users/bernardowatts/Desktop/Tese-Prototipo/reference';
const PORT = Number(process.env.PORT) || 4173;

const types = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.json': 'application/json',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png'
};

http
	.createServer(async (req, res) => {
		let reqPath = decodeURIComponent(req.url.split('?')[0]);
		if (reqPath === '/') reqPath = '/index.html';
		const filePath = path.join(ROOT, reqPath);
		if (!filePath.startsWith(ROOT)) {
			res.writeHead(403);
			res.end('Forbidden');
			return;
		}
		try {
			const data = await readFile(filePath);
			const ext = path.extname(filePath);
			res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
			res.end(data);
		} catch {
			res.writeHead(404);
			res.end('Not found');
		}
	})
	.listen(PORT, () => {
		console.log(`reference server on http://localhost:${PORT}`);
	});
