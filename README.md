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

# Part 2 - State Management & Hooks 
![image](https://github.com/user-attachments/assets/5fd685d8-5f29-4f8a-8143-c03fa706b93d)
다 하고 보니.. main 브랜치에서 작업 중이였더라구요..
다시 브랜치 수정해서 올리겠습니다 !! 

## 소감
- useState Hook 이 내부적으로 동작하는 방식에 대해 생각해볼 수 있었습니다.
- 리액트에서 전역 상태 배열이 존재하고, useState( ) 호출이 상태 배열의 인덱스를 참조하므로, 각각 독립적인 상태를 가진다는 점이 가장 흥미로웠습니다.
- 마지막 5번에서 `if a condition skips a useState call between renders or a loop introduces more useState call than originally intended.` 이 부분은 잘 이해가 가지 않아서 스터디 이후 추가적으로 공부를 더 해보려 합니다.

# Part 3 - React Suspense & Concurrent Mode

## 소감
### React Suspense ↔ Next.js 의 Suspense 활용
이전 프로젝트에서 Next.js 의 서버 컴포넌트에서 Suspense 로 비동기 컴포넌트 (폼) 을 감싸 CSR bailout 빌드 에러 해결하기 위해 사용했습니다. 그래서 비동기 작업을 처리해주고, fallback UI 를 표시해주어 성능 최적화와 UX 경험을 올리기 위한 방법이라고만 이해했습니다. 
이번 기회를 통해, React.Suspense API 는 사용 환경 (브라우저/서버) 에 따라 동작 방식이 달라지는 API 라는 점을 배울 수 있었습니다. 

### Susepense 의 동작 원리
Suspense 의 동작 원리가, 
컴폰너트 렌더링 > Promise throw > 렌더링 중단 / 대기 > 다시 렌더링 시작이라는 점을 배웠습니다

```text
1. 컴포넌트가 렌더링 중 데이터가 필요함을 발견
2. 컴포넌트가 Promise 를 throw
3. 리액트가 이를 감지하고 렌더링을 중단
4. <Suspense fallback> 컴포넌트 표시
5. Promise 가 완료되면 처음부터 다시 렌더링
``` 

### 동시성 모드, Concurrent mode
이번에 동시성 모드를 처음 들어봤습니다 😅
- 리액트의 렌더링, 자바스크립트 싱글 스레드 모두 동기 작업이라, 작업 하나가 오래 걸리면 그 다음 작업을 할 수 없는 문제
- 예시 : 렌더링이 끝나기 이전에는, 사용자 인터렉션이 불가능 > UX 에 좋지 않음
- 해결 : 렌더링 엔진을 변경하고, 스케쥴러를 이용해 우선순위에 따라 급한 작업 먼저 처리

이 괒어을 구현한 게 동시성 모드라고 이해했습니다 ! 
- 이해 되지 않은 내용 : `ReactDOM.render를 통한 lagacy mode와 createRoot를 통한 concurrent mode를 선택할 수 있게 하였다.` 

# Part 4— Server Side Rendering and its Challenges
## 소감
ReactSSR 을 직접 구현해보면서 서버와 클라이언트 환경의 차이에 대해서 실감할 수 있었습니다. 
BrowserRouter 을 StaticRouter 로 교체하는 내용이나, .hydrateRoot(React18+) 를 이용해 직접 하이드레이션을 적용해보면서 리액트가 자동으로 처리해주는 부분이 많다는 걸 다시 한번 깨달았습니다. 
<br/>
또 이전까지 tailwind 만 사용했어서 styled-components 는 다소 생소했는데, 
서버에서 스타일을 추출하여 html 에 직접 포함시킬 수 있다는 점이 신기했습니다 ! 
<br/>
리액트의 하이드레이션 과정이 서버/클라이언트 사이 차이가 있다는 점이 제일 흥미로웠어서, 스터디가 끝나면 리액트 외 다른 라이브러리들은 어떻게 이 과정을 처리하는지 공부해보고 싶습니다 👨🏻‍💻
