# Lec.2 Input and Output Signal Conditioning

> Source: `PPT/3/Lecture 3.1.1_Input_Output Signal Conditioning.pdf`

这一讲把 signal conditioning 放进系统接口中：信号从传感器进入 IC，也要从 IC 输出到另一个芯片、memory、PCB trace、actuator 或 LED。课程里的关键句可以记成：**IC designer 的工作不是到 chip edge 结束，而是到信号可靠到达目的地结束。**

## 1. Analog system 的输入输出链

真实世界的 measurand 经过 sensor element 变成 electrical signal，进入 conditioning、processing，再输出到 actuator 或通信接口。

![Analog functions and interfaces](../PPT_extracted/assets/3__lecture_3_1_1_input_output_signal_conditioning/page_004.jpg)

常见输入：

- light、sound、temperature；
- pressure、movement、speed、acceleration；
- chemistry、voltage、current。

常见输出：

- actuation；
- indication/display；
- control；
- communication；
- voltage/current drive。

## 2. 输入信号调理

输入信号通常需要至少一种处理：

| 处理 | 目的 |
|---|---|
| Amplification | 小信号放大到 ADC/comparator 可识别范围 |
| Attenuation | 大信号缩小到安全输入范围 |
| Comparison | 和 reference 比较，形成 logic-level decision |
| Filtering | 去除高频/低频噪声和干扰 |

即使是“digital signal”，通过 cable 或 PCB 后也会表现出 analog 行为：rise/fall time、ringing、overshoot、threshold uncertainty 都会影响逻辑判断。

## 3. Logic input 不是理想 0/1

最简单的逻辑检测可以用 MOS inverter。但真实 inverter 有：

- threshold voltage；
- transition region；
- NMOS/PMOS 同时部分导通的区域；
- process/temperature variation；
- input noise。

因此，所谓 logic high/low 不是抽象的 1/0，而是带有 $V_{IH}$、$V_{IL}$、noise margin 的 analog voltage range。

## 4. Comparator input

Comparator 是 open-loop op-amp 或专用比较器，用于判断：

$$
V_{in}>V_{ref}\quad \text{or}\quad V_{in}<V_{ref}
$$

优点：

- 把缓慢或小幅变化的 analog signal 变成 clean high/low；
- reference voltage 可设定阈值；
- 可以作为 1-bit ADC；
- 常用于 threshold detection、ADC front-end、alarm trigger。

局限：

- 输入靠近 threshold 时，noise 会造成 false transitions；
- 慢变化信号会在阈值附近停留较久；
- 输出可能在高低电平间抖动。

## 5. Schmitt trigger 用 hysteresis 抗噪声

Schmitt trigger 通过 positive feedback 让 switching threshold 取决于当前输出状态。

![Schmitt trigger window](../PPT_extracted/assets/3__lecture_3_1_1_input_output_signal_conditioning/page_014.jpg)

图中阈值窗口为：

- upper threshold：约 $3.75\,\text{V}$；
- lower threshold：约 $1.25\,\text{V}$；
- center reference：约 $2.5\,\text{V}$。

当输入上升时，要超过 upper threshold 才翻转；当输入下降时，要低于 lower threshold 才翻转。只要噪声幅度小于 hysteresis window，就不会触发多次假翻转。

## 6. Filtering

如果 noise 与 wanted signal 在频率上可分离，可以使用 filter。比如：

- low-pass：去除高频干扰；
- high-pass：去除 DC drift 或低频漂移；
- band-pass：只保留目标频段；
- second-order Butterworth：较平坦的通带响应。

Schmitt trigger 解决的是 threshold 附近的抖动；filter 解决的是频谱上可分离的干扰。两者可以一起用。

## 7. 输出信号调理

输出端问题往往比输入端更复杂，因为输出必须驱动真实负载。常见场景：

- driving another IC；
- connecting to memory；
- driving actuator / LED；
- driving PCB trace / cable；
- serial 或 parallel interface。

设计问题包括：

- 另一个 IC 在同一 package、同一 PCB，还是长 cable 后面？
- 信号是 analog、digital、differential、serial、parallel？
- 连接介质是 on-chip wire、FR4 PCB trace、balanced cable 还是 unbalanced cable？
- 频率是 DC、100 MHz，还是 GHz？
- load 的 input capacitance / resistance / package parasitic 是多少？

## 8. PCB trace effect

![PCB trace effects](../PPT_extracted/assets/3__lecture_3_1_1_input_output_signal_conditioning/page_019.jpg)

同一个 transmitter 输出，到 receiver 端会因为 trace length/stub/parasitics 产生波形劣化：

- ringing；
- overshoot / undershoot；
- edge distortion；
- eye opening 变小；
- threshold crossing 时间不稳定。

高速数字信号本质上是模拟传输线问题。设计者应在发送端和接收端都观察 waveform，而不是只看芯片输出引脚。

## 9. Memory bus 与 parallel interface

Memory connection 通常是 massively parallel bus：

- 32-bit、64-bit、128-bit address/data bus；
- bidirectional data flow；
- clock skew；
- setup/hold timing；
- distributed memory placement。

并行线越多，layout、skew、capacitance、power、simultaneous switching noise 就越重要。芯片内部 memory 分布常常是为了避免长总线延迟和负载问题。

## 10. Driving actuator or LED

驱动负载时，输出级要按负载类型选择：

- simple logic output；
- pull-down；
- pull-up；
- inductive load driver。

对 actuator、LED、relay、motor 这类负载，还要关心：

- drive current；
- chip power dissipation；
- inductive kick；
- output transistor safe operating area；
- SPICE load model 是否包含真实负载。

## 11. 本讲必须带走的结论

- 输入信号即使看起来 digital，也会在物理连接后表现为 analog。
- Comparator 能清理信号，但 noisy threshold crossing 会造成 false transitions。
- Schmitt trigger 用 hysteresis window 抑制阈值附近噪声。
- 输出设计要包括 receiver、PCB/cable、load model，不是只画芯片输出。
- Mixed-signal IC 设计者必须同时理解 on-chip 和 off-chip behavior。
