import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

const sidebar = [
  {
    text: 'Introduction, History & Fundamentals',
    collapsed: false,
    items: [
      { text: 'Lecture.1 Course Overview', link: '/lectures/lec1' },
      { text: 'Lecture.2 History of Semiconductors', link: '/lectures/lec2' },
      { text: 'Lecture.3 Big and Small', link: '/lectures/lec3' },
      { text: 'Lecture.4 IC Design Process', link: '/lectures/lec4' },
      { text: 'Lecture.5 What is CMOS', link: '/lectures/lec5' },
      { text: 'Lecture.6 MOS Transistor', link: '/lectures/lec6' },
      { text: 'Lecture.7 Analog vs Digital', link: '/lectures/lec7' }
    ]
  },
  {
    text: 'Simulations & Layout',
    collapsed: false,
    items: [
      { text: 'Lecture.8 SPICE Fundamentals', link: '/lectures/lec8' },
      { text: 'Lecture.9 SPICE Analysis Types', link: '/lectures/lec9' },
      { text: 'Lecture.10 VHDL Fundamentals', link: '/lectures/lec10' },
      { text: 'Lecture.11 VHDL Examples and Synthesis', link: '/lectures/lec11' },
      { text: 'Lecture.12 Analog Layout Guidelines', link: '/lectures/lec12' }
    ]
  },
  {
    text: 'Analog and Digital Blocks',
    collapsed: false,
    items: [
      { text: 'Lecture.13 Op-Amp Signal Conditioning', link: '/lectures/lec13' },
      { text: 'Lecture.14 Input / Output Conditioning', link: '/lectures/lec14' },
      { text: 'Lecture.15 Schmitt Trigger Design', link: '/lectures/lec15' },
      { text: 'Lecture.16 Current Sources and Mirrors', link: '/lectures/lec16' },
      { text: 'Lecture.17 Differential Pairs', link: '/lectures/lec17' },
      { text: 'Lecture.18 MOSFET Frequency Domain', link: '/lectures/lec18' },
      { text: 'Lecture.19 Frequency Response and Stability', link: '/lectures/lec19' },
      { text: 'Lecture.20 CMOS Logic Gates', link: '/lectures/lec20' },
      { text: 'Lecture.21 Pass Gates', link: '/lectures/lec21' },
      { text: 'Lecture.22 Latches and Flip-Flops', link: '/lectures/lec22' },
      { text: 'Lecture.23 DAC', link: '/lectures/lec23' },
      { text: 'Lecture.24 ADC', link: '/lectures/lec24' },
      { text: 'Lecture.25 Analog Layout Supplement', link: '/lectures/lec25' }
    ]
  },
  {
    text: 'Exam Preparation',
    collapsed: false,
    items: [
      { text: 'Lecture.26 Digital Exam Patterns', link: '/lectures/lec26' },
      { text: 'Lecture.27 VHDL Tutorial Patterns', link: '/lectures/lec27' }
    ]
  }
]

const examFocusSidebar = [
  {
    text: 'Exam-Focus Notes',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/exam-focus/' },
      { text: 'Part 1: Fundamentals', link: '/exam-focus/part1_introduction_history_fundamentals' },
      { text: 'Part 2: Simulations & Layout', link: '/exam-focus/part2_simulations_layout' },
      { text: 'Part 3: Analog / Digital Blocks', link: '/exam-focus/part3_analog_digital_blocks' },
      { text: 'Part 4: Exam Preparation', link: '/exam-focus/part4_exam_preparation' }
    ]
  },
  {
    text: 'Original Lecture Notes',
    collapsed: true,
    items: [
      { text: 'Lecture.1 Course Overview', link: '/lectures/lec1' },
      { text: 'Lecture.10 VHDL Fundamentals', link: '/lectures/lec10' },
      { text: 'Lecture.12 Analog Layout Guidelines', link: '/lectures/lec12' },
      { text: 'Lecture.15 Schmitt Trigger Design', link: '/lectures/lec15' },
      { text: 'Lecture.20 CMOS Logic Gates', link: '/lectures/lec20' },
      { text: 'Lecture.24 ADC', link: '/lectures/lec24' },
      { text: 'Lecture.26 Digital Exam Patterns', link: '/lectures/lec26' },
      { text: 'Lecture.27 VHDL Tutorial Patterns', link: '/lectures/lec27' }
    ]
  }
]

const groupedSidebar = [
  {
    text: 'Grouped Lecture Notes',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/grouped/' }
    ]
  },
  {
    text: 'Part 1',
    collapsed: false,
    items: [
      { text: 'Lecture 1.1 Introduction, History and Scale', link: '/grouped/part1/1.1_introduction_history_and_scale' },
      { text: 'Lecture 1.2 Design Process', link: '/grouped/part1/1.2_design_process' },
      { text: 'Lecture 1.3 CMOS and MOS Transistor', link: '/grouped/part1/1.3_cmos_and_mos_transistor' },
      { text: 'Lecture 1.4 Analog vs Digital', link: '/grouped/part1/1.4_analog_vs_digital' }
    ]
  },
  {
    text: 'Part 2',
    collapsed: false,
    items: [
      { text: 'Lecture 2.1 SPICE and Analysis Types', link: '/grouped/part2/2.1_spice_and_analysis' },
      { text: 'Lecture 2.2 VHDL Fundamentals', link: '/grouped/part2/2.2_vhdl_fundamentals' },
      { text: 'Lecture 2.3 Analog Layout Guidelines', link: '/grouped/part2/2.3_analog_layout_design_guidelines' },
      { text: 'Lecture 2.4 VHDL Examples and Synthesis', link: '/grouped/part2/2.4_vhdl_examples_and_synthesis' }
    ]
  },
  {
    text: 'Part 3',
    collapsed: false,
    items: [
      { text: 'Lecture 3.1 Signal Conditioning and Schmitt Trigger', link: '/grouped/part3/3.1_signal_conditioning_and_schmitt_trigger' },
      { text: 'Lecture 3.2 Current Sources and Digital Blocks', link: '/grouped/part3/3.2_current_sources_and_digital_blocks' },
      { text: 'Lecture 3.3 Frequency Response, DAC and ADC', link: '/grouped/part3/3.3_frequency_response_dac_and_adc' },
      { text: 'Lecture 3.4 Analog Layout Design', link: '/grouped/part3/3.4_analog_layout_design' }
    ]
  },
  {
    text: 'Part 4',
    collapsed: false,
    items: [
      { text: 'Lecture 4.1 Digital Exam Question Patterns', link: '/grouped/part4/4.1_digital_exam_question_patterns' },
      { text: 'Lecture 4.2 VHDL Tutorial Patterns', link: '/grouped/part4/4.2_vhdl_tutorial_patterns' }
    ]
  }
]

export default defineConfig({
  base: '/dic/',
  title: 'Design of Integrated Circuits',
  description: 'DIC lecture notes',
  cleanUrls: false,
  lastUpdated: true,
  markdown: {
    lineNumbers: false,
    config: (md) => {
      md.use(mathjax3)
    }
  },
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Grouped Notes', link: '/grouped/' },
      { text: 'Lectures', link: '/lectures/lec1' },
      { text: 'Exam Focus', link: '/exam-focus/' },
      { text: 'PDF Version', link: '/pdf/dic-exam-focus.pdf' },
      { text: 'Exam Preparation', link: '/lectures/lec26' }
    ],
    sidebar: {
      '/grouped/': groupedSidebar,
      '/exam-focus/': examFocusSidebar,
      '/lectures/': sidebar,
      '/': sidebar
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    search: {
      provider: 'local'
    },
    socialLinks: []
  }
})
