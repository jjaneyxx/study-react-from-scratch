# Part 1 — VirtualDOM and Renderer
1. `npx tsx -init`: tsx (typescript 컴파일러) 가 tsconfig.json (초기 설정 파일) 생성
2. tsconfig.json 수정
   ```ts
   "jsx" : "react", // 기존 (preserve)
   "strict" : false,
   ```
   - preserve 옵션을 그대로 두면, JSX 문법을 자바스크립트로 변환하지 않고 그대로 둔다. 
실제 리액트 프로젝트에서는 Babel 이 처리
    - react 옵션 : tsc 가 JSX 를 브라우저에서 실행 가능한 자바스크립트로 컴파일
      - JSX 를 React.createElement(..) 형태로 변환
3. 프로젝트 실행 명령어
   - npx serve . : 웹 서버를 연는 역할
   - npm run dev : JSX 를 컴파일하고, app.tsx 를 감시하는 역할
     - 내부적으로 package.json 의 tsx -w 명령어를 실행해서, app.tsx 를 app.js 로 변환

## 브라우저 - 서버의 통신 구조
> serve 는 택배 기사, 실제 실행은 브라우저가 담당한다.

1. 사용자가 [http://localhost:3000](http://localhost:3000/) 접속
    - *http://localhost:3000에 접속하는 순간 = 브라우저가 서버에 index.html을 요청하는 순간*
2. 브라우저: index.html 을 서버에 요청
3. serve : index.html 을 찾아서 응답
4. 브라우저: index.html 을 한줄씩 읽다가, <script> 를 만나면 서버에 app.js 를 요청
5. serve: app.js 를 전달
6. 브라우저: app.js 를 실행해서 화면을 구성

```ts
// app.js
// This will be our main app file 
// -- Library ---
const React = {};
// -- Application -- 
// React reference 를 찾아서 에러가 사라짐
const App = React.createElement("div", null, "Hello JSX!");
console.log('Hello world');
```

React 는 현재 빈 객체이므로, React.createElement( ) 함수를 호출하려 하면, 에러가 난다. 
따라서 React 안에 createElement 함수를 직접 정의했다.
- React.createElemnt( ) 역할: 가상돔 트리 객체를 반환

## DOM 
- 브라우저가 이해하고 렌더링할 수 있도록 명시된 HTML 문서 구조
- 리액트는 Virtual DOM 환경에서 동작하고, 그 결과물을 웹에서는 ReactDOM Renderer 에 전달
- Rederer 는 이를 실제 웹 페이지 화면에 렌더링 (이 때 화면에 보이게 된다)

## ReactElement 와 ReactComponent

## 이해한 React 의 전반적인 동작 원리


   
