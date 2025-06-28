// server.tsx
import express from 'express';
import React from 'react';
import render from './index.server';
import {readFileSync} from 'fs'; // 추가

const app = express();
const templateFile = './build/index.html';
const templateHTML = readFileSync(templateFile, 'utf-8');

/**
 * 역할 : index.html 없이 빌드 폴더를 제공
 * 빌드된 index.html > templateHTML 로 읽고 > 
 * 제공 전 templateHTML.replace("{{APP}}",reactApp); 으로 
 * {{App}} 를 실제 SSR 생성 컨텐츠로 교체
 */
app.use(express.static('./build', { index: false }));

app.get('/*', (req : any, res: any) => {
  const reactApp = render(req.url);
  const response = templateHTML.replace("{{APP}}",reactApp);
  return res.send(response);
});

app.listen(3000, () => {
  console.log('server is running');
});