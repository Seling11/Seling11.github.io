# Lec.2 半导体与集成电路发展史

> **_History of Semiconductors_**

这讲的重点不是背人物传记，而是理解 transistor、integrated circuit、Silicon Valley、Moore's Law 这些节点如何共同塑造现代 IC 产业。

## 从真空管到晶体管

现代半导体电子学可以从两个关键器件看起：

- **Vacuum tube diode**：1904 年 John Ambrose Fleming 发明，是真空管时代的代表。
- **Transistor**：1947 年 Bell Labs 的 John Bardeen、Walter Brattain、William Shockley 发明。

Transistor 的意义在于它用半导体器件替代了体积大、功耗高、可靠性差的真空管。它让电子系统开始走向小型化、低功耗和大规模集成。

> 对 DIC 来说，transistor 不是历史名词，而是后面所有 CMOS logic、amplifier、current mirror、switching model 的基本单元。

## 1947: First Transistor

第一只 transistor 出现在 Bell Labs。Bardeen、Brattain、Shockley 因为 semiconductor research 和 transistor effect 获得 1956 年诺贝尔物理学奖。

这里值得记的不是三个人的个人履历，而是两个工程事实：

- **实验记录很重要**：lab book 记录了器件从想法到实验验证的过程。
- **器件发现不等于产业形成**：transistor 出现之后，还需要制造、公司、人才流动和商业化，才形成 Silicon Valley。

## Silicon Valley 的形成

早期电子公司多集中在美国东海岸，尤其 Bell Labs 附近。Shockley 离开 Bell Labs 后在 California 的 Mountain View 建立 Shockley Semiconductor Laboratory。

由于管理问题，一批年轻工程师离开 Shockley，成立 Fairchild Semiconductor。这批人常被称为 **Traitorous Eight**，其中包括 Gordon Moore 和 Robert Noyce。

Fairchild 的意义在于：

- 它是 Silicon Valley 半导体产业网络的重要起点；
- 它培养和分化出后续大量公司与工程人才；
- 它把半导体从实验室推向可复制的产业体系。

## Integrated Circuit 的出现

1958 年 Jack Kilby 在 TI 发明 integrated circuit。1959 年 Robert Noyce 在 Fairchild 发明 monolithic integrated circuit。

两者的区别可以粗略理解为：

- **Integrated Circuit (IC)**：把多个元件集成到同一电路结构中。
- **Monolithic IC**：在同一片 semiconductor substrate 上形成完整电路，更接近现代 IC 制造方式。

从 DIC 的角度看，monolithic IC 的重要性在于：器件、电阻、电容、互连、寄生效应都必须在同一个工艺平台中被共同考虑。

## Moore's Law 的工程含义

课件提到 1965 年 Moore's Law。它常被表述为：芯片上 transistor 数量随时间快速增长。更重要的是它背后的设计压力：

- transistor 越来越小，device model 会改变；
- layout density 提高，routing 和 parasitics 更重要；
- system complexity 提高，必须依赖 hierarchical design；
- verification 成为设计中不可绕开的环节；
- cost、yield、process node 会直接影响 design choice。

Moore's Law 不只是“晶体管数量变多”，而是 DIC 课程里 scaling、layout、simulation、testing 都必须存在的原因。

## Semiconductor Industry 的规模

课件用 2020 年全球半导体销售额约 440.4 billion USD 来说明产业规模，并用 GDP 做对比。这里不需要背具体年份数字，但要知道 semiconductor industry 是战略性产业：

- 它决定 consumer electronics、communication、AI、automotive、industrial control 等领域能力；
- 它不是单纯制造业，也包含 design、EDA、IP、fab、packaging、test；
- 国内市场需求很大，但 value chain 分布并不均匀，因此 IC design engineer 很重要。

## Apple M1 Max 例子：scale 感

课件用 Apple M1 Max 作例子：

- 5 nm TSMC process；
- 57 billion transistors；
- die area 约 432 mm²；
- 大约和一枚邮票相近。

这个例子想说明的是 **scale mismatch**：宏观看芯片很小，但内部包含几十亿 transistor。DIC 需要把这个尺度差异连接起来：

- device-level：单个 MOSFET 的 $W/L$、threshold、capacitance；
- circuit-level：inverter、amplifier、current mirror；
- block-level：ADC、DAC、logic block；
- chip-level：floorplan、layout、verification、cost。

## 本讲要点

- Transistor 是现代 semiconductor electronics 的起点。
- IC 的关键是把多个器件在同一工艺中集成，monolithic IC 是现代芯片的核心形式。
- Silicon Valley 的形成体现了半导体产业不仅需要发明，也需要公司、制造、人才和资本。
- Moore's Law 推动了 scaling，也带来了 modelling、layout、verification 的复杂性。
- DIC 的学习对象不是孤立器件，而是从 device 到 chip 的完整工程尺度。
