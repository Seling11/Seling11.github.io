# Lec.1 课程框架与 IC 设计全流程

> **_Course Introduction_**

这讲的课件里有很多行政内容，比如 lecturer、assessment、course delivery、partner arrangement，这些不属于 DIC 知识点，笔记里不保留。真正有用的是：这门课把 Integrated Circuit 从 specification 到 layout、verification、cost review 的完整流程串起来。

## DIC 这门课到底在学什么？

Design of Integrated Circuits 不是只画晶体管，也不是只跑仿真。它关心的是一个 IC 从需求到硅片实现的完整工程链条：

1. **Specification / Requirements**：把系统需求变成可以验证的设计指标。
2. **Architecture**：把功能拆成 analog、digital、mixed-signal blocks。
3. **Circuit design**：为每个 block 选择 topology，并估算器件尺寸、偏置、电压电流范围。
4. **Simulation**：用 SPICE/VHDL 等工具验证电路行为、时序、corner、temperature 等。
5. **Layout**：把 schematic 转成 silicon layout topology。
6. **Verification**：做 DRC、LVS、back-annotation，确认版图可制造且等价于原电路。
7. **Review and cost**：把 datasheet、key parameters、production cost 整理成 design review package。

> 可以把 DIC 理解成一句话：把一个功能需求变成可以制造、可以测试、可以解释成本的 chip design。

## 工具链：为什么课程用离散工具？

课程使用的是离散工具集，而不是一个完整工业 EDA flow。目的不是让工具“帮你自动完成”，而是让你看清每一步做了什么。

| Design step | Tool in course | 作用 |
| --- | --- | --- |
| Schematic entry | LTspice | 画电路原理图 |
| Circuit simulation | LTspice XVII | 验证 analog circuit behavior |
| VHDL timing simulation | Xilinx Vivado | 验证 digital timing / HDL behavior |
| Layout design | Electric VLSI | 画 silicon layout |
| Layout verification | Electric VLSI | DRC / LVS |

这里的重点不是记软件名字，而是理解每个工具对应设计流程中的哪一层：

- schematic 是电路意图；
- simulation 是行为验证；
- layout 是物理实现；
- DRC 是工艺规则检查；
- LVS 是 layout 与 schematic 的一致性检查。

## Mixed-Signal IC 的工程视角

DIC 里的设计通常不是纯 analog 或纯 digital，而是 mixed-signal。一个 mixed-signal IC 往往同时需要：

- analog front-end，例如 amplifier、filter、bias、reference；
- digital control，例如 state machine、counter、logic gate；
- interface，例如 ADC、DAC、clock、I/O conditioning；
- physical layout，例如 matching、routing、parasitics、guarding；
- test plan，例如 DC/AC performance、functional verification、process/temperature coverage。

这就是为什么后面的内容会同时出现 SPICE、VHDL、layout、analog blocks、digital blocks。

## 本讲保留的知识点

- DIC 的目标是掌握 **complete development process for an Integrated Circuit**。
- IC 设计不是单点技术，而是 requirements、architecture、circuit、simulation、layout、verification、review 的闭环。
- 课程中的 LTspice、Vivado、Electric VLSI 分别对应 analog simulation、digital simulation、layout/verification。
- Assignment 中提到 datasheet、architecture、testing、layout、LVS、DRC，其实就是后续课程主线。

## 不作为知识点的内容

以下 PPT 内容不进入笔记正文：

- lecturer biography；
- course assessment percentage；
- group/partner organization；
- late submission / resit policy；
- reading list 的书目信息；
- course delivery schedule。

这些对完成课程有用，但不是 DIC 知识结构。
