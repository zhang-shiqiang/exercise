import React, { useState } from "react";
import "./App.css";

/**
 * 已知有一个远程加法
 * @param a
 * @param b
 * @returns
 */
async function addRemote(a: number, b: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));
  return a + b;
}

/**
 * 请实现本地的 add 方法，调用 addRemote，能最优的实现输入数字的加法。
 * @example
 * ```
 * add(5, 6).then(result => {
 *   console.log(result); // 11
 * });
 * add(1, 4, 3, 3, 5).then(result => {
 *   console.log(result); // 16
 * })
 * add(2, 3, 3, 3, 4, 1, 3, 3, 5).then(result => {
 *   console.log(result); // 27
 * })
 * ```
 */

/**
 * 循环当前输入的数组、并调用addRemote函数来进行远程加法计算。
 * 每次循环时、将上一次计算的结果作为第一个参数、当前数字作为第二个参数传递给addRemote函数。
 */
async function add(...inputs: number[]) {
  let sum = 0;
  for (let i = 0; i < inputs.length; i++) {
    sum = await addRemote(sum, inputs[i]);
  }
  return sum;
}

function App() {
  const [nums, setNums] = useState<number[]>([]);
  const [count, setCount] = useState(0);

  /**
   * input 框输入事件、并将获取到的值转成数组
   * @param value 输入的值
   */
  const handleInput = (value: string) => {
    const vals = value ? value.split(",").map((item) => Number(item)) : [];
    setNums(vals);
  };

  /**
   * 累加参数
   */
  const handleAdd = async () => {
    if (nums.length > 0) {
      const sum = await add(...nums);
      setCount(sum);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>请实现add 方法，当用户在输入框中输入多个数字(逗号隔开)后，</div>
        <div>点击相加按钮能显示最终结果</div>
      </header>
      <section className="App-content">
        <input
          type="text"
          placeholder="请输入要相加的数字（如1,3,4,5,6）"
          onChange={(e) => handleInput(e.target.value)}
        />
        <button onClick={handleAdd}>相加</button>
      </section>
      <section className="App-result">
        <p>
          相加结果是：<span>{count}</span>
        </p>
      </section>
    </div>
  );
}

export default App;
