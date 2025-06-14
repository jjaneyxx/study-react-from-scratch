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

## Lesson Learned 
리액트를 처음부터 구현해보면서, React.createElement( ) 와 render( ) 함수 각각의 역할에 대해 생각해볼 수 있었다. 그 동안 사용했던 리액트를 밑바닥부터 구현해보며, 두루뭉실하게 알고 있던 개념들이 잡히게 되어서 의미있었다.

# State Management & Hooks 
![image](https://github.com/user-attachments/assets/5fd685d8-5f29-4f8a-8143-c03fa706b93d)
다 하고 보니.. main 브랜에서 작업 중이였더라구요 .. 
다시 브랜치 수정해서 올리겠습니다 !! 

## 소감
- useState Hook 이 내부적으로 동작하는 방식에 대해 생각해볼 수 있었습니다.
- 리액트에서 전역 상태 배열이 존재하고, useState( ) 호출이 상태 배열의 인덱스를 참조하므로, 각각 독립적인 상태를 가진다는 점이 가장 흥미로웠습니다.
- 마지막 5번에서 `if a condition skips a useState call between renders or a loop introduces more useState call than originally intended.` 이 부분은 잘 이해가 가지 않아서 스터디 이후 추가적으로 공부를 더 해봐야 할 것 같습니다 !
   - _루프가 원래 의도한 것보다 많은 호출을 도입하는 경우 해당 상태를 가리키는 모든 커서 포인터가 엉망이 됩니다_

### 노션 링크
https://www.notion.so/jjanie-study/2-State-Management-Hooks-2086d4bfccab800fae74e593c76a1d47?source=copy_link

   
