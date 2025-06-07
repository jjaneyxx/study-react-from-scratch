// This will be our main app file 
// -- Library ---
const React = {
    createElement: (...args) => {
        console.log(args); // Array ["div", null, "Hello JSX!"]
    }
};
// -- Application -- 
const App = React.createElement("div", null, "Hello JSX!");
console.log('Hello world');
