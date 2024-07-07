/*
 Input:
 Boundary [outline] - can have only horizontal and vertical lines and it will be closed. 
 List of points - [ [x1, y1], [x2, y2].... [x1, y1] ]
 Rectangle - { x, y, width, height }, this will be completely inside given boundary
Input 1
Boundary -> [ [0, 0], [887, 0], [887, 632], [2158, 632], [2158, 1381], [0, 1381], [0, 0] ]
Rectangle -> { x: 273, y: 829, width: 1027, height: 347 }


 Output
Scaled Rectangle -> { x: 0, y: 736, width: 1573, height: 531 }


 Input 2
Boundary -> [ [0, 0], [887, 0], [887, 632], [2158, 632], [2158, 1381], [0, 1381], [0, 0] ]
Rectangle -> { x: 299, y: 409, width: 525, height: 724 }


 Output
Scaled Rectangle -> { x: 236, y: 322, width: 651, height: 891 }
*/

function scaleRect(rectangle, boundary) {
  // Rectangle properties
  const { x, y, width, height } = rectangle;

  // Initialize boundaries with initial values
  let leftX = Number.MAX_SAFE_INTEGER;
  let rightX = Number.MIN_SAFE_INTEGER;
  let topY = Number.MAX_SAFE_INTEGER;
  let bottomY = Number.MIN_SAFE_INTEGER;

  // Find actual boundary limits

  boundary.forEach((point) => {
    const [bx, by] = point;

    //calculate the
    if ((leftX === Number.MAX_SAFE_INTEGER || bx > leftX) && bx < x) leftX = bx;

    if ((rightX === Number.MIN_SAFE_INTEGER || bx < rightX) && bx > x + width)
      rightX = bx;

    if ((topY === Number.MAX_SAFE_INTEGER || by > topY) && by < y) topY = by;

    if (
      (bottomY === Number.MIN_SAFE_INTEGER || by < bottomY) &&
      by > y + height
    )
      bottomY = by;
  });

  // Calculate scaling boundaries
  const minLeft = x - leftX;
  const maxRight = rightX - (x + width);
  const minBottom = bottomY - (y + height);
  const maxTop = y - topY;

  const min = Math.min(minLeft, maxRight, minBottom, maxTop);

  //AR - ASPECT RATION W - WIDTH , H - HEIGHT
  //AR = W1 / H1 = W2 / H2

  let isWidthDefault = false;
  if (
    (minLeft < minBottom && minLeft < maxTop) ||
    (maxRight < minBottom && maxRight < maxTop)
  ) {
    isWidthDefault = true;
  }

  let nw = 0;
  let nh = 0;
  let nx = 0;
  let ny = 0;
  if (isWidthDefault) {
    nw = width + min * 2;
    //retain aspect ratio based on the width modified fir height

    nh = nw * (height / width);
    nx = x - min;
    ny = y - (nh - height) / 2;
  } else {
    nh = height + min * 2;

    //retain aspect ratio based on the height modified for width
    nw = nh * (width / height);

    //moving y by x
    ny = y - min;

    //calculate x by new width - width /2 because we want similar kind of min for x
    nx = x - (nw - width) / 2;

    console.log("addd", nx);
  }

  return {
    minLeft,
    maxRight,
    minBottom,
    maxTop,
    height: nh,
    width: nw,
    x: nx,
    y: ny,
  };
}

// Example usage with your provided data
const boundary = [
  [0, 0],
  [887, 0],
  [887, 632],
  [2158, 632],
  [2158, 1381],
  [0, 1381],
  [0, 0],
];

console.log(scaleRect({ x: 299, y: 409, width: 525, height: 724 }, boundary));

console.log(
  scaleRect(
    {
      x: 273,
      y: 829,
      width: 1027,
      height: 347,
    },
    boundary
  )
);
