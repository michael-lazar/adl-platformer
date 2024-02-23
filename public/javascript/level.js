// LEVEL

let level_size = 20;

// BUILD
//let to_build = [
//
//  /* 
//    0,0 | -1,0
//    ----|-----
//    0,1 | -1,1
//  */
//  [txtLineSetList,[-5,0],[20,5],10,10,'█'],
//  /* 
//    0,1 | -1,1 | 1,1
//    ----|------|----
//    0,2 | -1,2 | 1,2
//  */
//  [txtLineSetList,[-5,20],[40,25],10,10,'█'],
//  [txtLineSetList,[55,25],[56,25],5,10,'█'],
//  [txtLineSetList,[100,25],[300,30],10,10,'█'],
//  /* 
//    0,0 | 1,0
//    ----|-----
//    0,1 | 1,1
//  */
//  [txtLineSetList,[35,5],[40,5],10,10,'█'],
//  /* 
//    1,0 | 2,0
//    ----|-----
//    1,1 | 2,1
//  */
//  [txtLineSetList,[55,5],[80,0],10,10,'█']
//]
//let wall_setList = [];
//for (var i = 0; i < to_build.length; i++) {
//  let fun = to_build[i].shift();
//  wall_setList = wall_setList.concat(fun(...to_build[i]));
//}
let wall = new txtElement("wall",art["level_wall"],new Pt(0,0,50));
wall.project = true;
decor = new txtElement("decor",art["level_decor"],new Pt(0,0,50));
decor.project = true;
plateform = new txtElement("plateform",art["level_plateform"],new Pt(0,0,50));
plateform.project = true;

// CACHE

let cache = new txtElement("cache",[0],new Pt(0,0,2));
let cache_r = new txtElement("cache",[0],new Pt(0,0,3));
cache_r.shader = function(element,screen,x,y,z,character) {
  let i = 0;
  while (x+i < screen.width) {
    if (!screen.characters.valid(x+i,y)) {
      i++;
      continue;
    }
    let index = screen.characters.index(x+i,y);
    let target = screen.elements.content[index];
    if (target.pt.z < z) {
      i++;
      continue;
    }
    screen.characters.content[index] = character;
    screen.elements.content[index] = element;
    i++;
  }
}
let cache_l = new txtElement("cache",[0],new Pt(0,0,3));
cache_l.shader = function(element,screen,x,y,z,character) {
  let i = 0;
  while (x+i > -1) {
    if (!screen.characters.valid(x+i,y)) {
      i--;
      continue;
    }
    let index = screen.characters.index(x+i,y);
    let target = screen.elements.content[index];
    if (target.pt.z < z) {
      i--;
      continue;
    }
    screen.characters.content[index] = character;
    screen.elements.content[index] = element;
    i--;
  }
}
cache.shader = function(element,screen,x,y,z,character) {
  let i = 0;
  if (x > screen.width/2 && character == '|') {
    while (x+i < screen.width) {
      if (!screen.characters.valid(x+i,y)) {
        i++;
        continue;
      }
      let index = screen.characters.index(x+i,y);
      let target = screen.elements.content[index];
      if (target.pt.z < z) {
        i++;
        continue;
      }
      screen.characters.content[index] = i == 0 ? '▏' : ' ';
      screen.elements.content[index] = element;
      i++;
    }
  }
  i = 0;
  if (x < screen.width/2 && character == '|') {
    while (x+i > -1) {
      if (!screen.characters.valid(x+i,y)) {
        i--;
        continue;
      }
      let index = screen.characters.index(x+i,y);
      let target = screen.elements.content[index];
      if (target.pt.z < z) {
        i--;
        continue;
      }
      screen.characters.content[index] = i == 0 ? '▕' : ' ';
      screen.elements.content[index] = element;
      i--;
    }
  }
  i = 0;
  if (y < screen.height/2 && character == '-') {
    while (y+i > -1) {
      let index = screen.characters.index(x,y+i);
      screen.characters.content[index] = i == 0 ? '_' : ' ';
      screen.elements.content[index] = element;
      i--;
    }
  }
  i = 0;
  if (y > screen.height/2 && character == '-') {
    while (y+i < screen.height) {
      let index = screen.characters.index(x,y+i);
      screen.characters.content[index] = i == 0 ? '¯' : ' ';
      screen.elements.content[index] = element;
      i++;
    }
  }
};
screen.onPrint.push(function(screen){
  cache.pt.x = camera.center_x - (level_size+3);
  cache.pt.y = camera.center_y - (level_size/2+2);
  cache.setList = txtSetList(txtFrame(level_size*2+6,level_size+4,screen.transparency),screen.transparency)
  cache_r.pt.x = camera.center_x +level_size+2;
  cache_r.setList = txtSetList(txtFill(1,screen.height,' '));
  cache_l.pt.x = camera.center_x -level_size-3;
  cache_l.setList = txtSetList(txtFill(1,screen.height,' '));
});
