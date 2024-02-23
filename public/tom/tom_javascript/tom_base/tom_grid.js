// #!/usr/bin/env node
console.log("grid.js");

// GRID

/*

A script for making grid-like objects containing data with some specific
functions for text grids like grid.print. Theses objects data can be Set or Get
with XY coordonates grid.set(1,0,0) will set to 1 first cell of first line of
the grid object while grid.get(0,0) will return 1. The function grid.add is
specific for using arrays called setList containing series of data associated
with XY coordinates. Strings can be converted to setList using strSetList
function.

*/

Grid = function(fill,width,height){
  this.width = Math.floor(width);
  this.height = Math.floor(height);
  this.content = [];
  while(this.content.length != width*height) this.content.push(fill);
}

Grid.prototype.print = function(){
  let str = '';
  for (var i = 0; i < this.content.length; i++) {
    str += (i && Number.isInteger(i/this.width) ? '\n' : '') + this.content[i]
  }
  return str;
}

Grid.prototype.index = function(x,y) {
  return Math.floor(y) * this.width + Math.floor(x);
}

Grid.prototype.valid = function(x,y) {
  return (
    x >= this.width
    || x < 0
    || y >= this.height
    || y < 0
  ) ? false : true;
}

Grid.prototype.set = function(val,x,y) {
  if (!this.valid(x,y)) return null;
  return this.content[this.index(x,y)] = val;
}

Grid.prototype.get = function(x,y) {
  if (!this.valid(x,y)) return null;
  return this.content[this.index(x,y)];
}

Grid.prototype.add = function(setList,x,y,priority,priorityGrid) {
  for (var i = 0; i < setList.length; i++){
    let _x = setList[i][1]+x;
    let _y = setList[i][2]+y;
    if (!this.valid(_x,_y)) continue;
    let index = this.index(_x,_y);
    if (priorityGrid) {
      let targetPriority = priorityGrid.content[index];
      if (targetPriority != null && targetPriority > priority) continue;
      priorityGrid.content[index] = priority;
    }
    this.content[index] = setList[i][0];
  }
}
