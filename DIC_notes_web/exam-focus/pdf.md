---
title: DIC Exam Focus PDF
aside: false
sidebar: false
prev: false
next: false
lastUpdated: false
---

# DIC Exam Focus PDF

> 这份 PDF 由 Exam Focus 四个 part 自动合并生成，适合离线阅读和打印。

# Part 1 考点版：Introduction, History & Fundamentals

> 对应新款 grouped notes：Lecture 1.1 到 Lecture 1.4。  
> Part 1 不太像纯计算大题的主战场，但它支撑三类高频题：设计流程（design flow）、MOS/CMOS 计算、模拟/数字接口解释。

## 1. Part 1 到底怎么考

| 新款笔记位置 | 考试价值 | 常见考法 |
|---|---|---|
| Lecture 1.1 Introduction, History and Scale | 低直接考点 | 课程框架、半导体历史、数量级/dB；四年真题里直接考得很少。 |
| Lecture 1.2 Design Process | 高 | 画/解释 mixed-signal IC design process，解释 block datasheet。 |
| Lecture 1.3 CMOS and MOS Transistor | 高支撑 | CMOS 工艺背景、MOS 模型、CMOS inverter/NAND/NOR 的 switching point 和 sizing。 |
| Lecture 1.4 Analog vs Digital | 高 | 为什么数字系统还需要模拟子系统；数字延迟/开关直觉。 |

一句话：Part 1 不要把重点放在历史，而要放在 **设计流程 + MOS 模型 + 模拟/数字接口**。

## 2. 考点 A：混合信号 IC 设计流程

混合信号 IC 设计流程（mixed-signal IC design flow）是真题里出现过的纯设计思路题。它和具体电路无关，但会直接给分。

### 会怎么问

- 画图并解释 mixed-signal IC design process。
- 为什么设计早期要写每个模块的数据表（block datasheet）？
- 为什么 schematic simulation 通过后还不能直接 tape-out？

### 必背主线

```text
系统规格 specification
-> 概念设计 / 架构 conceptual design / architecture
-> 模块划分 block partition
-> 模块数据表 block datasheet
-> 原理图或 RTL 设计 schematic / RTL design
-> 前仿真 pre-layout simulation
-> 版图 / 综合布局布线 layout / synthesis / place-and-route
-> DRC / LVS / parasitic extraction
-> 后仿真 post-layout simulation
-> fabrication / testing
```

其中几个英文词要会写：

- 设计规则检查（DRC, Design Rule Check）：检查 layout 是否满足工艺规则。
- 版图与原理图一致性检查（LVS, Layout Versus Schematic）：检查 layout 连线是否等价于 schematic。
- 寄生参数提取（parasitic extraction）：从 layout 中提取寄生电阻/电容。

### Simplified vs Detailed Design Flow

简化设计流程（simplified design flow）强调反复迭代：

```text
design concept -> initial design -> simulation -> redesign
```

详细设计流程（detailed design flow）会进一步加入：

- prototype / fabrication；
- testing；
- minor correction；
- final product。

答题时可以这样写：

```text
Simplified flow 主要说明设计和仿真的迭代关系；Detailed flow 更接近真实工程，
因为它还包括 prototype/fabrication、testing 和 correction。IC 设计不能只看
schematic simulation，layout parasitics 和真实测试也可能让设计失败。
```

### 为什么 block datasheet 要早做

模块数据表（block datasheet）是每个 block 的“设计合同”。它规定：

- 输入/输出范围；
- gain、bandwidth、noise、power；
- load、timing、interface；
- 每个 block 的 simulation pass/fail 标准。

模板答案：

```text
在 mixed-signal IC 中，系统规格必须先拆成 block-level datasheets。
这些 datasheet 定义每个模块的输入输出范围、速度、功耗、精度和接口假设。
这样 analog 和 digital blocks 可以并行设计并独立验证，最后集成时不容易
出现接口不匹配。若早期不定义 block datasheet，单个模块可能自己能工作，
但连接到整片芯片时失败，导致 layout 后甚至 fabrication 后返工。
```

## 3. 考点 B：MOS 计算如何服务 CMOS 题

MOS 晶体管（MOS transistor）的计算通常不会单独问“请计算 MOS 的物理电流”，而是藏在 CMOS 逻辑门的开关点（switching point）和尺寸设计（sizing）里。

### 必须会的量

NMOS 导通条件：

$$
V_{GS}>V_{Tn}
$$

PMOS 导通条件：

$$
V_{SG}>|V_{Tp}|
$$

晶体管强度：

$$
\beta_n=k'_n\frac{W_n}{L_n},\qquad
\beta_p=k'_p\frac{W_p}{L_p}
$$

其中 $W/L$ 是晶体管宽长比，$k'$ 是工艺跨导参数。

### Inverter switching point

开关点（switching point）定义为：

$$
V_{in}=V_{out}=V_{SP}
$$

此时令 NMOS 电流和 PMOS 电流相等：

$$
I_{Dn}=I_{Dp}
$$

常用公式：

$$
V_{SP}=
\frac{\sqrt{\beta_n/\beta_p}V_{Tn}+V_{DD}-|V_{Tp}|}
{1+\sqrt{\beta_n/\beta_p}}
$$

### 给目标 VSP 反推尺寸

如果题目给目标 $V_{SP}$，先算：

$$
r=\sqrt{\beta_n/\beta_p}
=\frac{V_{DD}-V_{SP}-|V_{Tp}|}{V_{SP}-V_{Tn}}
$$

再用：

$$
\beta=k'\frac{W}{L}
$$

反推出未知 $W$ 或 $W/L$。

### NAND / NOR 要先等效

| 逻辑门 | NMOS 下拉网络 | PMOS 上拉网络 | 等效强度 |
|---|---|---|---|
| Inverter | 一个 NMOS | 一个 PMOS | $\beta_{n,eq}=\beta_n$，$\beta_{p,eq}=\beta_p$ |
| 2-input NAND | NMOS 串联 | PMOS 并联 | $\beta_{n,eq}\approx\beta_n/2$，$\beta_{p,eq}\approx2\beta_p$ |
| 2-input NOR | NMOS 并联 | PMOS 串联 | $\beta_{n,eq}\approx2\beta_n$，$\beta_{p,eq}\approx\beta_p/2$ |

然后把 $\beta_n,\beta_p$ 换成 $\beta_{n,eq},\beta_{p,eq}$ 套公式。

## 4. 考点 C：为什么数字系统还需要模拟部分

模拟与数字（analog vs digital）会以概念题出现，尤其是 signal conditioning 相关题。

答题核心：

- 真实世界信号是连续的 analog signal；
- sensor、PCB trace、cable、actuator 都不是理想 0/1；
- digital block 只能可靠处理干净的 logic level；
- 因此需要 analog front-end 做 amplification、filtering、comparison、ADC 等。

模板：

```text
即使系统主要由 digital logic 处理，输入输出接口仍然是 analog 的。
传感器输出通常有噪声、偏置、幅度不足或带宽限制，不能直接送入 digital logic。
因此需要 analog signal conditioning，例如 amplification、filtering、level shifting、
comparison 或 ADC，把真实信号变成后级数字电路能可靠识别的形式。
```

## 5. 考点 D：CMOS 工艺背景与 layout 题

CMOS 工艺基础本身不太单独计算，但会支撑 layout / reliability 题。

要会解释：

- 衬底/阱（substrate / well）必须接到合适电位；
- PN 结（pn junction）通常反偏，用于隔离；
- diffusion、poly、metal、via、contact 都是 layout mask geometry；
- well/substrate 中可能形成寄生 BJT，导致 latch-up；
- resistor/capacitor 的绝对值受工艺影响，matching 比 absolute value 更重要。

## 6. 低优先级内容

| 内容 | 处理方式 |
|---|---|
| 半导体发展史 | 浏览即可，不像大题。 |
| Moore's law 历史 | 知道 scaling 提高密度、降低成本，同时带来 leakage/parasitic 问题即可。 |
| dB / 数量级 | 四年未见直接题；时间紧可降优先级。 |

## 7. Part 1 考前检查

- 能不能画出 mixed-signal design flow？
- 能不能解释 block datasheet 为什么要早做？
- 能不能用 $\beta=k'W/L$ 做 switching point 计算？
- 能不能解释 analog front-end 为什么必要？
- 能不能把 well/substrate/pn junction 和 latch-up 联系起来？



<div class="pdf-page-break"></div>

# Part 2 考点版：Simulations & Layout

> 对应新款 grouped notes：Lecture 2.1 到 Lecture 2.4。  
> Part 2 里最值得复习的是 VHDL 和版图（layout）。SPICE 在四年真题里没有直接大题，但可以作为 design flow 背景。

## 1. Part 2 到底怎么考

| 新款笔记位置 | 考试价值 | 常见考法 |
|---|---|---|
| Lecture 2.1 SPICE and Analysis Types | 低直接考点 | 支撑 simulation / design flow 的解释；了解 `.OP/.DC/.AC/.TRAN` 用途即可。 |
| Lecture 2.2 VHDL Fundamentals | 最高 | entity、port、architecture、三种描述方式。 |
| Lecture 2.3 Analog Layout Guidelines | 高 | layout 定义、latch-up、antenna effect、matching。 |
| Lecture 2.4 VHDL Examples and Synthesis | 高 | MUX、`case` vs `if/elsif`、structural 转 dataflow。 |

## 2. 考点 A：VHDL 的 entity / port / architecture

VHDL 是硬件描述语言（hardware description language），不是普通编程语言。题目最常让你读 `entity` 和 `architecture`。

### Entity 是模块边界

实体（entity）定义输入输出接口：

```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity example is
  port (
    A : in  STD_LOGIC;
    B : in  STD_LOGIC;
    F : out STD_LOGIC
  );
end example;
```

读 port 时写三列：

| port name | mode | type |
|---|---|---|
| A | in | STD_LOGIC |
| B | in | STD_LOGIC |
| F | out | STD_LOGIC |

### Architecture 是内部实现

结构体（architecture）说明模块内部如何实现：

```vhdl
architecture Dataflow of example is
begin
  F <= A and B;
end Dataflow;
```

考试句子：

```text
entity describes the external interface; architecture describes the internal implementation.
```

可以翻译成：`entity` 管“外面看见什么端口”，`architecture` 管“里面怎么连电路”。

## 3. 考点 B：三种 VHDL 描述方式

| 描述方式 | 英文 | 典型特征 | 考法 |
|---|---|---|---|
| 行为描述 | behavioural description | `process`、`if`、`case` | 解释 MUX 或时序行为 |
| 数据流描述 | dataflow description | Boolean expression / concurrent assignment | 从电路写表达式 |
| 结构描述 | structural description | `component`、`signal`、`port map` | 从代码画电路或推公式 |

### Dataflow：直接写逻辑表达式

```vhdl
F <= (A and B) or ((not C) and D);
```

注意：`process` 外面的 assignment 是并行硬件，不是 C/Python 那种逐行执行。

### Structural：像 netlist 一样连 gate

```vhdl
architecture Structural of example is
  signal n_b, t1 : STD_LOGIC;
begin
  U0 : INV  port map (I => B, O => n_b);
  U1 : AND2 port map (I0 => A, I1 => n_b, O => t1);
  U2 : OR2  port map (I0 => t1, I1 => C, O => F);
end Structural;
```

读法：

1. 先看 `entity`，列出输入输出。
2. 再看内部信号（internal signals）。
3. 每个 `port map` 写成一个 gate equation。
4. 逐层代入，得到最终 Boolean expression。

## 4. 考点 C：MUX 的 VHDL

多路选择器（multiplexer, MUX）是 VHDL 高频题。

### 4-to-1 MUX 用 `if/elsif`

```vhdl
process (I0, I1, I2, I3, S)
begin
  if S = "00" then
    Y <= I0;
  elsif S = "01" then
    Y <= I1;
  elsif S = "10" then
    Y <= I2;
  else
    Y <= I3;
  end if;
end process;
```

### 4-to-1 MUX 用 `case`

```vhdl
process (I0, I1, I2, I3, S)
begin
  case S is
    when "00" => Y <= I0;
    when "01" => Y <= I1;
    when "10" => Y <= I2;
    when others => Y <= I3;
  end case;
end process;
```

### `case` 和 `if/elsif` 怎么比较

答题要点：

- 两者都可以实现同一个 MUX；
- `case` 更适合 selector 取多个互斥值的情况；
- `when others` 可以覆盖未列出的仿真状态；
- `if/elsif` 在条件重叠时更像 priority logic；
- synthesis tool 可能优化成相同硬件，但代码可读性不同。

## 5. 考点 D：Structural VHDL 转电路/表达式

例子：

```vhdl
U0 : NAND2 port map (O => s1, I0 => A, I1 => B);
U1 : NOR2  port map (O => F,  I0 => s1, I1 => C);
```

先写每个 internal signal：

$$
s_1=\overline{AB}
$$

再写输出：

$$
F=\overline{s_1+C}=\overline{\overline{AB}+C}
$$

画图时要保留原 gate structure：

```text
A ----\
       NAND ---- s1 ----\
B ----/                 NOR ---- F
C ---------------------/
```

易错点：

- 不要把 internal signal 当成输入；
- named association 里 `O => F` 才是输出；
- 如果题目要求画 simulated circuit，不要过度化简。

## 6. 考点 E：时序逻辑 VHDL

四年真题主要考组合逻辑，但你要能识别时序逻辑。

触发器（flip-flop）模板：

```vhdl
process (CLK)
begin
  if rising_edge(CLK) then
    Q <= D;
  end if;
end process;
```

要点：

- output 只在 clock edge 附近更新；
- `D` 是被采样的数据，不是触发条件；
- 时钟过程通常只把 clock 和 asynchronous reset 放进 sensitivity list；
- 锁存器（latch）是 level-sensitive，触发器（flip-flop）是 edge-triggered。

## 7. 考点 F：什么是 layout

版图（layout）是芯片制造用的物理几何信息，不是 schematic 的截图。

它定义：

- diffusion、well、poly、metal；
- contact 和 via；
- transistor 的 $W/L$；
- routing、spacing、mask geometry；
- parasitic resistance/capacitance；
- matching 和 reliability。

模板答案：

```text
IC layout is the physical mask geometry used for fabrication. The foundry
manufactures diffusion, well, poly, contact, via and metal shapes, not circuit
symbols. Therefore layout determines device dimensions, connectivity, parasitics,
matching and reliability.
```

## 8. 考点 G：DRC / LVS / Extraction

| 检查 | 中文解释 | 作用 |
|---|---|---|
| DRC | 设计规则检查 | 检查 width、spacing、enclosure 是否满足工艺制造规则。 |
| LVS | 版图原理图一致性检查 | 检查 layout 的连接关系是否等价于 schematic。 |
| Extraction | 寄生参数提取 | 从 layout 中提取寄生 R/C。 |
| Post-layout simulation | 后仿真 | 带寄生参数重新仿真，确认 timing/gain/noise 仍然满足规格。 |

## 9. 考点 H：Analog layout matching

匹配（matching）题要写出这些关键词：

- 相同 unit device；
- same orientation；
- common centroid（共同中心布局）；
- interdigitated layout（交叉指状布局）；
- dummy device（虚设器件）；
- matched routes 同层、同长度、同环境；
- 远离 digital switching noise；
- guard ring（保护环）和 substrate contact（衬底接触）。

common centroid 的目的：让工艺梯度造成的误差变成共同误差，而不是差分误差。

## 10. 考点 I：Latch-up

闩锁效应（latch-up）是 CMOS 中寄生 PNP 和 NPN 晶体管形成 SCR-like positive feedback path。一旦触发，会形成从 $V_{DD}$ 到 ground 的低阻通路，电流很大，可能烧坏芯片。

触发来源：

- I/O overvoltage；
- supply transient；
- substrate/well charge injection；
- well/substrate ties 不足；
- ESD event。

预防：

- 增加 well taps 和 substrate taps；
- 使用 guard rings；
- 降低 well/substrate resistance；
- 遵守 spacing rules；
- 使用 deep N-well / isolation；
- 遵守 pad/ESD layout rules。

## 11. 考点 J：Antenna effect

天线效应（antenna effect）发生在制造过程中：长 metal/poly 连接到 MOS gate 时会积累电荷。如果 metal area 相对 gate area 太大，可能击穿薄 gate oxide。

缓解方法：

- antenna diode；
- jumper 到更高 metal layer；
- 分段长线；
- 避免小 gate 直接挂很长 metal；
- 对 matched devices 要对称处理，否则会引入 mismatch。

## 12. 低优先级 SPICE

| 分析 | 用途 |
|---|---|
| `.OP` | DC operating point，求偏置点。 |
| `.DC` | DC sweep，扫电压/电流源。 |
| `.AC` | 小信号频率响应。 |
| `.TRAN` | transient analysis，时域波形。 |
| `.NOISE` | 噪声分析。 |

SPICE 目前更像背景，不像真题核心计算。

## 13. Part 2 考前检查

- 能不能识别 entity 的 port name / mode / type？
- 能不能区分 behavioural / dataflow / structural？
- 能不能从 `port map` 画出电路？
- 能不能写 dataflow architecture？
- 能不能解释 layout、DRC、LVS、extraction？
- 能不能解释 latch-up 和 antenna effect？



<div class="pdf-page-break"></div>

# Part 3 考点版：Analog and Digital Blocks

> 对应新款 grouped notes：Lecture 3.1 到 Lecture 3.4。  
> Part 3 是最高收益部分：Schmitt trigger、CMOS logic、signal conditioning、ADC、layout supplement 都直接进过真题。

## 1. Part 3 到底怎么考

| 考点 | 新款笔记位置 | 真题证据 | 优先级 |
|---|---|---|---|
| 施密特触发器设计（Schmitt trigger design） | Lecture 3.1 Signal Conditioning and Schmitt Trigger | 4/4 年 | 最高 |
| CMOS 逻辑门 / switching point / AOI/OAI | Lecture 3.2 Current Sources and Digital Blocks | 4/4 年 | 最高 |
| 信号调理（signal conditioning） | Lecture 3.1 Signal Conditioning and Schmitt Trigger | 2022、2023、2024 | 高 |
| layout reliability：latch-up / antenna | Lecture 3.4 Analog Layout Design | 2023、2025 | 高 |
| 模数转换器（ADC） | Lecture 3.3 Frequency Response, DAC and ADC | 2025 | 中高 |
| 运放增益级（op-amp gain stage） | Lecture 3.1 Signal Conditioning and Schmitt Trigger | 2022 | 中 |
| 电流镜、差分对、传输门、锁存器/触发器 | Lecture 3.2 Current Sources and Digital Blocks | 四年未见直接大题 | 低直接证据 |
| 频率响应、DAC | Lecture 3.3 Frequency Response, DAC and ADC | 四年未见直接大题 | 低直接证据 |

## 2. 考点 A：Signal conditioning

信号调理（signal conditioning）就是把真实世界的 analog signal 整理成后级能可靠处理的形式。

### 会怎么问

- 描述三种 signal conditioning 方法。
- 为什么 digital processing 前还需要 analog conditioning？
- 举例说明一个输入信号可能需要多种 conditioning。

### 必会表格

| 方法 | 作用 | 例子 |
|---|---|---|
| 放大（amplification） | 小信号变得可测 | sensor 10 mV 放大到 ADC range |
| 衰减（attenuation） | 大信号变安全 | 12 V 分压到 3.3 V |
| 滤波（filtering） | 去除噪声/干扰 | anti-aliasing low-pass filter |
| 比较（comparison） | analog level 变成 logic decision | comparator / Schmitt trigger |
| 缓冲（buffering） | 防止前级被加载 | op-amp voltage follower |
| 电平转换（level shifting） | 匹配逻辑电平 | 5 V 转 3.3 V |

模板答案：

```text
Signal conditioning modifies a real analog signal so that the next circuit can
process it reliably. It may amplify or attenuate the amplitude, filter unwanted
frequency components, shift the reference level, buffer the source, or compare
the signal with a reference to produce a clean logic-level output.
```

## 3. 考点 B：Op-amp gain stage

运算放大器（op-amp）在真题里出现过 gain x4、mid-rail amplifier。准备闭环增益公式即可。

### Inverting amplifier

反相放大器（inverting amplifier）：

$$
A_v=-\frac{R_f}{R_i}
$$

特点：

- 输出相位反转 180 度；
- input impedance 约为 $R_i$；
- gain 由 resistor ratio 决定。

### Non-inverting amplifier

同相放大器（non-inverting amplifier）：

$$
A_v=1+\frac{R_f}{R_i}
$$

特点：

- 输出不反相；
- input impedance 高；
- 适合 sensor buffering / amplification。

### Mid-rail bias

单电源系统中，常把小信号偏置在中间电平（mid-rail）：

$$
V_{mid}=\frac{V_{DD}}{2}
$$

这样信号可以围绕 $V_{mid}$ 上下摆动，不需要负电源。

## 4. 考点 C：Schmitt trigger

施密特触发器（Schmitt trigger）是带迟滞（hysteresis）的 comparator。它用正反馈（positive feedback）产生两个不同的阈值，解决普通 comparator 在 noisy threshold 附近反复跳变的问题。

### 核心概念

- 上阈值（UTP, upper threshold point）：输入上升时触发翻转的阈值。
- 下阈值（LTP, lower threshold point）：输入下降时触发翻转的阈值。
- 迟滞窗口（hysteresis window）：

$$
V_H=UTP-LTP
$$

在 UTP 和 LTP 之间，输出保持原状态。因此只要噪声幅度小于 hysteresis window，就不会反复误触发。

### 通用设计公式

如果阈值由输出和参考电压共同决定：

$$
V_T=\alpha V_{out}+(1-\alpha)V_{REF}
$$

则：

$$
UTP=\alpha V_{OH}+(1-\alpha)V_{REF}
$$

$$
LTP=\alpha V_{OL}+(1-\alpha)V_{REF}
$$

所以：

$$
\alpha=\frac{UTP-LTP}{V_{OH}-V_{OL}}
$$

$$
V_{REF}=\frac{UTP-\alpha V_{OH}}{1-\alpha}
$$

算出 $\alpha$ 后，再选电阻比例实现这个 feedback ratio。

### 例：0-5 V，阈值 1.5 V / 3.5 V

已知：

$$
V_{OH}=5V,\quad V_{OL}=0V
$$

$$
UTP=3.5V,\quad LTP=1.5V
$$

则：

$$
\alpha=\frac{3.5-1.5}{5-0}=0.4
$$

$$
V_{REF}=\frac{3.5-0.4\times5}{0.6}=2.5V
$$

解释：

- hysteresis window = 2 V；
- center reference = 2.5 V；
- output feedback weight = 0.4。

### 答题模板

```text
Schmitt trigger is a comparator with positive feedback. It has two switching
thresholds, UTP and LTP. When the input rises it must cross UTP; when the input
falls it must cross LTP. The region between them is the hysteresis window, which
prevents a noisy or slowly changing input from causing multiple false transitions.
```

### 易错点

- 不要把 Schmitt trigger 画成普通 comparator；
- 必须写两个 thresholds；
- positive feedback 不是 negative feedback；
- 先说明 output swing 是 0/5 V、0/3.3 V 还是 $\pm V_{sat}$；
- hysteresis window 要大于噪声幅度。

## 5. 考点 D：CMOS logic gates

静态 CMOS 逻辑门（static CMOS logic gate）的规则：

- NMOS 下拉网络（pull-down network, PDN）负责把输出拉到 0；
- PMOS 上拉网络（pull-up network, PUN）负责把输出拉到 $V_{DD}$；
- NMOS 串联表示 AND 条件；
- NMOS 并联表示 OR 条件；
- PMOS 网络是 NMOS 网络的对偶，series / parallel 互换。

### NAND

$$
Y=\overline{AB}
$$

结构：

- NMOS series；
- PMOS parallel。

### NOR

$$
Y=\overline{A+B}
$$

结构：

- NMOS parallel；
- PMOS series。

多输入 NOR 往往较慢，因为 PMOS series stack 较弱。

## 6. 考点 E：Switching point / sizing

开关点（switching point）定义：

$$
V_{in}=V_{out}=V_{SP}
$$

此时：

$$
I_{pull-down}=I_{pull-up}
$$

等效 inverter 公式：

$$
V_{SP}=
\frac{\sqrt{\beta_{n,eq}/\beta_{p,eq}}V_{Tn}+V_{DD}-|V_{Tp}|}
{1+\sqrt{\beta_{n,eq}/\beta_{p,eq}}}
$$

其中：

$$
\beta=k'\frac{W}{L}
$$

等效强度：

| Gate | $\beta_{n,eq}$ | $\beta_{p,eq}$ | 直觉 |
|---|---|---|---|
| Inverter | $\beta_n$ | $\beta_p$ | NMOS/PMOS 平衡 |
| NAND2 | $\beta_n/2$ | $2\beta_p$ | PMOS 侧更强，$V_{SP}$ 往高走 |
| NOR2 | $2\beta_n$ | $\beta_p/2$ | NMOS 侧更强，$V_{SP}$ 往低走 |

给目标 $V_{SP}$ 反推尺寸：

$$
r=\sqrt{\beta_{n,eq}/\beta_{p,eq}}
=\frac{V_{DD}-V_{SP}-|V_{Tp}|}{V_{SP}-V_{Tn}}
$$

再用 $\beta=k'W/L$ 求未知 $W$ 或 $L$。

## 7. 考点 F：AOI/OAI 实现

AOI 是与或非门（AND-OR-Invert），自然形式：

$$
Y=\overline{AB+CD}
$$

OAI 是或与非门（OR-AND-Invert），自然形式：

$$
Y=\overline{(A+B)(C+D)}
$$

做题步骤：

1. 写出目标 Boolean function；
2. 判断目标函数或其反函数是否接近 AOI/OAI 形式；
3. 用 De Morgan 变形；
4. 标出需要哪些 input inverter；
5. 说明和 NAND-only implementation 的面积/延迟/晶体管数差异。

比较模板：

```text
AOI/OAI implementation can reduce the number of logic stages and may use fewer
transistors, so delay and area can be smaller. However, complex gates may contain
long transistor stacks, increasing effective resistance. NAND-only implementation
is more regular and easier to map with standard cells, but may need more stages.
```

## 8. 考点 G：ADC 基础

模数转换器（ADC, analog-to-digital converter）把连续模拟信号变成离散 digital code。

三个步骤：

```text
sampling and holding -> quantization -> encoding
```

### Sampling

采样周期：

$$
T_s
$$

采样频率：

$$
f_s=\frac{1}{T_s}
$$

Nyquist 条件：

$$
f_s\ge2f_{max}
$$

若采样率不足，会产生混叠（aliasing）：高频信号伪装成低频信号，之后无法正确恢复。

### Quantization

$n$-bit ADC 有：

$$
L=2^n
$$

若输入范围是 $V_{min}$ 到 $V_{max}$，步长（LSB）为：

$$
\Delta=\frac{V_{max}-V_{min}}{2^n}
$$

bit 越多，LSB 越小，quantization error 越小，但电路复杂度和数据率也更高。

## 9. 考点 H：Flash ADC vs Pipeline ADC

2025 直接考了 Flash ADC 和 Pipeline ADC 对比。

### Flash ADC

闪速 ADC（Flash ADC）结构：

- resistor ladder 产生多个 thresholds；
- $2^N-1$ 个 comparators 并行比较；
- priority encoder 把 thermometer code 转成 binary code。

优点：

- fastest；
- one-step conversion；
- latency 很低。

缺点：

- comparators 数量随 bit 数指数增长；
- power 和 area 很大；
- practical resolution 通常有限。

### Pipeline ADC

流水线 ADC（Pipeline ADC）结构：

```text
sample-and-hold
-> sub-ADC 粗量化
-> sub-DAC 还原粗略模拟值
-> subtract 得到 residue
-> residue amplifier 放大残差
-> 下一 stage 继续
-> digital correction
```

优点：

- throughput 高；
- resolution 可做到 medium-high；
- 同等 bit 数下 comparator 数远少于 Flash；
- 适合高速数据采集。

缺点：

- 有 pipeline latency；
- residue amplifier 精度要求高；
- 比 SAR ADC 复杂，功耗也更高。

### 对比表

| 项目 | Flash ADC | Pipeline ADC |
|---|---|---|
| 转换方式 | 所有阈值一次并行比较 | 多级逐步转换 |
| 速度 | 最快，低 latency | 高 throughput，但有 pipeline latency |
| 分辨率 | 低到中等 | 中到较高 |
| comparator 数 | $2^N-1$ | 远少于同 bit Flash |
| 功耗/面积 | 很高 | 中到高 |
| 典型用途 | 超高速、低分辨率 | 高速、中高分辨率 |

模板：

```text
Flash ADC uses a resistor ladder and many parallel comparators, so it is extremely
fast but area and power grow rapidly with resolution. Pipeline ADC divides the
conversion into stages. Each stage makes a coarse decision, subtracts it using a
sub-DAC, amplifies the residue and passes it to the next stage. It has high
throughput and better practical resolution than Flash, but introduces pipeline
latency and requires accurate residue processing.
```

## 10. 考点 I：layout reliability

Part 3 的 layout supplement 和 Part 2 重叠，重点还是两个 reliability 问题。

### Latch-up

闩锁效应（latch-up）：寄生 PNP/NPN 形成 SCR-like path，从 $V_{DD}$ 到 ground 出现低阻大电流。

预防：guard rings、well/substrate taps、合理 spacing、deep N-well、低阻 supply/substrate connection。

### Antenna effect

天线效应（antenna effect）：制造过程中长 metal/poly 连接到 gate，积累电荷损伤 gate oxide。

预防：antenna diode、jumper、分段长线、matched devices 对称处理。

## 11. 低直接证据模块

| 内容 | 记忆到什么程度 |
|---|---|
| Current mirror | 用相同 $V_{GS}$ 复制电流，误差来自 channel-length modulation 和 mismatch。 |
| Differential pair | 放大差模、抑制共模；tail current 在两边支路间转移。 |
| MOSFET frequency domain | $C_{GS}$、$C_{GD}$、Miller effect 限制速度。 |
| Frequency response | poles 降低 gain 和 phase margin；Miller compensation 换稳定性。 |
| Pass gate | NMOS strong 0/degraded 1；PMOS strong 1/degraded 0；transmission gate 可传 full swing。 |
| Latch / flip-flop | latch 是 level-sensitive，flip-flop 是 edge-triggered。 |
| DAC | digital code 转 analog level；R-2R ladder 比 weighted resistor 更可扩展。 |

## 12. Part 3 考前检查

- 能不能从 UTP/LTP 设计 Schmitt trigger？
- 能不能解释 hysteresis 如何清理 noisy input？
- 能不能算 inverter/NAND/NOR switching point？
- 能不能做 AOI/OAI Boolean transformation？
- 能不能解释 sampling、quantization、Nyquist、aliasing？
- 能不能比较 Flash ADC 和 Pipeline ADC？
- 能不能解释 latch-up 和 antenna effect？



<div class="pdf-page-break"></div>

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

