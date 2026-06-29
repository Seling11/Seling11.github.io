# Lec.10 Latches and Flip-Flops

> Source: `PPT/3/Lecture 3.2.2_Digital Blocks_Flip-flops_2026.pdf`

Sequential logic 和 combinational logic 的根本区别是 **state**。Latch 和 flip-flop 都能存 1 bit，但 latch 是 level-sensitive，flip-flop 是 edge-triggered。

## 1. Sequential logic 的类型

常见 sequential logic circuits：

- counters；
- FSM；
- registers。

它们都依赖 flip-flop/latch 保存状态。

## 2. Latch vs flip-flop

| Device | 触发方式 | 行为 |
|---|---|---|
| Latch | level-sensitive | clock 有效电平期间，输入可传到输出 |
| Flip-flop | edge-triggered | 只在 clock transition 附近更新输出 |

Latch 更基础，flip-flop 通常由两个 latch 或 transmission-gate storage structures 构成。

## 3. Transmission gate delay

Transmission gate 由 NMOS 和 PMOS 并联构成。传播延迟可近似为：

$$
t_{PLH}=t_{PHL}=0.7(R_n\parallel R_p)C_{Load}
$$

它比单 NMOS/PMOS pass gate 更适合 full-swing signal transmission。

## 4. Cross-coupled inverter storage

最基本的 1-bit storage 可以由两个 cross-coupled inverters 构成。它有两个稳定状态：

- Q = 1，$\overline{Q}=0$；
- Q = 0，$\overline{Q}=1$。

问题是：如果没有受控输入开关，新输入值可能和已存值冲突。

## 5. Clocked latch

在输入端加入 clock-controlled gate，就能控制什么时候 load 新值：

- clock active：输入 D 通过 gate 进入 storage node；
- clock inactive：输入隔离，cross-coupled inverters 保持状态。

使用 transmission gate 可以同时强传 0 和 1，避免单 pass gate 的 degraded logic level。

## 6. Improved D-latch

改进 D-latch 通常使用两个互补 transmission gates：

- load path：clock active 时打开；
- feedback path：clock inactive 时打开。

这样 loading 和 storing 两个状态不会互相打架。结构上就是：

- 输入路径接入新数据；
- feedback path 维持旧数据；
- 两条路径由互补 clock 控制。

## 7. D flip-flop

![D flip-flop](../PPT_extracted/assets/3__lecture_3_2_2_digital_blocks_flip_flops_2026/page_019.jpg)

D flip-flop 可以用 master-slave latch 思想实现：

- master latch 在一个 clock phase 采样 D；
- slave latch 在相反 phase 更新 Q；
- 输出只在 clock edge 附近变化。

它解决了 latch 的透明窗口问题，让同步电路以 edge 为状态更新边界。

## 8. Setup time 与 hold time

为了正确采样输入，D 必须在 clock edge 周围保持稳定。

- setup time $t_s$：clock edge 之前，D 必须提前稳定的时间；
- hold time $t_h$：clock edge 之后，D 必须继续保持的时间。

若违反：

- 可能采样错误；
- 可能进入 metastability；
- downstream logic 得到不可预测状态。

## 9. Asynchronous set/clear

D flip-flop 可加入 asynchronous inputs：

- clear/reset：不等 clock，直接把 Q 置 0；
- set：不等 clock，直接把 Q 置 1。

这类信号优先级高，但 layout 和时序设计要谨慎，避免 reset release 造成 timing 问题。

## 10. 本讲必须带走的结论

- Latch 是 level-sensitive，flip-flop 是 edge-triggered。
- Cross-coupled inverters 可以存 1 bit。
- Transmission gate 适合构成 latch/flip-flop 的受控传输路径。
- D flip-flop 常由 master-slave latch 结构实现。
- Setup/hold time 是同步设计能否可靠工作的关键。
