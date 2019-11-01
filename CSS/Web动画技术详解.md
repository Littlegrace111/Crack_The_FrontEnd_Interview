# Web动画技术
动画本质是让虚拟世界中的元素模拟真实世界中物体的运动。
动画包含：起始样式，中间样式，结束样式，时间轴，时间过渡算法。

## 帧动画 Frame Animation
帧动画的实现原理就是不断切换视觉内图片内容，利用视觉滞留生理现象来实现连续播放的动画效果。
视觉滞留生理时间大概是60fps, 1秒钟要至少有60帧，才不会让用户感到明显卡顿。1帧的时间在16.67ms左右。
逐帧动画就是一张一张的图片按照一定顺序（可能是30fps或者60fps）在时间轴上展示。
逐帧动画实际上与视频播放模式有相似之处，很适合表达表演很细腻的动画，如3D效果，人物或者动作等效果。
其实视频也可以理解为更高形式的逐帧动画。

### 帧动画实现技术
1. gif图实现帧动画（ https://img.alicdn.com/tfs/TB1IIMJRXXXXXaxXpXXXXXXXXXX-127-140.gif）
   缺点：
   画质上，带有透明度的gif图在浏览器上有明显毛边；原因是gif支持颜色少，Alpha透明度支持差，图像锯齿毛边比较严重。
   交互上，扩展性不好，不能定制事件处理，控制播放暂停，动画播放次数，灵活性差；
   性能上：gif会引起页面周期性paint，性能差；
2. JS实现帧动画：使用脚本控制动画的连续播放，交互方式多，非常灵活，可扩展，兼容性佳；
3. CSS3 Animation实现帧动画

### JS帧动画
雪碧图/精灵图技术 Sprite Image
早期为了解决多张图片加载问题，把多个图片按照一定的顺序压缩到一张图片上。

#### JS帧动画实现方式
1. 直接改变元素的background-image：div.background-image = picUrl，需要配合图片预加载库，多张图片会带来多个http请求。
2. 将动画帧图片合成Sprite Image，通过改变background-position 来实现；

图片预加载，时间轴控制；
使用requestAnimationFrame来控制时间轴函数，不要使用setTimeout或者setInterval；

### CSS3 帧动画
利用CSS3中提供的animation属性：使用 `animation-timing-function` 的阶梯函数 `steps(number_of_steps, direction)` 里实现。

**写法一**
```css
<div class="sprite"></div>

.sprite {
    /* 定义每一帧的宽高 */
    width: 300px;
    height: 300px;
    background: url(./frame.png)
    animation: frameAnimation 333ms steps(1, end) both infinite;
}
/* 定义每一帧关键帧 一共20帧，每一帧时间333/20 = 16.65ms*/
@keyframes frameAnimation {
    0% {background-position: 0 0;}
    5% {background-position: -300px 0;}
    10% {background-position: -600px 0;}
    15% {background-position: -900px 0;}
    20% {background-position: -1200px 0;}
    25% {background-position: -1500px 0;}
    30% {background-position: -1800px 0;}
    35% {background-position: -2100px 0;}
    40% {background-position: -2400px 0;}
    45% {background-position: -2700px 0;}
    50% {background-position: -3000px 0;}
    55% {background-position: -3300px 0;}
    60% {background-position: -3600px 0;}
    65% {background-position: -3900px 0;}
    70% {background-position: -4200px 0;}
    75% {background-position: -4500px 0;}
    80% {background-position: -4800px 0;}
    85% {background-position: -5100px 0;}
    90% {background-position: -5400px 0;}
    95% {background-position: -5700px 0;}
    100% {background-position: -6000px 0;}
}
```

**写法二**
```css
<div class="sprite"></div>

.sprite {
    /* 定义每一帧的宽高 */
    width: 300px;
    height: 300px;
    background: url(./frame.png)
    animation: frameAnimation 333ms steps(20) both infinite;
}

@keyframes frameAnimation {
    0% { background-position: 0 0;}
    100%{ background-position: -6000px 0;}
}
```

**写法三（移动端推荐）**
使用`transform: translate3d()`来实现，transform可以开启GPU加速，提高机器渲染效果，还能解决移动端帧动画抖动的问题。
```css
<div class="sprite-wv">
    <div class="sprite"></div>
</div>

.sprite-wv {
    width: 300px;
    height: 300px;
    overflow: hidden;
}
.sprite {
    width: 6000px;
    height: 300px;
    will-change:transform;
    background: url(./frame.png) no-repeat center;
    animation: frameAnimation 333ms steps(20) both infinite;
}
@keyframes frameAnimation {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-6000px, 0, 0); }
}
```
**移动端适配方案：rem + scale**
rem计算存在误差，因此使用雪碧图不推荐使用rem。如果是逐帧动画，由于计算误差，会出现抖动的情况。
- 非逐帧动画部分，使用rem做单位；
- 逐帧动画部分，使用px做单位，再结合js对动画部分使用scale进行缩放；

### 使用CSS3动画来开启GPU加速
3D transform会启动GPU加速， translate3d, scaleZ。
> GPU即图形处理器，是与处理和绘制图形相关的硬件。GPU是专为执行复杂的数学和几何计算而设计的，可以让CPU从图形处理的任务中解放出来，从而执行更多的系统任务，如页面的计算和重绘。

### will-change
`will-change`: 顾名思义，我要变形了，主动让浏览器动用GPU去处理某个元素。

### transform
transform属性不会触发浏览器的repaint，transform动画由GPU控制，支持硬件加速，不需要软件方面渲染。
浏览器接收到页面文档后，会将文档中的标记语言解析为DOM树。DOM树和CSS结合后形成浏览器构建页面的渲染树。渲染树中包含了大量的渲染元素，每一个渲染元素会被分到一个图层中，每个图层又会被加载到GPU形成渲染纹理，而图层在GPU中transform是不会触发repaint的，这一点非常类似3D绘图功能，最终这些使用transform的图层都会由独立的合成器进程进行处理。

**浏览器什么时候创建一个独立的复合图层：**
1. 3D或者CSS transform；
2. `<video>`和`<canvas>`标签；
3. CSS filters；
4. 元素覆盖时，比如使用 `z-index` 属性；

3D和2Dtransform的区别在于，浏览器在页面渲染前为3D动画创建独立复合图层，而在运行期间为2D动画创建独立复合图层。动画开始时，生成新的复合图层并加载为GPU纹理用于初始化repaint。然后由GPU的复合器操纵整个动画的执行。最后在动画结束时，再次执行repaint操作删除复合图层。

**使用GPU渲染元素：**
并不是所有的CSS属性都能触发GPU硬件加速：只有如下少数几个：
- transfrom
- opacity
- filter
- will-change 

**强制使用GPU渲染:**
为了避免2D transform动画在开始和结束时发生的repaint操作，可以硬编码一些样式来解决：
```css
.example1 {
    transform: translateZ(0)
}

.example2 {
    transform: rotateZ(360deg);
}
```
**开启GPU硬件加速可能触发的问题：**
通过`-webkit-transform: transition3d/translateZ`

## CSS3动画
| 属性       | 含义                                                               |
| ---------- | ------------------------------------------------------------------ |
| animation  | 设置动画属性，包含6个属性                                          |
| transition | 设置元素动画timeline和timeline-function                            |
| transform  | 设置元素旋转`rotate`, 缩放`scale`, 移动`translate`, 倾斜`skew`等。 |
| translate  | translate只是transform的一个属性，移动。                           |

用CSS3动画替代JS模拟动画的优点：
- 不占用JS线程，没有scripting时间
- 可以利用GPU硬件加速；
- 浏览器底层对css3 animation 做了优化；

### Transition 过渡
transition 局限：
1. 需要事件触发，没法自动发生；
2. 一次性的，不能重复，除非手动触发；
3. 只有两种状态，开始和结束状态，不能定义中间状态；
4. 一条transition规则只能定义一个属性变化，不能涉及多个属性；

### CSS3 Animation
```css
div:hover {
    animation: 1s rainbow;
}
@keyframes rainbow {
    0% { background: #c00; }
    50% { background: orange; }
    100% { background: yellowgreen; }
}
```
#### animation-fill-mode
动画结束后，会立即从结束状态跳回起始状态。如果想让动画保持在结束状态，需要使用`animation-fill-mode`属性。
```css
    div: hover {
        animation: 1s rainbow forwards;
    }
```
animation-fill-mode: none | backwards | forwards | both
none: 默认值，回到动画开始状态。
backwards: 让动画回到第一帧状态。
forwards: 让动画停留在最后一帧。
both: 根据animation-direction 轮流应用forwards和backwards.

#### animation-direction
动画循环播放时，每次都是从结束状态跳回到起始状态，再开始播放。`animation-direction`指定了动画播放的方向，默认值normal，最常用的值是normal 和 reverse。浏览器其他值兼容性不佳，慎用。
```css
    div:hover {
        animation: 1s rainbow 3 normal;
    }
```
animation-direction: normal | alternate | reverse | alternate-reverse

#### keyframes 关键帧
keyframes关键帧用来定义动画的各个状态。

#### aniamtion-play-state
如果想让动画保持突然终止时状态，使用`animation-play-state`属性。
```css
div {
    animation: spin 1s linear infinite;
    animation-play-state: pause;
}
div:hover {
    animation-play-state: running;
}
```
上面代码指定动画默认状态是暂停的，鼠标悬停，动画状态改为继续播放。

#### 浏览器兼容性
```css
div:hover {
  -webkit-animation: 1s rainbow;
  animation: 1s rainbow;  
}
/* 支持webkit内核的浏览器 */
@-webkit-keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}

@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
```

#### 总结
```css
    div: hover {
        animation: 1s 1s rainbow linear 3 forwards normal;
    }
    div: hover {
        animation-name: rainbow;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-delay: 1s;
        aniamtion-fill-mode: forwards;
        animation-direction: normal;
        animation-iteration-count: 3;
    }
    @keyframes rainbow {
        0% { background: #c00; }
        50% { background: orange; }
        100% { background: yellowgreen; }
    }
```

### CSS3 实现3D动效

## SVG 动画

## canvas 动画

## 3D动画效果

## 动画调优

### 浏览器渲染原理

### RequestAnimationFrame

### GPU硬件加速

### 贝塞尔曲线

## 引用
https://www.atatech.org/articles/137687
https://juejin.im/post/5c7bd2646fb9a049cb197921#heading-6
https://www.jianshu.com/p/d1e16a2e88c1