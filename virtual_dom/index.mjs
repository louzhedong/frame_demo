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