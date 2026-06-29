# Lec.5 CMOS 工艺中的基础器件

> **_What is CMOS? A Designer Perspective_**

这讲不是从 semiconductor physics 推导电子和空穴，而是从 designer perspective 看 CMOS process：在 IC 上，diode、resistor、capacitor 这些基础器件是如何由 pn junction、well、poly、oxide 和 metal layers 形成的。

## Designer Perspective

设计者关心的是器件的 functional operation：

- 哪些结构可以当 diode；
- 哪些区域可以做 resistor；
- 电容由哪些 layers 形成；
- reverse-biased junction 如何隔离不同区域；
- process variation 会如何影响 resistance/capacitance；
- layout matching 如何提高相对精度。

换句话说，DIC 里不是问“电子如何扩散”，而是问“这个结构在 circuit/layout 中能不能稳定实现目标功能”。

## pn Junction 是 IC 的基本边界

几乎所有 IC component 都由 pn junction 定义或影响。pn junction 的关键点：

- forward bias 时像 diode 一样导通；
- reverse bias 时阻断电流；
- reverse breakdown 限制 process 的 maximum voltage，常与 $V_{DD}$ 有关；
- 除 Zener diode 等特殊结构外，IC 中通常避免进入 breakdown。

## Reverse-Biased Diode Isolation

CMOS 中不同 well / diffusion region 之间常依赖 reverse-biased pn junction 隔离。

![Reverse-biased junction isolation](../PPT_extracted/assets/1__lecture_1_3_1_what_is_cmos_2026/page_007.jpg)

典型连接方式：

- p-type substrate 接最低电位，通常是 0 V；
- n-well 与 p-substrate 之间形成 pn junction；
- 当 junction reverse-biased 时，不同 n-well 区域被电隔离。

这解释了为什么 substrate / well bias 对 IC 正常工作很重要。如果 junction 不再 reverse-biased，隔离就会失效，可能出现 leakage、latch-up 或错误导通。

## Integrated Resistor

在 CMOS 中，resistor 可以由 n-well、polysilicon、metal 等材料实现。课件主要讲 n-well resistor。

![N-well resistor cross section](../PPT_extracted/assets/1__lecture_1_3_1_what_is_cmos_2026/page_009.jpg)

电阻基本公式：

$$
R=\rho\frac{L}{A}
$$

对于薄层材料，通常用 sheet resistance：

$$
R=R_{sheet}\frac{L}{W}
$$

其中：

- $R_{sheet}$ 单位是 $\Omega/\square$；
- $L/W$ 可以理解为 number of squares；
- 只要形状按比例缩放，square 数不变，电阻值就近似不变。

## Count the Squares

![Resistor plan view](../PPT_extracted/assets/1__lecture_1_3_1_what_is_cmos_2026/page_012.jpg)

例如：

- $L=32$ squares；
- $W=4$ squares；
- $R_{sheet}=500\Omega/\square$。

理想计算：

$$
R=500\times\frac{32}{4}=4000\Omega
$$

但实际 layout 中，side diffusion 会让 wafer 上的 effective width 比 mask opening 更宽。若 $W$ 需要加约 1 square：

$$
R=500\times\frac{32}{5}=3200\Omega
$$

这个例子说明：layout geometry 和 process effect 会直接改变电气参数。

## Temperature and Process Tolerance

Integrated resistor 的 absolute value 很难精确：

- n-well sheet resistance 可能有 $\pm 20\%$ variation；
- doping 和 width variation 会改变 $R_{sheet}$；
- temperature coefficient 会带来温度漂移；
- -40°C 到 155°C 的范围内，resistance 可能变化明显。

因此 analog IC 中常常更依赖 **ratio / matching**，而不是 absolute resistor value。

## Serpentine Resistor

高阻值 resistor 需要更长路径，但 chip area 有限，所以常用 serpentine shape。

![Serpentine resistor layout](../PPT_extracted/assets/1__lecture_1_3_1_what_is_cmos_2026/page_014.jpg)

计算时不能只加直线长度，corner 也要计入。课件给出的规则是每个 corner 约等于 0.5 squares：

$$
R=R_{sheet}\frac{L_1+L_2+L_3+L_4+L_5+4\times0.5}{W+1.0}
$$

这个公式的意义是：版图不是几何画图而已，corner、diffusion、contact 都会进入电路参数。

## Resistor Matching

Absolute resistor 难精确，但 identical resistors 可以 match 得很好。好的 matching 需要：

- same length；
- same width；
- same orientation；
- same edge environment；
- same nearby features；
- symmetrical placement。

如果 adjacent features 不同，side diffusion 会不同，导致两个 nominally identical resistors 实际值不同。

## Dummy Resistors

![Dummy resistor matching](../PPT_extracted/assets/1__lecture_1_3_1_what_is_cmos_2026/page_019.jpg)

Dummy resistor 没有电气功能，目的是让真正使用的 resistor 看到相同的边缘环境。

例如 R1 和 R2 两边都放 dummy，可以减少边缘 diffusion 差异，使 matching 更好。

## Common Centroid

![Common-centroid resistor matching](../PPT_extracted/assets/1__lecture_1_3_1_what_is_cmos_2026/page_020.jpg)

Common centroid 用于更高精度 matching。核心思想是把多个单元交错、对称放置，使线性 process gradient 被抵消。

例如四个 matched resistors 如果直接排成一排，左到右的工艺梯度会让它们不同。Common-centroid layout 通过空间平均让每个 resistor 受到相似的工艺环境。

## Integrated Capacitor

CMOS 中 capacitor 通常由两层 conductive plates 和中间 dielectric 形成。

基本公式：

$$
C=\epsilon_0\epsilon_r\frac{A}{d}
$$

其中：

- $A$ 是 plate area；
- $d$ 是介质厚度；
- $\epsilon_r$ 对 $SiO_2$ 约为 3.9；
- oxide 越薄，capacitance density 越大。

课件例子：

- $t_{ox}=20nm$ 时约 $1.75fF/\mu m^2$；
- $100\mu m \times 100\mu m$ 面积约 $17.5pF$；
- oxide 更薄时 capacitance density 可显著提高。

## Poly-Poly Capacitor 与 Parasitics

![Poly-poly capacitor parasitics](../PPT_extracted/assets/1__lecture_1_3_1_what_is_cmos_2026/page_024.jpg)

Poly-poly capacitor 的目标 capacitance 是两层 poly 之间的电容。但实际结构还会产生 parasitic capacitance，例如 plate 到 substrate、plate 到邻近层之间的电容。

这对 analog circuit 很重要：

- compensation capacitor 的 parasitics 会改变 pole/zero；
- switched-capacitor circuit 中 parasitics 会影响 charge transfer；
- layout 中 shield、bottom plate、routing 都会影响实际电容。

## On-Chip Inductor

课件总结提到：on-chip inductor 很少见，但在 multi-layer metal process 中可以实现。

原因：

- 占面积大；
- quality factor 受 metal resistance 和 substrate loss 限制；
- parasitic capacitance 会降低高频性能。

所以普通 analog/mixed-signal IC 中，resistor/capacitor 更常见，inductor 只在 RF 等场景更常见。

## 本讲要点

- pn junction 既是 diode，也定义 IC 中很多 isolation boundary。
- Reverse-biased junction 是 CMOS 区域隔离的基础。
- Integrated resistor 常用 sheet resistance 和 square counting 计算。
- Absolute resistance 很难准，matching 往往更重要。
- Dummy 和 common-centroid 是提高 matching 的重要 layout 技巧。
- Integrated capacitor 由 plate area、oxide thickness 和 dielectric 决定。
- Parasitic capacitance 是 capacitor layout 中必须考虑的问题。
