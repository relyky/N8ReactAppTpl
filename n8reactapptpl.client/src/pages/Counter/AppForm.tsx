import { useState } from "react";

export default function Counter_AppForm() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>Hello {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
