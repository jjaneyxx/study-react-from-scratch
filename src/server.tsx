// server.tsx
import express from 'express';
import React from 'react';
// import { renderToString } from 'react-dom/server';
import render from './index.server';
const app = express();

app.get('/*', (req: any, res: any) => {  // 둘 다 any로 통일
  const reactApp = render(req.url);
  return res.send(
    `<html>
      <body>
        <div id="root햐"> ${reactApp}</div>
      </body>
    </html>`  
  );
});

app.listen(3000, () => {
  console.log('server is running');
});