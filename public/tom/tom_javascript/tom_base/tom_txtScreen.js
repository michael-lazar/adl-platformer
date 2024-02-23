// #!/usr/bin/env node
console.log("txtScreen.js");

// TEXT SCREEN

/*

A script depending on grid.js for making screen-like objects containing various
data grids.

*/

TextScreen = function(width,height){
  this.width = Math.floor(width);
  this.height = Math.floor(height);
   // Character considered as transparent
  this.transparency = '░';
  // Text content data
  this.characters = new Grid(' ',this.width,this.height);
  // // Event data
  this.elements = new Grid(empty_element,this.width,this.height);
  this.onUpdate = [];
  this.onResize = [];
  this.onPrint = [];
}

TextScreen.prototype.update = function(width,height) {
  if (width != this.width || height != this.height) {
    this.width = Math.floor(width);
    this.height = Math.floor(height);
    this.characters = new Grid(' ',this.width,this.height);
    this.elements = new Grid(empty_element,this.width,this.height);
    for (var i = 0; i < this.onResize.length; i++) {
      this.onResize[i](this);
    }
  } else {
    for (var i = 0; i < width*height; i++) {
      this.characters.content[i] = ' ';
      this.elements.content[i] = empty_element;
    }
  }
  for (var i = 0; i < this.onUpdate.length; i++) {
    this.onUpdate[i](this);
  }
}

TextScreen.prototype.add = function(element,_x,_y) {
  for (var i = 0; i < element.setList.length; i++){
    let x = element.setList[i][1]+_x;
    let y = element.setList[i][2]+_y;
    let z = element.pt.z;
    if (!this.characters.valid(x,y)) continue;
    let index = this.characters.index(x,y);
    if (this.elements.content[index]){
      let target = this.elements.content[index];
      if (target.meetable && !target.met.includes(element)) {
        target.meetable(target,element);
      }
      if (element.meetable && !element.met.includes(target)) {
        element.meetable(element,target);
      }
      target.met.push(element);
      element.met.push(target);
      if (target.pt.z < z) continue;
    }
    if (element.shader) {
      element.shader(element,screen,x,y,z,element.setList[i][0]);
    } else {
      this.elements.content[index] = element;
      this.characters.content[index] = element.setList[i][0];
    }
  }
}
TextScreen.prototype.collide = function(element,_x,_y,collision) {
  for (var i = 0; i < element.setList.length; i++){
    let x = element.setList[i][1]+_x;
    let y = element.setList[i][2]+_y;
    let z = element.pt.z;
    if (!this.characters.valid(x,y)) continue;
    let index = this.characters.index(x,y);
    if (this.elements.content[index]){
      let target = this.elements.content[index];
      collision(element,target);
    }
  }
}

// TODO Use collide in add ?

//TextScreen.prototype.collide = function(element,x,y,collision) {
//  for (var i = 0; i < element.setList.length; i++){
//    let _x = element.setList[i][1]+x;
//    let _y = element.setList[i][2]+y;
//    if (!this.characters.valid(_x,_y)) continue;
//    let index = this.characters.index(_x,_y);
//    if (this.elements.content[index]){
//      let target = this.elements.content[index];
//      collision(element,target);
//    }
//  }
//}

TextScreen.prototype.print = function(frame){
  for (var i = 0; i < this.onPrint.length; i++) {
    this.onPrint[i](this,frame);
  }
  return this.characters.print();
}

//TextScreen.prototype.print_by_name = function(){
//  let str_by_name = {};
//  for (var i = 0; i < this.characters.content.length; i++) {
//    let char = (i && Number.isInteger(i/this.characters.width) ? '\n' : '') + this.characters.content[i];
//    let name = this.elements.content[i].name;
//    if (!str_by_name[name]) str_by_name[name] = 
//    str += 
//  }
//  return str_by_name;
//}
