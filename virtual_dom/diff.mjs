function diff(oldTree, newTree) {
  // 存放补丁
  let patches = {};
  // 树的第0个索引
  let index = 0;

  walk(oldTree, newTree, index, patches);

  return patches;
}

function walk(oldTree, newTree, index, patches) {
  //当前节点的补丁
  let current = [];

  if (!newTree) {
    current.push({ type: 'REMOVE', index });
  } else if (isString(oldTree) && isString(newTree)) {
    if (oldTree !== newTree) {
      current.push({ type: 'TEXT', text: newTree });
    }
  } else if (oldTree.type === newTree.type) {
    let attr = diffAttr(oldTree.props, newTree.props);
    if (Object.keys(attr).length > 0) {
      current.push({ type: 'ATTR', attr });
    }
    if (oldTree.children && newTree.children) {
      diffChildren(oldTree.children, newTree.children, patches);
    }
  } else { // 节点被替换了
    current.push({ type: 'REPLACE', newTree });
  }

  if (current.length) {
    patches[index] = current;
  }
}

function isString(obj) {
  return typeof obj === 'string';
}

function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  if (!newAttrs) return patch;
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key];
    }
  }

  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }

  return patch;
}

let num = 0;

function diffChildren(oldChildren, newChildren, patches) {
  oldChildren.forEach((child, index) => {
    walk(child, newChildren[index], ++num, patches);
  });
}

export default diff;