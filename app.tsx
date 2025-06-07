// This will be our main app file 

// -- Library ---
const React = {
    createElement : (...args: any) => {
        console.log(args); // Array ["div", null, "Hello JSX!"]
    }
}; 

// -- Application -- 
const App = (
    <div draggable> 
        <h2>Hello React</h2>
        <p>I am a paragraph</p>
        <input type="text"/>
    </div>
)