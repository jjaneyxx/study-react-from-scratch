// This will be our main app file 
// -- Library ---
const React = {
    createElement: (...args) => {
        console.log(args); // Array ["div", null, "Hello JSX!"]
    }
};
// -- Application -- 
const App = (React.createElement("div", { draggable: true },
    React.createElement("h2", null, "Hello React"),
    React.createElement("p", null, "I am a paragraph"),
    React.createElement("input", { type: "text" })));
