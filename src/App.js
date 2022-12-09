import { useState } from "react";
import { FiDelete } from "react-icons/fi";
import "./style.css";
function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const ops = ["/", "*", "+", "."];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(calc.slice(-1)) && ops.includes(value)) ||
      (ops.includes(value) && calc.slice(-1) === "-") ||
      (calc.slice(-1) === "-" && value === "-")
    ) {
      return;
    }
    
    setCalc(calc + value);
    console.log("after" + calc);
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
  const deleteChar = () => {
    setCalc(calc.slice(0, -1));

    let lastChar = calc.length - 1;

    if (calc.length <= 1) {
      setResult("");
      return;
    }
    ops.includes(calc[lastChar - 1])
      ? setResult(eval(calc.slice(0, lastChar - 1)).toString())
      : setResult(eval(calc.slice(0, lastChar)).toString());
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
          <button
            onClick={() => deletAll()}
            style={{ backgroundColor: "#b32755" }}
          >
            DEL
          </button>
          <button onClick={() => deleteChar()}>
            <FiDelete />
          </button>
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
