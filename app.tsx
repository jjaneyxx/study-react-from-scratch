// This will be our main app file 

// -- Library ---
const React = {
    createElement : (...args: any) => {
        console.log(args); // Array ["div", null, "Hello JSX!"]
    }
}; 

// -- Application -- 
const App = <div>Hello JSX!</div>
console.log('Hello world'); 