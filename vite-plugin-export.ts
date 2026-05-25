import type { Plugin } from 'vite';
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)));

export function exportVideoPlugin(): Plugin {
  return {
    name: 'export-video',
    configureServer(server) {
      server.middlewares.use('/api/export', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (c) => chunks.push(c));
        req.on('end', () => {
          try {
            const body = Buffer.concat(chunks).toString('utf8');
            const outDir = join(root, 'out');
            mkdirSync(outDir, { recursive: true });
            writeFileSync(join(outDir, 'props.json'), body);

            const outputPath = join(outDir, 'video.mp4');
            const proc = spawn(
              'npx',
              [
                'remotion',
                'render',
                'ConversationVideo',
                outputPath,
                '--props=out/props.json',
              ],
              { cwd: root, stdio: 'pipe', shell: true },
            );

            let stderr = '';
            proc.stderr?.on('data', (d) => {
              stderr += d.toString();
            });

            proc.on('close', (code) => {
              if (code !== 0 || !existsSync(outputPath)) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    error: stderr.slice(-500) || 'Render failed',
                  }),
                );
                return;
              }
              const video = readFileSync(outputPath);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'video/mp4');
              res.setHeader(
                'Content-Disposition',
                'attachment; filename="imessage-animation.mp4"',
              );
              res.end(video);
            });
          } catch (e) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error: e instanceof Error ? e.message : 'Export failed',
              }),
            );
          }
        });
      });
    },
  };
}
