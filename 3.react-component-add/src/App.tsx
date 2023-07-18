import React, { useState } from "react";
import "./index.css";

async function increaseRemote(a: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1e3));
  return a + 1;
}

/**
 * 实现一个加法计数器功能，加法的计算是在服务端完成，这里由 increaseRemote 进行模拟，要求实现的功能有：
 * 1. 点击 +1 按钮数值自增 1，点击 +2 按钮数值自增 2；
 * 2. 由于是异步相加，自增过程中需要将 button 置为 disabled 状态，不可响应点击；
 */
function App() {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  /**
   * 自增按钮
   * @param num 当前点击的数量 1/2
   */
  const handleIncrement = async (num: number) => {
    setDisabled(true);
    const result = await increaseRemote(num);
    setCount((prevCount: number) => prevCount + (result - 1)); // 由于在 increaseRemote 方法中每次添加了1，所以需要在自增的时候 -1
    setDisabled(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>加法计数器</div>
      </header>
      <section className="App-content">
        <button onClick={() => handleIncrement(1)} disabled={disabled}>
          +1
        </button>
        <button onClick={() => handleIncrement(2)} disabled={disabled}>
          +2
        </button>
        <p>数值：{count}</p>
      </section>
    </div>
  );
}

export default App;
