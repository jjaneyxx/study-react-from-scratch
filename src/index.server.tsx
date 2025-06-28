// ./src/index.server.tsx
// ServerStylesheet 헬퍼

import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import App from './App';

export const sheet = new ServerStyleSheet();

export default function render(url: string) {
  return ReactDOMServer.renderToString(
    sheet.collectStyles(
      <React.StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </React.StrictMode>
    )
  );
}