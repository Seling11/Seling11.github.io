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
