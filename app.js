// -- Library ---
// 1. React.createElement 정의 : JSX 를 분석해서 가상돔을 만듬
const React = {
    createElement: (tag, props, ...children) => {
        // tag 가 함수인 경우 > 함수 호출 > Virtual DOM 을 반환 받음 (App)
        if (typeof tag === 'function') {
            return tag(props, ...children);
        }
        // tag 가 문자열 (div, h1) 인 경우 단순한 Virtual DOM 객체 생성 (div, h1)
        const el = {
            tag,
            props,
            children
        };
        return el;
    }
};
let myAppState;
// 직접 useState 를 정의
const useState = (initialState) => {
    // Check before setting AppState to initialState (reRender)
    myAppState = myAppState || initialState;
    console.log('useState is initialized with value:', initialState);
    const setState = (newState) => {
        console.log('setState is called with newState value:', newState);
        // 수정
        myAppState = newState;
        // Render the UI fresh given state has changed.
        reRender();
    };
    // 그리고 반환 (수정)
    return [myAppState, setState];
};
// 리렌더링
const reRender = () => {
    console.log('reRender-ing :)');
    const rootNode = document.getElementById('myapp');
    rootNode.innerHTML = '';
    //  simply calls the render fresh for the App
    render(React.createElement(App, null), document.getElementById('myapp'));
};
// el : App 함수가 리턴하는 가상돔 트리 객체
const render = (el, container) => {
    // 1. DOM 요소 만들기
    let domEl = document.createElement(el.tag);
    // 2. 속성 (props) 설정하기 (el.props)
    let elProps = el.props ? Object.keys(el.props) : null;
    if (elProps && elProps.length > 0) {
        elProps.forEach((prop) => (domEl[prop] = el.props[prop]));
    }
    // 3. 자식을 재귀적으로 처리 (el.children)
    if (el.children && el.children.length > 0) {
        el.children.forEach((node) => render(node, domEl));
    }
    // 4. 만든 실제 DOM 을 부모 (container) 에 붙이기
    container.appendChild(domEl);
};
// 두 상태 - name, counter : 버튼 클릭 마다 증가/감소
// 
// ---- Application --- //
const App = () => {
    const [name, setName] = useState('Arindam');
    const [count, setCount] = useState(0);
    return (React.createElement("div", { draggable: true },
        React.createElement("h2", null,
            "Hello ",
            name,
            "!"),
        React.createElement("p", null, "I am a paragraph"),
        React.createElement("input", { type: "text", value: name, onchange: (e) => setName(e.target.value) }),
        React.createElement("h2", null,
            " Counter value: ",
            count),
        React.createElement("button", { onclick: () => setCount(count + 1) }, "+1"),
        React.createElement("button", { onclick: () => setCount(count - 1) }, "-1")));
};
render(React.createElement(App, null), document.getElementById('myapp'));
