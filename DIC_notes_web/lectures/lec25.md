# Lec.13 Analog Layout Supplement

> Source: `PPT/3/Lecture 3-4 Analog Layout Design.pdf`

这份课件与 Part 2 的 analog layout guidelines 有明显重叠。本篇只作为补充复习：再次强调 matching/layout rules，并补充 latch-up causes、ESD/electrostatic shielding、antenna mitigation 等可靠性问题。

## 1. Layout 不是 schematic 的截图

Fab 只理解 mask layers：

- diffusion；
- well；
- poly；
- contact/via；
- metal；
- spacing；
- device dimensions。

设计意图必须通过几何结构体现。比如“匹配的差分对”不能只在 schematic 中声明，layout 上必须通过 common centroid、dummy、same orientation、same routing 来实现。

## 2. Matching rules 快速复习

Analog matching checklist：

- 使用相同 unit device；
- 用 multiplier 改变总尺寸，而不是随意画不同尺寸；
- common centroid 抵消 gradient；
- interdigitated layout 平均局部变化；
- odd devices 中心放置；
- dummy cells 放边界；
- matched devices 距离近；
- matched signals 同金属层、同走向、同环境；
- 避免在 critically matched gate 上方乱走线；
- 不要用过小 $W/L$，mismatch 可能更大。

## 3. IR drop 与 routing mismatch

长距离 routing 会引入电阻：

$$
\Delta V=IR
$$

对 bias voltage、reference voltage、matched signal 来说，微小 IR drop 都可能造成 mismatch。因此：

- voltage/reference 不要绕很远；
- matched routes 一起走；
- high-current power route 加宽；
- decoupling capacitor 靠近模块；
- supply/ground 使用 star-like 或明确分区连接。

## 4. Latch-up

Latch-up 是 CMOS 中寄生 PNP-NPN/SCR 结构被触发后形成 $V_{DD}$ 到 ground 的低阻通路。

触发原因：

- supply voltage 超出范围；
- power rail transient/noise；
- I/O overvoltage 或 fast transient；
- substrate/well charge injection；
- 大 output driver junction area；
- guard ring/tap 不足。

预防：

- 增加 guard ring density；
- 增加 substrate/well taps；
- NMOS/PMOS 保持合理 spacing；
- 降低 parasitic resistance path；
- 使用更好的 process isolation，例如 epitaxial substrate、trench isolation；
- 遵守 pad/ESD layout 规则。

## 5. ESD / electrostatic shielding

ESD 是外部高压瞬态进入 pad，可能击穿 gate oxide。Pad 附近通常放 ESD protection devices，把电荷导向 supply/ground。

Layout 注意：

- ESD path 要短、低阻；
- ESD NMOS/PMOS 位置按工艺规则；
- 避免 ESD 结构本身引发 latch-up；
- pad ring、guard ring、well tie 要统一考虑。

## 6. Antenna effect

Antenna effect 出现在制造/etching 阶段：长 metal 连接到 MOS gate 时会积累电荷，可能损伤 gate oxide 或造成 $V_T$ mismatch。

常用判断是 metal area/gate area ratio 是否超出工艺限制。课件提到某些工艺下 ratio 应小于约 70。

缓解：

- antenna diode：给电荷泄放路径；
- jumper / antenna killer：长 metal 分段并跨 metal layers；
- 避免长 metal 直接挂到敏感 gate；
- matched devices 上的 antenna mitigation 要对称，否则会引入 mismatch。

## 7. Packaging 与 bonding

Die 通过 bond pads、bond wires、lead frame 或 WLP 与外界连接。Package 不是理想外壳，它会引入：

- bond wire inductance；
- pad capacitance；
- lead resistance；
- thermal path；
- pin arrangement constraint。

高速或高精度 analog 设计中，package parasitics 可能和 on-chip parasitics 同等重要。

## 8. 本讲必须带走的结论

- Matching 靠几何和环境一致性，不靠 schematic 名字。
- Latch-up 是 parasitic SCR 被触发的可靠性问题。
- ESD protection 要保护 gate oxide，同时不能恶化 latch-up。
- Antenna effect 发生在制造阶段，长 metal-to-gate route 要处理。
- Power routing、package、bonding 都会反馈影响 analog 性能。
