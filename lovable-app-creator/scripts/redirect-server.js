#!/usr/bin/env node

/**
 * Lovable Redirect Server
 * Runs on the forge server. Takes a plain text prompt via query parameter,
 * URL-encodes it, and redirects to lovable.dev with autosubmit.
 * 
 * Usage: node redirect-server.js
 * Then visit: http://localhost:3456/build?prompt=Build a dark portfolio
 * It redirects to: https://lovable.dev/?autosubmit=true#prompt=Build%20a%20dark%20portfolio
 */

const http = require('http');
const url = require('url');

const PORT = 3456;

const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);

    if (parsed.pathname === '/build' && parsed.query.prompt) {
        const prompt = parsed.query.prompt;
        const encoded = encodeURIComponent(prompt);
        const lovableUrl = `https://lovable.dev/?autosubmit=true#prompt=${encoded}`;

        res.writeHead(302, { Location: lovableUrl });
        res.end();
        console.log(`[${new Date().toISOString()}] Redirected: ${prompt.substring(0, 50)}...`);
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Lovable Redirect Server</h1>
            <p>Usage: /build?prompt=Your app description here</p>
            <p>Example: <a href="/build?prompt=Build a dark portfolio for a photographer">/build?prompt=Build a dark portfolio for a photographer</a></p>
        `);
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Lovable redirect server running on http://0.0.0.0:${PORT}`);
    console.log(`Test: http://localhost:${PORT}/build?prompt=Build a dark portfolio`);
});
