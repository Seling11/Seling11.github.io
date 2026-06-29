# Lec.3 工程数量级与 dB

> **_Big and Small: An Engineering Number Line_**

这讲是一个短章节，目的是让你重新建立 microelectronics 中的数量级直觉。DIC 里会频繁出现 $mV$、$\mu A$、$fF$、$ns$、$\mu m$、$dB$，如果没有数量级感，后面的电路计算很容易错一个甚至几个数量级。

## 线性数轴和对数数轴

普通 number line 适合处理加减，比如：

$$
2 + 5 = 7
$$

但工程里经常处理的是倍数关系，例如 gain、attenuation、frequency ratio、resistance ratio。倍数关系更适合用 logarithmic number line，因为乘除可以转成加减：

$$
\log(2 \times 5)=\log 2+\log 5=\log 10
$$

这就是为什么 analog engineer 经常使用 dB。

## dB 的基本意义

dB 是一个对数单位。它表达的是 ratio，而不是绝对值。

功率比：

$$
G_{dB}=10\log_{10}\left(\frac{P_2}{P_1}\right)
$$

电压比或电流比：

$$
G_{dB}=20\log_{10}\left(\frac{V_2}{V_1}\right)
$$

原因是功率通常与电压平方成正比：

$$
P \propto V^2
$$

所以电压比进入对数时系数是 20，而功率比是 10。

## 常用 dB 速记

| Ratio | dB approx. | 直觉 |
| ---: | ---: | --- |
| 2 | 6 dB | 电压/电流约翻倍 |
| 10 | 20 dB | 电压/电流十倍 |
| 0.5 | -6 dB | 电压/电流约减半 |
| 0.1 | -20 dB | 电压/电流十分之一 |

课件里的例子：

$$
6 + 14 = 20\ \text{dB}
$$

意思是 dB 中的乘法关系可以用加法处理。比如一个 stage 有 $6dB$ gain，另一个 stage 有 $14dB$ gain，总 gain 是 $20dB$。

## Engineering multipliers

电子工程里必须熟悉 SI prefixes。特别是 IC 里常见的量级：

| Prefix | Symbol | Factor | DIC 中常见例子 |
| --- | --- | ---: | --- |
| tera | T | $10^{12}$ | large memory / data rate context |
| giga | G | $10^9$ | GHz clock, Gbps |
| mega | M | $10^6$ | MHz, MΩ |
| kilo | k | $10^3$ | kΩ |
| milli | m | $10^{-3}$ | mA, mV |
| micro | $\mu$ | $10^{-6}$ | $\mu A$, $\mu m$ |
| nano | n | $10^{-9}$ | ns, nF |
| pico | p | $10^{-12}$ | pF |
| femto | f | $10^{-15}$ | fF in MOS capacitance |

## 为什么这章对 IC 设计有用？

IC 设计里经常需要同时处理非常不同的尺度：

- 几十 nm 的 oxide thickness；
- 几 $\mu m$ 到几十 $\mu m$ 的 transistor width；
- fF/pF 级 capacitance；
- ns 级 transition time；
- MHz/GHz 级 frequency；
- $\mu A$ 到 mA 级 bias current；
- kΩ/MΩ 级 resistance。

如果一个 capacitance 从 $fF$ 被误看成 $pF$，差了 $10^3$ 倍，delay、bandwidth、power 的判断都会错。

## 本讲要点

- Linear scale 适合加减，log scale 适合乘除和 ratio。
- dB 是 ratio 表达，analog circuit 里尤其常见。
- 电压/电流 ratio 用 $20\log_{10}$，功率 ratio 用 $10\log_{10}$。
- IC 中的量级跨度极大，必须熟悉 $m,\mu,n,p,f$ 等 prefix。
- 后续看到 $RC$ delay、gain、capacitance、frequency response 时，先检查数量级。
