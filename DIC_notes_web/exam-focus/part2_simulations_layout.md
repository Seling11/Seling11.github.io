# Part 2 考点版：Simulations & Layout

> 对应 P2-L1 到 P2-L5。  
> Part 2 里最值得复习的是 VHDL 和版图（layout）。SPICE 在四年真题里没有直接大题，但可以作为 design flow 背景。

## 1. Part 2 到底怎么考

| Lecture | 考试价值 | 常见考法 |
|---|---|---|
| P2-L1 SPICE basics | 低直接考点 | 支撑 simulation / design flow 的解释。 |
| P2-L2 SPICE analysis | 低直接考点 | 了解 `.OP/.DC/.AC/.TRAN` 用途即可。 |
| P2-L3 VHDL fundamentals | 最高 | entity、port、architecture、三种描述方式。 |
| P2-L4 VHDL examples | 高 | MUX、`case` vs `if/elsif`、structural 转 dataflow。 |
| P2-L5 Analog layout | 高 | layout 定义、latch-up、antenna effect、matching。 |

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

