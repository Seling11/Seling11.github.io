# Lec.6 MOSFETs in the Frequency Domain

> Source: `PPT/3/Lecture 3.2.2- Differential Pairs and MOSFETs in Frequency domain.pdf` pages 26-80

这一讲回答两个问题：MOSFET 本身能多快？一个含 MOSFET 的放大电路能多快？答案由 transconductance、寄生电容、Miller effect、load capacitance、poles/zeros 共同决定。

## 1. MOSFET 不是理想受控电流源

实际 MOSFET 有寄生电容：

- $C_{GS}$：gate-source capacitance；
- $C_{GD}$：gate-drain overlap capacitance；
- $C_{DB}$：drain-bulk junction capacitance；
- $C_{SB}$：source-bulk capacitance。

这些电容和电路电阻一起形成 time constants，限制频率响应。

## 2. $C_{GS}$ 与 $C_{GD}$

在 saturation 下：

$$
C_{GS}\approx \frac{2}{3}C_{ox}WL+C_{ov}W
$$

其中 $C_{ox}$ 是单位面积 gate oxide capacitance，$C_{ov}$ 是 overlap capacitance per unit width。

$C_{GD}$ 主要来自 gate-drain overlap：

$$
C_{GD}=C_{ov}W
$$

![Gate-drain capacitance](../PPT_extracted/assets/3__lecture_3_2_2_differential_pairs_and_mosfets_in_frequency_domain/page_043.jpg)

$C_{GD}$ 数值可能不大，但在 amplifier 中会被 Miller effect 放大，因此常常成为 bandwidth limitation 的关键。

## 3. Cutoff frequency

若只考虑 $C_{GS}$，gate 电流：

$$
i_G=v_GsC_{GS}
$$

drain 小信号电流：

$$
i_D=g_mv_G
$$

当 current gain 降为 1，即 $i_G=i_D$：

$$
v_G(2\pi f_c)C_{GS}=g_mv_G
$$

得到：

$$
f_c=\frac{g_m}{2\pi C_{GS}}
$$

这表示 MOSFET 的 intrinsic speed limit。实际设计中，工作频率通常要显著低于这个频率。

## 4. Gain-speed tradeoff

由于：

$$
g_m=\sqrt{2\beta I_D}
$$

所以：

$$
f_c\propto \sqrt{I_D}
$$

提高 bias current 可以提高速度。但最大电压增益：

$$
A_{max}=g_mr_o
$$

又因为：

$$
r_o\approx \frac{1}{\lambda I_D}
$$

所以较大的 $I_D$ 会降低 $r_o$，进而降低可获得的最大增益。结论：**高速通常需要更大电流，但高增益往往喜欢较小电流和较大输出电阻。**

## 5. Miller effect

当电容连接在 amplifier 输入和输出之间时，它不等效于普通接地电容。若：

$$
v_{out}=-Av_{in}
$$

流过反馈电容 $C$ 的电流：

$$
i_{in}=(v_{in}-v_{out})sC=(1+A)sCv_{in}
$$

因此输入端看到的等效电容约为：

$$
C_{in,eq}\approx (1+A)C
$$

这就是 Miller effect。它解释了为什么很小的 $C_{GD}$ 在高增益 common-source amplifier 中会显著降低输入 pole 频率。

## 6. Load capacitance

放大器总要驱动真实负载：下一级 gate、电容、wire、PCB trace、pad。Load capacitance $C_L$ 与输出电阻形成高频 pole：

$$
f_H\approx \frac{g_m}{2\pi C_L}
$$

如果 $C_L$ 很大，output node 会成为 dominant high-frequency limitation。

## 7. 两个 poles 和一个 zero

含 feedback capacitance $C_F$ 和 load capacitance $C_L$ 的 common-source amplifier 通常会出现：

- low-frequency pole：Miller 等效输入电容；
- high-frequency pole：load capacitance；
- zero：输入到输出之间的 capacitive feedforward path。

课件给出的直观近似：

$$
p_L\approx \frac{1}{2\pi R_1G_0C_L}
$$

$$
p_H\approx \frac{g_m}{2\pi C_L}
$$

$$
z\approx \frac{g_m}{2\pi C_F}
$$

其中 $G_0$ 是低频增益相关项。具体系数依赖拓扑，但设计直觉是：**最大 time constant 形成 dominant pole，feedforward capacitance 可能引入 zero。**

## 8. 什么时候不能只靠手算

完整电路包含 nonlinear capacitance、MOSFET 方程、KCL、KVL，严格求解会很复杂。手算的价值不是取代 SPICE，而是提供判断：

- 哪个 node 可能是 dominant pole；
- 哪个电容被 Miller 放大；
- 提高 bias current 会改善速度还是破坏 gain/power；
- load capacitance 是否已经主导响应。

## 9. 本讲必须带走的结论

- $C_{GS}$、$C_{GD}$、$C_{DB}$、$C_{SB}$ 限制 MOSFET 高频行为。
- $f_c=g_m/(2\pi C_{GS})$ 给出一个 intrinsic speed intuition。
- $C_{GD}$ 虽小，但会被 Miller effect 放大。
- 频率响应和增益/功耗有 tradeoff。
- MOSFET amplifier 通常至少有 low-frequency pole、high-frequency pole 和 zero。
