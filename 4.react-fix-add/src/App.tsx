import React, { useRef, useState, useCallback } from "react";
import "./index.css";

async function increaseRemote(a: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1e3));
  return a + 1;
}

/**
 * 下面是一个用 React 写的异步相加计数器 Demo，要求实现的功能为：
 * 1. 点击 +1 按钮数值自增 1，点击 +2 按钮数值自增 2；
 * 2. 由于是异步相加，自增过程中需要将 button 置为 disabled 状态，不可响应点击；
 *
 * 请找出下面代码的实现问题并改正。
 * 1、useRef可以改变状态、但是它不会触发组件的重新渲染。可以使用 useState
 * 2、调用两次实际上也不会执行两次自增、可以通过传参来解决点1的时候传1，点2 的时候传2
 * 3、在已知increaseRemote 中每次都会 + 1的时候、所以在赋值时固定-掉咯1
 */
function App() {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  /**
   * 自增函数
   * num 自增数字 1/2
   */
  const increase = useCallback(async (num: number) => {
    setDisabled(true);
    const data = await increaseRemote(num);
    setCount((prevCount: number) => prevCount + (data - 1));
    setDisabled(false);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>请按照题目要求，修正以下程序</div>
      </header>
      <section className="App-content">
        <button disabled={disabled} onClick={() => increase(1)}>
          +1
        </button>
        <button disabled={disabled} onClick={() => increase(2)}>
          +2
        </button>
        <p>数值：{count}</p>
      </section>
    </div>
  );
}

export default App;
