# DIC 考点版笔记

> 依据：2022、2023、2024、2025 四份 UESTC4033 真题，以及已经整理好的 lecture notes。  
> 说明：这里的“高频/低频”只代表这四年真题的直接证据，不等于以后绝对这样考。

这套笔记是 **考点版**，不是 PPT 顺序版。写法以中文为主，只在专业术语、公式、VHDL 代码和题目常用关键词中保留英文。重要英文术语第一次出现时会给中文注释，例如：开关点（switching point）、版图（layout）、迟滞（hysteresis）。

<a class="pdf-download" href="/pdf/dic-exam-focus.pdf">PDF Version</a>

## 文件

- [Part 1：Introduction, History & Fundamentals](./part1_introduction_history_fundamentals.md)
- [Part 2：Simulations & Layout](./part2_simulations_layout.md)
- [Part 3：Analog and Digital Blocks](./part3_analog_digital_blocks.md)
- [Part 4：Exam Preparation](./part4_exam_preparation.md)

## 考点分布

| 优先级 | 考点 | 主要来源 | 真题证据 |
|---|---|---|---|
| 最高 | 施密特触发器设计（Schmitt trigger design） | Part 3 | 2022-2025 每年都考 |
| 最高 | VHDL 读写与电路转换 | Part 2 / Part 4 | 2022-2025 每年都考 |
| 最高 | CMOS 开关点/尺寸计算（switching point / sizing） | Part 1 / Part 3 / Part 4 | 2022-2025 每年都考 |
| 高 | 混合信号设计流程（mixed-signal design flow） | Part 1 | 2022、2024、2025 |
| 高 | AOI/OAI 晶体管级实现 | Part 3 / Part 4 | 2023、2024、2025 |
| 高 | 信号调理（signal conditioning） | Part 3 | 2022、2023、2024 |
| 高 | 版图与可靠性（layout / reliability） | Part 2 / Part 3 | 2023、2024、2025 |
| 中高 | 模数转换器（ADC） | Part 3 | 2025 |
| 低直接证据 | SPICE、发展史、dB、电流镜、差分对、频率响应、传输门、锁存器、DAC | 多个 Part | 四年未见直接大题 |

## 复习顺序

1. 先读 Part 4，知道题目通常怎么问。
2. 再读 Part 3 的 Schmitt trigger、CMOS logic、ADC。
3. 同步看 Part 2 的 VHDL 和 layout。
4. 最后回 Part 1 补 design flow、MOS 模型、analog vs digital 背景。

## 特别提醒

2025 Q1(d) 考了 **Flash ADC vs Pipeline ADC**。原 lecture 笔记里 Flash、SAR、Dual-slope 比较完整，但 Pipeline ADC 不够展开。本考点版已经补了流水线 ADC（Pipeline ADC）的结构、速度/分辨率/功耗比较和答题模板。
