# Part 3 考点版：Analog and Digital Blocks

> 对应 P3-L1 到 P3-L13。  
> Part 3 是最高收益部分：Schmitt trigger、CMOS logic、signal conditioning、ADC、layout supplement 都直接进过真题。

## 1. Part 3 到底怎么考

| 考点 | 主要 lecture | 真题证据 | 优先级 |
|---|---|---|---|
| 施密特触发器设计（Schmitt trigger design） | P3-L3 | 4/4 年 | 最高 |
| CMOS 逻辑门 / switching point / AOI/OAI | P3-L8 | 4/4 年 | 最高 |
| 信号调理（signal conditioning） | P3-L1/P3-L2 | 2022、2023、2024 | 高 |
| layout reliability：latch-up / antenna | P3-L13 | 2023、2025 | 高 |
| 模数转换器（ADC） | P3-L12 | 2025 | 中高 |
| 运放增益级（op-amp gain stage） | P3-L1 | 2022 | 中 |
| 电流镜、差分对、频率响应、传输门、锁存器、DAC | P3-L4 到 P3-L11 | 四年未见直接大题 | 低直接证据 |

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
