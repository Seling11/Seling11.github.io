# Lec.8 CMOS Logic Gates

> Source: `PPT/3/Lecture 3.2.1_Digital Blocks_Logic gates_2026.pdf`

这一讲从 transistor level 看 CMOS logic gates。重点是 inverter 的 noise margin/switching point、NAND/NOR 的 pull-up/pull-down 结构，以及 AOI/OAI 这类组合逻辑实现方式。

## 1. Non-clocked vs clocked digital circuits

数字电路可粗略分为：

- non-clocked：combinational logic gates；
- clocked：latches、flip-flops、registers、FSM、counters。

本讲关注 non-clocked logic gates。它们的输出只由当前输入组合决定，没有存储状态。

## 2. Noise margin

Noise margin 表示在不改变逻辑值的前提下，信号能容忍的最大噪声。

高电平 noise margin：

$$
NM_H=V_{OH}-V_{IH}
$$

低电平 noise margin：

$$
NM_L=V_{IL}-V_{OL}
$$

直觉：

- $V_{OH}$：输出 high 的最低保证值；
- $V_{IH}$：输入被识别为 high 的最低值；
- $V_{OL}$：输出 low 的最高保证值；
- $V_{IL}$：输入被识别为 low 的最高值。

Noise margin 越大，级联逻辑越抗干扰。

## 3. Switching point

CMOS inverter 的 switching point 定义为：

$$
V_{out}=V_{in}
$$

课件给出 switching point 与 NMOS/PMOS transconductance parameter 相关：

$$
V_{SP}=
\frac{\sqrt{\beta_n/\beta_p}V_{Tn}+V_{DD}-|V_{Tp}|}
{1+\sqrt{\beta_n/\beta_p}}
$$

设计上可以通过 NMOS/PMOS sizing 调整 switching point。若希望接近 $V_{DD}/2$，通常需要考虑 $\mu_n>\mu_p$，因此 PMOS 往往做得更宽。

## 4. Parasitics 与 switching delay

Inverter/gate 的速度受 parasitic capacitance 和 effective resistance 限制。输出节点上的 capacitance 来自：

- drain diffusion capacitance；
- gate capacitance of next stage；
- interconnect capacitance；
- layout parasitics。

一阶近似：

$$
t_p\approx 0.69R_{eq}C_L
$$

这和 Part 1 中 RC delay 的直觉一致：电阻越大、电容越大，switching 越慢。

## 5. CMOS NAND

![CMOS NAND gate](../PPT_extracted/assets/3__lecture_3_2_1_digital_blocks_logic_gates_2026/page_014.jpg)

2-input NAND：

- NMOS pull-down network：series，只有 A=B=1 时输出被拉低；
- PMOS pull-up network：parallel，只要 A 或 B 为 0，就能把输出拉高。

逻辑：

$$
Y=\overline{AB}
$$

NAND 常用，因为用 CMOS 实现简单，且任何 Boolean function 都可用 NAND 构成。

## 6. CMOS NOR

2-input NOR：

- NMOS pull-down network：parallel，只要 A 或 B 为 1，输出拉低；
- PMOS pull-up network：series，只有 A=B=0 时输出拉高。

逻辑：

$$
Y=\overline{A+B}
$$

多输入 NOR 的 PMOS series stack 会带来较大 resistance，速度可能比 NAND 差。因此实际 cell library 中 NAND 往往更受欢迎。

## 7. 多输入 gate 的 stack 问题

输入数量增加时，series transistor stack 会增加 effective resistance：

- NAND 的 pull-down stack 变长；
- NOR 的 pull-up stack 变长；
- delay 增加；
- sizing 更困难；
- internal nodes 产生额外 parasitics。

因此复杂逻辑不一定直接做成一个巨大 NAND/NOR，有时会拆成多级或使用 AOI/OAI cell。

## 8. AOI / OAI

AOI：AND-OR-Invert，例如先做 AND，再 OR，最后 invert。

OAI：OR-AND-Invert，例如先做 OR，再 AND，最后 invert。

它们适合直接把 Boolean expression 映射成 CMOS pull-down/pull-up network，减少 gate levels。

例：

$$
F(A,B,C)=\overline{A+BC}
$$

可以先从 NMOS pull-down network 表达使输出为 0 的条件，再用 PMOS 做 complementary network。

## 9. Digital layout 与项目

数字 layout 常见流程：

1. 用 behavioural VHDL 描述；
2. synthesis 得到 RTL/gate-level circuit；
3. 根据 NAND/NOR/flip-flop 等 standard cell layout 画物理版图；
4. 检查 parasitics、timing、DRC/LVS。

项目里不要只停留在 logic symbol。最终要知道每个 gate 对应 transistor network 和 layout cell。

## 10. 本讲必须带走的结论

- Noise margin 衡量数字信号抗噪能力。
- Switching point 可由 NMOS/PMOS strength ratio 调整。
- NAND：NMOS series、PMOS parallel。
- NOR：NMOS parallel、PMOS series。
- 多输入 stack 会增加 delay；复杂逻辑常用 AOI/OAI 或多级实现。
