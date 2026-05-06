import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Simple route to check server health
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Video streaming route for Big Muzzy
  app.get('/api/video', (req, res) => {
    // Try multiple paths: absolute, relative, and current directory
    const pathsToTry = [
      '/home/aistudio/data/big_muzzy_ep1.mp4', // Specified path
      path.join(process.cwd(), 'big_muzzy_ep1.mp4'), // Project root
      path.join(process.cwd(), 'data', 'big_muzzy_ep1.mp4'), // Data folder in root
    ];
    
    let videoPath = '';
    for (const p of pathsToTry) {
      if (fs.existsSync(p)) {
        videoPath = p;
        break;
      }
    }
    
    if (!videoPath) {
      res.status(404).send('Video file not found. Paths tried: ' + pathsToTry.join(', '));
      return;
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
