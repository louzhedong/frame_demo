import { createElement, render, renderDom } from './element.mjs';

let virtualDom = createElement('ul', { class: 'list' }, [
  createElement('li', { class: 'item' }, ['小A']),
  createElement('li', { class: 'item' }, ['小B']),
  createElement('li', { class: 'item' }, ['小C']),
])

console.log(virtualDom);

let el = render(virtualDom);
console.log(el);

renderDom(el, document.getElementById('root'));