#!/usr/bin/env node

/**
 * Lovable URL Generator - MCP Server
 * Provides a tool that OpenClaw can call to generate Lovable.dev build URLs
 * from text prompts. Handles URL encoding properly.
 * 
 * Install: npm install @modelcontextprotocol/sdk
 * Run: node mcp-server.js
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
    {
        name: 'lovable-url-generator',
        version: '1.0.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'generate_lovable_url',
                description:
                    'Generate a Lovable.dev build URL from a text prompt. Takes a natural language app description and returns a clickable URL that auto-creates the app on Lovable.dev. Use this whenever a user asks to build, create, or make any website, web app, landing page, dashboard, or store.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        prompt: {
                            type: 'string',
                            description:
                                'The app description prompt to send to Lovable.dev. Should describe the app type, design theme, pages, features, and tech stack.',
                        },
                    },
                    required: ['prompt'],
                },
            },
        ],
    };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === 'generate_lovable_url') {
        const { prompt } = request.params.arguments;

        if (!prompt || typeof prompt !== 'string') {
            return {
                content: [
                    {
                        type: 'text',
                        text: 'Error: Please provide a prompt string.',
                    },
                ],
            };
        }

        const encodedPrompt = encodeURIComponent(prompt.trim());
        const url = `https://lovable.dev/?autosubmit=true#prompt=${encodedPrompt}`;

        return {
            content: [
                {
                    type: 'text',
                    text: url,
                },
            ],
        };
    }

    return {
        content: [
            {
                type: 'text',
                text: `Unknown tool: ${request.params.name}`,
            },
        ],
    };
});

// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Lovable URL Generator MCP server running on stdio');
}

main().catch(console.error);
