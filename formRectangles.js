class Node {
    constructor(w, h, type) {
      this.type = type;
      this.w = w;
      this.h = h;
      this.children = [];
    }
  
    addChild(child) {
      this.children.push(child);
    }
  }
  
  class LeafNode {
    constructor(w, h) {
      this.type = "leaf";
      this.w = w;
      this.h = h;
    }
  }
  
  const arr = [];
  
  function formRectangle(w, h, n) {
    function recursive(width, height, parts) {
      if (parts === 1) {
        //The final node of the tree for the current scenario
        return new LeafNode(width, height);
      }
  
      for (let i = 1; i < parts; i++) {
        let remainingParts = parts - i;
        //the split should not cross n
        if (remainingParts < 1) continue;
  
        //initialize new node for each container to cal the childs for each posible case
        let node = new Node(w, h, "container");
  
        let rowChild = new Node(width, height, "row");
        //try to find the possible rows with the height / part and keeping i and remaining part in the other case and wise versa
        rowChild.addChild(recursive(width, height / parts, i));
        rowChild.addChild(recursive(width, height / parts, remainingParts));
        node.addChild(rowChild);
  
        //try to find the possible cols with the height / part and keeping i and remaining part in the other case and wise versa
        let colChild = new Node(width, height, "col");
        colChild.addChild(recursive(width / parts, height, i));
        colChild.addChild(recursive(width / parts, height, remainingParts));
  
        //append all the col nodes to the node
        node.addChild(colChild);
        arr.push(node);
      }
    }
  
    recursive(w, h, n);
    return arr;
  }
  
  const root = formRectangle(100, 100, 2);
  
  console.log(root);
  
  
  
  
  
  