/**
 * 最开始出现的是 virtual-dom 这个库，是大家好奇 React 为什么这么快而搞鼓出来的。它的实现是非常学院风格，通过深度优先搜索与 in-order tree 来实现高效的 diff 。它与 React 后来公开出来的算法是很不一样。
 * 然后是 cito.js 的横空出世，它对今后所有虚拟 DOM 的算法都有重大影响。它采用两端同时进行比较的算法，将 diff 速度拉高到几个层次。
 * 紧随其后的是 kivi.js，在 cito.js 的基出提出两项优化方案，使用 key 实现移动追踪以及及基于 key 的最长自增子序列算法应用（算法复杂度 为O(n^2)）。
 * 但这样的 diff 算法太过复杂了，于是后来者 snabbdom 将 kivi.js 进行简化，去掉编辑长度矩离算法，调整两端比较算法。速度略有损失，但可读性大大提高。再之后，就是著名的vue2.0 把sanbbdom整个库整合掉了。
 */
import { createElement, render, renderDom } from './element.mjs';
import diff from './diff.mjs';
import patch from './patch.mjs';

let virtualDom = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['小A']),
  createElement('li', { class: 'item' }, ['小B']),
  createElement('li', { class: 'item' }, ['小C']),
])

console.log(virtualDom);

let el = render(virtualDom);
console.log(el);

renderDom(el, document.getElementById('root'));


// let virtualDom2 = createElement('ul', { class: 'list-group' }, [
//   createElement('li', { class: 'item active' }, ['大A']),
//   createElement('li', { class: 'item' }, ['大B']),
//   createElement('li', { class: 'item' }, ['大C']),
// ])

const newVirtucalDom = createElement( 
  "ul", 
  { style: "border: 1px solid blue;" }, 
  [createElement("li")] 
 );

let patches = diff(virtualDom, newVirtucalDom);
console.log(patches);

patch(el, patches);