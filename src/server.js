"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.tsx
const express_1 = __importDefault(require("express"));
const react_1 = __importDefault(require("react"));
const server_1 = require("react-dom/server");
const app = (0, express_1.default)();
app.get('/*', (req, res) => {
    const reactApp = (0, server_1.renderToString)(react_1.default.createElement("h1", null, "Hello from the Server"));
    return res.send(`<html>
      <body>
        <div id="root"> ${reactApp}</div>
      </body>
    </html>`);
});
app.listen(3000, () => {
    console.log('server is running');
});
