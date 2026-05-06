/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Volume2, Star, Heart, Sparkles, ChevronRight, Tv } from 'lucide-react';

// Data Hub for all 12 episodes
// Detailed Episode 1 Data from Video and PDF
const EPISODES_DATA = [
  {
  "id": 1,
  "title": "Episode 1",
  "bvid": "BV1DwRCBGEM8",
  "subtitles": [
    { "id": 1, "text_en": "How do you do? I'm the King. I'm the King of Gondoland.", "text_cn": "你好！我是国王。我是冈多兰的国王。" },
    { "id": 2, "text_en": "How do you do? I'm the Queen.", "text_cn": "你好！我是王后。" },
    { "id": 3, "text_en": "Hello. I'm Princess Sylvia.", "text_cn": "你好。我是西尔维娅公主。" },
    { "id": 4, "text_en": "Oh, Sylvia! Sylvia! Hello. I'm Bob. I'm the gardener.", "text_cn": "哦，西尔维娅！西尔维娅！你好。我是鲍勃。我是园丁。" },
    { "id": 5, "text_en": "How do you do? I'm Corvax.", "text_cn": "你好！我是科瓦克斯。" },
    { "id": 6, "text_en": "Thank you, Corvax.", "text_cn": "谢谢你，科瓦克斯。" },
    { "id": 7, "text_en": "Hi! I'm Muzzy. Big Muzzy.", "text_cn": "嗨！我是玛泽。大玛泽。" },
    { "id": 8, "text_en": "Good Morning.", "text_cn": "早上好。" },
    { "id": 9, "text_en": "Good Morning.", "text_cn": "早上好。" },
    { "id": 10, "text_en": "Good morning. I'm Norman.", "text_cn": "早上好。我是诺曼。" },
    { "id": 11, "text_en": "Good morning. Good afternoon. Good evening.", "text_cn": "早上好。下午好。晚上好。" },
    { "id": 12, "text_en": "Good night.", "text_cn": "晚安。" },
    { "id": 13, "text_en": "Good night.", "text_cn": "晚安。" },
    { "id": 14, "text_en": "Good night.", "text_cn": "晚安。" },
    { "id": 15, "text_en": "I'm strong.", "text_cn": "我很强壮。" },
    { "id": 16, "text_en": "I'm fat. I'm fat. I'm fat. I'm fat.", "text_cn": "我很胖。我很胖。我很胖。我很胖。" },
    { "id": 17, "text_en": "I'm beautiful.", "text_cn": "我很美丽。" },
    { "id": 18, "text_en": "I'm clever.", "text_cn": "我很聪明。" },
    { "id": 19, "text_en": "I'm brave.", "text_cn": "我很勇敢。" },
    { "id": 20, "text_en": "Strong.", "text_cn": "强壮。" },
    { "id": 21, "text_en": "Fat.", "text_cn": "胖。" },
    { "id": 22, "text_en": "Beautiful.", "text_cn": "美丽。" },
    { "id": 23, "text_en": "Clever.", "text_cn": "聪明。" },
    { "id": 24, "text_en": "And brave.", "text_cn": "和勇敢。" },
    { "id": 25, "text_en": "You're strong.", "text_cn": "你很强大。" },
    { "id": 26, "text_en": "Yes, I am. And you're fat.", "text_cn": "是的，我是。而且你很胖。" },
    { "id": 27, "text_en": "Yes, I am.", "text_cn": "是的，我是。" },
    { "id": 28, "text_en": "And she's beautiful. Yes, she is.", "text_cn": "她很美丽。是的，她是。" },
    { "id": 29, "text_en": "He's brave. And he's clever.", "text_cn": "他很勇敢。而且他很聪明。" },
    { "id": 30, "text_en": "No, no! I'm clever. I'm clever. Clever! Clever!", "text_cn": "不，不！我很聪明。我很聪明。聪明！聪明！" },
    { "id": 31, "text_en": "Strong. Fat. Beautiful. Clever. And brave.", "text_cn": "强壮。胖。美丽。聪明。和勇敢。" },
    { "id": 32, "text_en": "Big. I'm big. Big Muzzy.", "text_cn": "大。我很大。大玛泽。" },
    { "id": 33, "text_en": "I've got a computer.", "text_cn": "我有一台电脑。" },
    { "id": 34, "text_en": "I've got a garden. Look! I've got plums. I've got peaches. I've got grapes.", "text_cn": "我有一个花园。看！我有李子。我有桃子。我有葡萄。" },
    { "id": 35, "text_en": "I'm big Muzzy.", "text_cn": "我是大玛泽。" },
    { "id": 36, "text_en": "Big.", "text_cn": "大。" },
    { "id": 37, "text_en": "Small.", "text_cn": "小。" },
    { "id": 38, "text_en": "And I'm big Muzzy.", "text_cn": "而且我是大玛泽。" },
    { "id": 39, "text_en": "I like plums. I like peaches. I like grapes.", "text_cn": "我喜欢李子。我喜欢桃子。我喜欢葡萄。" },
    { "id": 40, "text_en": "And I like grapes.", "text_cn": "而且我喜欢葡萄。" },
    { "id": 41, "text_en": "Hello, Mommy. Hello, Daddy. Can I have a peach, please?", "text_cn": "你好，妈妈。你好，爸爸。请问我能要一个桃子吗？" },
    { "id": 42, "text_en": "I've got a bag. A big bag. I've got a map. I've got a hamburger.", "text_cn": "我有一个包。一个大包。我有一张地图。我有一个汉堡包。" },
    { "id": 43, "text_en": "I've got a bike. A motorcycle.", "text_cn": "我有一辆自行车。一辆摩托车。" },
    { "id": 44, "text_en": "I like hamburgers. Can I have a hamburger, please?", "text_cn": "我喜欢汉堡包。请问我能要一个汉堡包吗？" },
    { "id": 45, "text_en": "Here you are.", "text_cn": "给你。" },
    { "id": 46, "text_en": "Thank you. Can I have a salad, please?", "text_cn": "谢谢。请问我能要一份沙拉吗？" },
    { "id": 47, "text_en": "Here you are.", "text_cn": "给你。" },
    { "id": 48, "text_en": "A plum- a peach- a grape. A plum- a peach- some grapes. A plum- a plum- a plum! Three plums! Jackpot! Plums! Plums! Plums!", "text_cn": "一个李子，一个桃子，一个葡萄。一个李子，一个桃子，一些葡萄。一个李子，一个李子，一个李子！三个李子！中大奖了！李子！李子！李子！" },
    { "id": 49, "text_en": "Thank you. Can I have a drink, please?", "text_cn": "谢谢。请问我能要一杯饮料吗？" },
    { "id": 50, "text_en": "Here you are.", "text_cn": "给你。" },
    { "id": 51, "text_en": "Thank you. Can I have an ice-cream, please?", "text_cn": "谢谢。请问我能要一个冰淇淋吗？" },
    { "id": 52, "text_en": "Here you are.", "text_cn": "给你。" },
    { "id": 53, "text_en": "Thank you. Can I get cleaned up, please?", "text_cn": "谢谢。请问我能清洁一下吗？" },
    { "id": 54, "text_en": "Can I have a peach please, Daddy?", "text_cn": "请问我能要一个桃子吗，爸爸？" },
    { "id": 55, "text_en": "Yes. A peach!", "text_cn": "好的。一个桃子！" },
    { "id": 56, "text_en": "A peach.", "text_cn": "一个桃子。" },
    { "id": 57, "text_en": "Thank you. Can I have a plum and some grapes, please?", "text_cn": "谢谢。请问我能要一个李子和一些葡萄吗？" },
    { "id": 58, "text_en": "Bob", "text_cn": "鲍勃" },
    { "id": 59, "text_en": "Yes?", "text_cn": "嗯？" },
    { "id": 60, "text_en": "Trees!", "text_cn": "树！" },
    { "id": 61, "text_en": "Trees?", "text_cn": "树？" },
    { "id": 62, "text_en": "Yes. How many trees? Count!", "text_cn": "是的。多少棵树？数一数！" },
    { "id": 63, "text_en": "One, two, three, four, five, six, seven, eight, nine, ten.", "text_cn": "一，二，三，四，五，六，七，八，九，十。" },
    { "id": 64, "text_en": "Yes. A plum and some grapes!", "text_cn": "好的。一个李子和一些葡萄！" },
    { "id": 65, "text_en": "A plum and some grapes.", "text_cn": "一个李子和一些葡萄。" },
    { "id": 66, "text_en": "Thank You.", "text_cn": "谢谢。" },
    { "id": 67, "text_en": "How many trees are there?", "text_cn": "那里有多少棵树？" },
    { "id": 68, "text_en": "One, two, three, four, five, six, seven, eight, nine, ten.", "text_cn": "一，二，三，四，五，六，七，八，九，十。" },
    { "id": 69, "text_en": "Buses! How many bushes are there?", "text_cn": "灌木！那里有多少丛灌木？" },
    { "id": 70, "text_en": "There are two- four- six- eight- ten.", "text_cn": "有二，四，六，八，十。" },
    { "id": 71, "text_en": "And how many flowers are there?", "text_cn": "那里有多少朵花？" },
    { "id": 72, "text_en": "Flowers?", "text_cn": "花？" },
    { "id": 73, "text_en": "Yes. Yes. How many flowers?", "text_cn": "是的，是的。多少朵花？" },
    { "id": 74, "text_en": "A hundred? Two hundred? Three hundred? I don't know.", "text_cn": "一百？两百？三百？我不知道。" },
    { "id": 75, "text_en": "I don't know.", "text_cn": "我不知道。" },
    { "id": 76, "text_en": "A hundred and seven. A hundred and eight.", "text_cn": "一百零七。一百零八。" },
    { "id": 77, "text_en": "A hundred and nine.", "text_cn": "一百零九。" },
    { "id": 78, "text_en": "A hundred and ten.", "text_cn": "一百一十。" },
    { "id": 79, "text_en": "Bob! Can I have a rose, please?", "text_cn": "鲍勃！请问我能要一朵玫瑰吗？" },
    { "id": 80, "text_en": "Thank you. I like roses.", "text_cn": "谢谢。我喜欢玫瑰。" },
    { "id": 81, "text_en": "And I like you.", "text_cn": "而且我喜欢你。" },
    { "id": 82, "text_en": "Oh, look! I've got a rose. I've got a plum and a peach and some grapes. A hamburger and a map.", "text_cn": "哦，看！我有一朵玫瑰。我有一个李子和一个桃子还有一些葡萄。一个汉堡包和一张地图。" },
    { "id": 83, "text_en": "And I've got...a bike. I love you.", "text_cn": "而且我有……一辆自行车。我爱你。" },
    { "id": 84, "text_en": "And I love you.", "text_cn": "我也爱你。" },
    { "id": 85, "text_en": "Here we go!", "text_cn": "我们走吧！" },
    { "id": 86, "text_en": "No! No! No! I love the Princess! I love Sylvia!", "text_cn": "不！不！不！我爱公主！我爱西尔维娅！" },
    { "id": 87, "text_en": "A, E, I, O, U I love you. A, U, O, I, E You love me. A, E, I, U, O Off we go. I, O, U, E, A Far, far away. A, U, I, O, E You love me. A, E, I, O, U I love you! A, E, I, O, U I love you!", "text_cn": "A, E, I, O, U 我爱你。A, U, O, I, E 你爱我。A, E, I, U, O 我们出发。I, O, U, E, A 很远很远。A, U, I, O, E 你爱我。A, E, I, O, U 我爱你！A, E, I, O, U 我爱你！" },
    { "id": 88, "text_en": "The gardener loves the Princess?", "text_cn": "园丁爱公主？" },
    { "id": 89, "text_en": "Yes! Yes!", "text_cn": "是的！是的！" },
    { "id": 90, "text_en": "No! No! No!", "text_cn": "不！不！不！" },
    { "id": 91, "text_en": "The Princess loves the gardener?", "text_cn": "公主爱园丁？" },
    { "id": 92, "text_en": "Yes! Yes!", "text_cn": "是的！是的！" },
    { "id": 93, "text_en": "No! No!", "text_cn": "不！不！" },
    { "id": 94, "text_en": "Come on! Off we go! Follow me!", "text_cn": "来吧！我们走！跟我来！" },
    { "id": 95, "text_en": "Bye!", "text_cn": "再见！" },
    { "id": 96, "text_en": "Take him away, take him away, ...", "text_cn": "把他带走，把他带走……" },
    { "id": 97, "text_en": "Thank you, Corvax.", "text_cn": "谢谢你，科瓦克斯。" }
  ],
  "words": [
    { "word": "king", "phonetic": "/kɪŋ/", "translation": "国王", "example": "I'm the King of Gondoland.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "queen", "phonetic": "/kwiːn/", "translation": "王后", "example": "I'm the queen.", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "princess", "phonetic": "/prɪnˈses/", "translation": "公主", "example": "I'm princess sylvia.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "gardener", "phonetic": "/ˈɡɑːrdnər/", "translation": "园丁", "example": "I'm the gardener.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "strong", "phonetic": "/strɔːŋ/", "translation": "强壮的", "example": "I'm strong.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "brave", "phonetic": "/breɪv/", "translation": "勇敢的", "example": "I'm brave.", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "clever", "phonetic": "/ˈklevər/", "translation": "聪明的", "example": "I'm clever.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "fat", "phonetic": "/fæt/", "translation": "胖的", "example": "I'm fat.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "beautiful", "phonetic": "/ˈbjuːtɪfl/", "translation": "美丽的", "example": "You're beautiful.", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "big", "phonetic": "/bɪɡ/", "translation": "大的", "example": "I'm big.", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "small", "phonetic": "/smɔːl/", "translation": "小的", "example": "I'm small.", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "plum", "phonetic": "/plʌm/", "translation": "李子", "example": "I've got a plum.", "color": "bg-violet-100 border-violet-200 text-violet-700" },
    { "word": "peach", "phonetic": "/piːtʃ/", "translation": "桃子", "example": "Can I have a peach, please?", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "grape", "phonetic": "/ɡreɪp/", "translation": "葡萄", "example": "I like grapes.", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "computer", "phonetic": "/kəmˈpjuːtər/", "translation": "电脑", "example": "I've got a computer.", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" }
  ]
},
  
  // -------- 第 2 集 --------
 {
  "id": 2,
  "title": "Episode 2",
  "bvid": "BV1DwRCBGEzC",
  "subtitles": [
    { "id": 1, "text_en": "Hi!", "text_cn": "嗨！" },
    { "id": 2, "text_en": "Hello!", "text_cn": "你好！" },
    { "id": 3, "text_en": "Daddy! Mommy!", "text_cn": "爸爸！妈妈！" },
    { "id": 4, "text_en": "Corvax!", "text_cn": "科瓦克斯！" },
    { "id": 5, "text_en": "Sylvia! Sylvia! Sylvia!", "text_cn": "西尔维娅！西尔维娅！西尔维娅！" },
    { "id": 6, "text_en": "Oh, Mommy!", "text_cn": "哦，妈妈！" },
    { "id": 7, "text_en": "Grrrrrr!", "text_cn": "呃——！" },
    { "id": 8, "text_en": "I love Princess Sylvia.", "text_cn": "我爱西尔维娅公主。" },
    { "id": 9, "text_en": "Take him away!", "text_cn": "把他带走！" },
    { "id": 10, "text_en": "Name?", "text_cn": "姓名？" },
    { "id": 11, "text_en": "Bob.", "text_cn": "鲍勃。" },
    { "id": 12, "text_en": "Age?", "text_cn": "年龄？" },
    { "id": 13, "text_en": "Twenty.", "text_cn": "二十。" },
    { "id": 14, "text_en": "Job?", "text_cn": "职业？" },
    { "id": 15, "text_en": "Gardener.", "text_cn": "园丁。" },
    { "id": 16, "text_en": "Take him away.", "text_cn": "把他带走。" },
    { "id": 17, "text_en": "Number nineteen.", "text_cn": "十九号。" },
    { "id": 18, "text_en": "Number nineteen!", "text_cn": "十九号！" },
    { "id": 19, "text_en": "Nine.", "text_cn": "九。" },
    { "id": 20, "text_en": "Ten.", "text_cn": "十。" },
    { "id": 21, "text_en": "Eleven.", "text_cn": "十一。" },
    { "id": 22, "text_en": "Twelve.", "text_cn": "十二。" },
    { "id": 23, "text_en": "Thirteen.", "text_cn": "十三。" },
    { "id": 24, "text_en": "Fourteen.", "text_cn": "十四。" },
    { "id": 25, "text_en": "Fifteen.", "text_cn": "十五。" },
    { "id": 26, "text_en": "Sixteen.", "text_cn": "十六。" },
    { "id": 27, "text_en": "Seventeen.", "text_cn": "十七。" },
    { "id": 28, "text_en": "Eighteen.", "text_cn": "十八。" },
    { "id": 29, "text_en": "Nineteen.", "text_cn": "十九。" },
    { "id": 30, "text_en": "Twenty.", "text_cn": "二十。" },
    { "id": 31, "text_en": "Oh! Nineteen!!", "text_cn": "哦！十九号！！" },
    { "id": 32, "text_en": "Ach! A monster!", "text_cn": "啊！一个怪物！" },
    { "id": 33, "text_en": "Hello. I'm Muzzy. Big Muzzy.", "text_cn": "你好。我是玛泽。大玛泽。" },
    { "id": 34, "text_en": "What? What's this?", "text_cn": "什么？这是什么？" },
    { "id": 35, "text_en": "I don't know.", "text_cn": "我不知道。" },
    { "id": 36, "text_en": "I'm hungry. I'm hungry. I'm hungry.", "text_cn": "我饿了。我饿了。我饿了。" },
    { "id": 37, "text_en": "Lovely! Lovely! I like clocks.", "text_cn": "好吃！好吃！我喜欢钟表。" },
    { "id": 38, "text_en": "Plums! Plums! Delicious plums!", "text_cn": "李子！李子！美味的李子！" },
    { "id": 39, "text_en": "What's this?", "text_cn": "这是什么？" },
    { "id": 40, "text_en": "It's a plum.", "text_cn": "这是一个李子。" },
    { "id": 41, "text_en": "It's a bike. What's this?", "text_cn": "这是一辆自行车。这是什么？" },
    { "id": 42, "text_en": "I don't know.", "text_cn": "我不知道。" },
    { "id": 43, "text_en": "It's a spaceship. What's this?", "text_cn": "这是一艘宇宙飞船。这是什么？" },
    { "id": 44, "text_en": "It's a clock.", "text_cn": "这是一个钟表。" },
    { "id": 45, "text_en": "What's this? It's a clock.", "text_cn": "这是什么？这是一个钟表。" },
    { "id": 46, "text_en": "No, it's a parking meter.", "text_cn": "不，这是一个停车计时器。" },
    { "id": 47, "text_en": "What's this? It's a typewriter.", "text_cn": "这是什么？这是一台打字机。" },
    { "id": 48, "text_en": "No, it's a computer.", "text_cn": "不，这是一台电脑。" },
    { "id": 49, "text_en": "What's this? It's a cat.", "text_cn": "这是什么？这是一只猫。" },
    { "id": 50, "text_en": "What's that? What's that?", "text_cn": "那是什么？那是什么？" },
    { "id": 51, "text_en": "It's my bell. It's my bell. See you!", "text_cn": "这是我的铃铛。这是我的铃铛。再见！" },
    { "id": 52, "text_en": "I don't like these and I don't like those.", "text_cn": "我不喜欢这些，也不喜欢那些。" },
    { "id": 53, "text_en": "Ah! What's that? What's that thing?", "text_cn": "啊！那是什么？那个东西是什么？" },
    { "id": 54, "text_en": "That thing. That thing!", "text_cn": "那个东西。那个东西！" },
    { "id": 55, "text_en": "It's a parking meter. A parking meter? Yes.", "text_cn": "这是一个停车计时器。停车计时器？是的。" },
    { "id": 56, "text_en": "Yuk! Ugh! I don't like it!", "text_cn": "呀！呃！我不喜欢它！" },
    { "id": 57, "text_en": "Look. How about this?", "text_cn": "看。这个怎么样？" },
    { "id": 58, "text_en": "What is it?", "text_cn": "这是什么？" },
    { "id": 59, "text_en": "It's a peach. Eat it! It's delicious. Eat it!", "text_cn": "这是一个桃子。吃吧！很好吃。吃吧！" },
    { "id": 60, "text_en": "Yuk ... No! Horrible! I don't like it. It's horrible.", "text_cn": "呀……不！好难吃！我不喜欢它。太难吃了。" },
    { "id": 61, "text_en": "I don't like this. And I don't like that.", "text_cn": "我不喜欢这个。我也不喜欢那个。" },
    { "id": 62, "text_en": "This. That.", "text_cn": "这个。那个。" },
    { "id": 63, "text_en": "Mmmmm! Lovely! I like this! I like parking meters.", "text_cn": "嗯——！好吃！我喜欢这个！我喜欢停车计时器。" },
    { "id": 64, "text_en": "Name? Er?", "text_cn": "姓名？呃？" },
    { "id": 65, "text_en": "Name? What's your name? Muzzy. No, Big Muzzy. Age? Lovely!", "text_cn": "姓名？你叫什么名字？玛泽。不，大玛泽。年龄？好吃！" },
    { "id": 66, "text_en": "Take him away, take him away...", "text_cn": "把他带走，把他带走……" },
    { "id": 67, "text_en": "Hello, monster.", "text_cn": "你好，怪物。" },
    { "id": 68, "text_en": "Hello, I'm a friend. Who are you? What's your name?", "text_cn": "你好，我是朋友。你是谁？你叫什么名字？" },
    { "id": 69, "text_en": "B...B...Berb...Berb...", "text_cn": "鲍……鲍……鲍勃……鲍勃……" },
    { "id": 70, "text_en": "What's your name?", "text_cn": "你叫什么名字？" },
    { "id": 71, "text_en": "Bob! Who are you?", "text_cn": "鲍勃！你是谁？" },
    { "id": 72, "text_en": "Who are you? I'm the King.", "text_cn": "你是谁？我是国王。" },
    { "id": 73, "text_en": "No, it's not for you. Who are you?", "text_cn": "不，这不是给你的。你是谁？" },
    { "id": 74, "text_en": "I'm the Queen.", "text_cn": "我是王后。" },
    { "id": 75, "text_en": "No, it's not for you. Who's this?", "text_cn": "不，这不是给你的。这是谁？" },
    { "id": 76, "text_en": "It's the Princess!", "text_cn": "是公主！" },
    { "id": 77, "text_en": "No, it's not for her!", "text_cn": "不，这不是给她的！" },
    { "id": 78, "text_en": "It's Corvax.", "text_cn": "是科瓦克斯。" },
    { "id": 79, "text_en": "You're Corvax?", "text_cn": "你是科瓦克斯？" },
    { "id": 80, "text_en": "Yes, I am.", "text_cn": "是的，我是。" },
    { "id": 81, "text_en": "This is for you. Here you are.", "text_cn": "这是给你的。给你。" },
    { "id": 82, "text_en": "Thank you. Who ... Who are you?", "text_cn": "谢谢。你……你是谁？" },
    { "id": 83, "text_en": "I'm Norman. Bye!", "text_cn": "我是诺曼。再见！" },
    { "id": 84, "text_en": "Now, who are you? I'm Bob. I'm a gardener.", "text_cn": "那么，你是谁？我是鲍勃。我是园丁。" },
    { "id": 85, "text_en": "Who are you? Where do you come from?", "text_cn": "你是谁？你从哪里来？" },
    { "id": 86, "text_en": "There! Up there!", "text_cn": "那里！在上面！" },
    { "id": 87, "text_en": "Where?", "text_cn": "哪里？" },
    { "id": 88, "text_en": "There! Up there! I come from up there. There.", "text_cn": "那里！在上面！我从上面来。那里。" },
    { "id": 89, "text_en": "Where do you come from? France.", "text_cn": "你从哪里来？法国。" },
    { "id": 90, "text_en": "Where do you come from? Britain.", "text_cn": "你从哪里来？英国。" },
    { "id": 91, "text_en": "Where do you come from? Germany.", "text_cn": "你从哪里来？德国。" },
    { "id": 92, "text_en": "Where do you come from? Italy.", "text_cn": "你从哪里来？意大利。" },
    { "id": 93, "text_en": "Look! Listen! Go away. Stop! Come here! Look! Listen! Go away!", "text_cn": "看！听！走开。停下！过来！看！听！走开！" }
  ],
  "words": [
    { "word": "name", "phonetic": "/neɪm/", "translation": "名字", "example": "What's your name?", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "age", "phonetic": "/eɪdʒ/", "translation": "年龄", "example": "Age?", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "job", "phonetic": "/dʒɒb/", "translation": "职业", "example": "Job?", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "monster", "phonetic": "/ˈmɒnstə(r)/", "translation": "怪物", "example": "A monster!", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "hungry", "phonetic": "/ˈhʌŋɡri/", "translation": "饥饿的", "example": "I'm hungry.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "clock", "phonetic": "/klɒk/", "translation": "钟表", "example": "I like clocks.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "delicious", "phonetic": "/dɪˈlɪʃəs/", "translation": "美味的", "example": "Delicious plums!", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "bell", "phonetic": "/bel/", "translation": "铃铛", "example": "It's my bell.", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "horrible", "phonetic": "/ˈhɒrəbl/", "translation": "可怕的；糟糕的", "example": "It's horrible.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "parking meter", "phonetic": "/ˈpɑːkɪŋ ˈmiːtə(r)/", "translation": "停车计时器", "example": "It's a parking meter.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "spaceship", "phonetic": "/ˈspeɪsʃɪp/", "translation": "宇宙飞船", "example": "It's a spaceship.", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "typewriter", "phonetic": "/ˈtaɪpraɪtə(r)/", "translation": "打字机", "example": "It's a typewriter.", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "thing", "phonetic": "/θɪŋ/", "translation": "东西", "example": "What's that thing?", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "France", "phonetic": "/frɑːns/", "translation": "法国", "example": "Where do you come from? France.", "color": "bg-sky-100 border-sky-200 text-sky-700" },
    { "word": "Britain", "phonetic": "/ˈbrɪtn/", "translation": "英国", "example": "Britain.", "color": "bg-emerald-100 border-emerald-200 text-emerald-700" },
    { "word": "Germany", "phonetic": "/ˈdʒɜːməni/", "translation": "德国", "example": "Germany.", "color": "bg-violet-100 border-violet-200 text-violet-700" },
    { "word": "Italy", "phonetic": "/ˈɪtəli/", "translation": "意大利", "example": "Italy.", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "friend", "phonetic": "/frend/", "translation": "朋友", "example": "We're friends.", "color": "bg-fuchsia-100 border-fuchsia-200 text-fuchsia-700" }
  ]
},

  // -------- 第 3 集 --------
  {
  "id": 3,
  "title": "Episode 3",
  "bvid": "BV1DwRCBGETd",
  "subtitles": [
    { "id": 1, "text_en": "Oh Sylvia! Sylvia!", "text_cn": "哦，西尔维娅！西尔维娅！" },
    { "id": 2, "text_en": "Go away! Ah, Sylvia. I love you. S- y- l- v- i- a. That's right.", "text_cn": "走开！啊，西尔维娅。我爱你。S-y-l-v-i-a。对了。" },
    { "id": 3, "text_en": "Corvax... loves... Sylvia. Oh, Sylvia! Your eyes, your...", "text_cn": "科瓦克斯……爱……西尔维娅。哦，西尔维娅！你的眼睛，你的……" },
    { "id": 4, "text_en": "The body.", "text_cn": "身体。" },
    { "id": 5, "text_en": "a head", "text_cn": "一个头" },
    { "id": 6, "text_en": "an eye", "text_cn": "一只眼睛" },
    { "id": 7, "text_en": "an eye", "text_cn": "一只眼睛" },
    { "id": 8, "text_en": "a nose", "text_cn": "一个鼻子" },
    { "id": 9, "text_en": "a mouth", "text_cn": "一张嘴" },
    { "id": 10, "text_en": "an ear", "text_cn": "一只耳朵" },
    { "id": 11, "text_en": "a neck", "text_cn": "一个脖子" },
    { "id": 12, "text_en": "an arm", "text_cn": "一条胳膊" },
    { "id": 13, "text_en": "an arm", "text_cn": "一条胳膊" },
    { "id": 14, "text_en": "a hand", "text_cn": "一只手" },
    { "id": 15, "text_en": "a hand", "text_cn": "一只手" },
    { "id": 16, "text_en": "a leg", "text_cn": "一条腿" },
    { "id": 17, "text_en": "a leg", "text_cn": "一条腿" },
    { "id": 18, "text_en": "a foot", "text_cn": "一只脚" },
    { "id": 19, "text_en": "a foot", "text_cn": "一只脚" },
    { "id": 20, "text_en": "Good! Good! My Sylvia. I've got you now. Print! Lovely. That's good.", "text_cn": "好！好！我的西尔维娅。我现在抓住你了。打印！可爱。真好。" },
    { "id": 21, "text_en": "Where is it? Here it is! And this. And this. Now where? Ah! Here! Now! Go!", "text_cn": "它在哪里？在这里！还有这个。还有这个。现在哪里？啊！这里！现在！去！" },
    { "id": 22, "text_en": "Ohh! Sylvia! My Sylvia! I have you now.", "text_cn": "哦！西尔维娅！我的西尔维娅！我现在抓住你了。" },
    { "id": 23, "text_en": "M- U- double Z- Y.", "text_cn": "M-U-双Z-Y。" },
    { "id": 24, "text_en": "B- O- B You and me. We! We're friends.", "text_cn": "B-O-B 你和我。我们！我们是朋友。" },
    { "id": 25, "text_en": "We are Bob and Muzzy, Muzzy and Bob are we. Me and you, We are two, Two great friends are we.", "text_cn": "我们是鲍勃和玛泽，玛泽和鲍勃就是我们。我和你，我们是两个，两个好朋友就是我们。" },
    { "id": 26, "text_en": "Hey! Look! What? Look! Up there! Bars. Bars. Lovely, delicious, yummy bars.", "text_cn": "嘿！看！什么？看！上面！铁栏。铁栏。可爱、美味、好吃的铁栏。" },
    { "id": 27, "text_en": "Oh no! No, thanks. Yes! Eat the bars. Oh. One! Two! Three! Four! Five! We're free!", "text_cn": "哦不！不用了，谢谢。是的！吃铁栏。哦。一！二！三！四！五！我们自由了！" },
    { "id": 28, "text_en": "You're free and I'm free. We are free! You are free and I am free. We are free. We are free! You and me. We are free!", "text_cn": "你自由了，我也自由了。我们自由了！你自由了，我也自由了。我们自由了。我们自由了！你和我。我们自由了！" },
    { "id": 29, "text_en": "Free? Yes. We're free. Off we go!", "text_cn": "自由？是的。我们自由了。我们走！" },
    { "id": 30, "text_en": "Ohh! I'm free! I'm wet, I'm cold and I'm hungry. But I'm free.", "text_cn": "哦！我自由了！我湿了，我冷，我饿。但是我自由了。" },
    { "id": 31, "text_en": "Cold. Hot. Hungry. Thirsty. Wet. Dry.", "text_cn": "冷。热。饿。渴。湿。干。" },
    { "id": 32, "text_en": "I'm thirsty!", "text_cn": "我渴了！" },
    { "id": 33, "text_en": "Have a drink.", "text_cn": "喝一杯吧。" },
    { "id": 34, "text_en": "Aah! It's hot!", "text_cn": "啊！好烫！" },
    { "id": 35, "text_en": "Oh! Sorry.", "text_cn": "哦！抱歉。" },
    { "id": 36, "text_en": "I'm hungry.", "text_cn": "我饿了。" },
    { "id": 37, "text_en": "Have a hamburger.", "text_cn": "吃个汉堡包吧。" },
    { "id": 38, "text_en": "I'm hot.", "text_cn": "我热。" },
    { "id": 39, "text_en": "Have a shower.", "text_cn": "洗个淋浴吧。" },
    { "id": 40, "text_en": "I'm wet.", "text_cn": "我湿了。" },
    { "id": 41, "text_en": "Have a towel.", "text_cn": "拿条毛巾吧。" },
    { "id": 42, "text_en": "I'm cold.", "text_cn": "我冷。" },
    { "id": 43, "text_en": "Have a sweater.", "text_cn": "穿件毛衣吧。" },
    { "id": 44, "text_en": "I'm tired.", "text_cn": "我累了。" },
    { "id": 45, "text_en": "Take a rest.", "text_cn": "休息一下吧。" },
    { "id": 46, "text_en": "Brrr! It's cold. Bob! Bob? Where are you? Bob! Muzzy!", "text_cn": "唔！好冷。鲍勃！鲍勃？你在哪里？鲍勃！玛泽！" },
    { "id": 47, "text_en": "Bob? Where are you? Bob! Where? I can't see you.", "text_cn": "鲍勃？你在哪里？鲍勃！哪里？我看不见你。" },
    { "id": 48, "text_en": "I'm here. In the tree.", "text_cn": "我在这里。在树上。" },
    { "id": 49, "text_en": "What tree? This tree. Where are you? Yow!", "text_cn": "什么树？这棵树。你在哪里？呀！" },
    { "id": 50, "text_en": "I'm under...", "text_cn": "我在……下面……" },
    { "id": 51, "text_en": "Where are you? Under the box.", "text_cn": "你在哪里？在盒子下面。" },
    { "id": 52, "text_en": "Where are you? On the box.", "text_cn": "你在哪里？在盒子上面。" },
    { "id": 53, "text_en": "Where are you? In the box.", "text_cn": "你在哪里？在盒子里面。" },
    { "id": 54, "text_en": "Where are you? In front of the box.", "text_cn": "你在哪里？在盒子前面。" },
    { "id": 55, "text_en": "Where are you? Behind the box.", "text_cn": "你在哪里？在盒子后面。" },
    { "id": 56, "text_en": "Where are you? Between the boxes.", "text_cn": "你在哪里？在两个盒子之间。" },
    { "id": 57, "text_en": "Where's the box? Over there.", "text_cn": "盒子在哪里？在那边。" },
    { "id": 58, "text_en": "Where's the box now? Over here.", "text_cn": "盒子现在在哪里？在这儿。" },
    { "id": 59, "text_en": "Look! Can you see me? Can you talk? 'Sylvia' Yes, I can.", "text_cn": "看！你能看见我吗？你能说话吗？“西尔维娅”是的，我能。" },
    { "id": 60, "text_en": "Can you walk? 'Sylvia' No, I can't.", "text_cn": "你能走路吗？“西尔维娅”不，我不能。" },
    { "id": 61, "text_en": "Let me try again. Now can you walk?", "text_cn": "让我再试一次。现在你能走路吗？" },
    { "id": 62, "text_en": "Are you all right? Are you all right?", "text_cn": "你还好吗？你还好吗？" },
    { "id": 63, "text_en": "Oh, yes. Just cold and wet and hungry. Where's the palace?", "text_cn": "哦，是的。只是冷、湿、饿。宫殿在哪里？" },
    { "id": 64, "text_en": "It's over there.", "text_cn": "在那边。" },
    { "id": 65, "text_en": "Where?", "text_cn": "哪里？" },
    { "id": 66, "text_en": "There it is, over there. That's the palace. Sylvia's there!", "text_cn": "就在那里，在那边。那是宫殿。西尔维娅在那里！" },
    { "id": 67, "text_en": "I'm Corvax. Listen! Can you hear me? 'Sylvia' Mmm.", "text_cn": "我是科瓦克斯。听着！你能听见我吗？“西尔维娅”嗯。" },
    { "id": 68, "text_en": "Yes, I can.", "text_cn": "是的，我能。" },
    { "id": 69, "text_en": "Can you run? 'Sylvia' No, I can't.", "text_cn": "你能跑吗？“西尔维娅”不，我不能。" },
    { "id": 70, "text_en": "Let me try again. Sylvia, do you - love me? 'Sylvia' No, I don't. I don't like you.", "text_cn": "让我再试一次。西尔维娅，你——爱我吗？“西尔维娅”不，我不爱。我不喜欢你。" },
    { "id": 71, "text_en": "Oh, Sylvia!", "text_cn": "哦，西尔维娅！" },
    { "id": 72, "text_en": "Now I can run. Bye!", "text_cn": "现在我能跑了。再见！" },
    { "id": 73, "text_en": "Sylvia stop! Come back! No, no, no, no, no ... oh ... What's happening?", "text_cn": "西尔维娅停下！回来！不，不，不，不，不……哦……发生了什么？" },
    { "id": 74, "text_en": "I can walk. I can talk. I can hear. I can see. Who are you? Am I you? Are you me? I can jump. I can swim. I can run. This is fun.", "text_cn": "我能走路。我能说话。我能听见。我能看见。你是谁？我是你吗？你是我吗？我能跳。我能游泳。我能跑。真有趣。" },
    { "id": 75, "text_en": "You've got a green dress. You've got a red dress. She's got a blue dress. I like brown. I've got a yellow dress. Yellow is for happiness. Black and white looks all right. But I like brown.", "text_cn": "你有一件绿色连衣裙。你有一件红色连衣裙。她有一件蓝色连衣裙。我喜欢棕色。我有一件黄色连衣裙。黄色代表幸福。黑色和白色看起来不错。但是我喜欢棕色。" },
    { "id": 76, "text_en": "You're Sylvia.", "text_cn": "你是西尔维娅。" },
    { "id": 77, "text_en": "Yes, we are.", "text_cn": "是的，我们是。" },
    { "id": 78, "text_en": "Six Sylvias?", "text_cn": "六个西尔维娅？" },
    { "id": 79, "text_en": "Yes.", "text_cn": "是的。" },
    { "id": 80, "text_en": "Who are they?", "text_cn": "他们是谁？" },
    { "id": 81, "text_en": "Sylvia!", "text_cn": "西尔维娅！" },
    { "id": 82, "text_en": "Black and white, yellow, blue, red, green, brown. See you!", "text_cn": "黑色和白色，黄色，蓝色，红色，绿色，棕色。再见！" },
    { "id": 83, "text_en": "Six Sylvias! Ahhh!", "text_cn": "六个西尔维娅！啊——！" },
    { "id": 84, "text_en": "Head and shoulders. Knees and toes, knees and toes. Eyes and mouth and ears and nose. Ears and nose ...", "text_cn": "头和肩膀。膝盖和脚趾，膝盖和脚趾。眼睛、嘴巴、耳朵和鼻子。耳朵和鼻子……" },
    { "id": 85, "text_en": "Where are we?", "text_cn": "我们在哪里？" },
    { "id": 86, "text_en": "We're in the garden.", "text_cn": "我们在花园里。" },
    { "id": 87, "text_en": "What? Your garden?", "text_cn": "什么？你的花园？" },
    { "id": 88, "text_en": "No, silly! The palace garden. Look! There's Sylvia!", "text_cn": "不，傻蛋！是宫殿花园。看！西尔维娅在那里！" },
    { "id": 89, "text_en": "What's she doing?", "text_cn": "她在做什么？" },
    { "id": 90, "text_en": "She's doing her exercises.", "text_cn": "她在做运动。" },
    { "id": 91, "text_en": "Ssh! Quick! Behind this thing!", "text_cn": "嘘！快！在这东西后面！" },
    { "id": 92, "text_en": "What thing? The statue.", "text_cn": "什么东西？雕像。" },
    { "id": 93, "text_en": "Are you all right?", "text_cn": "你们还好吗？" },
    { "id": 94, "text_en": "No, we aren't. We're hungry. Can we have some food, please?", "text_cn": "不，我们不好。我们饿了。请问我们能吃点东西吗？" },
    { "id": 95, "text_en": "Can I have a clock, please?", "text_cn": "请问我能要一个钟表吗？" },
    { "id": 96, "text_en": "A clock? Excuse me. Yes. A clock. He likes clocks.", "text_cn": "一个钟表？抱歉。是的。一个钟表。他喜欢钟表。" },
    { "id": 97, "text_en": "Ssh! Somebody's coming.", "text_cn": "嘘！有人来了。" },
    { "id": 98, "text_en": "Who is it? I don't know. I can't see. Ssh! OK! Oh, no! It's raining.", "text_cn": "是谁？我不知道。我看不见。嘘！好吧！哦，不！下雨了。" },
    { "id": 99, "text_en": "Look, wait over there. OK. See you this evening. When? Seven o'clock. See you at seven o'clock this evening. Seven o'clock. Right! What's the time now?", "text_cn": "看，在那边等。好的。今晚见。什么时候？七点钟。今晚七点见。七点钟。好的！现在几点了？" }
  ],
  "words": [
    { "word": "body", "phonetic": "/ˈbɒdi/", "translation": "身体", "example": "The body.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "head", "phonetic": "/hed/", "translation": "头", "example": "a head", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "eye", "phonetic": "/aɪ/", "translation": "眼睛", "example": "an eye", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "nose", "phonetic": "/nəʊz/", "translation": "鼻子", "example": "a nose", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "mouth", "phonetic": "/maʊθ/", "translation": "嘴巴", "example": "a mouth", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "ear", "phonetic": "/ɪər/", "translation": "耳朵", "example": "an ear", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "neck", "phonetic": "/nek/", "translation": "脖子", "example": "a neck", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "hand", "phonetic": "/hænd/", "translation": "手", "example": "a hand", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "leg", "phonetic": "/leɡ/", "translation": "腿", "example": "a leg", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "shoulder", "phonetic": "/ˈʃəʊldər/", "translation": "肩膀", "example": "Head and shoulders.", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "knee", "phonetic": "/niː/", "translation": "膝盖", "example": "Knees and toes.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "toe", "phonetic": "/təʊ/", "translation": "脚趾", "example": "Knees and toes.", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "thirsty", "phonetic": "/ˈθɜːsti/", "translation": "口渴的", "example": "I'm thirsty.", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "hot", "phonetic": "/hɒt/", "translation": "热的", "example": "It's hot!", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "shower", "phonetic": "/ˈʃaʊər/", "translation": "淋浴", "example": "Have a shower.", "color": "bg-sky-100 border-sky-200 text-sky-700" },
    { "word": "dry", "phonetic": "/draɪ/", "translation": "干的", "example": "Dry.", "color": "bg-emerald-100 border-emerald-200 text-emerald-700" },
    { "word": "wet", "phonetic": "/wet/", "translation": "湿的", "example": "I'm wet.", "color": "bg-violet-100 border-violet-200 text-violet-700" },
    { "word": "towel", "phonetic": "/ˈtaʊəl/", "translation": "毛巾", "example": "Have a towel.", "color": "bg-fuchsia-100 border-fuchsia-200 text-fuchsia-700" },
    { "word": "cold", "phonetic": "/kəʊld/", "translation": "冷的", "example": "I'm cold.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "sweater", "phonetic": "/ˈswetər/", "translation": "毛衣", "example": "Have a sweater.", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "tired", "phonetic": "/ˈtaɪəd/", "translation": "疲倦的", "example": "I'm tired.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "in", "phonetic": "/ɪn/", "translation": "在……里面", "example": "In the box.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "under", "phonetic": "/ˈʌndər/", "translation": "在……下面", "example": "Under the box.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "on", "phonetic": "/ɒn/", "translation": "在……上面", "example": "On the box.", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "in front of", "phonetic": "/ɪn frʌnt əv/", "translation": "在……前面", "example": "In front of the box.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "behind", "phonetic": "/bɪˈhaɪnd/", "translation": "在……后面", "example": "Behind the box.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "between", "phonetic": "/bɪˈtwiːn/", "translation": "在……之间", "example": "Between the boxes.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "tree", "phonetic": "/triː/", "translation": "树", "example": "In the tree.", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "palace", "phonetic": "/ˈpæləs/", "translation": "宫殿", "example": "Where's the palace?", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "listen", "phonetic": "/ˈlɪsn/", "translation": "听", "example": "Listen!", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "hear", "phonetic": "/hɪər/", "translation": "听见", "example": "Can you hear me?", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "run", "phonetic": "/rʌn/", "translation": "跑", "example": "Can you run?", "color": "bg-sky-100 border-sky-200 text-sky-700" },
    { "word": "talk", "phonetic": "/tɔːk/", "translation": "说话", "example": "Can you talk?", "color": "bg-emerald-100 border-emerald-200 text-emerald-700" },
    { "word": "walk", "phonetic": "/wɔːk/", "translation": "走路", "example": "Can you walk?", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "jump", "phonetic": "/dʒʌmp/", "translation": "跳", "example": "I can jump.", "color": "bg-violet-100 border-violet-200 text-violet-700" },
    { "word": "swim", "phonetic": "/swɪm/", "translation": "游泳", "example": "I can swim.", "color": "bg-fuchsia-100 border-fuchsia-200 text-fuchsia-700" },
    { "word": "green", "phonetic": "/ɡriːn/", "translation": "绿色", "example": "green dress", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "red", "phonetic": "/red/", "translation": "红色", "example": "red dress", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "yellow", "phonetic": "/ˈjeləʊ/", "translation": "黄色", "example": "yellow dress", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "brown", "phonetic": "/braʊn/", "translation": "棕色", "example": "I like brown.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "blue", "phonetic": "/bluː/", "translation": "蓝色", "example": "blue dress", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "black", "phonetic": "/blæk/", "translation": "黑色", "example": "Black and white", "color": "bg-gray-800 border-gray-800 text-white" },
    { "word": "white", "phonetic": "/waɪt/", "translation": "白色", "example": "Black and white", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "dress", "phonetic": "/dres/", "translation": "连衣裙", "example": "You've got a green dress.", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "print", "phonetic": "/prɪnt/", "translation": "打印", "example": "Print!", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "bars", "phonetic": "/bɑːz/", "translation": "铁栏", "example": "Eat the bars.", "color": "bg-slate-100 border-slate-200 text-slate-700" },
    { "word": "over there", "phonetic": "/ˈəʊvə ðeər/", "translation": "在那边", "example": "Over there.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "over here", "phonetic": "/ˈəʊvə hɪər/", "translation": "在这里", "example": "Over here.", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" }
  ]
},

  // -------- 第 4 集 --------
  {
  "id": 4,
  "title": "Episode 4",
  "bvid": "BV1gwRCBVEDH",
  "subtitles": [
    { "id": 1, "text_en": "It's eight o'clock.", "text_cn": "八点了。" },
    { "id": 2, "text_en": "Ring, ring... Hello?", "text_cn": "铃铃铃……喂？" },
    { "id": 3, "text_en": "Hello? No, I'm busy. I'm having breakfast.", "text_cn": "喂？不，我很忙。我正在吃早餐。" },
    { "id": 4, "text_en": "It's one o'clock.", "text_cn": "一点了。" },
    { "id": 5, "text_en": "Ring, ring... Hello?", "text_cn": "铃铃铃……喂？" },
    { "id": 6, "text_en": "No, I'm busy. I'm having lunch.", "text_cn": "不，我很忙。我正在吃午餐。" },
    { "id": 7, "text_en": "It's seven o'clock.", "text_cn": "七点了。" },
    { "id": 8, "text_en": "Ring, ring... Hello?", "text_cn": "铃铃铃……喂？" },
    { "id": 9, "text_en": "No, I'm busy. I'm having dinner.", "text_cn": "不，我很忙。我正在吃晚餐。" },
    { "id": 10, "text_en": "It's nine o'clock.", "text_cn": "九点了。" },
    { "id": 11, "text_en": "Ring, ring... Hello?", "text_cn": "铃铃铃……喂？" },
    { "id": 12, "text_en": "No, I'm busy. I'm taking a bath.", "text_cn": "不，我很忙。我正在洗澡。" },
    { "id": 13, "text_en": "It's ten o'clock.", "text_cn": "十点了。" },
    { "id": 14, "text_en": "Ring, ring... Hello?", "text_cn": "铃铃铃……喂？" },
    { "id": 15, "text_en": "Busy? No, I'm going to bed. Good night!", "text_cn": "忙？不，我要去睡觉了。晚安！" },
    { "id": 16, "text_en": "One o'clock. It's lunch-time. It's lunch-time, dear.", "text_cn": "一点了。午餐时间到了。亲爱的，午餐时间到了。" },
    { "id": 17, "text_en": "I'm coming.", "text_cn": "我来了。" },
    { "id": 18, "text_en": "It's lunch-time, Sylvia.", "text_cn": "午餐时间到了，西尔维娅。" },
    { "id": 19, "text_en": "I'm not feeling well. Can I have lunch in my room?", "text_cn": "我感觉不舒服。我能在我的房间里吃午餐吗？" },
    { "id": 20, "text_en": "What's the matter?", "text_cn": "怎么了？" },
    { "id": 21, "text_en": "I've got a terrible headache.", "text_cn": "我头疼得厉害。" },
    { "id": 22, "text_en": "A headache. Stomachache. Toothache. Backache.", "text_cn": "头痛。胃痛。牙痛。背痛。" },
    { "id": 23, "text_en": "Come in. What's the matter?", "text_cn": "进来。怎么了？" },
    { "id": 24, "text_en": "I have a headache, doctor.", "text_cn": "我头痛，医生。" },
    { "id": 25, "text_en": "A headache? Take this.", "text_cn": "头痛？把这个吃了。" },
    { "id": 26, "text_en": "Thank you, doctor.", "text_cn": "谢谢你，医生。" },
    { "id": 27, "text_en": "Next! What's the matter?", "text_cn": "下一位！怎么了？" },
    { "id": 28, "text_en": "I have a stomachache, doctor.", "text_cn": "我胃痛，医生。" },
    { "id": 29, "text_en": "Stomachache? Take this.", "text_cn": "胃痛？把这个吃了。" },
    { "id": 30, "text_en": "Thank you, doctor.", "text_cn": "谢谢你，医生。" },
    { "id": 31, "text_en": "Next! What's the matter?", "text_cn": "下一位！怎么了？" },
    { "id": 32, "text_en": "I have a toothache, doctor.", "text_cn": "我牙痛，医生。" },
    { "id": 33, "text_en": "Toothache? Take this.", "text_cn": "牙痛？把这个吃了。" },
    { "id": 34, "text_en": "Thank you, doctor.", "text_cn": "谢谢你，医生。" },
    { "id": 35, "text_en": "Next! What's the matter?", "text_cn": "下一位！怎么了？" },
    { "id": 36, "text_en": "I have a backache, doctor.", "text_cn": "我背痛，医生。" },
    { "id": 37, "text_en": "Backache? Take this.", "text_cn": "背痛？把这个吃了。" },
    { "id": 38, "text_en": "Thank you, doctor.", "text_cn": "谢谢你，医生。" },
    { "id": 39, "text_en": "A headache? Tut! Tut! Stay in your room, dear, and have a rest. Lunch for the Princess in her room!", "text_cn": "头痛？啧！啧！亲爱的，待在房间里休息一下。公主的午餐送到她的房间！" },
    { "id": 40, "text_en": "Sylvia isn't very well. She's got a headache. She's got a headache. She's having lunch in her room.", "text_cn": "西尔维娅不太舒服。她头痛。她头痛。她正在她的房间里吃午餐。" },
    { "id": 41, "text_en": "A headache! Whoo!", "text_cn": "头痛！呜呼！" },
    { "id": 42, "text_en": "Hello, Sylvia. How are you now?", "text_cn": "你好，西尔维娅。你现在怎么样了？" },
    { "id": 43, "text_en": "How am I now? I'm fine, thank you.", "text_cn": "我现在怎么样？我很好，谢谢。" },
    { "id": 44, "text_en": "Where are you going?", "text_cn": "你要去哪里？" },
    { "id": 45, "text_en": "I'm going to the swimming pool. See you!", "text_cn": "我要去游泳池。再见！" },
    { "id": 46, "text_en": "Have a nice swim, dear.", "text_cn": "亲爱的，好好游泳吧。" },
    { "id": 47, "text_en": "Hello, Sylvia. How are you now? Feeling better?", "text_cn": "你好，西尔维娅。你现在怎么样了？感觉好点了吗？" },
    { "id": 48, "text_en": "Feeling better? I'm fine.", "text_cn": "感觉好点了吗？我很好。" },
    { "id": 49, "text_en": "Good, good, good. Where are you going?", "text_cn": "好，好，好。你要去哪里？" },
    { "id": 50, "text_en": "I'm going to the tennis court. See you!", "text_cn": "我要去网球场。再见！" },
    { "id": 51, "text_en": "Have a nice game, dear.", "text_cn": "亲爱的，好好打球吧。" },
    { "id": 52, "text_en": "Sylvia's feeling better now. She's playing tennis.", "text_cn": "西尔维娅现在感觉好多了。她在打网球。" },
    { "id": 53, "text_en": "Playing tennis? No, she isn't. She's having a swim.", "text_cn": "打网球？不，她不是。她在游泳。" },
    { "id": 54, "text_en": "Hello, Mommy! Hello, Daddy! Bye!", "text_cn": "你好，妈妈！你好，爸爸！再见！" }
  ],
  "words": [
    { "word": "quick", "phonetic": "/kwɪk/", "translation": "快的；迅速的", "example": "Quick!", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "statue", "phonetic": "/ˈstætʃuː/", "translation": "雕像", "example": "The statue.", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "food", "phonetic": "/fuːd/", "translation": "食物", "example": "some food", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "excuse me", "phonetic": "/ɪkˈskjuːz miː/", "translation": "打扰一下；对不起", "example": "Excuse me!", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "rain", "phonetic": "/reɪn/", "translation": "雨；下雨", "example": "It's raining.", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "time", "phonetic": "/taɪm/", "translation": "时间", "example": "What's the time now?", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "ring", "phonetic": "/rɪŋ/", "translation": "（电话）铃响", "example": "Ring, ring...", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "breakfast", "phonetic": "/ˈbrekfəst/", "translation": "早餐", "example": "having breakfast", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "lunch", "phonetic": "/lʌntʃ/", "translation": "午餐", "example": "having lunch", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "dinner", "phonetic": "/ˈdɪnər/", "translation": "晚餐", "example": "having dinner", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "bath", "phonetic": "/bɑːθ/", "translation": "洗澡", "example": "taking a bath", "color": "bg-sky-100 border-sky-200 text-sky-700" },
    { "word": "bed", "phonetic": "/bed/", "translation": "床", "example": "going to bed", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "lunch-time", "phonetic": "/ˈlʌntʃ taɪm/", "translation": "午餐时间", "example": "It's lunch-time.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "room", "phonetic": "/ruːm/", "translation": "房间", "example": "in my room", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "doctor", "phonetic": "/ˈdɒktər/", "translation": "医生", "example": "doctor", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "headache", "phonetic": "/ˈhedeɪk/", "translation": "头痛", "example": "I have a headache.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "stomachache", "phonetic": "/ˈstʌməkeɪk/", "translation": "胃痛", "example": "I have a stomachache.", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "toothache", "phonetic": "/ˈtuːθeɪk/", "translation": "牙痛", "example": "I have a toothache.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "backache", "phonetic": "/ˈbækeɪk/", "translation": "背痛", "example": "I have a backache.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "next", "phonetic": "/nekst/", "translation": "下一个", "example": "Next!", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "swimming pool", "phonetic": "/ˈswɪmɪŋ puːl/", "translation": "游泳池", "example": "the swimming pool", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "tennis court", "phonetic": "/ˈtenɪs kɔːt/", "translation": "网球场", "example": "the tennis court", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "swim", "phonetic": "/swɪm/", "translation": "游泳", "example": "Have a nice swim.", "color": "bg-emerald-100 border-emerald-200 text-emerald-700" },
    { "word": "tennis", "phonetic": "/ˈtenɪs/", "translation": "网球", "example": "She's playing tennis.", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "palace garden", "phonetic": "/ˈpæləs ˈɡɑːdn/", "translation": "宫殿花园", "example": "the palace garden", "color": "bg-violet-100 border-violet-200 text-violet-700" }
  ]
},
  
  // -------- 第 5 集 --------
{
  "id": 5,
  "title": "Episode 5",
  "bvid": "BV1vE411n7w2",
  "part": 5,
  "subtitles": [
    { "id": 1, "text_en": "Is it still working?", "text_cn": "它还在工作吗？" },
    { "id": 2, "text_en": "Yes, it's still working.", "text_cn": "是的，它还在工作。" },
    { "id": 3, "text_en": "Good evening.", "text_cn": "晚上好。" },
    { "id": 4, "text_en": "How many Sylvias are there?", "text_cn": "有多少个西尔维娅？" },
    { "id": 5, "text_en": "Six.", "text_cn": "六个。" },
    { "id": 6, "text_en": "No, there are seven. Oh...", "text_cn": "不，有七个。哦……" },
    { "id": 7, "text_en": "In fall it gets dark at seven. In winter it gets dark at five. In spring it gets dark at seven. In summer it gets dark at nine.", "text_cn": "在秋天，七点天黑。在冬天，五点天黑。在春天，七点天黑。在夏天，九点天黑。" },
    { "id": 8, "text_en": "Is it still raining?", "text_cn": "还在下雨吗？" },
    { "id": 9, "text_en": "No, it's fine now.", "text_cn": "不，现在天气好了。" },
    { "id": 10, "text_en": "It's getting dark. What time is it?", "text_cn": "天快黑了。几点了？" },
    { "id": 11, "text_en": "It's almost seven o'clock. It gets dark at seven. In autumn it gets dark at seven.", "text_cn": "快七点了。七点天黑。在秋天，七点天黑。" },
    { "id": 12, "text_en": "Autumn?", "text_cn": "秋天？" },
    { "id": 13, "text_en": "September. October. November. December. January. February. March. April. May. June. July. August.", "text_cn": "九月。十月。十一月。十二月。一月。二月。三月。四月。五月。六月。七月。八月。" },
    { "id": 14, "text_en": "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.", "text_cn": "星期一，星期二，星期三，星期四，星期五，星期六，星期日。" },
    { "id": 15, "text_en": "On Monday I play soccer.", "text_cn": "星期一我踢足球。" },
    { "id": 16, "text_en": "On Tuesday I play basketball.", "text_cn": "星期二我打篮球。" },
    { "id": 17, "text_en": "On Wednesday I go roller-skating.", "text_cn": "星期三我去滑旱冰。" },
    { "id": 18, "text_en": "On Thursday I do my exercises.", "text_cn": "星期四我做运动。" },
    { "id": 19, "text_en": "On Friday I go swimming.", "text_cn": "星期五我去游泳。" },
    { "id": 20, "text_en": "On Saturday I play golf.", "text_cn": "星期六我打高尔夫球。" },
    { "id": 21, "text_en": "And on Sunday we play tennis.", "text_cn": "星期天我们打网球。" },
    { "id": 22, "text_en": "When do you play soccer?", "text_cn": "你什么时候踢足球？" },
    { "id": 23, "text_en": "On Monday!", "text_cn": "星期一！" },
    { "id": 24, "text_en": "When do you play basketball?", "text_cn": "你什么时候打篮球？" },
    { "id": 25, "text_en": "On Tuesday!", "text_cn": "星期二！" },
    { "id": 26, "text_en": "When do you go roller-skating?", "text_cn": "你什么时候去滑旱冰？" },
    { "id": 27, "text_en": "On Wednesday.", "text_cn": "星期三。" },
    { "id": 28, "text_en": "When do you do your exercises?", "text_cn": "你什么时候做运动？" },
    { "id": 29, "text_en": "On Thursday.", "text_cn": "星期四。" },
    { "id": 30, "text_en": "When do you go swimming?", "text_cn": "你什么时候去游泳？" },
    { "id": 31, "text_en": "On Friday.", "text_cn": "星期五。" },
    { "id": 32, "text_en": "When do you play golf?", "text_cn": "你什么时候打高尔夫球？" },
    { "id": 33, "text_en": "On Saturday.", "text_cn": "星期六。" },
    { "id": 34, "text_en": "When do you play tennis?", "text_cn": "你什么时候打网球？" },
    { "id": 35, "text_en": "On Sunday. And it's Sunday today.", "text_cn": "星期天。今天是星期天。" },
    { "id": 36, "text_en": "And we're playing tennis now.", "text_cn": "我们现在正在打网球。" },
    { "id": 37, "text_en": "Where's Princess Sylvia's room?", "text_cn": "西尔维娅公主的房间在哪里？" },
    { "id": 38, "text_en": "There!", "text_cn": "那里！" },
    { "id": 39, "text_en": "Where, on the first floor?", "text_cn": "哪里，在一楼？" },
    { "id": 40, "text_en": "No, it's on the second floor.", "text_cn": "不，在二楼。" },
    { "id": 41, "text_en": "Oh, there are three rooms on the second floor. Which one is it? Is it the one on the left?", "text_cn": "哦，二楼有三个房间。是哪一间？是左边那间吗？" },
    { "id": 42, "text_en": "No, it isn't.", "text_cn": "不，不是。" },
    { "id": 43, "text_en": "Is it the one on the right?", "text_cn": "是右边那间吗？" },
    { "id": 44, "text_en": "No, it isn't.", "text_cn": "不，不是。" },
    { "id": 45, "text_en": "Is it the one in the middle?", "text_cn": "是中间那间吗？" },
    { "id": 46, "text_en": "Yes, it is. It's the one in the middle.", "text_cn": "是的，是中间那间。" },
    { "id": 47, "text_en": "What about the room up there? The one on the top floor.", "text_cn": "上面那个房间呢？顶层那间。" },
    { "id": 48, "text_en": "That's Corvax's room. It's the computer room.", "text_cn": "那是科瓦克斯的房间。是电脑房。" },
    { "id": 49, "text_en": "Stop it! Stop it! No! No! No!", "text_cn": "停下！停下！不！不！不！" },
    { "id": 50, "text_en": "Seven o'clock! It's dinner-time, Sylvia!", "text_cn": "七点了！晚餐时间到了，西尔维娅！" },
    { "id": 51, "text_en": "Yes, Mommy. Yes, Mommy. Yes, Mommy.", "text_cn": "好的，妈妈。好的，妈妈。好的，妈妈。" },
    { "id": 52, "text_en": "Eek! Look, they're all Sylvias.", "text_cn": "呀！看，她们都是西尔维娅。" },
    { "id": 53, "text_en": "How many are there?", "text_cn": "有多少个？" },
    { "id": 54, "text_en": "Food- clocks- seven p.m. I've got some food. I've got some clocks. And it's almost seven o'clock. OK.", "text_cn": "食物——钟表——晚上七点。我有些食物。我有些钟表。快七点了。好的。" },
    { "id": 55, "text_en": "Open the door- quietly! Look around- carefully! Run downstairs- quickly!", "text_cn": "开门——轻轻地！环顾四周——小心地！跑下楼——快速地！" },
    { "id": 56, "text_en": "There are three in the kitchen, four in the hall. There's one by the fireplace, there are two against the wall. There's one in the sitting-room, bouncing on the chairs, and four are having lots of fun, sliding down the stairs. There are hundreds in the garden, picking all the flowers, and lots in the bathrooms, turning on the showers.", "text_cn": "厨房里有三个，大厅里有四个。壁炉边有一个，靠墙有两个。客厅里有一个，在椅子上蹦跳，还有四个玩得很开心，从楼梯上滑下来。花园里有几百个，在摘所有的花，浴室里有很多，在打开淋浴。" },
    { "id": 57, "text_en": "Stop it! Stop it! Help!", "text_cn": "停下！停下！救命！" },
    { "id": 58, "text_en": "Corvax! What are you doing?", "text_cn": "科瓦克斯！你在做什么？" },
    { "id": 59, "text_en": "I'm not doing anything. It's the computer.", "text_cn": "我什么都没做。是电脑。" },
    { "id": 60, "text_en": "Lots on the chandeliers. More over there! More of them and more of them, appearing everywhere!", "text_cn": "枝形吊灯上有很多。那边更多！一个接一个，到处都是！" },
    { "id": 61, "text_en": "It's Sylvia.", "text_cn": "是西尔维娅。" },
    { "id": 62, "text_en": "Oh, Bob! I'm frightened.", "text_cn": "哦，鲍勃！我很害怕。" },
    { "id": 63, "text_en": "Why? Why are you frightened?", "text_cn": "为什么？你为什么害怕？" },
    { "id": 64, "text_en": "Because there are lots of Sylvias in the palace.", "text_cn": "因为宫殿里有很多西尔维娅。" },
    { "id": 65, "text_en": "Sylvias?", "text_cn": "西尔维娅们？" },
    { "id": 66, "text_en": "Er- excuse me. Have you got any clocks?", "text_cn": "呃——打扰一下。你有钟表吗？" },
    { "id": 67, "text_en": "Oh, Muzzy!", "text_cn": "哦，玛泽！" },
    { "id": 68, "text_en": "Here you are. Muzzy, why do you eat clocks?", "text_cn": "给你。玛泽，你为什么吃钟表？" },
    { "id": 69, "text_en": "Because I like them, of course.", "text_cn": "因为我喜欢它们，当然。" },
    { "id": 70, "text_en": "Where are they all coming from? Look, they're coming from Corvax's room upstairs. What's he doing? Go and see- quick!", "text_cn": "它们都是从哪里来的？看，它们从楼上科瓦克斯的房间出来。他在做什么？快去看看！" },
    { "id": 71, "text_en": "Oh, boy! He's crying. Why are you crying?", "text_cn": "哦，天哪！他在哭。你为什么哭？" },
    { "id": 72, "text_en": "Because I can't reach the apple.", "text_cn": "因为我够不到苹果。" },
    { "id": 73, "text_en": "Why can't you reach the apple?", "text_cn": "你为什么够不到苹果？" },
    { "id": 74, "text_en": "Because I'm small.", "text_cn": "因为我很小。" },
    { "id": 75, "text_en": "I can reach the apple. Yes. Why? Because you're tall. Right! Here you are!", "text_cn": "我能够到苹果。是的。为什么？因为你高。好了！给你！" },
    { "id": 76, "text_en": "Thanks. Bye!", "text_cn": "谢谢。再见！" },
    { "id": 77, "text_en": "Hey! That's my apple, and my bike. Come back! Come back! That's mine! Gotcha!", "text_cn": "嘿！那是我的苹果，我的自行车。回来！回来！那是我的！抓到你了！" },
    { "id": 78, "text_en": "Now, is this my bike?", "text_cn": "现在，这是我的自行车吗？" },
    { "id": 79, "text_en": "Yes, it's yours.", "text_cn": "是的，是你的。" },
    { "id": 80, "text_en": "Yes, it's mine. And where's my apple?", "text_cn": "是的，是我的。我的苹果在哪里？" },
    { "id": 81, "text_en": "You can't have it.", "text_cn": "你不能吃它。" },
    { "id": 82, "text_en": "Why not?", "text_cn": "为什么不能？" },
    { "id": 83, "text_en": "Because it's in here.", "text_cn": "因为它在这里面。" },
    { "id": 84, "text_en": "Corvax! Stop the computer!", "text_cn": "科瓦克斯！停下电脑！" },
    { "id": 85, "text_en": "I can't, your Majesty.", "text_cn": "我不能，陛下。" },
    { "id": 86, "text_en": "Of course you can. It's your computer.", "text_cn": "你当然可以。这是你的电脑。" },
    { "id": 87, "text_en": "Yes, I know. It's mine, but I can't stop it.", "text_cn": "是的，我知道。是我的，但我停不下它。" },
    { "id": 88, "text_en": "Well I can stop it.", "text_cn": "好吧，我可以停下它。" },
    { "id": 89, "text_en": "Be careful! Be careful!", "text_cn": "小心！小心！" },
    { "id": 90, "text_en": "It's all right, Corvax.", "text_cn": "没关系，科瓦克斯。" },
    { "id": 91, "text_en": "Don't ... don't do that! Ooh!", "text_cn": "别……别那样做！哦！" },
    { "id": 92, "text_en": "Corvax! Corvax! Help me!", "text_cn": "科瓦克斯！科瓦克斯！救我！" },
    { "id": 93, "text_en": "Look! There's one! And there's one! And there! Oh, there are lots of them!", "text_cn": "看！有一个！还有一个！还有那里！哦，有很多！" },
    { "id": 94, "text_en": "There's a fat one!", "text_cn": "有一个胖的！" },
    { "id": 95, "text_en": "Ah, that one's fatter! Look!", "text_cn": "啊，那个更胖！看！" },
    { "id": 96, "text_en": "There's a big one!", "text_cn": "有一个大的！" },
    { "id": 97, "text_en": "That's a bigger one over there!", "text_cn": "那边有一个更大的！" },
    { "id": 98, "text_en": "Come on, Muzzy!", "text_cn": "来吧，玛泽！" },
    { "id": 99, "text_en": "I'm big.", "text_cn": "我大。" },
    { "id": 100, "text_en": "I'm bigger.", "text_cn": "我更大。" },
    { "id": 101, "text_en": "The first one's big. The second one's bigger.", "text_cn": "第一个大。第二个更大。" },
    { "id": 102, "text_en": "I'm small.", "text_cn": "我小。" },
    { "id": 103, "text_en": "Yes. The third one's small. And the fourth one's smaller. The fifth is tall. The sixth is taller. The seventh is, er, fat. And the eighth is...", "text_cn": "是的。第三个小的。第四个更小。第五个高。第六个更高。第七个，呃，胖。第八个……" },
    { "id": 104, "text_en": "Fatter. Ha, ha, ha. Fatter.", "text_cn": "更胖。哈哈哈。更胖。" },
    { "id": 105, "text_en": "Help me, Corvax.", "text_cn": "救我，科瓦克斯。" },
    { "id": 106, "text_en": "I can't, your Majesty.", "text_cn": "我不能，陛下。" },
    { "id": 107, "text_en": "Silly. You're silly.", "text_cn": "愚蠢。你愚蠢。" },
    { "id": 108, "text_en": "Oh dear! What can I do? Ah, I can run away. Yes! The helicopter!", "text_cn": "哦天哪！我能做什么？啊，我可以逃跑。是的！直升机！" },
    { "id": 109, "text_en": "Help! Help, Corvax! Corvax!", "text_cn": "救命！救命，科瓦克斯！科瓦克斯！" },
    { "id": 110, "text_en": "Excuse me, your Majesty.", "text_cn": "抱歉，陛下。" },
    { "id": 111, "text_en": "What's happening? Where are you going?", "text_cn": "发生什么事了？你要去哪里？" },
    { "id": 112, "text_en": "To the helicopter.", "text_cn": "去直升机那里。" },
    { "id": 113, "text_en": "Help!", "text_cn": "救命！" },
    { "id": 114, "text_en": "Oh... The King's in the computer, Corvax. Stop!... Come back!... Corvax!", "text_cn": "哦……国王在电脑里，科瓦克斯。停下！……回来！……科瓦克斯！" },
    { "id": 115, "text_en": "Hey! Stop! Muzzy! Go up there to the computer room! Help the Queen. I can stop Corvax.", "text_cn": "嘿！停下！玛泽！去楼上的电脑房！帮助王后。我能拦住科瓦克斯。" },
    { "id": 116, "text_en": "Sorry! Excuse me!", "text_cn": "抱歉！打扰一下！" },
    { "id": 117, "text_en": "Excuse me. Oh, I beg your pardon.", "text_cn": "打扰一下。哦，对不起。" }
  ],
  "words": [
    { "word": "dark", "phonetic": "/dɑːk/", "translation": "黑暗的", "example": "It's getting dark.", "color": "bg-gray-800 border-gray-800 text-white" },
    { "word": "spring", "phonetic": "/sprɪŋ/", "translation": "春天", "example": "In spring it gets dark at seven.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "summer", "phonetic": "/ˈsʌmər/", "translation": "夏天", "example": "In summer it gets dark at nine.", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "autumn", "phonetic": "/ˈɔːtəm/", "translation": "秋天", "example": "In autumn it gets dark at seven.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "winter", "phonetic": "/ˈwɪntər/", "translation": "冬天", "example": "In winter it gets dark at five.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "fall", "phonetic": "/fɔːl/", "translation": "秋天（美式）", "example": "In fall it gets dark at seven.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "January", "phonetic": "/ˈdʒænjuəri/", "translation": "一月", "example": "January.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "February", "phonetic": "/ˈfebruəri/", "translation": "二月", "example": "February.", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "March", "phonetic": "/mɑːtʃ/", "translation": "三月", "example": "March.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "April", "phonetic": "/ˈeɪprəl/", "translation": "四月", "example": "April.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "May", "phonetic": "/meɪ/", "translation": "五月", "example": "May.", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "June", "phonetic": "/dʒuːn/", "translation": "六月", "example": "June.", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "July", "phonetic": "/dʒuˈlaɪ/", "translation": "七月", "example": "July.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "August", "phonetic": "/ɔːˈɡʌst/", "translation": "八月", "example": "August.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "September", "phonetic": "/sepˈtembər/", "translation": "九月", "example": "September.", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "October", "phonetic": "/ɒkˈtəʊbər/", "translation": "十月", "example": "October.", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "November", "phonetic": "/nəʊˈvembər/", "translation": "十一月", "example": "November.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "December", "phonetic": "/dɪˈsembər/", "translation": "十二月", "example": "December.", "color": "bg-sky-100 border-sky-200 text-sky-700" },
    { "word": "Monday", "phonetic": "/ˈmʌndeɪ/", "translation": "星期一", "example": "On Monday I play soccer.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "Tuesday", "phonetic": "/ˈtjuːzdeɪ/", "translation": "星期二", "example": "On Tuesday I play basketball.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "Wednesday", "phonetic": "/ˈwenzdeɪ/", "translation": "星期三", "example": "On Wednesday I go roller-skating.", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "Thursday", "phonetic": "/ˈθɜːzdeɪ/", "translation": "星期四", "example": "On Thursday I do my exercises.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "Friday", "phonetic": "/ˈfraɪdeɪ/", "translation": "星期五", "example": "On Friday I go swimming.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "Saturday", "phonetic": "/ˈsætədeɪ/", "translation": "星期六", "example": "On Saturday I play golf.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "Sunday", "phonetic": "/ˈsʌndeɪ/", "translation": "星期日", "example": "And on Sunday we play tennis.", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "soccer", "phonetic": "/ˈsɒkər/", "translation": "足球", "example": "play soccer", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "basketball", "phonetic": "/ˈbɑːskɪtbɔːl/", "translation": "篮球", "example": "play basketball", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "roller-skating", "phonetic": "/ˈrəʊlə skeɪtɪŋ/", "translation": "滑旱冰", "example": "go roller-skating", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "golf", "phonetic": "/ɡɒlf/", "translation": "高尔夫球", "example": "play golf", "color": "bg-emerald-100 border-emerald-200 text-emerald-700" },
    { "word": "floor", "phonetic": "/flɔːr/", "translation": "楼层", "example": "on the second floor", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "left", "phonetic": "/left/", "translation": "左边", "example": "on the left", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "right", "phonetic": "/raɪt/", "translation": "右边", "example": "on the right", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "middle", "phonetic": "/ˈmɪdl/", "translation": "中间", "example": "in the middle", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "top floor", "phonetic": "/tɒp flɔːr/", "translation": "顶层", "example": "the top floor", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "computer room", "phonetic": "/kəmˈpjuːtə ruːm/", "translation": "电脑房", "example": "the computer room", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "door", "phonetic": "/dɔːr/", "translation": "门", "example": "Open the door", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "downstairs", "phonetic": "/ˌdaʊnˈsteəz/", "translation": "楼下", "example": "Run downstairs", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "wait", "phonetic": "/weɪt/", "translation": "等待", "example": "Wait over there.", "color": "bg-sky-100 border-sky-200 text-sky-700" },
    { "word": "dinner-time", "phonetic": "/ˈdɪnə taɪm/", "translation": "晚餐时间", "example": "It's dinner-time", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "kitchen", "phonetic": "/ˈkɪtʃɪn/", "translation": "厨房", "example": "in the kitchen", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "hall", "phonetic": "/hɔːl/", "translation": "大厅", "example": "in the hall", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "fireplace", "phonetic": "/ˈfaɪəpleɪs/", "translation": "壁炉", "example": "by the fireplace", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "wall", "phonetic": "/wɔːl/", "translation": "墙", "example": "against the wall", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "sitting room", "phonetic": "/ˈsɪtɪŋ ruːm/", "translation": "客厅", "example": "in the sitting-room", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "bounce", "phonetic": "/baʊns/", "translation": "蹦跳", "example": "bouncing on the chairs", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "chair", "phonetic": "/tʃeər/", "translation": "椅子", "example": "on the chairs", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "bathroom", "phonetic": "/ˈbɑːθruːm/", "translation": "浴室", "example": "in the bathrooms", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "chandelier", "phonetic": "/ˌʃændəˈlɪər/", "translation": "枝形吊灯", "example": "Lots on the chandeliers", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "help", "phonetic": "/help/", "translation": "救命；帮助", "example": "Help!", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "frightened", "phonetic": "/ˈfraɪtnd/", "translation": "害怕的", "example": "I'm frightened.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "cry", "phonetic": "/kraɪ/", "translation": "哭", "example": "He's crying.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "reach", "phonetic": "/riːtʃ/", "translation": "够到", "example": "I can't reach the apple.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "tall", "phonetic": "/tɔːl/", "translation": "高的", "example": "Because you're tall.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "short", "phonetic": "/ʃɔːt/", "translation": "矮的", "example": "Because I'm small. (short implied)", "color": "bg-pink-100 border-pink-200 text-pink-700" }
  ]
},

  // -------- 第 6 集 --------
 {
  "id": 6,
  "title": "Episode 6",
  "bvid": "BV1hwRCBVEBv",
  "subtitles": [
    { "id": 1, "text_en": "Who's - What's that?", "text_cn": "那是谁——那是什么？" },
    { "id": 2, "text_en": "It's all right. That's Muzzy. He's a friend. Muzzy, this is the Queen.", "text_cn": "没关系。那是玛泽。他是个朋友。玛泽，这是王后。" },
    { "id": 3, "text_en": "Your Majesty!", "text_cn": "陛下！" },
    { "id": 4, "text_en": "What's happening? What's that green thing?", "text_cn": "发生什么事了？那个绿色的东西是什么？" },
    { "id": 5, "text_en": "Oh, that's not a thing. That's Muzzy. He's a friend.", "text_cn": "哦，那不是东西。那是玛泽。他是个朋友。" },
    { "id": 6, "text_en": "But he can't help! Where's Corvax?", "text_cn": "但是他帮不了忙！科瓦克斯在哪里？" },
    { "id": 7, "text_en": "Ah, yes. Corvax can help. Corvax is clever.", "text_cn": "啊，是的。科瓦克斯能帮忙。科瓦克斯很聪明。" },
    { "id": 8, "text_en": "No, he isn't. He's silly.", "text_cn": "不，他不聪明。他很傻。" },
    { "id": 9, "text_en": "I can help, your Majesty.", "text_cn": "我能帮忙，陛下。" },
    { "id": 10, "text_en": "You? But you aren't clever.", "text_cn": "你？但是你不聪明。" },
    { "id": 11, "text_en": "I am. Mm. Lovely!", "text_cn": "我聪明。嗯。好吃！" },
    { "id": 12, "text_en": "What are you doing, Muzzy?", "text_cn": "你在做什么，玛泽？" },
    { "id": 13, "text_en": "Wait a moment!", "text_cn": "等一下！" },
    { "id": 14, "text_en": "What are you doing?", "text_cn": "你在做什么？" },
    { "id": 15, "text_en": "Excuse me. I'm hungry.", "text_cn": "抱歉。我饿了。" },
    { "id": 16, "text_en": "Hungry? But the King's in there. Why are you eating that?", "text_cn": "饿了？但是国王在里面。你为什么吃那个？" },
    { "id": 17, "text_en": "Because I like it. Ah, I see. This goes here. This goes here. No, no it doesn't.", "text_cn": "因为我喜欢它。啊，我明白了。这个放这里。这个放这里。不，不，不对。" },
    { "id": 18, "text_en": "Careful, please, Muzzy!", "text_cn": "请小心，玛泽！" },
    { "id": 19, "text_en": "It's all right. It goes in here, and this goes in here.", "text_cn": "没关系。它放进这里，这个放进这里。" },
    { "id": 20, "text_en": "All right, your Majesty. I'm ready.", "text_cn": "好了，陛下。我准备好了。" },
    { "id": 21, "text_en": "I'm ready too. It's hot in here. Ah! That's better.", "text_cn": "我也准备好了。这里面很热。啊！好多了。" },
    { "id": 22, "text_en": "Thank you Muzzy. You are clever.", "text_cn": "谢谢你玛泽。你真聪明。" },
    { "id": 23, "text_en": "Where's Bob?", "text_cn": "鲍勃在哪里？" },
    { "id": 24, "text_en": "Bob? Bob the gardener? Oh, look...", "text_cn": "鲍勃？园丁鲍勃？哦，看……" },
    { "id": 25, "text_en": "Come on Bob! Great!", "text_cn": "来吧鲍勃！太棒了！" },
    { "id": 26, "text_en": "Come on! Well done! Hurray!", "text_cn": "来吧！做得好！好哇！" },
    { "id": 27, "text_en": "OK. We've got him. Corvax! Corvax! Wake up!", "text_cn": "好了。我们抓住他了。科瓦克斯！科瓦克斯！醒醒！" },
    { "id": 28, "text_en": "What... What's happening? Who are you? Where am I? Why am I here? Who am I?", "text_cn": "什么……发生什么事了？你是谁？我在哪里？我为什么在这里？我是谁？" },
    { "id": 29, "text_en": "You're Corvax. And you're silly.", "text_cn": "你是科瓦克斯。而且你很傻。" },
    { "id": 30, "text_en": "Yes, I'm silly. No, I'm not. I'm clever.", "text_cn": "是的，我很傻。不，我不傻。我很聪明。" },
    { "id": 31, "text_en": "You are not clever, Corvax.", "text_cn": "你不聪明，科瓦克斯。" },
    { "id": 32, "text_en": "Take him away!", "text_cn": "把他带走！" },
    { "id": 33, "text_en": "Yes. Take him away!", "text_cn": "是的。把他带走！" },
    { "id": 34, "text_en": "Stand there! Now... try this.", "text_cn": "站在那里！现在……试试这个。" },
    { "id": 35, "text_en": "They're going. They're going into the computer.", "text_cn": "他们正在进去。他们正在进入电脑。" },
    { "id": 36, "text_en": "I love you.", "text_cn": "我爱你。" },
    { "id": 37, "text_en": "Who is that beautiful girl? What is her name? Where does she come from? When can I see her? Why am I down here?", "text_cn": "那个美丽的女孩是谁？她叫什么名字？她从哪里来？我什么时候能见到她？我为什么在这下面？" },
    { "id": 38, "text_en": "Now we are together.", "text_cn": "现在我们在一起了。" },
    { "id": 39, "text_en": "I love you.", "text_cn": "我爱你。" },
    { "id": 40, "text_en": "There goes a red one. There goes a blue one. There goes a green one. A black and white one too. Lots and lots of Sylvias coming back this way. Three cheers for Muzzy, Hurray! Hurray! Hurray! Now there are ten of them. Now there are nine. Eight- seven- six- five. Coming on behind. Four's going in now. There goes number three. Number two and number one, and that leaves... Me!", "text_cn": "过去一个红色的。过去一个蓝色的。过去一个绿色的。还有一个黑白色的。许许多多的西尔维娅从这条路回来。为玛泽三呼万岁，好哇！好哇！好哇！现在有十个了。现在有九个了。八——七——六——五。跟在后面。四正在进去。过去三号。二号和一号，剩下的……我！" },
    { "id": 41, "text_en": "Hurray! Hurray! Hurray!", "text_cn": "好哇！好哇！好哇！" },
    { "id": 42, "text_en": "You and I are happy. Now we are together.", "text_cn": "你和我很开心。现在我们在一起了。" },
    { "id": 43, "text_en": "A- E- I- O- U", "text_cn": "A-E-I-O-U" },
    { "id": 44, "text_en": "Please come back some day.", "text_cn": "请有一天再回来。" },
    { "id": 45, "text_en": "Goodbye! Goodbye! Goodbye!", "text_cn": "再见！再见！再见！" },
    { "id": 46, "text_en": "We're saying goodbye to Muzzy. We're saying goodbye to you.", "text_cn": "我们在跟玛泽告别。我们在跟你告别。" },
    { "id": 47, "text_en": "The King, the Queen, Sylvia, Bob, Corvax and Norman too. Goodbye! Goodbye! Goodbye!", "text_cn": "国王、王后、西尔维娅、鲍勃、科瓦克斯还有诺曼。再见！再见！再见！" }
  ],
  "words": [
    { "word": "fat", "phonetic": "/fæt/", "translation": "胖的", "example": "There's a fat one.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "fatter", "phonetic": "/ˈfætər/", "translation": "更胖的", "example": "That one's fatter.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "small", "phonetic": "/smɔːl/", "translation": "小的", "example": "I'm small.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "smaller", "phonetic": "/ˈsmɔːlər/", "translation": "更小的", "example": "And the fourth one's smaller.", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "tall", "phonetic": "/tɔːl/", "translation": "高的", "example": "The fifth is tall.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "taller", "phonetic": "/ˈtɔːlər/", "translation": "更高的", "example": "The sixth is taller.", "color": "bg-sky-100 border-sky-200 text-sky-700" },
    { "word": "big", "phonetic": "/bɪɡ/", "translation": "大的", "example": "I'm big.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "bigger", "phonetic": "/ˈbɪɡər/", "translation": "更大的", "example": "I'm bigger.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "first", "phonetic": "/fɜːst/", "translation": "第一", "example": "The first one's big.", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "second", "phonetic": "/ˈsekənd/", "translation": "第二", "example": "The second one's bigger.", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "third", "phonetic": "/θɜːd/", "translation": "第三", "example": "The third one's small.", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "fourth", "phonetic": "/fɔːθ/", "translation": "第四", "example": "the fourth one's smaller", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "fifth", "phonetic": "/fɪfθ/", "translation": "第五", "example": "The fifth is tall.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "sixth", "phonetic": "/sɪksθ/", "translation": "第六", "example": "The sixth is taller.", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "seventh", "phonetic": "/ˈsevnθ/", "translation": "第七", "example": "The seventh is fat.", "color": "bg-emerald-100 border-emerald-200 text-emerald-700" },
    { "word": "eighth", "phonetic": "/eɪtθ/", "translation": "第八", "example": "the eighth is fatter", "color": "bg-violet-100 border-violet-200 text-violet-700" },
    { "word": "silly", "phonetic": "/ˈsɪli/", "translation": "愚蠢的", "example": "He's silly.", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "run away", "phonetic": "/rʌn əˈweɪ/", "translation": "逃跑", "example": "I can run away.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "helicopter", "phonetic": "/ˈhelɪkɒptər/", "translation": "直升机", "example": "The helicopter!", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "hot", "phonetic": "/hɒt/", "translation": "热的", "example": "It's hot in here.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "wake up", "phonetic": "/weɪk ʌp/", "translation": "醒来", "example": "Wake up!", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "job", "phonetic": "/dʒɒb/", "translation": "工作", "example": "I don't like this job.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "dirty", "phonetic": "/ˈdɜːti/", "translation": "脏的", "example": "dirty", "color": "bg-stone-100 border-stone-200 text-stone-700" },
    { "word": "your Majesty", "phonetic": "/jɔː ˈmædʒəsti/", "translation": "陛下", "example": "Your Majesty!", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "be careful", "phonetic": "/biː ˈkeəfl/", "translation": "小心", "example": "Be careful!", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "I beg your pardon", "phonetic": "/aɪ beɡ jɔː ˈpɑːdn/", "translation": "对不起；请原谅", "example": "I beg your pardon.", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "wait a moment", "phonetic": "/weɪt ə ˈməʊmənt/", "translation": "等一下", "example": "Wait a moment!", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "stand", "phonetic": "/stænd/", "translation": "站立", "example": "Stand there!", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "try", "phonetic": "/traɪ/", "translation": "尝试", "example": "Try this.", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "together", "phonetic": "/təˈɡeðər/", "translation": "在一起", "example": "Now we are together.", "color": "bg-rose-100 border-rose-200 text-rose-700" }
  ]
},

  // -------- 第 7 集 --------
  {
  "id": 7,
  "title": "Episode 7",
  "bvid": "BV1DwRCBGEhD",
  "subtitles": [
    { "id": 1, "text_en": "Now I'm in my spaceship.", "text_cn": "现在我在我的飞船里。" },
    { "id": 2, "text_en": "Now I'm on my way.", "text_cn": "现在我在路上了。" },
    { "id": 3, "text_en": "I'm going to a party.", "text_cn": "我要去参加一个派对。" },
    { "id": 4, "text_en": "Hip! Hip! Hip! Hooray!", "text_cn": "嗨！嗨！嗨！万岁！" },
    { "id": 5, "text_en": "Hi! I'm Muzzy.", "text_cn": "嗨！我是玛泽。" },
    { "id": 6, "text_en": "Big Muzzy.", "text_cn": "大玛泽。" },
    { "id": 7, "text_en": "Hmm! A hundred and fifty trees there... and thirty trees here. Oh, hello! I'm Bob.", "text_cn": "嗯！那里有一百五十棵树……这里三十棵树。哦，你好！我是鲍勃。" },
    { "id": 8, "text_en": "Hey, Bob! Are you there?", "text_cn": "嘿，鲍勃！你在吗？" },
    { "id": 9, "text_en": "Who's that?", "text_cn": "那是谁？" },
    { "id": 10, "text_en": "It's me! Muzzy!", "text_cn": "是我！玛泽！" },
    { "id": 11, "text_en": "Ah! Hello, Muzzy. How are you?", "text_cn": "啊！你好，玛泽。你好吗？" },
    { "id": 12, "text_en": "I'm fine, thanks. What time is the party?", "text_cn": "我很好，谢谢。派对几点开始？" },
    { "id": 13, "text_en": "It's at half past five this afternoon.", "text_cn": "今天下午五点半。" },
    { "id": 14, "text_en": "Oh dear! Am I late?", "text_cn": "哦天哪！我迟到了吗？" },
    { "id": 15, "text_en": "No, you aren't late, Muzzy. You're early.", "text_cn": "不，你没迟到，玛泽。你来早了。" },
    { "id": 16, "text_en": "Early? Yes. The party's at half past five. What time is it now?", "text_cn": "早？是的。派对五点半开始。现在几点了？" },
    { "id": 17, "text_en": "Hello! I'm Norman. Welcome to Gondoland! That's the Palace. And there's the King.", "text_cn": "你好！我是诺曼。欢迎来到冈多兰！那是宫殿。那是国王。" },
    { "id": 18, "text_en": "How do you do? I'm the King of Gondoland.", "text_cn": "你好！我是冈多兰的国王。" },
    { "id": 19, "text_en": "And there's the Queen.", "text_cn": "那是王后。" },
    { "id": 20, "text_en": "How do you do? I'm the Queen.", "text_cn": "你好！我是王后。" },
    { "id": 21, "text_en": "And their daughter, Princess Sylvia.", "text_cn": "还有他们的女儿，西尔维娅公主。" },
    { "id": 22, "text_en": "Hello!", "text_cn": "你好！" },
    { "id": 23, "text_en": "And Sylvia's husband, Bob.", "text_cn": "还有西尔维娅的丈夫，鲍勃。" },
    { "id": 24, "text_en": "What time is it? It's eight o'clock. See you at ten o'clock.", "text_cn": "几点了？八点了。十点见。" },
    { "id": 25, "text_en": "Bye!", "text_cn": "再见！" },
    { "id": 26, "text_en": "Oh, all right.", "text_cn": "哦，好吧。" },
    { "id": 27, "text_en": "Don't be late! See you at the party!", "text_cn": "别迟到！派对上见！" },
    { "id": 28, "text_en": "Where is he?", "text_cn": "他在哪儿？" },
    { "id": 29, "text_en": "See you!", "text_cn": "再见！" },
    { "id": 30, "text_en": "Ten fifteen. Quarter past ten. Ten thirty. Half past ten. Ten forty-five. Quarter to eleven.", "text_cn": "十点十五分。十点一刻。十点三十分。十点半。十点四十五分。十点三刻。" },
    { "id": 31, "text_en": "Ah! There you are!...", "text_cn": "啊！你在这儿！……" },
    { "id": 32, "text_en": "He's late again.", "text_cn": "他又迟到了。" },
    { "id": 33, "text_en": "You're late.", "text_cn": "你迟到了。" },
    { "id": 34, "text_en": "No, I'm not. I'm early. It's quarter to ten.", "text_cn": "不，我没有。我来早了。现在是九点三刻。" },
    { "id": 35, "text_en": "It isn't. It's... eleven o'clock.", "text_cn": "不是。现在……十一点了。" },
    { "id": 36, "text_en": "Oh dear! I am late. But I've got this for you!...", "text_cn": "哦天哪！我确实迟到了。但我给你带来了这个！……" },
    { "id": 37, "text_en": "What's the time in Gondoland? It's ten fifteen - quarter past ten in the morning.", "text_cn": "冈多兰现在几点？上午十点十五分——十点一刻。" },
    { "id": 38, "text_en": "Oh! This clock here says quarter to three. And this one says half past four... Ah! This one says ten fifteen. So you're early.", "text_cn": "哦！这个钟显示两点三刻。那个显示四点半……啊！这个显示十点十五分。所以你来早了。" },
    { "id": 39, "text_en": "Where's Sylvia? I don't know... but we've got a surprise for you.", "text_cn": "西尔维娅在哪儿？我不知道……但我们有个惊喜给你。" },
    { "id": 40, "text_en": "A surprise! What is it? Aha! It's a secret. Tell me. No. It's a secret. Wait and see.", "text_cn": "惊喜！是什么？啊哈！这是个秘密。告诉我。不，是个秘密。等着瞧吧。" },
    { "id": 41, "text_en": "It's not a secret. It's Amanda. And whose baby are you? She's ours, of course.", "text_cn": "这不是秘密。是阿曼达。你是谁家的宝宝？她当然是我们家的。" },
    { "id": 42, "text_en": "Yes. You're our baby. And whose fingers are these? They're Amanda's fingers.", "text_cn": "是的。你是我们的宝宝。这些是谁的手指？是阿曼达的手指。" },
    { "id": 43, "text_en": "And whose toes are these? They're Amanda's toes. They're hers.", "text_cn": "这些是谁的脚趾？是阿曼达的脚趾。是她的。" },
    { "id": 44, "text_en": "And whose eyes are these? They're your eyes, Amanda. Yes, they're yours. And this is your little nose. Yours!", "text_cn": "这些是谁的眼睛？是你的眼睛，阿曼达。是的，是你的。这是你的小鼻子。你的！" },
    { "id": 45, "text_en": "How many fingers? How many toes? How many eyes Beside her nose? Ten little fingers. Ten little toes. Two big brown eyes. And a little pink nose. And how many teeth? Ow!", "text_cn": "多少根手指？多少个脚趾？鼻子旁边有多少只眼睛？十根小手指。十个小脚趾。两只棕色大眼睛。还有一个小粉鼻子。多少颗牙？哎哟！" },
    { "id": 46, "text_en": "Naughty Amanda! Come on! Off we go!", "text_cn": "淘气的阿曼达！来吧！我们走！" },
    { "id": 47, "text_en": "Are we ready for the party? Nearly. We're nearly ready. Corvax is making a cake. A huge cake! An enormous cake!", "text_cn": "我们准备好参加派対了吗？差不多了。我们快准备好了。科瓦克斯在做蛋糕。一个巨大的蛋糕！一个庞大的蛋糕！" },
    { "id": 48, "text_en": "Ohh! Eugh! Now what does it say here? Er... what do we need? Mmm! Flour. I need flour... sugar... currants... Oh, I hate this job. Ah! How do you do? I'm Corvax. Eggs, butter... Oh dear! I need help.", "text_cn": "哦！呃！这里写着什么？呃……我们需要什么？嗯！面粉。我需要面粉……糖……葡萄干……哦，我讨厌这个工作。啊！你好！我是科瓦克斯。鸡蛋、黄油……哦天哪！我需要帮助。" },
    { "id": 49, "text_en": "Here you are, Corvax! He can help you. Be good, or you go back to prison.", "text_cn": "给你，科瓦克斯！他能帮你。听话，否则你就回监狱去。" },
    { "id": 50, "text_en": "Who are you? What's your name? I'm Thimbo. Thimbo the terrible! I'm bad! Bad are you? Aha!", "text_cn": "你是谁？你叫什么名字？我是辛博。可怕的辛博！我很坏！你很坏？啊哈！" },
    { "id": 51, "text_en": "I know you. You're Corvax. You're very bad. Yes. And I'm clever. What are you doing, Corvax? I'm making a cake. A huge cake. An enormous cake.", "text_cn": "我认识你。你是科瓦克斯。你非常坏。是的。而且我很聪明。你在做什么，科瓦克斯？我在做蛋糕。一个巨大的蛋糕。一个庞大的蛋糕。" },
    { "id": 52, "text_en": "Now get some sugar and some eggs and some apples and... I hate work! I hate work. And I hate Bob and I hate Muzzy. Muzzy? Who's Muzzy? Wait and see! The party's for Muzzy. What food does he like? Clocks. Clocks! Does he eat clocks? Yes, he does. Muzzy eats clocks. Now, you get on with your work! I don't like Muzzy and I don't like Bob. But I love Princess Sylvia.", "text_cn": "现在去拿些糖、鸡蛋和苹果……我讨厌工作！我讨厌工作。我讨厌鲍勃，也讨厌玛泽。玛泽？谁是玛泽？等着瞧！派対是为玛泽办的。他喜欢什么食物？钟表。钟表！他吃钟表吗？是的，他吃。玛泽吃钟表。现在，你继续干你的活！我不喜欢玛泽，也不喜欢鲍勃。但我爱西尔维娅公主。" },
    { "id": 53, "text_en": "Hello, Muzzy. Welcome to Gondoland! Hello, Bob... Your Majesty!", "text_cn": "你好，玛泽。欢迎来到冈多兰！你好，鲍勃……陛下！" },
    { "id": 54, "text_en": "Glad to see you again, Muzzy. Oh, Muzzy! It is nice to see you. It's a pleasure, your Majesty!", "text_cn": "很高兴再次见到你，玛泽。哦，玛泽！见到你真好。这是我的荣幸，陛下！" },
    { "id": 55, "text_en": "And here's our secret. Sylvia! A baby! What a nice surprise! Is it your baby? Yes, it's ours. Of course it's theirs.", "text_cn": "这就是我们的秘密。西尔维娅！一个宝宝！多么好的惊喜！这是你的宝宝吗？是的，是我们的。当然是他们的。" },
    { "id": 56, "text_en": "And what's its... his... her... She's a girl. Her name's Amanda.", "text_cn": "它叫什么……他……她……她是个女孩。她的名字叫阿曼达。" },
    { "id": 57, "text_en": "What's happening? What's all this? Who are you? I'm Thimbo. Where's Corvax? Over there! Where? He's there, your Majesty. Don't be silly! Corvax isn't here. Get on with your work!", "text_cn": "发生什么事了？这都是什么？你是谁？我是辛博。科瓦克斯在哪儿？在那边！哪儿？他在那儿，陛下。别傻了！科瓦克斯不在这儿。继续干你的活！" },
    { "id": 58, "text_en": "Corvax! Where are you? I'm here. Wow! That's clever! Can I do that? No, you can't. It's a secret. But perhaps... Ah, yes! Yes! I've got a surprise. A surprise for the King... and for Bob... and for everyone. And you can help me.", "text_cn": "科瓦克斯！你在哪儿？我在这儿。哇！真聪明！我能那样做吗？不，你不能。这是个秘密。但也许……啊，是的！是的！我有个惊喜。给国王的惊喜……给鲍勃的……给所有人的。你可以帮我。" },
    { "id": 59, "text_en": "Corvax! What's your surprise? What's your secret? My secret? Ah! Wait a moment! Look outside! Is anyone there? Is anyone there? No!... Tt!...Tt!...Thimbo... Is anyone there? Can you see anyone? Oh! I can't see anyone. No. There's no one outside.", "text_cn": "科瓦克斯！你的惊喜是什么？你的秘密是什么？我的秘密？啊！等一下！看外面！有人吗？有人吗？没有！……啧！……啧！……辛博……有人吗？你能看见谁吗？哦！我看不见任何人。没有。外面没有人。" },
    { "id": 60, "text_en": "Help! Help! Help! There's someone inside. Listen! I can't hear anyone. Help! Ah! Now I can hear someone. Thank you. Is there anyone inside now? No. There's no one inside. And your clock's working.", "text_cn": "救命！救命！救命！里面有人。听！我什么也听不见。救命！啊！现在我能听见有人了。谢谢。现在里面有人吗？没有。里面没人。你的钟还在走。" },
    { "id": 61, "text_en": "Can anyone see me? No. You're invisible. Wow! I'm invisible! No one can see me! Now I'm pushing my button. Now you're invisible, too. Yes. That's my secret. IN- VI- SI- BLE! Wheee! Put those clocks down! And do some work! Put some roses on the cake!", "text_cn": "有人能看见我吗？不，你是隐形的。哇！我隐形了！没人能看见我！现在我在按我的按钮。现在你也隐形了。是的。这就是我的秘密。隐——形——的！呜呼！把那些钟放下！干点活！在蛋糕上放些玫瑰！" },
    { "id": 62, "text_en": "A red one here... a yellow one here... a yellow one... What about a big one on the top? I'm putting this on the top. There! Now it's ready. Ohh! It's lovely! Don't be silly! It's half past four. The Queen's waiting for you. Off you go!", "text_cn": "这里放一朵红的……这里放一朵黄的……一朵黄的……顶上放一朵大的怎么样？我把这个放在顶上。好了！现在准备好了。哦！真可爱！别傻了！现在四点半了。王后在等你。你走吧！" },
    { "id": 63, "text_en": "No one there? Right! Take this box! OK, I have it. Now, push the button! This button? No! That's the wrong one, silly! Look! It says 'Push'. Er... Mm...", "text_cn": "没人？好！拿着这个盒子！好的，我拿到了。现在，按按钮！这个按钮？不！那个是错的，傻瓜！看！上面写着“按”。呃……嗯……" },
    { "id": 64, "text_en": "Now, can you greet the guests politely? Yes, your Majesty. Wait! All right. Say 'Good evening'. 'Ello, darling! No, no, no! That's rude. Say 'Good evening' politely. Like this. 'Good evening'. Good evening, your Majesty.", "text_cn": "现在，你能礼貌地迎接客人吗？是的，陛下。等等！好了。说“晚上好”。“你好，亲爱的！”不，不，不！太粗鲁了。礼貌地说“晚上好”。像这样。“晚上好”。晚上好，陛下。" },
    { "id": 65, "text_en": "Here's a piece of cake. I'm having a piece, too. Have a piece of this. No, thank you. Would you like some soup? No, not for me, thank you. A bun - some cookies - a cup of tea? A glass of lemonade? No, thank you very much. I like clocks. Lots of clocks.", "text_cn": "这是一块蛋糕。我也吃一块。尝尝这个。不了，谢谢。你想喝点汤吗？不了，我不需要，谢谢。一个小圆面包——一些饼干——一杯茶？一杯柠檬水？不用了，非常感谢。我喜欢钟表。很多钟表。" },
    { "id": 66, "text_en": "A cup. Some tea. A cup of tea. Some soup. A little soup. A lot of soup. A clock. Some clocks. Lots of clocks.", "text_cn": "一个杯子。一些茶。一杯茶。一些汤。一点汤。很多汤。一个钟。一些钟。很多钟。" },
    { "id": 67, "text_en": "What's happening? Someone's opening the door. Look! There's Amanda! Mm! She's going that way. Now someone's opening the other door. Mm! Now she's going through that door. And someone's closing it. Mm! Closing it. Where's Amanda? What happened? Someone opened that door. Then someone opened the other door. And someone closed it. Mm! Closed it. But where's Amanda? She went through that door. Mm! She went that way. She... Oh, come on! They can't help.", "text_cn": "发生什么事了？有人打开了门。看！是阿曼达！嗯！她正往那边走。现在有人打开了另一扇门。嗯！现在她正穿过那扇门。有人关上了门。嗯！关上了。阿曼达在哪儿？发生什么事了？有人打开了那扇门。然后有人打开了另一扇门。有人关上了它。嗯！关上了。但是阿曼达在哪儿？她穿过了那扇门。嗯！她往那边走了。她……哦，走吧！他们帮不上忙。" },
    { "id": 68, "text_en": "Mm! She went that way. She went through that door.", "text_cn": "嗯！她往那边走了。她穿过了那扇门。" },
    { "id": 69, "text_en": "What's the matter? Your clock's wrong. Oh boy! Yes. It is wrong. What's he doing? He's listening... Now he's looking at the clock... Now he's opening the door... He's going inside... Now he's closing the door. He's going upstairs. It's all right now. Now, sir. What happened? Well, I listened to the clock. Then I looked at it. I opened the door. Then I closed it. I went upstairs... And the clock was all right. It was all right. Well, it isn't all right now.", "text_cn": "怎么了？你的钟不准了。哦天哪！是的，不准了。他在做什么？他在听……现在他在看钟……现在他在开门……他走进去……现在他在关门。他上楼去了。现在好了。先生，发生什么事了？嗯，我听了钟。然后我看了看它。我打开了门。然后我关上了门。我上了楼……钟是好的。它是好的。嗯，现在它可不好了。" },
    { "id": 70, "text_en": "I pushed the button. I was invisible. And... what do I do now? Get into the boat. This one? No! That's an old boat. Get into the one over there! The new one. The big new boat? The King's boat? Yes. The baby's things are in there. And take the baby! I've got her. Ow! This baby bites. What's the matter? She bit me. What? The baby bit me. Ow! Sshh! She bit me again. She often bites. Where are the things for the baby? We've got these things here. A pair of shoes, a pair of socks... It's all right. We've got everything. Let's go!", "text_cn": "我按了按钮。我隐形了。然后……我现在该做什么？上船。这艘？不！那是一艘旧船。上那边那艘！新的那艘。那艘大的新船？国王的船？是的。宝宝的东西在里面。带上宝宝！我抓住她了。哎哟！这宝宝咬人。怎么了？她咬了我。什么？宝宝咬了我。哎哟！嘘！她又咬了我。她经常咬人。宝宝的东西在哪儿？我们这儿有这些东西。一双鞋，一双袜子……好了。我们什么都带了。走吧！" },
    { "id": 71, "text_en": "We looked everywhere. We looked everywhere. In the garden? We looked in the garden. In the kitchen? We looked in the kitchen. In the bedrooms? We looked in the bedrooms. We looked in the garden, We looked in the kitchen, We looked in the bedrooms.", "text_cn": "我们找遍了所有地方。我们找遍了所有地方。在花园里？我们找过了花园。在厨房里？我们找过了厨房。在卧室里？我们找过了卧室。我们找过了花园，我们找过了厨房，我们找过了卧室。" }
  ],
  "words": [
    { "word": "thirty", "phonetic": "/ˈθɜːti/", "translation": "三十", "example": "thirty trees here", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "party", "phonetic": "/ˈpɑːti/", "translation": "派对", "example": "What time is the party?", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "daughter", "phonetic": "/ˈdɔːtər/", "translation": "女儿", "example": "their daughter, Princess Sylvia", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "husband", "phonetic": "/ˈhʌzbənd/", "translation": "丈夫", "example": "Sylvia's husband, Bob", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "half past five", "phonetic": "/hɑːf pɑːst faɪv/", "translation": "五点半", "example": "It's at half past five", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "late", "phonetic": "/leɪt/", "translation": "迟到的", "example": "Am I late?", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "early", "phonetic": "/ˈɜːli/", "translation": "早到的", "example": "You're early", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "eight o'clock", "phonetic": "/eɪt əˈklɒk/", "translation": "八点", "example": "It's eight o'clock", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "quarter past ten", "phonetic": "/ˈkwɔːtə pɑːst ten/", "translation": "十点一刻", "example": "Quarter past ten", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "half past ten", "phonetic": "/hɑːf pɑːst ten/", "translation": "十点半", "example": "Half past ten", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "quarter to eleven", "phonetic": "/ˈkwɔːtə tə ɪˈlevn/", "translation": "十点三刻", "example": "Quarter to eleven", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "surprise", "phonetic": "/səˈpraɪz/", "translation": "惊喜", "example": "a surprise for you", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "secret", "phonetic": "/ˈsiːkrət/", "translation": "秘密", "example": "It's a secret", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "baby", "phonetic": "/ˈbeɪbi/", "translation": "婴儿", "example": "Whose baby are you?", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "fingers", "phonetic": "/ˈfɪŋɡəz/", "translation": "手指", "example": "How many fingers?", "color": "bg-fuchsia-100 border-fuchsia-200 text-fuchsia-700" },
    { "word": "little nose", "phonetic": "/ˈlɪtl nəʊz/", "translation": "小鼻子", "example": "your little nose", "color": "bg-sky-100 border-sky-200 text-sky-700" },
    { "word": "pink", "phonetic": "/pɪŋk/", "translation": "粉色的", "example": "a little pink nose", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "teeth", "phonetic": "/tiːθ/", "translation": "牙齿", "example": "How many teeth?", "color": "bg-white-100 border-gray-300 text-gray-700" },
    { "word": "naughty", "phonetic": "/ˈnɔːti/", "translation": "淘气的", "example": "Naughty Amanda!", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "cake", "phonetic": "/keɪk/", "translation": "蛋糕", "example": "Corvax is making a cake", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "huge", "phonetic": "/hjuːdʒ/", "translation": "巨大的", "example": "a huge cake", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "enormous", "phonetic": "/ɪˈnɔːməs/", "translation": "庞大的", "example": "an enormous cake", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "flour", "phonetic": "/ˈflaʊər/", "translation": "面粉", "example": "I need flour", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "sugar", "phonetic": "/ˈʃʊɡər/", "translation": "糖", "example": "sugar", "color": "bg-white-100 border-gray-300 text-gray-700" },
    { "word": "currants", "phonetic": "/ˈkʌrənts/", "translation": "葡萄干", "example": "currants", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "prison", "phonetic": "/ˈprɪzn/", "translation": "监狱", "example": "go back to prison", "color": "bg-gray-800 border-gray-800 text-white" },
    { "word": "terrible", "phonetic": "/ˈterəbl/", "translation": "可怕的", "example": "Thimbo the terrible", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "its", "phonetic": "/ɪts/", "translation": "它的", "example": "its nose", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "girl", "phonetic": "/ɡɜːl/", "translation": "女孩", "example": "She's a girl", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "bite", "phonetic": "/baɪt/", "translation": "咬", "example": "The baby bit me", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "people", "phonetic": "/ˈpiːpl/", "translation": "人们", "example": "Does she often bite people?", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "sometimes", "phonetic": "/ˈsʌmtaɪmz/", "translation": "有时", "example": "I sometimes wear trousers", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "pants", "phonetic": "/pænts/", "translation": "裤子", "example": "I always wear pants", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "skirt", "phonetic": "/skɜːt/", "translation": "裙子", "example": "I never wear a skirt", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "dog", "phonetic": "/dɒɡ/", "translation": "狗", "example": "The dog always brings them back", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "salt", "phonetic": "/sɔːlt/", "translation": "盐", "example": "salt", "color": "bg-white-100 border-gray-300 text-gray-700" },
    { "word": "pepper", "phonetic": "/ˈpepər/", "translation": "胡椒", "example": "pepper", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "rice", "phonetic": "/raɪs/", "translation": "大米", "example": "Have you got any rice?", "color": "bg-white-100 border-gray-300 text-gray-700" },
    { "word": "cheese", "phonetic": "/tʃiːz/", "translation": "奶酪", "example": "Do you want any cheese?", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "biscuits", "phonetic": "/ˈbɪskɪts/", "translation": "饼干", "example": "some biscuits", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "eggs", "phonetic": "/eɡz/", "translation": "鸡蛋", "example": "eggs", "color": "bg-white-100 border-gray-300 text-gray-700" },
    { "word": "milk", "phonetic": "/mɪlk/", "translation": "牛奶", "example": "milk", "color": "bg-white-100 border-gray-300 text-gray-700" },
    { "word": "read", "phonetic": "/riːd/", "translation": "阅读", "example": "Read it", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "plates", "phonetic": "/pleɪts/", "translation": "盘子", "example": "plates", "color": "bg-blue-100 border-blue-200 text-blue-700" }
  ]
},

  // -------- 第 8 集 --------
  {
  "id": 8,
  "title": "Episode 8",
  "bvid": "BV1gwRCBVEqd",
  "subtitles": [
    { "id": 1, "text_en": "Where are we going?", "text_cn": "我们要去哪里？" },
    { "id": 2, "text_en": "Ah! That's a secret.", "text_cn": "啊！那是个秘密。" },
    { "id": 3, "text_en": "Come on, Corvax! Tell me!", "text_cn": "快说，科瓦克斯！告诉我！" },
    { "id": 4, "text_en": "No! It's a secret.", "text_cn": "不！这是个秘密。" },
    { "id": 5, "text_en": "Corvax, why are we taking the baby?", "text_cn": "科瓦克斯，我们为什么要带走宝宝？" },
    { "id": 6, "text_en": "Go left... go left... go left. Go right... go right... go right. Go straight ahead... Go straight ahead.", "text_cn": "向左走……向左走……向左走。向右走……向右走……向右走。一直向前……一直向前。" },
    { "id": 7, "text_en": "Yes! Straight ahead...", "text_cn": "是的！一直向前……" },
    { "id": 8, "text_en": "Bob wasn't important. He was the - er- gardener. I said 'Count the flowers!'", "text_cn": "鲍勃不重要。他呃是园丁。我说'数花！'" },
    { "id": 9, "text_en": "He! He! What happened?", "text_cn": "嘿嘿！发生了什么？" },
    { "id": 10, "text_en": "He counted the flowers. But then...", "text_cn": "他数了花。但是然后……" },
    { "id": 11, "text_en": "What happened then? Tell me, Corvax.", "text_cn": "然后发生了什么？告诉我，科瓦克斯。" },
    { "id": 12, "text_en": "He went away with Princess Sylvia. They went away on his motorcycle.", "text_cn": "他和西尔维娅公主一起离开了。他们骑着他的摩托车走了。" },
    { "id": 13, "text_en": "Did they go far? No, they didn't. They didn't go far.", "text_cn": "他们走远了吗？不，他们没有。他们没走远。" },
    { "id": 14, "text_en": "Did you catch them? Yes, I did. They took Bob away. They put him in prison. But Muzzy was there. They got out.", "text_cn": "你抓到他们了吗？是的，我抓到了。他们把鲍勃带走了。他们把他关进监狱。但是玛泽在那里。他们逃出来了。" },
    { "id": 15, "text_en": "You can be the King, Corvax. But what about me?", "text_cn": "你可以当国王，科瓦克斯。但是我呢？" },
    { "id": 16, "text_en": "Oh, you can be important, Thimbo.", "text_cn": "哦，你可以变得重要，辛博。" },
    { "id": 17, "text_en": "Important? Yes. Important. Once upon a time. Once upon a time, I was important. Very important.", "text_cn": "重要？是的。重要。从前。从前，我很重要。非常重要。" },
    { "id": 18, "text_en": "Were you? Yes, I was.", "text_cn": "你吗？是的，我是。" },
    { "id": 19, "text_en": "Was Bob important? No, he wasn't.", "text_cn": "鲍勃重要吗？不，他不重要。" },
    { "id": 20, "text_en": "What about Princess Sylvia? Did you love her? Yes, I did. I loved Sylvia. I wanted to marry her. But the computer... the computer! Oh, it was terrible!", "text_cn": "西尔维娅公主呢？你爱她吗？是的，我爱她。我爱西尔维娅。我想娶她。但是电脑……电脑！哦，太可怕了！" },
    { "id": 21, "text_en": "Tell me, Corvax. What did you do? I didn't do anything. It was the computer. There were lots of Sylvias.", "text_cn": "告诉我，科瓦克斯。你做了什么？我什么也没做。是电脑干的。出现了很多西尔维娅。" },
    { "id": 22, "text_en": "Did you make them? No, I didn't make them. The computer made them. Lots of Sylvias!", "text_cn": "是你制造了她们吗？不，我没有制造她们。电脑制造的。很多的西尔维娅！" },
    { "id": 23, "text_en": "Did they love you? No, they didn't. They hated me.", "text_cn": "她们爱你吗？不，她们不爱。她们恨我。" },
    { "id": 24, "text_en": "Well! Well, the baby's happy. She's dry. She didn't get wet.", "text_cn": "好啦！好啦，宝宝很开心。她是干的。她没有弄湿。" },
    { "id": 25, "text_en": "No, she didn't. Did you get wet, Corvax? Yes, I did! Of course I got wet.", "text_cn": "不，她没有。你弄湿了吗，科瓦克斯？是的，我弄湿了！我当然弄湿了。" },
    { "id": 26, "text_en": "Tell me. Were you here this morning? Yes, we were. Did you see anything? No, I didn't. Did you hear anything? Both: Yes, we did. What did you hear? We heard a funny noise.", "text_cn": "告诉我。今天早上你在这里吗？是的，我们在。你看见什么了吗？不，我没有。你听见什么了吗？两人：是的，我们听见了。你们听见了什么？我们听见了一个奇怪的声音。" },
    { "id": 27, "text_en": "I pushed the button. I was invisible. And... what do I do now? Get into the boat. This one? No! That's an old boat. Get into the one over there! The new one.", "text_cn": "我按了按钮。我隐形了。然后……我现在该做什么？上船。这艘？不！那是一艘旧船。上那边那艘！新的那艘。" },
    { "id": 28, "text_en": "The big new boat? The King's boat? Yes. The baby's things are in there. And take the baby! I've got her. Ow! This baby bites. What's the matter? She bit me. What? The baby bit me. Ow! Sshh! She bit me again. She often bites. Where are the things for the baby? We've got these things here. A pair of shoes, a pair of socks... It's all right. We've got everything. Let's go!", "text_cn": "那艘大的新船？国王的船？是的。宝宝的东西在里面。带上宝宝！我抓住她了。哎哟！这宝宝咬人。怎么了？她咬了我。什么？宝宝咬了我。哎哟！嘘！她又咬了我。她经常咬人。宝宝的东西在哪儿？我们这儿有这些东西。一双鞋，一双袜子……好了。我们什么都带了。走吧！" },
    { "id": 29, "text_en": "What's the baby doing? She's pulling the plug out. She's pulling the plug out! The water's coming in! The boat's sinking. Quick! Take the baby and her things! Thimbo! Help! I can't swim. It's all right now. You can walk here. It isn't deep. Agh! Oh! Brr! That's better! Did you get the things from the boat? Yes, I did. They're here.", "text_cn": "宝宝在做什么？她在拔塞子。她在拔塞子！水进来了！船在下沉。快！带上宝宝和她的东西！辛博！救命！我不会游泳。现在没事了。你可以在这里走。水不深。啊！哦！唔！好多了！你从船上拿到东西了吗？是的，我拿到了。它们在这儿。" },
    { "id": 30, "text_en": "What did you do, naughty baby? You pulled the plug out. And what happened then? The water came in. And what did the boat do? The boat sank.", "text_cn": "你做了什么，调皮的宝宝？你拔了塞子。然后发生了什么？水进来了。船怎么了？船沉了。" },
    { "id": 31, "text_en": "Oh, be quiet! Come on! You carry the baby. What about these things? Oh, you can carry them, too. Hey, Corvax! You carry something! Now, Thimbo! Don't be silly! I'm important. Let's go that way. Which way, Corvax? That way, silly!", "text_cn": "哦，安静！来吧！你抱着宝宝。这些东西呢？哦，你也可以拿着它们。嘿，科瓦克斯！你也拿点东西！现在，辛博！别傻了！我很重要。我们走那条路。哪条路，科瓦克斯？那条路，傻瓜！" },
    { "id": 32, "text_en": "Look, Bob! What's that over there? Where? Over there! It looks like a boat. It is a boat. Go that way, Muzzy. This way?", "text_cn": "看，鲍勃！那边是什么？哪儿？那边！看起来像一艘船。那是一艘船。走那条路，玛泽。这条路吗？" }
  ],
  "words": [
    { "word": "outside", "phonetic": "/ˌaʊtˈsaɪd/", "translation": "外面", "example": "Look outside.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "inside", "phonetic": "/ˌɪnˈsaɪd/", "translation": "里面", "example": "There's someone inside.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "push", "phonetic": "/pʊʃ/", "translation": "按，推", "example": "Push the button.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "button", "phonetic": "/ˈbʌtn/", "translation": "按钮", "example": "Push the button.", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "top", "phonetic": "/tɒp/", "translation": "顶部", "example": "on the top", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "box", "phonetic": "/bɒks/", "translation": "盒子", "example": "Take this box.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "wrong", "phonetic": "/rɒŋ/", "translation": "错误的", "example": "That's the wrong one.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "invisible", "phonetic": "/ɪnˈvɪzəbl/", "translation": "隐形的", "example": "You're invisible.", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "working", "phonetic": "/ˈwɜːkɪŋ/", "translation": "正常工作的", "example": "Your clock's working.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "wait", "phonetic": "/weɪt/", "translation": "等待", "example": "The Queen's waiting for you.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "guest", "phonetic": "/ɡest/", "translation": "客人", "example": "greet the guests", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "greet", "phonetic": "/ɡriːt/", "translation": "问候", "example": "greet the guests", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "politely", "phonetic": "/pəˈlaɪtli/", "translation": "礼貌地", "example": "greet the guests politely", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "darling", "phonetic": "/ˈdɑːlɪŋ/", "translation": "亲爱的", "example": "Hello, darling!", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "rude", "phonetic": "/ruːd/", "translation": "粗鲁的", "example": "That's rude.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "door", "phonetic": "/dɔːr/", "translation": "门", "example": "Open the other door.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "sing", "phonetic": "/sɪŋ/", "translation": "唱歌", "example": "sing a song", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "peanuts", "phonetic": "/ˈpiːnʌts/", "translation": "花生", "example": "peanuts", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "chips", "phonetic": "/tʃɪps/", "translation": "薯片", "example": "chips", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "biscuit", "phonetic": "/ˈbɪskɪt/", "translation": "饼干", "example": "Have a biscuit.", "color": "bg-stone-100 border-stone-200 text-stone-700" },
    { "word": "bun", "phonetic": "/bʌn/", "translation": "小圆面包", "example": "Have a bun.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "lemonade", "phonetic": "/ˌleməˈneɪd/", "translation": "柠檬水", "example": "a glass of lemonade", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "orange juice", "phonetic": "/ˈɒrɪndʒ dʒuːs/", "translation": "橙汁", "example": "orange juice", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "pizzas", "phonetic": "/ˈpiːtsəz/", "translation": "披萨", "example": "pizzas", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "pies", "phonetic": "/paɪz/", "translation": "派", "example": "pies", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "chocolate", "phonetic": "/ˈtʃɒklət/", "translation": "巧克力", "example": "chocolate", "color": "bg-brown-100 border-brown-200 text-brown-800" },
    { "word": "strawberry ice", "phonetic": "/ˈstrɔːbəri aɪs/", "translation": "草莓冰淇淋", "example": "strawberry ice cream", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "spaghetti", "phonetic": "/spəˈɡeti/", "translation": "意大利面", "example": "spaghetti", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "piece of cake", "phonetic": "/piːs əv keɪk/", "translation": "一块蛋糕", "example": "a piece of cake", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "soup", "phonetic": "/suːp/", "translation": "汤", "example": "some soup", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "a little", "phonetic": "/ə ˈlɪtl/", "translation": "一点", "example": "a little soup", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "a lot of", "phonetic": "/ə lɒt əv/", "translation": "很多", "example": "a lot of soup", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "cup", "phonetic": "/kʌp/", "translation": "杯子", "example": "a cup", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "cup of tea", "phonetic": "/kʌp əv tiː/", "translation": "一杯茶", "example": "a cup of tea", "color": "bg-emerald-100 border-emerald-200 text-emerald-700" },
    { "word": "hold", "phonetic": "/həʊld/", "translation": "抱住", "example": "Can I hold her?", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "open", "phonetic": "/ˈəʊpən/", "translation": "打开", "example": "Someone opened that door.", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "close", "phonetic": "/kləʊz/", "translation": "关闭", "example": "And someone's closing it.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "boat", "phonetic": "/bəʊt/", "translation": "船", "example": "Get into the boat.", "color": "bg-sky-100 border-sky-200 text-sky-700" },
    { "word": "old", "phonetic": "/əʊld/", "translation": "旧的", "example": "an old boat", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "new", "phonetic": "/njuː/", "translation": "新的", "example": "the new one", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "a pair of shoes", "phonetic": "/ə peər əv ʃuːz/", "translation": "一双鞋", "example": "a pair of shoes", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "a pair of socks", "phonetic": "/ə peər əv sɒks/", "translation": "一双袜子", "example": "a pair of socks", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "bedrooms", "phonetic": "/ˈbedruːmz/", "translation": "卧室", "example": "in the bedrooms", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "window", "phonetic": "/ˈwɪndəʊ/", "translation": "窗户", "example": "window", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "floor", "phonetic": "/flɔːr/", "translation": "地板", "example": "floor", "color": "bg-stone-100 border-stone-200 text-stone-700" },
    { "word": "find", "phonetic": "/faɪnd/", "translation": "找到", "example": "find them", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "take my coat", "phonetic": "/teɪk maɪ kəʊt/", "translation": "拿我的外套", "example": "take my coat", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "put it down", "phonetic": "/pʊt ɪt daʊn/", "translation": "放下它", "example": "put it down", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "be good at", "phonetic": "/biː ɡʊd æt/", "translation": "擅长", "example": "You aren't very good at this.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "Is anyone there?", "phonetic": "/ɪz ˈeniwʌn ðeər/", "translation": "有人吗？", "example": "Is anyone there?", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "wait a moment", "phonetic": "/weɪt ə ˈməʊmənt/", "translation": "等一下", "example": "Wait a moment!", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "I can't see anyone", "phonetic": "/aɪ kɑːnt siː ˈeniwʌn/", "translation": "我看不见任何人", "example": "I can't see anyone.", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "There's no one outside", "phonetic": "/ðeəz nəʊ wʌn ˌaʊtˈsaɪd/", "translation": "外面没有人", "example": "There's no one outside.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "I can't hear anyone", "phonetic": "/aɪ kɑːnt hɪər ˈeniwʌn/", "translation": "我听不见任何人", "example": "I can't hear anyone.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "Put those clocks down", "phonetic": "/pʊt ðəʊz klɒks daʊn/", "translation": "把那些钟放下", "example": "Put those clocks down and do some work.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "Off you go", "phonetic": "/ɒf juː ɡəʊ/", "translation": "你走吧", "example": "Off you go!", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "Everyone's coming along", "phonetic": "/ˈevriwʌnz ˈkʌmɪŋ əˈlɒŋ/", "translation": "大家都来了", "example": "Everyone's coming along.", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "How much?", "phonetic": "/haʊ mʌtʃ/", "translation": "多少？", "example": "How much? A little.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "not for me", "phonetic": "/nɒt fɔː miː/", "translation": "不要给我", "example": "Not for me, thank you.", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "That's perfect", "phonetic": "/ðæts ˈpɜːfɪkt/", "translation": "那太完美了", "example": "That's perfect.", "color": "bg-emerald-100 border-emerald-200 text-emerald-700" },
    { "word": "She's going that way", "phonetic": "/ʃiːz ˈɡəʊɪŋ ðæt weɪ/", "translation": "她正往那边走", "example": "She's going that way.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "going through the door", "phonetic": "/ˈɡəʊɪŋ θruː ðə dɔːr/", "translation": "穿过门", "example": "She's going through the door.", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "What's his name?", "phonetic": "/wɒts hɪz neɪm/", "translation": "他叫什么名字？", "example": "What's his name? Thimbo.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "She went that way", "phonetic": "/ʃiː went ðæt weɪ/", "translation": "她往那边走了", "example": "She went that way.", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "going upstairs", "phonetic": "/ˈɡəʊɪŋ ʌpˈsteəz/", "translation": "上楼", "example": "He's going upstairs.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "looking at the clock", "phonetic": "/ˈlʊkɪŋ æt ðə klɒk/", "translation": "看钟", "example": "He's looking at the clock.", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" }
  ]
},

  // -------- 第 9 集 --------
  {
  "id": 9,
  "title": "Episode 9",
  "bvid": "BV1DwRCBGEVJ",
  "subtitles": [
    { "id": 1, "text_en": "Good morning. We're making a new clock. This is the old one. I want a bigger one, please.", "text_cn": "早上好。我们在做一个新钟。这是旧的。我想要一个更大的。" },
    { "id": 2, "text_en": "Bigger than that? Let's see. Is this big enough?", "text_cn": "比那个大？让我看看。这个够大吗？" },
    { "id": 3, "text_en": "That's too big. I want a smaller one than that.", "text_cn": "那个太大了。我想要一个比那个小的。" },
    { "id": 4, "text_en": "Let's see. This one's bigger than your old one.", "text_cn": "让我看看。这个比你的旧钟大。" },
    { "id": 5, "text_en": "Yes, it is. Oh dear! It's too heavy. He can carry it. He's stronger than me. Thank you. Now we need two hands for the clock.", "text_cn": "是的，它确实大。哦天哪！太重了。他能搬动它。他比我强壮。谢谢。现在我们还需要两个指针。" },
    { "id": 6, "text_en": "What about this?", "text_cn": "这个怎么样？" },
    { "id": 7, "text_en": "Let's see. No. This one's too long. I need a shorter one. Yes. This one's better. Thank you. Now the other hand. This looks too short.", "text_cn": "让我看看。不，这个太长了。我需要一个短一点的。是的，这个更好。谢谢。现在另一个指针。这个看起来太短了。" },
    { "id": 8, "text_en": "Take this one.", "text_cn": "拿这个。" },
    { "id": 9, "text_en": "Yes. It's better. Right! We're taking the shorter long one and the longer short one.", "text_cn": "是的，它更好。好的！我们要拿那个较短的长的和那个较长的短的。" },
    { "id": 10, "text_en": "Ah! I see.", "text_cn": "啊！我明白了。" },
    { "id": 11, "text_en": "How about a hat? Let's see. I think this one looks nice. What do you think?", "text_cn": "帽子怎么样？让我看看。我觉得这个看起来不错。你觉得呢？" },
    { "id": 12, "text_en": "I think it looks awful. Awful! It's not big enough. Ah! This one's better. Wait, Corvax! Look! Ah! That's better. Now, let's go. Oh, thank you. This is my daughter and her baby.", "text_cn": "我觉得看起来糟透了。糟透了！它不够大。啊！这个更好。等等，科瓦克斯！看！啊！好多了。现在，我们走吧。哦，谢谢。这是我的女儿和她的宝宝。" },
    { "id": 13, "text_en": "What's the matter, Muzzy? You look sick. I'm not feeling well. What is it, Muzzy? I'm very hungry. Stay here, Muzzy! I'm going to get some clocks for you. I... I need my black box, too. Get my black box.", "text_cn": "怎么了，玛泽？你看起来病了。我感觉不舒服。怎么了，玛泽？我很饿。待在这儿，玛泽！我去给你拿些钟。我……我也需要我的黑盒子。把我的黑盒子拿来。" },
    { "id": 14, "text_en": "We're going to start work.", "text_cn": "我们要开始工作了。" },
    { "id": 15, "text_en": "Ah! Entrance! We go in here. What are we going to do? We're going to look in all the rooms.", "text_cn": "啊！入口！我们从这里进去。我们要做什么？我们要搜查所有的房间。" },
    { "id": 16, "text_en": "No, I'm not.", "text_cn": "不，我不去。" },
    { "id": 17, "text_en": "How fast are we going?", "text_cn": "我们开得有多快？" },
    { "id": 18, "text_en": "A hundred and twenty kilometers an hour.", "text_cn": "每小时一百二十公里。" },
    { "id": 19, "text_en": "You mustn't go faster than a hundred. Look! It isn't safe. Oh, dear! You're right. I must go slower. How far is it?", "text_cn": "你不能开得比一百更快。看！这不安全。哦，天哪！你说得对。我必须开慢点。还有多远？" },
    { "id": 20, "text_en": "Be careful! That says \"Danger. No entry.\" We mustn't go in there. No. We must go this way. Ah! Here's a box. Look! That's it. That's the right box. What does this mean? It means it's dangerous. It isn't safe. You mustn't open it. Aaaah! Phew! That was dangerous. You must be careful. Oooh!", "text_cn": "小心！那写着“危险。禁止进入。”我们不能进去。不，我们必须走这边。啊！这儿有个盒子。看！就是它。那是正确的盒子。这是什么意思？意思是它有危险。不安全。你不能打开它。啊啊啊！唷！真危险。你必须小心。哦哦！" },
    { "id": 21, "text_en": "Look! This is the way out. Feeling better? Yes. I'm all right now. Off we go!", "text_cn": "看！这是出口。感觉好点了吗？是的，我现在没事了。我们走吧！" }
  ],
  "words": [
    { "word": "shout", "phonetic": "/ʃaʊt/", "translation": "喊叫", "example": "Don't shout.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "scream", "phonetic": "/skriːm/", "translation": "尖叫", "example": "She screamed.", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "teach", "phonetic": "/tiːtʃ/", "translation": "教", "example": "I can teach you.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "learn", "phonetic": "/lɜːn/", "translation": "学习", "example": "You must learn.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "river", "phonetic": "/ˈrɪvər/", "translation": "河流", "example": "in the river", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "catch", "phonetic": "/kætʃ/", "translation": "抓住", "example": "Did you catch them?", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "left", "phonetic": "/left/", "translation": "左边", "example": "Go left.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "right", "phonetic": "/raɪt/", "translation": "右边", "example": "Go right.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "straight on", "phonetic": "/streɪt ɒn/", "translation": "直走", "example": "Go straight ahead.", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "bird", "phonetic": "/bɜːd/", "translation": "鸟", "example": "Look at the bird.", "color": "bg-sky-100 border-sky-200 text-sky-700" },
    { "word": "big tree", "phonetic": "/bɪɡ triː/", "translation": "大树", "example": "three big trees", "color": "bg-emerald-100 border-emerald-200 text-emerald-700" },
    { "word": "Be quiet", "phonetic": "/biː ˈkwaɪət/", "translation": "安静", "example": "Be quiet!", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "listen to me", "phonetic": "/ˈlɪsn tə miː/", "translation": "听我说", "example": "Listen to me.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "carry", "phonetic": "/ˈkæri/", "translation": "搬运", "example": "carry the baby", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "count the flowers", "phonetic": "/kaʊnt ðə ˈflaʊəz/", "translation": "数花", "example": "Count the flowers!", "color": "bg-violet-100 border-violet-200 text-violet-700" },
    { "word": "Don't worry", "phonetic": "/dəʊnt ˈwʌri/", "translation": "别担心", "example": "Don't worry!", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "far", "phonetic": "/fɑːr/", "translation": "远的", "example": "Did they go far?", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "funny", "phonetic": "/ˈfʌni/", "translation": "有趣的", "example": "a funny noise", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "get out", "phonetic": "/ɡet aʊt/", "translation": "逃出", "example": "They got out.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "important", "phonetic": "/ɪmˈpɔːtnt/", "translation": "重要的", "example": "I was important.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "way", "phonetic": "/weɪ/", "translation": "路", "example": "Go that way.", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "deep", "phonetic": "/diːp/", "translation": "深的", "example": "It isn't deep.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "Be calm", "phonetic": "/biː kɑːm/", "translation": "冷静", "example": "Be calm!", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "marry", "phonetic": "/ˈmæri/", "translation": "结婚", "example": "I wanted to marry her.", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "noise", "phonetic": "/nɔɪz/", "translation": "噪音", "example": "We heard a noise.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "plug", "phonetic": "/plʌɡ/", "translation": "塞子", "example": "Pull the plug out.", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "sink", "phonetic": "/sɪŋk/", "translation": "下沉", "example": "The boat sank.", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "Which way?", "phonetic": "/wɪtʃ weɪ/", "translation": "哪条路？", "example": "Which way?", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "Let's start now", "phonetic": "/lets stɑːt naʊ/", "translation": "我们开始吧", "example": "Let's start now.", "color": "bg-lime-100 border-lime-200 text-lime-700" }
  ]
},

  // -------- 第 10 集 --------
 {
  "id": 10,
  "title": "Episode 10",
  "bvid": "BV1DwRCBGEa3",
  "subtitles": [
    { "id": 1, "text_en": "What are we going to do, Corvax? Where's your secret place?", "text_cn": "我们该怎么办，科瓦克斯？你的秘密地方在哪儿？" },
    { "id": 2, "text_en": "We're nearly there. Ssh! Don't worry! It's safe here. No one can see us.", "text_cn": "我们快到了。嘘！别担心！这里很安全。没人能看见我们。" },
    { "id": 3, "text_en": "I can! I can! I can!", "text_cn": "我能！我能！我能！" },
    { "id": 4, "text_en": "Aargh! She can talk.", "text_cn": "啊！她会说话。" },
    { "id": 5, "text_en": "What a clever baby! Can she talk, then?", "text_cn": "多聪明的宝宝！那她会说话吗？" },
    { "id": 6, "text_en": "Shut up, Thimbo! Follow me, through here!", "text_cn": "闭嘴，辛博！跟我来，从这里走！" },
    { "id": 7, "text_en": "Is that your secret place?", "text_cn": "那是你的秘密地方吗？" },
    { "id": 8, "text_en": "Yes!", "text_cn": "是的！" },
    { "id": 9, "text_en": "Mm! It looks like an old house. And it's very small.", "text_cn": "嗯！看起来像一座旧房子。而且非常小。" },
    { "id": 10, "text_en": "House! House! House!", "text_cn": "房子！房子！房子！" },
    { "id": 11, "text_en": "Now I'm going to find the little princess.", "text_cn": "现在我要去找小公主。" },
    { "id": 12, "text_en": "How does it work?", "text_cn": "它怎么运作？" },
    { "id": 13, "text_en": "With my black box.", "text_cn": "用我的黑盒子。" },
    { "id": 14, "text_en": "Norman, how does this work?", "text_cn": "诺曼，这个怎么运作？" },
    { "id": 15, "text_en": "Well, you put that bit in the water. Then you pull the handle. And the water goes in.", "text_cn": "嗯，你把那个部件放进水里。然后你拉手柄。水就进去了。" },
    { "id": 16, "text_en": "OK. There's water in it. What do I do now?", "text_cn": "好了。里面有水了。我现在该做什么？" },
    { "id": 17, "text_en": "You push the handle in...", "text_cn": "你把把手推进去……" },
    { "id": 18, "text_en": "And the water comes out!", "text_cn": "然后水就出来了！" },
    { "id": 19, "text_en": "Yes, it works like that.", "text_cn": "是的，它就是那样运作的。" },
    { "id": 20, "text_en": "This one turns the video on. And this one turns it off. What does it do? Look! Those pictures are coming from outside. Wow! That's clever! I am clever.", "text_cn": "这个打开视频。这个关掉它。它是做什么的？看！那些画面来自外面。哇！真聪明！我真聪明。" },
    { "id": 21, "text_en": "Oh dear! The baby needs some food. What are we going to do?", "text_cn": "哦天哪！宝宝需要吃东西。我们该怎么办？" },
    { "id": 22, "text_en": "One. Put some milk in a bottle. Pour the milk into the bottle, Thimbo!", "text_cn": "第一。把一些牛奶放进奶瓶。把牛奶倒进奶瓶，辛博！" },
    { "id": 23, "text_en": "I am pouring it.", "text_cn": "我正在倒。" },
    { "id": 24, "text_en": "That's too much. It's cold. Two. Warm the milk. How? Put it there! That's better. It's warmer now. I'm going to give it to the baby.", "text_cn": "太多了。是冷的。第二。加热牛奶。怎么加热？放在那里！好多了。现在暖和了。我要去喂宝宝了。" },
    { "id": 25, "text_en": "Put this on. No! On the bottle! There! Nice baby! You're going to have a nice drink.", "text_cn": "戴上这个。不！戴在奶瓶上！好了！乖宝宝！你要喝好喝的奶了。" },
    { "id": 26, "text_en": "Not nice! Not nice! Nice! Oh! Grr! All right. Here, Thimbo. You do it!", "text_cn": "不好喝！不好喝！好喝！哦！呃！好吧。给你，辛博。你来喂！" },
    { "id": 27, "text_en": "Can you see anything?", "text_cn": "你看见什么了吗？" },
    { "id": 28, "text_en": "Can you see Amanda?", "text_cn": "你能看见阿曼达吗？" },
    { "id": 29, "text_en": "Mm! Wait! Mm! Ah! Yes! Yes! I can see her now.", "text_cn": "嗯！等等！嗯！啊！是的！是的！我现在能看见她了。" },
    { "id": 30, "text_en": "What's she doing?", "text_cn": "她在做什么？" },
    { "id": 31, "text_en": "She's having a drink. She's drinking from a bottle.", "text_cn": "她在喝东西。她用奶瓶喝。" },
    { "id": 32, "text_en": "Where is she?", "text_cn": "她在哪儿？" },
    { "id": 33, "text_en": "I can see a house.", "text_cn": "我能看见一座房子。" },
    { "id": 34, "text_en": "What's it like?", "text_cn": "它是什么样子的？" },
    { "id": 35, "text_en": "It's a very small house. It's got a blue door. And it's got three windows.", "text_cn": "是一座非常小的房子。有一扇蓝色的门。还有三扇窗户。" },
    { "id": 36, "text_en": "And where is the house?", "text_cn": "房子在哪儿？" },
    { "id": 37, "text_en": "Oh, there are rocks... big rocks. The house is behind the rocks.", "text_cn": "哦，有岩石……大岩石。房子在岩石后面。" },
    { "id": 38, "text_en": "How far is it?", "text_cn": "有多远？" },
    { "id": 39, "text_en": "The black box says it's twenty kilometers from here.", "text_cn": "黑盒子说离这里二十公里。" },
    { "id": 40, "text_en": "How do we go there? Which way do we go? North? South? East? West?", "text_cn": "我们怎么去那里？我们走哪条路？北？南？东？西？" },
    { "id": 41, "text_en": "Going North... Going South... Going East... Going West. How do they go there?", "text_cn": "向北走……向南走……向东走……向西走。他们怎么去那里？" },
    { "id": 42, "text_en": "All right! We can go by car.", "text_cn": "好吧！我们可以开车去。" },
    { "id": 43, "text_en": "Which way do we go, Muzzy?", "text_cn": "我们走哪条路，玛泽？" },
    { "id": 44, "text_en": "I don't know. The box isn't working.", "text_cn": "我不知道。盒子不工作了。" },
    { "id": 45, "text_en": "It doesn't matter. We can ask someone. Come on!", "text_cn": "没关系。我们可以问别人。来吧！" },
    { "id": 46, "text_en": "Corvax is... going to be... wet!", "text_cn": "科瓦克斯会……变成……湿的！" },
    { "id": 47, "text_en": "Wet! Wet! Wet!", "text_cn": "湿的！湿的！湿的！" },
    { "id": 48, "text_en": "Naughty little girl!", "text_cn": "调皮的小女孩！" },
    { "id": 49, "text_en": "Say 'Corvax is going to be the King of Gondoland'.", "text_cn": "说'科瓦克斯将成为冈多兰的国王'。" },
    { "id": 50, "text_en": "No. Not going to.", "text_cn": "不。才不要。" },
    { "id": 51, "text_en": "Now! You're going to have a lesson. You're going to learn some words. And the first word is 'Corvax. Cor - vax'.", "text_cn": "现在！你要上一节课。你要学一些单词。第一个单词是'科瓦克斯。科-瓦克斯'。" },
    { "id": 52, "text_en": "Cor - vax. He! He!", "text_cn": "科-瓦克斯。嘿嘿！" },
    { "id": 53, "text_en": "Don't laugh! It isn't funny.", "text_cn": "别笑！这一点都不好笑。" },
    { "id": 54, "text_en": "It is.", "text_cn": "好笑。" },
    { "id": 55, "text_en": "Say 'Cor - vax'.", "text_cn": "说'科-瓦克斯'。" },
    { "id": 56, "text_en": "Cor - Cor - Cor -", "text_cn": "科-科-科-" },
    { "id": 57, "text_en": "Be quiet, Thimbo! This is not a joke.", "text_cn": "安静，辛博！这不是开玩笑。" },
    { "id": 58, "text_en": "She isn't going to say it. She doesn't understand you.", "text_cn": "她不会说的。她听不懂你的话。" },
    { "id": 59, "text_en": "And you don't understand anything. Now, go over there and look outside.", "text_cn": "而你什么都不懂。现在，去那边看看外面。" },
    { "id": 60, "text_en": "Now say 'Corvax is ...'.", "text_cn": "现在说'科瓦克斯是……'。" },
    { "id": 61, "text_en": "Silly! Silly!", "text_cn": "傻瓜！傻瓜！" },
    { "id": 62, "text_en": "No! No! Say 'Corvax is going to be the King of Gondoland'.", "text_cn": "不！不！说'科瓦克斯将成为冈多兰的国王'。" },
    { "id": 63, "text_en": "Corvax is ...", "text_cn": "科瓦克斯是……" },
    { "id": 64, "text_en": "Good! That's good! Say it again!", "text_cn": "好！很好！再说一遍！" }
  ],
  "words": [
    { "word": "road", "phonetic": "/rəʊd/", "translation": "道路", "example": "a small road", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "cars", "phonetic": "/kɑːz/", "translation": "汽车", "example": "We can go by car.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "basket", "phonetic": "/ˈbɑːskɪt/", "translation": "篮子", "example": "basket", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "clothes", "phonetic": "/kləʊðz/", "translation": "衣服", "example": "clothes", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "enough", "phonetic": "/ɪˈnʌf/", "translation": "足够", "example": "Is this big enough?", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "smaller", "phonetic": "/ˈsmɔːlər/", "translation": "更小的", "example": "I want a smaller one.", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "stronger", "phonetic": "/ˈstrɒŋɡər/", "translation": "更强壮的", "example": "He's stronger than me.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "shorter", "phonetic": "/ˈʃɔːtər/", "translation": "更短的", "example": "I need a shorter one.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "better", "phonetic": "/ˈbetər/", "translation": "更好的", "example": "This one's better.", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "hat", "phonetic": "/hæt/", "translation": "帽子", "example": "How about a hat?", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "nice", "phonetic": "/naɪs/", "translation": "好看的；好的", "example": "This one looks nice.", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "ill", "phonetic": "/ɪl/", "translation": "生病的", "example": "You look sick. (ill)", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "black box", "phonetic": "/blæk bɒks/", "translation": "黑盒子", "example": "With my black box.", "color": "bg-gray-800 border-gray-800 text-white" },
    { "word": "heavy", "phonetic": "/ˈhevi/", "translation": "重的", "example": "It's too heavy.", "color": "bg-stone-100 border-stone-200 text-stone-700" },
    { "word": "zero", "phonetic": "/ˈzɪərəʊ/", "translation": "零", "example": "zero", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "call", "phonetic": "/kɔːl/", "translation": "打电话", "example": "call", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "awful", "phonetic": "/ˈɔːfl/", "translation": "糟糕的", "example": "It looks awful.", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "South America", "phonetic": "/saʊθ əˈmerɪkə/", "translation": "南美洲", "example": "South America", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "write", "phonetic": "/raɪt/", "translation": "写", "example": "write it down", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "entrance", "phonetic": "/ˈentrəns/", "translation": "入口", "example": "Entrance!", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "danger", "phonetic": "/ˈdeɪndʒər/", "translation": "危险", "example": "Danger. No entry.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "way out", "phonetic": "/weɪ aʊt/", "translation": "出口", "example": "This is the way out.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "safe", "phonetic": "/seɪf/", "translation": "安全的", "example": "It isn't safe.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "driver", "phonetic": "/ˈdraɪvər/", "translation": "司机", "example": "a very good driver", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "faster", "phonetic": "/ˈfɑːstər/", "translation": "更快的", "example": "You mustn't go faster.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "slower", "phonetic": "/ˈsləʊər/", "translation": "更慢的", "example": "I must go slower.", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "degrees", "phonetic": "/dɪˈɡriːz/", "translation": "度数", "example": "35 degrees", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "start", "phonetic": "/stɑːt/", "translation": "开始", "example": "We're going to start work.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "Look out", "phonetic": "/lʊk aʊt/", "translation": "小心", "example": "Look out!", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "telephone box", "phonetic": "/ˈtelɪfəʊn bɒks/", "translation": "电话亭", "example": "a telephone box", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "small road", "phonetic": "/smɔːl rəʊd/", "translation": "小路", "example": "a small road", "color": "bg-emerald-100 border-emerald-200 text-emerald-700" },
    { "word": "drive a car", "phonetic": "/draɪv ə kɑː/", "translation": "开车", "example": "drive a car", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "press the switch", "phonetic": "/pres ðə swɪtʃ/", "translation": "按下开关", "example": "Press that switch!", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "handle", "phonetic": "/ˈhændl/", "translation": "把手", "example": "Turn that handle!", "color": "bg-stone-100 border-stone-200 text-stone-700" },
    { "word": "fantastic", "phonetic": "/fænˈtæstɪk/", "translation": "极好的", "example": "That's fantastic!", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "rubbish", "phonetic": "/ˈrʌbɪʃ/", "translation": "垃圾", "example": "rubbish", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "mend", "phonetic": "/mend/", "translation": "修理", "example": "mend", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "make a clock", "phonetic": "/meɪk ə klɒk/", "translation": "做钟", "example": "make a clock", "color": "bg-purple-100 border-purple-200 text-purple-700" }
  ]
},

  // -------- 第 11 集 --------
  {
  "id": 11,
  "title": "Episode 11",
  "bvid": "BV1DwRCBGEaM",
  "subtitles": [
    { "id": 1, "text_en": "Going North... Going South... Going East... Going West. How do they go there?", "text_cn": "向北走……向南走……向东走……向西走。他们怎么去那里？" },
    { "id": 2, "text_en": "All right! We can go by car.", "text_cn": "好吧！我们可以开车去。" },
    { "id": 3, "text_en": "Which way do we go, Muzzy?", "text_cn": "我们走哪条路，玛泽？" },
    { "id": 4, "text_en": "I don't know. The box isn't working.", "text_cn": "我不知道。盒子不工作了。" },
    { "id": 5, "text_en": "It doesn't matter. We can ask someone. Come on!", "text_cn": "没关系。我们可以问别人。来吧！" },
    { "id": 6, "text_en": "Corvax is... going to be... wet!", "text_cn": "科瓦克斯会……变成……湿的！" },
    { "id": 7, "text_en": "Wet! Wet! Wet!", "text_cn": "湿的！湿的！湿的！" },
    { "id": 8, "text_en": "Naughty little girl!", "text_cn": "调皮的小女孩！" },
    { "id": 9, "text_en": "Say 'Corvax is going to be the King of Gondoland'.", "text_cn": "说'科瓦克斯将成为冈多兰的国王'。" },
    { "id": 10, "text_en": "No. Not going to.", "text_cn": "不。才不要。" },
    { "id": 11, "text_en": "Now! You're going to have a lesson. You're going to learn some words. And the first word is 'Corvax. Cor - vax'.", "text_cn": "现在！你要上一节课。你要学一些单词。第一个单词是'科瓦克斯。科-瓦克斯'。" },
    { "id": 12, "text_en": "Cor - vax. He! He!", "text_cn": "科-瓦克斯。嘿嘿！" },
    { "id": 13, "text_en": "Don't laugh! It isn't funny.", "text_cn": "别笑！这一点都不好笑。" },
    { "id": 14, "text_en": "It is.", "text_cn": "好笑。" },
    { "id": 15, "text_en": "Say 'Cor - vax'.", "text_cn": "说'科-瓦克斯'。" },
    { "id": 16, "text_en": "Cor - Cor - Cor -", "text_cn": "科-科-科-" },
    { "id": 17, "text_en": "Be quiet, Thimbo! This is not a joke.", "text_cn": "安静，辛博！这不是开玩笑。" },
    { "id": 18, "text_en": "She isn't going to say it. She doesn't understand you.", "text_cn": "她不会说的。她听不懂你的话。" },
    { "id": 19, "text_en": "And you don't understand anything. Now, go over there and look outside.", "text_cn": "而你什么都不懂。现在，去那边看看外面。" },
    { "id": 20, "text_en": "Now say 'Corvax is ...'.", "text_cn": "现在说'科瓦克斯是……'。" },
    { "id": 21, "text_en": "Silly! Silly!", "text_cn": "傻瓜！傻瓜！" },
    { "id": 22, "text_en": "No! No! Say 'Corvax is going to be the King of Gondoland'.", "text_cn": "不！不！说'科瓦克斯将成为冈多兰的国王'。" },
    { "id": 23, "text_en": "Corvax is ...", "text_cn": "科瓦克斯是……" },
    { "id": 24, "text_en": "Good! That's good! Say it again!", "text_cn": "好！很好！再说一遍！" },
    { "id": 25, "text_en": "My hat's big. My hat's bigger. His hat's the biggest, but he can't see anything.", "text_cn": "我的帽子大。我的帽子更大。他的帽子最大，但他什么也看不见。" },
    { "id": 26, "text_en": "He's tall, and he walks like this. He's got a green face and a long nose. And he wears funny hats.", "text_cn": "他个子高，走路是这样的。他有一张绿色的脸和一个长鼻子。他戴着滑稽的帽子。" },
    { "id": 27, "text_en": "I'm fast. I'm faster. He's the fastest.", "text_cn": "我快。我更快。他最快。" },
    { "id": 28, "text_en": "That's Corvax.", "text_cn": "那是科瓦克斯。" },
    { "id": 29, "text_en": "This is good. This is better. This is the best.", "text_cn": "这个好。这个更好。这个最好。" },
    { "id": 30, "text_en": "He's got a green face.", "text_cn": "他有一张绿色的脸。" },
    { "id": 31, "text_en": "He's got a long nose.", "text_cn": "他有一个长鼻子。" },
    { "id": 32, "text_en": "He wears funny hats.", "text_cn": "他戴着滑稽的帽子。" },
    { "id": 33, "text_en": "He's very tall. And he walks like this.", "text_cn": "他非常高。他走路是这样的。" },
    { "id": 34, "text_en": "That's Corvax!", "text_cn": "那是科瓦克斯！" },
    { "id": 35, "text_en": "The King's coming. With the others - Bob, Sylvia -", "text_cn": "国王来了。和其他人——鲍勃，西尔维娅——" },
    { "id": 36, "text_en": "Where's the baby?", "text_cn": "宝宝在哪儿？" },
    { "id": 37, "text_en": "She's over there. No, she isn't. Where is she?", "text_cn": "她在那边。不，她不在。她在哪儿？" },
    { "id": 38, "text_en": "She has my box! She's invisible!", "text_cn": "她拿了我的盒子！她隐形了！" },
    { "id": 39, "text_en": "What are we going to do?", "text_cn": "我们该怎么办？" },
    { "id": 40, "text_en": "We're going to find her. Where's your box?", "text_cn": "我们要找到她。你的盒子呢？" },
    { "id": 41, "text_en": "I don't have it. It's in the river. Now there's only one box, and she has it!", "text_cn": "我没有。它在河里。现在只有一个盒子，而且在她手里！" },
    { "id": 42, "text_en": "Here we are! Look! We can get through there. Come on! Oh dear! I can't get through. It isn't wide enough. I'm too fat.", "text_cn": "我们到了！看！我们可以从那里穿过去。来吧！哦天哪！我过不去。不够宽。我太胖了。" },
    { "id": 43, "text_en": "It's wider up there. Muzzy! You're the biggest. Lift the Queen up! Carry her through! Ooh! Muzzy! Thank you. Thank you so much! Go on, Muzzy! That's the widest part. Up there!", "text_cn": "上面更宽。玛泽！你最大。把王后举起来！带她穿过去！哦！玛泽！谢谢。非常感谢！继续，玛泽！那是最宽的地方。上面！" }
  ],
  "words": [
    { "word": "pour", "phonetic": "/pɔːr/", "translation": "倒", "example": "Pour the milk into the bottle.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "food", "phonetic": "/fuːd/", "translation": "食物", "example": "The baby needs some food.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "pull the handle", "phonetic": "/pʊl ðə ˈhændl/", "translation": "拉把手", "example": "Then you pull the handle.", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "water comes out", "phonetic": "/ˈwɔːtər kʌmz aʊt/", "translation": "水出来", "example": "The water comes out!", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "pictures", "phonetic": "/ˈpɪktʃəz/", "translation": "图片", "example": "Those pictures are coming from outside.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "house", "phonetic": "/haʊs/", "translation": "房子", "example": "It's a very small house.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "rocks", "phonetic": "/rɒks/", "translation": "岩石", "example": "There are big rocks.", "color": "bg-stone-100 border-stone-200 text-stone-700" },
    { "word": "behind the rocks", "phonetic": "/bɪˈhaɪnd ðə rɒks/", "translation": "岩石后面", "example": "The house is behind the rocks.", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "North", "phonetic": "/nɔːθ/", "translation": "北", "example": "Going North.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "South", "phonetic": "/saʊθ/", "translation": "南", "example": "Going South.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "West", "phonetic": "/west/", "translation": "西", "example": "Going West.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "East", "phonetic": "/iːst/", "translation": "东", "example": "Going East.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "learn some words", "phonetic": "/lɜːn sʌm wɜːdz/", "translation": "学一些单词", "example": "You're going to learn some words.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "laugh", "phonetic": "/lɑːf/", "translation": "笑", "example": "Don't laugh!", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "understand", "phonetic": "/ˌʌndəˈstænd/", "translation": "理解", "example": "She doesn't understand you.", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "long nose", "phonetic": "/lɒŋ nəʊz/", "translation": "长鼻子", "example": "a long nose", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "funny hat", "phonetic": "/ˈfʌni hæt/", "translation": "滑稽的帽子", "example": "funny hats", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "I can't get through", "phonetic": "/aɪ kɑːnt ɡet θruː/", "translation": "我过不去", "example": "I can't get through.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "wider", "phonetic": "/ˈwaɪdər/", "translation": "更宽的", "example": "It's wider up there.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "wide", "phonetic": "/waɪd/", "translation": "宽的", "example": "It isn't wide enough.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "widest", "phonetic": "/ˈwaɪdɪst/", "translation": "最宽的", "example": "That's the widest part.", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "bottle", "phonetic": "/ˈbɒtl/", "translation": "瓶子", "example": "Put some milk in a bottle.", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "the little princess", "phonetic": "/ðə ˈlɪtl ˈprɪnses/", "translation": "小公主", "example": "find the little princess", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "warm the milk", "phonetic": "/wɔːm ðə mɪlk/", "translation": "热牛奶", "example": "Warm the milk.", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "milk", "phonetic": "/mɪlk/", "translation": "牛奶", "example": "Put some milk in a bottle.", "color": "bg-white-100 border-gray-300 text-gray-700" },
    { "word": "a small house", "phonetic": "/ə smɔːl haʊs/", "translation": "小房子", "example": "a very small house", "color": "bg-emerald-100 border-emerald-200 text-emerald-700" },
    { "word": "video", "phonetic": "/ˈvɪdiəʊ/", "translation": "视频", "example": "turns the video on", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "colour", "phonetic": "/ˈkʌlər/", "translation": "颜色", "example": "colour", "color": "bg-violet-100 border-violet-200 text-violet-700" },
    { "word": "train", "phonetic": "/treɪn/", "translation": "火车", "example": "train", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "plane", "phonetic": "/pleɪn/", "translation": "飞机", "example": "plane", "color": "bg-sky-100 border-sky-200 text-sky-700" },
    { "word": "have a lesson", "phonetic": "/hæv ə ˈlesn/", "translation": "上课", "example": "You're going to have a lesson.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" }
  ]
},

  // -------- 第 12 集 --------
  {
  "id": 12,
  "title": "Episode 12",
  "bvid": "BV1DwRCBGEaj",
  "subtitles": [
    { "id": 1, "text_en": "Be careful! Corvax is there. It's dangerous.", "text_cn": "小心！科瓦克斯在那里。很危险。" },
    { "id": 2, "text_en": "Don't worry! It's safe here.", "text_cn": "别担心！这里很安全。" },
    { "id": 3, "text_en": "It isn't safe. And I'm frightened.", "text_cn": "不安全。而且我很害怕。" },
    { "id": 4, "text_en": "Well, I'm not frightened. I'm going to go inside.", "text_cn": "好吧，我不害怕。我要进去。" },
    { "id": 5, "text_en": "Now! I'm coming. Corvax! Careful!", "text_cn": "现在！我来了。科瓦克斯！小心！" },
    { "id": 6, "text_en": "Careful? Huh! I'm going to get Corvax.", "text_cn": "小心？哼！我要去抓科瓦克斯。" },
    { "id": 7, "text_en": "Corvax! This is the King!", "text_cn": "科瓦克斯！这是国王！" },
    { "id": 8, "text_en": "Oh! Your Majesty! What do you want, your Majesty? Why are you here?", "text_cn": "哦！陛下！您想要什么，陛下？您为什么在这儿？" },
    { "id": 9, "text_en": "We want Amanda. The little princess? She isn't here. She's in the Palace. There's no one here. Well, there's only me, and Thimbo.", "text_cn": "我们要阿曼达。小公主？她不在这儿。她在宫殿里。这里没人。嗯，只有我和辛博。" },
    { "id": 10, "text_en": "Thimbo, I've got a clever idea. They can come in. What? Bob and the King and that huge, enormous green monster? Yes.", "text_cn": "辛博，我有个聪明的办法。他们可以进来。什么？鲍勃、国王还有那个巨大的绿色怪物？是的。" },
    { "id": 11, "text_en": "Amanda's invisible. They can't see her. They can hear her. I'm going to turn the radio on. Loud! No one can hear the baby now.", "text_cn": "阿曼达是隐形的。他们看不见她。他们能听见她。我要把收音机打开。大声点！现在没人能听见宝宝了。" },
    { "id": 12, "text_en": "Ah! Your Majesty, Princess Sylvia, your Majesty, Bob! Please come inside, everyone!", "text_cn": "啊！陛下、西尔维娅公主、陛下、鲍勃！请大家进来！" },
    { "id": 13, "text_en": "Stop that awful noise! Aah!", "text_cn": "停止那可怕的噪音！啊！" },
    { "id": 14, "text_en": "What are you doing here? I'm on vacation. I always come here for my vacation. You were at the party. And someone took Amanda. We went away before the party. When did we come here? Mm! Today is the third. We came here...", "text_cn": "你在这儿做什么？我在度假。我总是来这里度假。你当时在派对上。有人带走了阿曼达。我们在派对前就离开了。我们是什么时候来这儿的？嗯！今天是三号。我们来的那天……" },
    { "id": 15, "text_en": "We came here yesterday. Quiet, Thimbo! We came here the day before. We came here on the first.", "text_cn": "我们昨天来的。安静，辛博！我们前天来的。我们一号来的。" },
    { "id": 16, "text_en": "Norman, what's the date today? Let's look. Today's the third. The second was yesterday. And the first was the day before that.", "text_cn": "诺曼，今天几号？让我看看。今天是三号。昨天是二号。前天是一号。" },
    { "id": 17, "text_en": "Today's the third. Tomorrow's the fourth. And the fifth is the day after that. And after that come the sixth and the seventh, Then the eighth, ninth, tenth And eleventh. All the way To the thirty-first day. And that's my holiday! Hooray!", "text_cn": "今天是三号。明天是四号。五号是后天。之后是六号、七号，然后是八号、九号、十号和十一号。一直到最后一天三十一号。那就是我的假期！好哇！" },
    { "id": 18, "text_en": "Today's the third. And tomorrow's the fourth. And the day after that - Corvax, stop that! Someone took Amanda.", "text_cn": "今天是三号。明天是四号。后天——科瓦克斯，住手！有人带走了阿曼达。" },
    { "id": 19, "text_en": "Ow! What's the matter? Something bit me. Something bit you? Someone bit you. Amanda. But she isn't here. Oh dear! We've got terrible flies in here. It was a fly. Look! Now listen! Listen everyone!", "text_cn": "哎哟！怎么了？有东西咬了我。有东西咬了你？有人咬了你。阿曼达。但她不在这儿。哦天哪！我们这儿有可怕的苍蝇。是一只苍蝇。看！现在听着！大家都听着！" },
    { "id": 20, "text_en": "Goo! Goo! Did you hear that? She's here, in this room. Mommy! Daddy!", "text_cn": "咕！咕！你听见了吗？她在这儿，在这个房间里。妈妈！爸爸！" },
    { "id": 21, "text_en": "Where is she, Corvax? You know. And your little friend. Where is she? I don't know. Yes, he does. He knows. He took the baby. Be quiet, Thimbo!", "text_cn": "她在哪儿，科瓦克斯？你知道。还有你的小朋友。她在哪儿？我不知道。不，他知道。他知道。他带走了宝宝。安静，辛博！" },
    { "id": 22, "text_en": "He has a little box. You push a button and you're invisible. The baby has the box and now she's invisible.", "text_cn": "他有一个小盒子。你按下按钮就会隐形。宝宝拿着盒子，现在她隐形了。" },
    { "id": 23, "text_en": "Grrr! Muzzy! You take those two! Now, everyone! Look on the floor! Look for Amanda! My goodness. Look at that!", "text_cn": "呃！玛泽！你抓住那两个！现在，大家！看地板上！找阿曼达！天哪。看看那个！" },
    { "id": 24, "text_en": "Stop it! You mustn't do that.", "text_cn": "住手！你不准那样做。" },
    { "id": 25, "text_en": "One of these with one of these. This to this. These in here. That's it! There! Amanda! Amanda! Hello, Mommy! Hello, Daddy!", "text_cn": "这些中的一个和这些中的一个。这个对这个。这些放进这里。对了！那里！阿曼达！阿曼达！你好，妈妈！你好，爸爸！" },
    { "id": 26, "text_en": "Ah!... I have her. Here she is! No she isn't. Over here! This way! No! Quick! I'm sure she's here. There's something here. Ow! Yes! Here she is!", "text_cn": "啊！……我找到她了。她在这儿！不，她不在。这边！这条路！不！快！我肯定她在这儿。这里有东西。哎哟！是的！她在这儿！" },
    { "id": 27, "text_en": "Corvax! We can't see her. Do something Corvax! I can't do anything. The baby has my box. Corvax has lots of other things here. What do you mean? Look! Press that switch. Turn that handle.", "text_cn": "科瓦克斯！我们看不见她。做点什么，科瓦克斯！我什么也做不了。宝宝拿着我的盒子。科瓦克斯这儿还有很多别的东西。你什么意思？看！按下那个开关。转动那个把手。" },
    { "id": 28, "text_en": "Whoopee! Darling! Wonderful! Whoopee! Darling! Hooray! Hooray!", "text_cn": "好哇！亲爱的！太棒了！好哇！亲爱的！好哇！好哇！" },
    { "id": 29, "text_en": "What am I going to do? You were silly, silly, silly! Where am I going to go? Clever, clever, clever. What are they going to do? But you were silly, silly, silly. Why did I do it? Why? Oh why? It's all your fault!", "text_cn": "我该怎么办？你太傻了，傻，傻！我要去哪儿？聪明，聪明，聪明。他们要做什么？但是你太傻了，傻，傻。我为什么这么做？为什么？哦为什么？都是你的错！" },
    { "id": 30, "text_en": "This is our new clock. We finished it yesterday. Three cheers for the new clock! Hooray! Hooray! Hooray! This is our new clock. Listen to its sound!", "text_cn": "这是我们的新钟。我们昨天完成的。为新钟三呼万岁！好哇！好哇！好哇！这是我们的新钟。听听它的声音！" },
    { "id": 31, "text_en": "That was our new clock. It's going round and round. This is our new clock. We're going to go inside. Now we're inside the clock. It's time to say goodbye. Goodbye! Goodbye! Goodbye!", "text_cn": "那是我们的新钟。它转啊转。这是我们的新钟。我们要进去了。现在我们在钟里面。该说再见了。再见！再见！再见！" },
    { "id": 32, "text_en": "Goodbye! Goodbye!", "text_cn": "再见！再见！" }
  ],
  "words": [
    { "word": "fault", "phonetic": "/fɔːlt/", "translation": "过错", "example": "It's your fault.", "color": "bg-red-100 border-red-200 text-red-700" },
    { "word": "out of the river", "phonetic": "/aʊt əv ðə ˈrɪvər/", "translation": "从河里出来", "example": "I got you out of the river.", "color": "bg-blue-100 border-blue-200 text-blue-700" },
    { "word": "argue", "phonetic": "/ˈɑːɡjuː/", "translation": "争吵", "example": "Don't argue.", "color": "bg-orange-100 border-orange-200 text-orange-700" },
    { "word": "Look outside", "phonetic": "/lʊk ˌaʊtˈsaɪd/", "translation": "看外面", "example": "Look outside!", "color": "bg-green-100 border-green-200 text-green-700" },
    { "word": "right", "phonetic": "/raɪt/", "translation": "正确的；右边", "example": "That is the right house.", "color": "bg-purple-100 border-purple-200 text-purple-700" },
    { "word": "radio", "phonetic": "/ˈreɪdiəʊ/", "translation": "收音机", "example": "turn the radio on", "color": "bg-yellow-100 border-yellow-200 text-yellow-700" },
    { "word": "noise", "phonetic": "/nɔɪz/", "translation": "噪音", "example": "Stop that awful noise!", "color": "bg-pink-100 border-pink-200 text-pink-700" },
    { "word": "I'm having a holiday", "phonetic": "/aɪm ˈhævɪŋ ə ˈhɒlədeɪ/", "translation": "我在度假", "example": "I'm on vacation.", "color": "bg-teal-100 border-teal-200 text-teal-700" },
    { "word": "vacation", "phonetic": "/vəˈkeɪʃn/", "translation": "假期", "example": "I always come here for my vacation.", "color": "bg-indigo-100 border-indigo-200 text-indigo-700" },
    { "word": "What's the date today?", "phonetic": "/wɒts ðə deɪt təˈdeɪ/", "translation": "今天几号？", "example": "What's the date today?", "color": "bg-cyan-100 border-cyan-200 text-cyan-700" },
    { "word": "ninth", "phonetic": "/naɪnθ/", "translation": "第九", "example": "the ninth", "color": "bg-rose-100 border-rose-200 text-rose-700" },
    { "word": "tenth", "phonetic": "/tenθ/", "translation": "第十", "example": "the tenth", "color": "bg-emerald-100 border-emerald-200 text-emerald-700" },
    { "word": "eleventh", "phonetic": "/ɪˈlevnθ/", "translation": "第十一", "example": "the eleventh", "color": "bg-lime-100 border-lime-200 text-lime-700" },
    { "word": "thirty-first", "phonetic": "/ˈθɜːti fɜːst/", "translation": "第三十一", "example": "the thirty-first day", "color": "bg-amber-100 border-amber-200 text-amber-700" },
    { "word": "fly", "phonetic": "/flaɪ/", "translation": "苍蝇", "example": "It was a fly.", "color": "bg-gray-100 border-gray-200 text-gray-700" },
    { "word": "round", "phonetic": "/raʊnd/", "translation": "转圈", "example": "going round and round", "color": "bg-sky-100 border-sky-200 text-sky-700" },
    { "word": "new", "phonetic": "/njuː/", "translation": "新的", "example": "our new clock", "color": "bg-green-100 border-green-200 text-green-700" }
  ]
}
];

export default function App() {
  const [currentEpisodeId, setCurrentEpisodeId] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSubtitleId, setActiveSubtitleId] = useState<number | null>(null);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const subtitleScrollRef = useRef<HTMLDivElement>(null);
  const wordScrollRef = useRef<HTMLDivElement>(null);

  const currentEp = useMemo(() => EPISODES_DATA.find(ep => ep.id === currentEpisodeId) || EPISODES_DATA[0], [currentEpisodeId]);

  // Sync Subtitle Logic
  useEffect(() => {
    // Attempt to find current subtitle based on time
    // We handle missing start/end by estimating based on index
    const sub = currentEp.subtitles.find(s => {
      const start = (s as any).start !== undefined ? (s as any).start : currentEp.subtitles.indexOf(s) * 6;
      const end = (s as any).end !== undefined ? (s as any).end : start + 6;
      return currentTime >= start && currentTime <= end;
    });

    if (sub && activeSubtitleId !== sub.id) {
      setActiveSubtitleId(sub.id);
      // Scroll subtitle into view
      const subEl = document.getElementById(`sub-${sub.id}`);
      if (subEl) subEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Find matching word and scroll if applicable
      if ((sub as any).start_word) {
        const wordEl = document.getElementById(`word-${(sub as any).start_word}`);
        if (wordEl) wordEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime, currentEp, activeSubtitleId]);

  const jumpToTime = (time: number) => {
    setCurrentTime(time);
    if (iframeRef.current) {
      // Seek via iframe src update (B站 legacy player supports &t=)
      const p = (currentEp as any).part || 1;
      const newUrl = `https://player.bilibili.com/player.html?bvid=${currentEp.bvid}&page=${p}&high_quality=1&danmaku=0&autoplay=1&t=${Math.floor(time)}&child_type=asset`;
      iframeRef.current.src = newUrl;
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  const bilibiliUrl = useMemo(() => {
    const p = (currentEp as any).part || 1;
    return `https://player.bilibili.com/player.html?bvid=${currentEp.bvid}&page=${p}&high_quality=1&danmaku=0&autoplay=0&child_type=asset`;
  }, [currentEp]);

  return (
    <div className="min-h-screen bg-[#F0F9FF] font-sans selection:bg-blue-200 pb-20">
      {/* Header */}
      <header className="pt-10 pb-6 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="bg-yellow-400 p-3 rounded-[24px] shadow-lg"
          >
            <Tv className="w-10 h-10 text-white" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Big Muzzy World</h1>
            <div className="flex gap-2 mt-1">
              <span className="text-slate-500 font-bold bg-white/50 px-3 py-1 rounded-full text-sm">沉浸式少儿英语学习</span>
            </div>
          </div>
        </div>
        
        {/* Episode Selection Menu */}
        <div className="flex bg-white p-2 rounded-[32px] shadow-sm items-center gap-2 overflow-x-auto max-w-full no-scrollbar border-b-4 border-slate-100">
          <span className="pl-4 pr-2 text-sm font-black text-slate-400 uppercase tracking-widest hidden sm:inline">Episode</span>
          <div className="flex gap-1">
            {EPISODES_DATA.map(ep => (
              <motion.button
                key={ep.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setCurrentEpisodeId(ep.id);
                  setCurrentTime(0);
                  setActiveSubtitleId(null);
                }}
                className={`w-10 h-10 rounded-full font-black flex items-center justify-center transition-all flex-shrink-0 ${
                  currentEpisodeId === ep.id 
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-200'
                }`}
              >
                {ep.id}
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Player & Subtitles */}
        <div className="lg:col-span-8 space-y-6">
          {/* Player Container */}
          <div className="relative aspect-video bg-slate-950 rounded-[48px] overflow-hidden shadow-2xl border-[12px] border-white group">
            <div className="w-full h-full relative">
              <iframe
                ref={iframeRef}
                src={bilibiliUrl}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                referrerPolicy="no-referrer"
                scrolling="no"
              />
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a 
                  href={`https://www.bilibili.com/video/${currentEp.bvid}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[10px] bg-black/50 text-white/50 px-2 py-1 rounded-full hover:bg-black/80 hover:text-white transition-all"
                >
                  Load issue? Click here to open on Bilibili ↗
                </a>
              </div>
            </div>
          </div>

          {/* Subtitles Area */}
          <div className="bg-white rounded-[40px] shadow-sm p-8 space-y-4 border-b-8 border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-black text-slate-800">Learn the Sentences</h3>
              <Sparkles className="text-yellow-400" />
            </div>
            <div 
              ref={subtitleScrollRef}
              className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar scroll-smooth"
            >
              {currentEp.subtitles.map((sub, idx) => {
                const isActive = activeSubtitleId === sub.id;
                return (
                  <motion.div
                    key={idx}
                    id={`sub-${sub.id}`}
                    onClick={() => (sub as any).start !== undefined && jumpToTime((sub as any).start)}
                    className={`group p-6 rounded-[32px] transition-all cursor-pointer relative overflow-hidden ${
                      isActive 
                        ? 'bg-blue-50 border-2 border-blue-200 shadow-md ring-4 ring-blue-50' 
                        : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-4 relative z-10">
                      <button 
                        onClick={(e) => { e.stopPropagation(); speak(sub.text_en); }}
                        className={`mt-1 p-3 rounded-2xl shadow-sm transition-transform hover:scale-110 active:scale-90 ${
                          isActive ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                        }`}
                      >
                        <Volume2 className="w-6 h-6" />
                      </button>
                      <div>
                        <p className={`text-2xl font-black leading-tight mb-2 ${isActive ? 'text-blue-900' : 'text-slate-800'}`}>
                          {sub.text_en}
                        </p>
                        <p className={`text-lg font-bold ${isActive ? 'text-blue-500' : 'text-slate-400'}`}>
                          {sub.text_cn}
                        </p>
                      </div>
                    </div>
                    {isActive && (
                      <motion.div 
                        layoutId="activeSubGlow"
                        className="absolute inset-0 bg-blue-400/5 pointer-events-none"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Vocabulary Cards */}
        <div className="lg:col-span-4 bg-white rounded-[48px] shadow-sm p-8 border-b-8 border-slate-100 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Word Box</h2>
            <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
            </div>
          </div>

          <div 
            ref={wordScrollRef}
            className="space-y-4 overflow-y-auto max-h-[700px] pr-2 custom-scrollbar scroll-smooth"
          >
            {currentEp.words.map((word, idx) => {
              const isActive = activeSubtitleId !== null && (currentEp.subtitles.find(s => s.id === activeSubtitleId) as any)?.start_word === word.word;
              return (
                <motion.div
                  key={word.word}
                  id={`word-${word.word}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`p-6 rounded-[36px] border-2 transition-all group relative overflow-hidden ${
                    isActive 
                      ? 'ring-4 ring-yellow-200 border-yellow-400 bg-white shadow-xl scale-[1.02]' 
                      : `${word.color} border-transparent`
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-2xl font-black mb-1">{word.word}</h4>
                      <span className="text-sm font-mono opacity-50 block">{word.phonetic}</span>
                    </div>
                    <button 
                      onClick={() => speak(word.word)}
                      className={`p-3 backdrop-blur-sm rounded-2xl transition-colors shadow-sm ${
                        isActive ? 'bg-yellow-400 text-white' : 'bg-white/50 group-hover:bg-white'
                      }`}
                    >
                      <Volume2 className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-lg font-bold mb-2">{word.translation}</div>
                    <div className={`${isActive ? 'bg-yellow-50' : 'bg-white/30'} rounded-2xl p-3 text-sm font-medium italic`}>
                      "{word.example}"
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-auto py-5 bg-blue-600 text-white rounded-[28px] font-black text-lg shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
            onClick={() => {
              if (currentEpisodeId < 12) setCurrentEpisodeId(prev => prev + 1);
            }}
          >
            {currentEpisodeId < 12 ? 'Next Lesson' : 'Course Finished!'} <ChevronRight />
          </motion.button>
        </div>
      </main>

      {/* Decorative Elements */}
      <footer className="max-w-6xl mx-auto py-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-full shadow-sm text-slate-400 font-bold border-b-4 border-slate-100">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span>Keep learning to get more points!</span>
          <div className="flex gap-1 ml-3">
            {[1, 2, 3].map(i => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 shadow-sm" />
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
