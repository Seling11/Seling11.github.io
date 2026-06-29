# Part 4 考点版：Exam Preparation

> 对应新款 grouped notes：Lecture 4.1 到 Lecture 4.2。  
> Part 4 不是新知识点，而是把 Part 1-3 变成能直接写在卷子上的答题模板。

## 1. 试卷结构

2022-2025 的结构很稳定：

| 部分 | 常见内容 |
|---|---|
| Q1 | analog / mixed-signal / signal conditioning / Schmitt / layout / ADC |
| Q2 | VHDL / CMOS logic / AOI-OAI / switching point / sizing |

考前优先级：

1. Schmitt trigger 设计；
2. VHDL entity / architecture / structural-to-dataflow；
3. CMOS switching point 和 sizing；
4. AOI/OAI Boolean transformation；
5. layout reliability；
6. mixed-signal design flow；
7. ADC，尤其 Flash vs Pipeline。

## 2. 模板 A：Schmitt trigger 设计

适用：题目给 output swing 和 desired thresholds。

步骤：

1. 说明 Schmitt trigger 是 comparator + positive feedback。
2. 定义：

$$
UTP,\quad LTP,\quad V_H=UTP-LTP
$$

3. 写阈值关系：

$$
V_T=\alpha V_{out}+(1-\alpha)V_{REF}
$$

4. 求：

$$
\alpha=\frac{UTP-LTP}{V_{OH}-V_{OL}}
$$

$$
V_{REF}=\frac{UTP-\alpha V_{OH}}{1-\alpha}
$$

5. 选 resistor ratio。
6. 画 comparator/op-amp，注意 positive feedback。
7. 解释 hysteresis 为什么抗噪声。

必须出现的词：

- positive feedback；
- two thresholds；
- hysteresis window；
- noisy input；
- false triggering。

## 3. 模板 B：VHDL entity 和 port

题目给：

```vhdl
entity example is
  port (
    A : in  STD_LOGIC;
    B : in  STD_LOGIC;
    F : out STD_LOGIC
  );
end example;
```

你写：

| Port | Mode | Type |
|---|---|---|
| A | in | STD_LOGIC |
| B | in | STD_LOGIC |
| F | out | STD_LOGIC |

如果让写 entity：

```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity circuit_name is
  port (
    A : in  STD_LOGIC;
    B : in  STD_LOGIC;
    F : out STD_LOGIC
  );
end circuit_name;
```

## 4. 模板 C：Structural VHDL 转 dataflow

步骤：

1. 找 primary inputs / outputs；
2. 找 internal signals；
3. 每个 component instance 写一个 equation；
4. 逐层代入；
5. 如果题目要画图，保留原 gate structure。

例子：

```vhdl
U0 : INV  port map (I => C, O => n_c);
U1 : AND2 port map (I0 => A, I1 => C, O => s1);
U2 : AND2 port map (I0 => n_c, I1 => B, O => s2);
U3 : OR2  port map (I0 => s1, I1 => s2, O => F);
```

得到：

$$
n_c=\bar C,\quad s_1=AC,\quad s_2=\bar C B
$$

$$
F=AC+\bar C B
$$

Dataflow：

```vhdl
architecture Dataflow of example is
begin
  F <= (A and C) or ((not C) and B);
end Dataflow;
```

## 5. 模板 D：CMOS switching point

步骤：

1. 写定义：

$$
V_{in}=V_{out}=V_{SP}
$$

2. 写电流相等：

$$
I_{pull-down}=I_{pull-up}
$$

3. 判断 effective beta：

| Gate | $\beta_{n,eq}$ | $\beta_{p,eq}$ |
|---|---|---|
| Inverter | $\beta_n$ | $\beta_p$ |
| NAND2 | $\beta_n/2$ | $2\beta_p$ |
| NOR2 | $2\beta_n$ | $\beta_p/2$ |

4. 套公式：

$$
V_{SP}=
\frac{\sqrt{\beta_{n,eq}/\beta_{p,eq}}V_{Tn}+V_{DD}-|V_{Tp}|}
{1+\sqrt{\beta_{n,eq}/\beta_{p,eq}}}
$$

5. 如果题目要求 sizing：

$$
\beta=k'\frac{W}{L}
$$

必须写清楚：

- assume inputs switch together；
- series transistors weaken a network；
- parallel transistors strengthen a network；
- switching point occurs when pull-up and pull-down currents are equal。

## 6. 模板 E：AOI/OAI

自然形式：

$$
AOI:\quad Y=\overline{AB+CD}
$$

$$
OAI:\quad Y=\overline{(A+B)(C+D)}
$$

做题步骤：

1. 写目标函数；
2. 写 AOI/OAI natural form；
3. 用 De Morgan 转换；
4. 标明是否需要 input inverter 或 output inverter；
5. 说明和 NAND-only implementation 的比较。

比较模板：

```text
AOI/OAI can reduce the number of logic stages and often uses fewer transistors,
so delay and area may be smaller. However, complex gates may have longer transistor
stacks and larger effective resistance. NAND-only implementation is more regular
and easier to map with standard cells, but may require more stages.
```

## 7. 模板 F：Mixed-signal design flow

直接写这条线：

```text
Specification
-> architecture / partition
-> block datasheets
-> schematic / RTL design
-> pre-layout simulation
-> layout / synthesis / place-and-route
-> DRC / LVS / extraction
-> post-layout simulation
-> fabrication
-> testing
```

再解释：

- analog 和 digital flow 不一样；
- interface blocks 负责 continuous/discrete domain 之间的连接；
- block datasheet 定义 I/O、gain、power、speed、load；
- layout 后有 parasitics，所以要 post-layout simulation。

## 8. 模板 G：layout short answers

### Layout 是什么

```text
Layout is the physical mask geometry of the integrated circuit. It defines
diffusion, well, poly, contact, via and metal layers. The foundry manufactures
geometry rather than schematic symbols, so layout determines device dimensions,
connectivity, parasitics, matching and reliability.
```

### Latch-up

```text
Latch-up is caused by parasitic PNP and NPN transistors in the CMOS well/substrate
forming an SCR-like positive feedback path. Once triggered, it creates a low
resistance path from VDD to ground. It can be reduced by well/substrate taps,
guard rings, spacing rules, low-resistance substrate connections and proper ESD
layout.
```

### Antenna effect

```text
The antenna effect occurs during fabrication when a long metal or poly wire
connected to a MOS gate collects charge. If the metal-to-gate area ratio is too
large, the gate oxide may be damaged. Mitigation includes antenna diodes, metal
jumpers, splitting long routes and symmetric protection for matched devices.
```

## 9. 模板 H：ADC

### Sampling / Nyquist / Aliasing

```text
Sampling measures an analog signal at discrete time intervals. According to the
Nyquist theorem, the sampling frequency must be at least twice the highest input
frequency. If the signal is undersampled, high-frequency components appear as
false lower-frequency components; this is aliasing. An anti-aliasing low-pass
filter is therefore used before the ADC.
```

### Quantization

```text
Quantization maps a continuous amplitude to one of a finite number of levels.
An n-bit ADC has 2^n levels. The LSB is the input range divided by 2^n, and
finite step size creates quantization error.
```

### Flash vs Pipeline

```text
Flash ADC uses 2^N-1 parallel comparators and is extremely fast, but power and
area grow rapidly, so resolution is limited. Pipeline ADC divides conversion into
stages. Each stage performs a low-resolution conversion, subtracts the result
with a sub-DAC, amplifies the residue and passes it on. Pipeline ADC has high
throughput and better practical resolution, but it has pipeline latency and
requires accurate residue processing.
```

## 10. 常见失分点

| 失分点 | 修正 |
|---|---|
| 把 VHDL 当普通程序语言 | 说明 concurrent assignment 表示并行硬件。 |
| `case` 漏写 `when others` | selector 未列出的状态要覆盖。 |
| NAND/NOR 网络搞反 | NAND: NMOS series, PMOS parallel；NOR: NMOS parallel, PMOS series。 |
| Schmitt trigger 只写一个 threshold | 必须写 UTP 和 LTP。 |
| 忘记 PMOS threshold 取绝对值 | 写成 absolute value of $V_{Tp}$。 |
| 把 layout 说成画图 | layout 是 fabrication mask geometry。 |
| 说 Pipeline ADC latency 比 Flash 低 | Pipeline 是 high throughput，但有 pipeline latency。 |

## 11. 一天冲刺顺序

1. Schmitt trigger 公式和解释；
2. VHDL entity / structural / dataflow；
3. CMOS switching point 和 effective beta；
4. AOI/OAI 变形；
5. latch-up / antenna effect；
6. mixed-signal design flow；
7. Flash vs Pipeline ADC。
