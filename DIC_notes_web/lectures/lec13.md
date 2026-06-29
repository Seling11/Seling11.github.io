# Lec.1 Op-Amp Signal Conditioning

> Sources: `PPT/3/Lecture 3.1.1 Signal Conditioning.pdf`

Signal conditioning 的任务是把真实世界的模拟量整理成后级电路能可靠处理的信号。常见操作包括 amplification、attenuation、filtering、linearization、isolation。Op-amp 是其中最常用的 active building block。

## 1. 为什么需要 signal conditioning

传感器输出通常不是“直接可用”的：

- 电压太小，需要 amplification；
- 电压太大，需要 attenuation；
- 混有 noise/interference，需要 filtering；
- 传感器输出非线性，需要 linearization；
- 两个系统之间可能互相影响，需要 isolation。

数字处理有精度和存储优势，但现实信号首先是 analog。IC 设计者要解决的是：**如何把 analog signal 变成后级可识别、可处理、可转换的形式**。

## 2. Ideal op-amp 假设

理想 op-amp 的常用分析假设：

| Assumption | 含义 |
|---|---|
| $A_{OL}\to\infty$ | open-loop gain 无限大 |
| $R_{in}\to\infty$ | 输入端不吸收电流 |
| $R_{out}\to 0$ | 输出像理想电压源 |
| negative feedback 下 $V_+=V_-$ | virtual short |

实际 op-amp 不是理想的。741 这类器件会有有限 open-loop gain、有限 bandwidth、input bias current、output resistance、slew rate、CMRR 等限制。选 op-amp 时要按应用关注点取舍：

- high-speed：bandwidth、slew rate；
- precision：offset、input resistance、CMRR；
- low-noise：input noise、bias current；
- drive load：output current、output swing。

## 3. Open-loop vs closed-loop

Open-loop op-amp 没有 feedback：

$$
V_{out}=A_v(V_+-V_-)
$$

因为 $A_v$ 极大，open-loop 更像 comparator，而不是线性放大器。要做准确 gain，必须用 negative feedback。

Closed-loop 的核心好处：

- gain 由外部 resistor ratio 决定；
- 对 op-amp open-loop gain 变化不那么敏感；
- 改善 input/output resistance；
- 扩展可用 frequency response；
- 让电路更适合 precision amplification。

## 4. Inverting amplifier

![Inverting amplifier](../PPT_extracted/assets/3__lecture_3_1_1_signal_conditioning/page_013.jpg)

理想情况下，反相端为 virtual ground：

$$
I_{in}=\frac{V_{in}}{R_i},\qquad I_f=-\frac{V_{out}}{R_f}
$$

输入端电流约等于反馈电流，因此：

$$
A_{CL}=\frac{V_{out}}{V_{in}}=-\frac{R_f}{R_i}
$$

要点：

- 输出相位反转 $180^\circ$；
- gain 主要由 $R_f/R_i$ 决定；
- input impedance 约等于 $R_i$，所以反相放大器输入阻抗不一定高；
- finite open-loop gain 会带来闭环增益误差。

## 5. Non-inverting amplifier

![Non-inverting amplifier](../PPT_extracted/assets/3__lecture_3_1_1_signal_conditioning/page_014.jpg)

输入信号接到 non-inverting terminal，反馈分压回 inverting terminal：

$$
A_{CL}=1+\frac{R_f}{R_i}
$$

特点：

- 输出与输入同相；
- input impedance 很高；
- 适合高阻传感器或不能被加载的信号源；
- gain 最小为 1。

例：若传感器输出 $100\,\text{mV}$，需要 $6\,\text{V}$ 触发信号，则所需 gain 为：

$$
A=\frac{6}{0.1}=60
$$

若选择 $R_i=10\,\text{k}\Omega$：

$$
R_f=(A-1)R_i=590\,\text{k}\Omega
$$

## 6. Voltage follower / buffer

Voltage follower 是 gain = 1 的 non-inverting amplifier：

$$
V_{out}=V_{in}
$$

它看似没有放大电压，但能提供 impedance transformation：

- 输入阻抗很高，不加载前级；
- 输出阻抗很低，可以驱动后级或电容性负载；
- 常用于 sensor output 与 ADC input 之间的隔离。

## 7. Summing amplifier

![Summing amplifier](../PPT_extracted/assets/3__lecture_3_1_1_signal_conditioning/page_018.jpg)

多个输入通过电阻汇入反相节点：

$$
V_{out}=-R_f\left(\frac{V_1}{R_1}+\frac{V_2}{R_2}+\frac{V_3}{R_3}\right)
$$

如果 $R_1=R_2=R_3=R$：

$$
V_{out}=-\frac{R_f}{R}(V_1+V_2+V_3)
$$

它可以用于 analog mixing、weighted sum、模拟计算，也可以作为 DAC 输出级思想的一部分。

## 8. Differential amplifier

Differential amplifier 的目标是：

- 放大 differential input；
- 抑制 common-mode input。

定义：

$$
V_{id}=V_2-V_1,\qquad V_{cm}=\frac{V_1+V_2}{2}
$$

输出可写成：

$$
V_{out}=A_dV_{id}+A_{cm}V_{cm}
$$

理想情况 $A_{cm}=0$。实际用 Common Mode Rejection Ratio 衡量：

$$
CMRR=\frac{A_d}{A_{cm}}
$$

差分放大器中电阻匹配很关键。若电阻 ratio 不匹配，common-mode noise 会被转换成 output error。

## 9. Instrumentation amplifier

普通 differential amplifier 的输入阻抗有限，gain 和 input impedance 之间有 trade-off。Instrumentation amplifier 用前级 buffer/增益级提高输入阻抗，再用差分级相减。

特点：

- high input impedance；
- low output impedance；
- high CMRR；
- accurate differential gain；
- 适合 thermocouple、ECG、EEG、bridge sensor 等低幅度信号。

三 op-amp instrumentation amplifier 的核心思想是：

1. 两个输入先分别经过高阻 buffer/gain stage；
2. 中间电阻控制 differential gain；
3. 后级 differential amplifier 抑制 common-mode。

## 10. 本讲必须带走的结论

- Open-loop op-amp 更像 comparator；准确放大依赖 negative feedback。
- Inverting gain 为 $-R_f/R_i$，input impedance 约为 $R_i$。
- Non-inverting gain 为 $1+R_f/R_i$，input impedance 高。
- Buffer 不放大电压，但完成阻抗隔离。
- Differential / instrumentation amplifier 的关键是 common-mode rejection 和 resistor matching。
