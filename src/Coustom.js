// Coustom.js
import { useState } from "react";
import { counterLogic } from "./Coustom2";

const Coustom = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => counterLogic(prev, "increment"));
  };

  const handleDecrement = () => {
    setCount((prev) => counterLogic(prev, "decrement"));
  };

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </>
  );
};

export default Coustom;

