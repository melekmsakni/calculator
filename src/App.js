import { useState } from "react";
import "./style.css";
function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(calc.slice(-1)) && ops.includes(value))
    ) {
      return;
    }
    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const deletAll = () => {
    setCalc("");
    setResult("");
  };

  const resultBtn = () => {
    setCalc(result);
  };

  const numbers = () => {
    let l = [];
    for (let i = 1; i < 10; i++) {
      l.push(
        <button key={i} onClick={() => updateCalc(i.toString())}>
          {i}
        </button>
      );
    }
    return l;
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="display">
          {result ? <span>{result}</span> : ""} {calc || "0"}
        </div>

        <div className="operation">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={() => deletAll()}>DEL</button>
        </div>

        <div className="digits">
          {numbers()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={resultBtn}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
