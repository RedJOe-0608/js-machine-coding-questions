let stateArray = [];
let statePointer = 0;

function useState(initialValue) {
  const currentIndex = statePointer;

  if (stateArray[currentIndex] === undefined) {
    stateArray[currentIndex] = initialValue;
  }

  function setState(newValue) {
    stateArray[currentIndex] = newValue;
    render(); // simulate re-render
  }

  const value = stateArray[currentIndex];
  statePointer++; // move cursor
  return [value, setState];
}

// ----- Simulated render function -----
function render() {
  statePointer = 0; // reset cursor before render
  App();            // re-run component logic
}

// ----- Component simulation -----
function App() {

  const [count, setCount] = useState(0);
  const [name, setName] = useState("Jyothi");

  console.log("Render -> count:", count, "name:", name);
  
//  setCount(count + 1); // this triggers an infinite loop!


  return { setCount, setName }; // return setters so we can call them later
}

// first render
let { setCount, setName } = App();

// simulate updating state
console.log("\n--- Updating count to 5 ---");
setCount(5); // triggers render

console.log("\n--- Updating name to Swaroop ---");
setName("Swaroop"); // triggers render