# Lec.3 Schmitt Trigger Design

> Sources: `PPT/3/Lecture 3.1.2 Analogue Signal Conditioning Schmitt Trigger.pdf`, `PPT/3/Lecture 3.1.2_Design a Schmidt Trigger (2).pdf`

Schmitt trigger 是带 **hysteresis** 的 comparator。它通过 positive feedback 生成两个不同的 switching thresholds，解决普通 comparator 在 noisy/slow input 附近反复翻转的问题。

## 1. Comparator 的问题

普通 open-loop comparator 判断：

$$
V_{out}=+V_{sat}\quad \text{if }V_{signal}>V_{ref}
$$

$$
V_{out}=-V_{sat}\quad \text{if }V_{signal}<V_{ref}
$$

如果输入信号缓慢穿过 $V_{ref}$，或阈值附近叠加了 $\mu\text{V}$ 到 $\text{mV}$ 级噪声，输出会多次乱跳。这在 alarm、logic input、zero crossing detector 中很危险。

## 2. Hysteresis 的概念

Schmitt trigger 设置两个阈值：

- **UTP** (*Upper Threshold Point*)：输入上升超过此值时输出翻转；
- **LTP** (*Lower Threshold Point*)：输入下降低于此值时输出翻转；
- **hysteresis window**：$V_H=UTP-LTP$。

在 UTP 和 LTP 之间，输出保持原状态，这个区域也叫 dead band。

## 3. Inverting Schmitt trigger

输入接到 inverting terminal，输出通过电阻网络反馈到 non-inverting terminal。参考端电压由输出状态决定：

$$
V_{ref}=V_{out}\frac{R_2}{R_1+R_2}
$$

当输出饱和为 $+V_{sat}$：

$$
UTP=+V_{sat}\frac{R_2}{R_1+R_2}
$$

当输出饱和为 $-V_{sat}$：

$$
LTP=-V_{sat}\frac{R_2}{R_1+R_2}
$$

若需要对称阈值，例如 $UTP=1\,\text{V}$、$LTP=-1\,\text{V}$、$V_{sat}=12\,\text{V}$：

$$
\frac{R_2}{R_1+R_2}=\frac{1}{12}
$$

取 $R_2=1\,\text{k}\Omega$，则 $R_1=11\,\text{k}\Omega$。

## 4. 非对称阈值

如果 UTP 和 LTP 不以 0 为中心，就需要引入 nonzero reference voltage。基本设计思路：

1. 先确定输出电平：例如 $\pm 15\,\text{V}$ 或 $0/5\,\text{V}$；
2. 决定输入信号范围和噪声大小；
3. 选择 UTP/LTP，使 hysteresis window 大于噪声；
4. 由两个阈值方程反解 $R_1,R_2,V_{ref}$。

例如同极性阈值 $UTP=2\,\text{V}$、$LTP=1\,\text{V}$ 时，必须使用偏置 reference，否则对称电源下电阻反馈只能给出关于 0 对称的阈值。

## 5. 0-5 V Schmitt trigger 设计步骤

课程例子：输出为 $+5\,\text{V}$ 和 $0\,\text{V}$，参考中心为 $2.5\,\text{V}$，输入低于 $0.8\,\text{V}$ 算 low，高于 $4.2\,\text{V}$ 算 high。可选阈值：

$$
LTP=1.5\,\text{V},\qquad UTP=3.5\,\text{V}
$$

这样阈值关于 $2.5\,\text{V}$ 对称，hysteresis window 为：

$$
V_H=3.5-1.5=2.0\,\text{V}
$$

设计时检查两个输出状态：

- 输出为 $5\,\text{V}$，输入从 high 向 low 下降，计算 $1.5\,\text{V}$ 阈值；
- 输出为 $0\,\text{V}$，输入从 low 向 high 上升，检查 $3.5\,\text{V}$ 阈值。

课件示例给出一组可行值：

$$
R_1=25\,\text{k}\Omega,\qquad R_3=10\,\text{k}\Omega
$$

## 6. 设计 checklist

设计 Schmitt trigger 时按这个顺序：

1. 明确输出电平：$\pm V_{sat}$、$0/5\,\text{V}$、$0/3.3\,\text{V}$ 等；
2. 明确输入范围和噪声幅度；
3. 选择 UTP/LTP，保证 window 大于噪声；
4. 选择 reference voltage；
5. 计算反馈电阻 ratio；
6. 检查两个方向的 switching threshold；
7. 用 SPICE transient 验证 noisy input 下不会 false trigger。

## 7. 本讲必须带走的结论

- 普通 comparator 对 threshold 附近 noise 很敏感。
- Schmitt trigger 用 positive feedback 生成 UTP 和 LTP。
- Hysteresis window 必须大于预期噪声幅度。
- 对称阈值可由电阻比例直接得到；非对称阈值需要 reference/bias。
- 设计时要分别检查 rising input 和 falling input 两个方向。
