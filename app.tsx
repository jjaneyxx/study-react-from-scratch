
// -- Library ---
// 1. React.createElement 정의 : JSX 를 분석해서 가상돔을 만듬
const React = {
    createElement : (tag, props, ...children) => {
        // tag 가 함수인 경우 > 함수 호출 > Virtual DOM 을 반환 받음 (App)
        if (typeof tag === 'function'){
            return tag(props, ...children);
        }
        // tag 가 문자열 (div, h1) 인 경우 단순한 Virtual DOM 객체 생성 (div, h1)
        const el = {
            tag,
            props,
            children
        }
        return el; 
    }
}; 

// 직접 useState 를 정의
const useState = (initialState) => {
    console.log('useState is initialized with value:', initialState); 
    let state = initialState; // 인자로 받은 값이 state 
    const setState = (newState) => {
        console.log('setState is called with newState value:', newState); 
        state = newState; 

        // Render the UI fresh given state has changed.
        reRender(); 
    }
    // 그리고 반환
    return [state, setState]; 
}

// 리렌더링
const reRender = () => {
    console.log('reRender-ing :)'); 
    const rootNode = document.getElementById('myapp');
    rootNode.innerHTML = '';
    //  simply calls the render fresh for the App
    render(<App />, document.getElementById('myapp')); 
}

// el : App 함수가 리턴하는 가상돔 트리 객체
const render = (el, container) => {

    // 1. DOM 요소 만들기
    let domEl = document.createElement(el.tag); 

    // 2. 속성 (props) 설정하기 (el.props)
    let elProps = el.props ? Object.keys(el.props) : null; 
    if (elProps && elProps.length > 0){
        elProps.forEach((prop) => (domEl[prop] = el.props[prop]))
    }

    // 3. 자식을 재귀적으로 처리 (el.children)
    if(el.children && el.children.length >0){
        el.children.forEach((node) => render(node, domEl)); 
    }

    // 4. 만든 실제 DOM 을 부모 (container) 에 붙이기
    container.appendChild(domEl); 
}

// ---- Application --- //
const App = () => {
    const [name, setName] = useState('Arindam'); 
    return (
    <div draggable>
        <h2>Hello {name}!</h2>
        <p>I am a paragraph</p>
        <input
        type="text"
        value={name}
        onchange={(e) => setName(e.target.value)}
        />
    </div>
    );
};
render(<App />, document.getElementById('myapp'));
