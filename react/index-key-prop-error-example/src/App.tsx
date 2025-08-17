import { useState } from "react";


/* 
This is a PERFRCT example for when we use array index as keys while mapping over lists. React reuses the same component instances for different items, leading to incorrect state and props being passed to components.
*/
function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Buy milk" },
    { id: 2, text: "Do laundry" },
    { id: 3, text: "Clean room" },
  ]);

  return (
    <div>
      <button onClick={() => setTodos([{ id: 0, text: "New Task" }, ...todos])}>
        Add at top
      </button>

      {todos.map((todo, index) => (
        // ❌ WRONG: using index as key
        <TodoItem key={index} text={todo.text} />
      ))}
    </div>
  );
}

function TodoItem({ text }: {text: any}) {
  const [done, setDone] = useState(false);

  return (
    <div>
      <input
        type="checkbox"
        checked={done}
        onChange={() => setDone(!done)}
      />
      {text}
    </div>
  );
}


export default App;

/* 
How React handles props during reconciliation

Fiber reuse condition

If type + key match → React reuses the fiber.

pendingProps vs memoizedProps

Each fiber stores:

memoizedProps: the props used in the last committed render.

pendingProps: the props from the new virtual DOM element.

During reconciliation, React always writes the new element’s props into pendingProps.

If pendingProps !== memoizedProps, React schedules an update (calls the component function again).

If they’re equal, React can bail out (skip calling the function).

So does it “always” update props?

Not exactly. React always compares the new props with the old ones.

If they differ → React updates (your text changes).

If they’re identical → React skips re-render for that component (this is the “bailout” optimization).
*/