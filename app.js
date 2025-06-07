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
// el : App 함수가 리턴하는 가상돔 트리 객체
// render 함수 목적. 가상DOM 객체(el) 을 받아서 실제 DOM 요소를 만들고, 컨테이너 안에 붙이기
const render = (el, container) => {
    console.log(el); // 가상돔 트리 객체
    // 1. DOM 요소 만들기
    // el.tag = 'div' > domEl = <div></div>
    let domEl = document.createElement(el.tag);
    // 2. 속성 (props) 설정하기 (el.props)
    // 우리가 만든 가상돔에 props 가 있으면 실제 DOM 요소에 그 속성을 그대로 복사하기
    // 예) {draggable : true} 
    let elProps = el.props ? Object.keys(el.props) : null;
    if (elProps && elProps.length > 0) {
        elProps.forEach((prop) => (domEl[prop] = el.props[prop]));
    }
    // 3. 자식을 재귀적으로 처리 (el.children)
    // 예) <div> 안에 <h2>, <p> 가 있는 경우 
    // el.children 이 있으면, 자식 요소도 render( ) 를 호출해서 처리
    if (el.children && el.children.length > 0) {
        el.children.forEach((node) => render(node, domEl));
    }
    // 4. 만든 실제 DOM 을 부모 (container) 에 붙이기
    // 여기가 DOM 이 브라우저에 실제로 보여지는 순간 
    container.appendChild(domEl);
};
// ---- Application --- //
const App = () => {
    const myName = 'Arindam';
    return (React.createElement("div", { draggable: true },
        React.createElement("h2", null,
            "Hello ",
            myName,
            "!"),
        React.createElement("p", null, "I am a pargraph"),
        React.createElement("input", { type: "text" })));
};
render(React.createElement(App, null), document.getElementById('myapp'));
