# Lec.6 MOS 晶体管

> **_MOS Transistor_**

上一讲看的是 CMOS process 中的 passive / structural components：diode、resistor、capacitor。这一讲进入 active device：MOS transistor。后面所有 digital logic、analog amplifier、current source、switching delay 都建立在 MOSFET 的符号、结构、工作区和电气特性上。

## MOS Transistor 的端口

MOSFET 有四个重要端口：

- **Gate (G)**：控制端，理想情况下 gate current 很小；
- **Source (S)**：载流子进入 channel 的参考端；
- **Drain (D)**：载流子离开 channel 的端；
- **Body / Bulk (B)**：衬底或 well，影响 threshold voltage。

在很多简化电路中 body 被省略，但在 IC 设计中 body effect、well connection、substrate isolation 都不能完全忽略。

## NMOS 和 PMOS 的电压约定

![MOS schematic symbols](../PPT_extracted/assets/1__lecture_1_3_2_mos_transistor_2026/page_006.jpg)

NMOS 通常用：

$$
V_{GS}=V_G-V_S
$$

导通需要 gate 比 source 更正：

$$
V_{GS}>V_T
$$

PMOS 通常用：

$$
V_{SG}=V_S-V_G
$$

导通需要 source 比 gate 更正：

$$
V_{SG}>|V_T|
$$

记忆方式：

- NMOS：gate high turns on；
- PMOS：gate low turns on。

## Common Source 视角

![Common source terminal convention](../PPT_extracted/assets/1__lecture_1_3_2_mos_transistor_2026/page_008.jpg)

Common Source 是理解 MOSFET 的基本连接方式。以 NMOS 为例：

- source 常接 low potential / ground；
- drain 接输出或 load；
- gate 控制 channel；
- $V_{GS}$ 控制是否形成 channel；
- $V_{DS}$ 决定 channel 中电流和工作区。

后续 amplifier、switch、inverter 的分析都会反复回到 common-source intuition。

## Enhancement NMOS 的物理结构

![Enhancement NMOS structure](../PPT_extracted/assets/1__lecture_1_3_2_mos_transistor_2026/page_009.jpg)

Enhancement-type NMOS 的典型结构：

- p-type body / substrate；
- n+ source 和 n+ drain；
- gate oxide；
- gate electrode。

source/drain 与 p-body 之间形成 pn junction。只要 source/drain 电压不低于 substrate，这些 junction 保持 reverse-biased，器件与 substrate 隔离。

典型尺寸范围：

- $L$：约 $0.03\mu m$ 到 $1\mu m$；
- $W$：约 $0.05\mu m$ 到 $100\mu m$；
- oxide thickness：约 1 到 10 nm。

这些数字说明 MOSFET 是一个强烈依赖 geometry 和 process 的器件。

## NMOS 导通行为

![NMOS behavior](../PPT_extracted/assets/1__lecture_1_3_2_mos_transistor_2026/page_010.jpg)

NMOS 开始导通的条件：

$$
V_{GS}>V_T
$$

Overdrive voltage 定义为：

$$
V_{OV}=V_{GS}-V_T
$$

当 $V_{GS}$ 刚超过 threshold 时，channel 形成，器件开始像 voltage-controlled resistance。$V_{GS}$ 越高，channel conductance 越大，等效 resistance 越低。

可以用一句话抓住直觉：

> NMOS gate 越高，source-drain 通路越容易导电。

## NMOS I-V Curves

![NMOS I-V curves](../PPT_extracted/assets/1__lecture_1_3_2_mos_transistor_2026/page_011.jpg)

NMOS 的 $I_D$-$V_{DS}$ 曲线分两个主要区域：

### Triode / Resistive Region

当 $V_{DS}$ 较小，器件像一个受 $V_{GS}$ 控制的 resistor。

特点：

- $I_D$ 随 $V_{DS}$ 增加；
- channel 尚未 pinch off；
- 常用于 MOS switch / pass transistor 近似。

### Saturation Region

当：

$$
V_{DS}\ge V_{GS}-V_T
$$

器件进入 saturation。理想长沟道模型下，$I_D$ 主要由 $V_{GS}$ 决定，对 $V_{DS}$ 不太敏感。

Saturation 是 analog amplifier 和 current source 最常用的工作区。

## Process Transconductance Parameter

课件给出：

$$
k'_n=\mu_n C_{ox}
$$

其中：

- $\mu_n$ 是 electron mobility；
- $C_{ox}$ 是 oxide capacitance per unit area；
- $W$ 是 transistor width；
- $L$ 是 transistor length。

MOSFET 电流能力与 $W/L$ 有关。粗略地说：

- 增大 $W$：电流能力变强，电阻变小，capacitance 也变大；
- 增大 $L$：电流能力变弱，但输出电阻、matching、analog behavior 可能改善。

这就是为什么 IC 设计里经常说 “sizing transistor”。

## PMOS 与 NMOS 的关系

![PMOS in CMOS process](../PPT_extracted/assets/1__lecture_1_3_2_mos_transistor_2026/page_014.jpg)

CMOS process 中：

- NMOS 通常做在 p-type body / p-epi 中；
- PMOS 做在 n-well 中；
- PMOS 的 source 通常接 $V_{DD}$；
- NMOS 的 source 通常接 ground。

PMOS 和 NMOS 的操作类似，但电压方向上下颠倒。

![NMOS and PMOS voltage convention](../PPT_extracted/assets/1__lecture_1_3_2_mos_transistor_2026/page_015.jpg)

记忆：

- NMOS：所有关键电压通常相对 source 向上；
- PMOS：所有关键电压通常相对 source 向下；
- NMOS 用 $V_{GS}$、$V_{DS}$；
- PMOS 常用 $V_{SG}$、$V_{SD}$。

## Body Effect

![Body effect](../PPT_extracted/assets/1__lecture_1_3_2_mos_transistor_2026/page_017.jpg)

如果 source 和 body 不在同一电位，threshold voltage 会改变，这叫 **body effect**。

直觉：

- NMOS source 通常接 ground，body 也接 ground，此时 body effect 小；
- 如果 source 不在 ground，而 body 仍在 ground，$V_{SB}$ 不为 0；
- $V_T$ 被调制，进而改变 $I_D$；
- analog circuit 中这会改变 bias current、gain、operating point。

Body effect 在以下场景尤其重要：

- source follower；
- stacked transistors；
- pass transistor；
- analog switches；
- current mirror；
- substrate/well bias 不理想的 layout。

## 本讲要点

- MOSFET 的四端口是 G/D/S/B，body 不能总是假装不存在。
- NMOS gate high turns on，PMOS gate low turns on。
- $V_{OV}=V_{GS}-V_T$ 是理解导通强度的重要量。
- Triode region 像可变电阻，saturation region 常用于 amplifier/current source。
- $k'_n=\mu_n C_{ox}$，器件能力与 $W/L$ 强相关。
- PMOS 和 NMOS 电压方向相反，但工作逻辑类似。
- Body effect 会调制 threshold voltage，是 analog IC 中的重要非理想因素。
