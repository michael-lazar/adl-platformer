// cam
previous_cam_x = 0;
previous_cam_y = 0;

// Room
let room_x = 0;
let room_y = 0;
let previous_room_x = 0;
let previous_room_y = 0;

function room_change(){
  if (!player_y_vel && !(room_x == 1 && room_y == 1)) {
    last_safe_pos[0] = player.pt.x;
    last_safe_pos[1] = player.pt.y;
  }
}


// Player init
let player;
let player_keys = 0;
let player_coins = 0;
let last_safe_pos = [0,0];
function player_init(){
  player_x_vel = 0;
  player_y_vel = 0;
  player_x_speed = 0.09;
  friction_x = 0.7;
  friction_y = 0.75;
  gravity_x = 0;
  gravity_y = 0.15;
  player_jump = 0;
  let scene_id = new txtElement("scene_id",[],new Pt(8,0,1));
  scene_id.onDisplay = function(element){
    element.setList = txtSetList(room_x+','+room_y);
  }
  let key_count = new txtElement("key_count",[],new Pt(0,1,1));
  key_count.onDisplay = function(element){
    element.setList = txtSetList("¥ "+player_keys);
  }
  let coin_count = new txtElement("coin_count",[],new Pt(0,2,1));
  coin_count.onDisplay = function(element){
    element.setList = txtSetList("☺ "+player_coins);
  }
  player = new txtElement("player",[['#',0,0]],new Pt(17,20,49),function(element,target){
    if (target.name == "trap") {
      let player_pos = camera.project(player.pt);
      player.pt.x = last_safe_pos[0];
      player.pt.y = last_safe_pos[1];
      camera.x = Math.floor((player.pt.x+level_size/2)/level_size)*level_size*-1;
      camera.y = Math.floor((player.pt.y+level_size/2)/level_size)*level_size*-1;
      room_x = Math.abs(camera.x/level_size);
      room_y = Math.abs(camera.y/level_size);
      if (previous_room_x == room_x && previous_room_y == room_y) {
        pos = [player_pos,camera.project(player.pt)];
      } else {
        pos = [camera.project(player.pt)];
      }
      memory = [];
      limit_index = 0;
      limit = 3;
      player_x_vel = 0;
      player_y_vel = 0;
      keys = {};
      s1[0] = 1;
      s1[1] = 0.1;
      s1[2] = 0;
      s1[3] = 0;
      s1[4] = 2;
      s1[5] = 0;
      s1[6] = 1;
      s1[7] = 50;
      p1(0,0);
    }
    if (target.name == "coin") {
      let player_pos = camera.project(player.pt);
      pos = [player_pos];
      memory = [];
      limit_index = 0;
      limit = 2;
      player_coins++;
      s1[0] = [C,E,G][f(r(3))][3];
      s1[1] = 0.1;
      s1[2] = 0;
      s1[3] = 0;
      s1[4] = 1;
      s1[5] = 5;
      s1[6] = 0;
      s1[7] = 0;
      p1(0,0);
      remove_txtElement(target);
    }
    if (target.name == "key") {
      let player_pos = camera.project(player.pt);
      pos = [player_pos];
      memory = [];
      limit_index = 0;
      limit = 4;
      s1[0] = [C,E,G][f(r(3))][4];
      s1[1] = 0.1;
      s1[2] = 0;
      s1[3] = 0;
      s1[4] = 1;
      s1[5] = 5;
      s1[6] = 0;
      s1[7] = 0;
      p1(0,0);
      player_keys++;
      remove_txtElement(target);
    }
    if (target.name == "door" && keys["ArrowDown"]){
      if (target.locked) {
        if (player_keys) {
          player_keys--;
          target.locked = false;
          console.log(target.setList);
          target.setList[7][0] = ' ';
        } else {
          s1[0] = E[2];
          s1[1] = 0.05;
          s1[2] = 0;
          s1[3] = 0.01;
          s1[4] = 0.25;
          s1[5] = 20;
          s1[6] = 0;
          s1[7] = 20;
          p1(0,0);
          s1[0] = B[2];
          p1(0,0);
          return;
        }
      }
      for (var i = 0; i < doors.length; i++) {
        if (doors[i].number == target.number && doors[i] != target){
          doors[i].setList[7][0] = ' ';
          player.pt.x = doors[i].pt.x+0.5;
          player.pt.y = doors[i].pt.y+2;
          if (doors[i].locked) {
            camera.x = Math.floor((player.pt.x+level_size/2)/level_size)*level_size*-1;
            camera.y = Math.floor((player.pt.y+level_size/2)/level_size)*level_size*-1;
            doors[i].locked = false;
            let player_pos = camera.project(player.pt);
            pos = [player_pos];
            memory = [];
            limit_index = 0;
            limit = 8;
            s1[0] = C[4];
            s1[1] = 0.05;
            s1[2] = 0.01;
            s1[3] = 0;
            s1[4] = 2;
            s1[5] = 5;
            s1[6] = 0.1;
            s1[7] = 2;
            p1(0,0);
            s1[0] = E[4];
            p1(0,0);
            s1[0] = G[4];
            p1(0,0);
          } else {
            s1[0] = [A,C,E][f(r(3))][3];
            s1[1] = 0.05;
            s1[2] = 0;
            s1[3] = 0;
            s1[4] = 2;
            s1[5] = 20;
            s1[6] = 0;
            s1[7] = 50;
            p1(0,0);
          }
          keys["ArrowDown"] = false;
        }
      }
    }
  });
  //player.visible = false;
  player.project = true;
}
player_init();
function player_move(){
  if (keys["ArrowRight"]) player_x_vel += player_x_speed;
  if (keys["ArrowLeft"]) player_x_vel -= player_x_speed;
  if (player_jump > 0.01) {
    player_y_vel -= player_jump;
    player_jump *= friction_y;
  } else {
    player_y_vel += gravity_y;
  }
  player_x_vel += gravity_x;
  player_x_vel *= friction_x;
  player_y_vel *= friction_y;
  player_x_vel = player_x_vel < 0.01 && player_x_vel > -0.01 ? 0 :player_x_vel;
  player_y_vel = player_y_vel < 0.01 && player_y_vel > -0.01 ? 0 :player_y_vel;
  let move_x = false;
  let move_y = false;
  let move_xy = false;

  let player_pos = camera.project(player.pt);
  let player_next_pos = camera.project(new Pt(player.pt.x+player_x_vel,player.pt.y+player_y_vel,player.pt.z));
  screen.collide(player,player_next_pos[0],player_pos[1],
    function(element,target){
      if (target.name != "wall") {
        move_x = true;
      }
    }
  );
  screen.collide(player,player_pos[0],player_next_pos[1],
    function(element,target){
      if (target.name != "wall" && target.name != "plateform" || target.name == "plateform" && (keys["ArrowDown"] || player_y_vel < 0)) {
        move_y = true;
        if (target.name == "plateform" && keys["ArrowDown"]) {
          s1[0] = f(2+r(2))/2;
          s1[1] = 0.02;
          s1[2] = 0.1;
          s1[3] = 0;
          s1[4] = 0.1;
          s1[5] = 5;
          s1[6] = 1;
          s1[7] = f(5+r(5));
          p1(0,0);
        }
        if (target.name == "plateform" && keys["ArrowUp"]) {
          s1[0] = f(2+r(2))/2;
          s1[1] = 0.02;
          s1[2] = 0.1;
          s1[3] = 0;
          s1[4] = 0.1;
          s1[5] = 5;
          s1[6] = 1;
          s1[7] = f(5+r(5));
          p1(0,0);
          player_jump = player_jump < gravity_y ? gravity_y : player_jump;
        }
      } else {
        if (keys['ArrowUp'] && player_y_vel > 0) {
          player_jump = gravity_y * 2;
          s1[0] = f(5+r(5));
          s1[1] = 0.05;
          s1[2] = 0.05;
          s1[3] = 0;
          s1[4] = 0.25;
          s1[5] = 5;
          s1[6] = 1;
          s1[7] = f(5+r(5));
          p1(0,0);
        }
      }
    }
  );
  screen.collide(player,player_next_pos[0],player_next_pos[1],
    function(element,target){
      if (target.name != "wall") {
        move_xy = true;
      }
    }
  );
  if (move_x && move_y) {
    if (move_xy) {
      player.pt.x += player_x_vel;
      player.pt.y += player_y_vel;
    } else {
      player_x_vel = 0;
      player_y_vel = 0;
      keys = {};
    }
  } else {
    if (move_x) {
      player.pt.x += player_x_vel;
      if ((player_x_vel > 0.01 || player_x_vel < -0.01) && Number.isInteger(f(player.pt.x*5)/5)) {
        s1[0] = 400;
        s1[1] = 0.005;
        s1[2] = 0.025;
        s1[3] = 0;
        s1[4] = 0.05;
        s1[5] = 5;
        s1[6] = 1;
        s1[7] = 40;
        p1(0,0);
      }
    } else {
      player_x_vel = 0;
    }
    if (move_y) {
      player.pt.y += player_y_vel;
    } else {
      if (player_y_vel > gravity_y*2) {
          s1[0] = 1;
          s1[1] = 0.05;
          s1[2] = 0.0;
          s1[3] = 0;
          s1[4] = 0.3;
          s1[5] = 5;
          s1[6] = 0.5;
          s1[7] = 20;
          p1(0,0);
      }
      player_y_vel = 0;
    }
  }
  let fx_pos = camera.project(player.pt);
  fx = new txtElement("fx",[[
    !(Math.floor(fx_pos[0])%4) ? '.' :
    !((Math.floor(fx_pos[0])+2)%4) ? '\'' :
    '·'
  ,0,0]],new Pt(fx_pos[0],fx_pos[1],49.5));
  fx.pv = 10;
  fx.onDisplay = function(element){
    if (!element.pv) remove_txtElement(element);
    element.pv--;
  }

  // CHANGE ROOM
  camera.x = Math.floor((player.pt.x+level_size/2)/level_size)*level_size*-1;
  camera.y = Math.floor((player.pt.y+level_size/2)/level_size)*level_size*-1;
  room_x = Math.abs(camera.x/level_size);
  room_y = Math.abs(camera.y/level_size);
  if (previous_room_x != room_x || previous_room_y != room_y) room_change();
  previous_room_x = room_x;
  previous_room_y = room_y;
  if (camera.x != previous_cam_x || camera.y != previous_cam_y) {
    for (var i = 0; i < txtElements.length; i++) {
      if (txtElements[i].name == "fx") remove_txtElement(txtElements[i]);
    }
  }
  previous_cam_x = camera.x;
  previous_cam_y = camera.y;

  // PLAYER DISPLAY
  player.setList[0][0] = (
    player_y_vel < -0.1 ? (
      player_x_vel < -0.1 ? '⇖' :
      player_x_vel >  0.1 ? '⇗' :
      '⇑'
    ) :
    player_y_vel > 0.1 ? (
      player_x_vel < -0.1 ? '⇙' :
      player_x_vel >  0.1 ? '⇘' :
      '⇓'
    ) : 
    player_x_vel < -0.1 ? '⇐' :
    player_x_vel >  0.1 ? '⇒' :
    '⇔'
  );
}

// FLOODFILL

function floodfill(pos,dirs,memory,fill,limit_index,limit) {
  if (limit_index >= limit) return false;
  let new_memory = memory.concat([]);
  let new_pos = [];
  for (var i = 0; i < pos.length; i++){
    let x = pos[i][0];
    let y = pos[i][1];
    if (!screen.characters.valid(x,y)) continue;
    let index = screen.characters.index(x,y);
    if (memory.includes(index)
    || screen.characters.content[index] == fill ) continue;
    new_memory.push(index);
    screen.characters.content[index] = fill;
    for (var j = 0; j < dirs.length; j++) {
      let dir_x = dirs[j][0];
      let dir_y = dirs[j][1];
      let _x = dir_x+x;
      let _y = dir_y+y;
      if (!screen.characters.valid(_x,_y)) continue;
      index = screen.characters.index(_x,_y);
      new_pos.push([_x,_y]);
    }
  }
  return [new_pos,new_memory];
}

// GAME ?

screen.onUpdate.push(function(screen){
//camera.center_x = screen.width/2;
//camera.center_y = screen.height/2;
});
let noise = [];
let noise_chars = "':·.o°+x,`*";

// MAIN PROCESS ?

let pos = [[10,10]];
let memory = [];
let limit_index = Infinity;
let limit = 0;

screen.onPrint.push(function(screen,frame){
  // FLOODFILL
  let floodfilled = floodfill(
    pos,
    [[-1,0],[-2,0],[0,-1],[1,0],[2,0],[0,1]],
    memory,
    '≡',limit_index,limit
  );
  if (floodfilled && !(frame%3)) {
    pos = floodfilled[0];
    memory = floodfilled[1];
    limit_index++;
  }
  
  // NOISE
  while (noise.length < (screen.width+screen.height)/40) noise.push([0,0]);
  while (noise.length > (screen.width+screen.height)/40) noise.pop();
  for (var i = 0; i < noise.length; i++){
    if (!(frame%Math.floor(Math.pow((i+2.5),(i+2.5))))) noise[i] = [Math.floor(Math.random()*screen.characters.content.length),Math.floor(Math.random()*noise_chars.length)];
    let char = screen.characters.content[noise[i][0]];
    screen.characters.content[noise[i][0]] = char == ' ' ? noise_chars[noise[i][1]]: char;
  }
  
  // PLAYER
  player_move();
});
/*
let player_interact = new txtElement("player_interact",txtSetList("↓"),0,0,999);
let player = new txtElement("player",txtSetList('⇹'),0,0,999,
  function(element,target){
    if (target.name == "empty") player_interact.visible = false;
    if (target.name == "coin") {
      for (var i = 0; i < 8; i++) {
        effect = new txtElement("fx",txtSetList('+'),player.x+Math.random()*4-2,player.y+1-Math.random()*2,2);
        effect.onDisplay = function(element,target){
          if (!element.health) {
            remove_txtElement(element);
          } else {
            element.health--;
          }
        }
        effect.health = Math.floor(Math.random()*50);
      }
      remove_txtElement(target);
    }
    if (target.name == "trampoline" && player_y_vel > 0) {
      player_jump = 1;
      player_x_vel *= 2;
      let effect = new txtElement("boing",txtSetList('BOING'),player.x+Math.random()*5-5,player.y-1-Math.random()*2,2);
      effect.onDisplay = function(element){
        if (!element.health) {
          remove_txtElement(element);
        } else {
          element.health--;
        }
      }
      effect.health = 50;
    } else if (target.name == "pike" || target.name == "wall") {
      let effect = new txtElement("ouch",txtSetList(player.setList[0][0]),player.x,player.y,999);
      effect.onDisplay = function(element,target){
        if (!element.health) {
          remove_txtElement(element);
        } else {
          element.health--;
        }
      }
      effect.health = 10;
      effect = new txtElement("ouch",txtSetList(['OUCH','AIE'][Math.floor(Math.random()*2)]),player.x+Math.random()*4-4,player.y-1-Math.random()*2,3);
      effect.onDisplay = function(element,target){
        if (!element.health) {
          remove_txtElement(element);
        } else {
          element.health--;
        }
      }
      effect.health = 50;
      for (var i = 0; i < 5; i++) {
        effect = new txtElement("ouch",txtSetList('!'),player.x+Math.random()*6-3,player.y-1-Math.random()*2,2);
        effect.onDisplay = function(element,target){
          if (!element.health) {
            remove_txtElement(element);
          } else {
            element.health--;
          }
        }
        effect.health = Math.floor(Math.random()*50);
      }
      player_y_vel = 0;
      player_x_vel = 0;
      player_jump = 0;
      player.x = last_safe_pos[0];
      player.y = last_safe_pos[1];
    }
  }
);
screen.onPrint.push(function(screen){
  //let effect = new txtElement("empty",txtSetList('o'),Math.random()*screen.width,Math.random()*screen.width,0,
  //  function(element,target){
  //    if (!element.health) {
  //      remove_txtElement(element);
  //    } else {
  //      element.health--;
  //    }
  //  }
  //);
  //effect.health = Math.floor(Math.random()*100);
  let effect = new txtElement("player_move",txtSetList('⋅'),player.x,player.y,1);
  effect.onDisplay = function(element,target){
    if (!element.health) {
      remove_txtElement(element);
    } else {
      element.health--;
    }
  }
  effect.health = 8;
  //effect = new txtElement("player_move",txtSetList('+'),player.x,player.y,2,
  //  function(element,target){
  //    if (!element.health) {
  //      remove_txtElement(element);
  //    } else {
  //      element.health--;
  //    }
  //  }
  //);
  //effect.health = 2;
  if (keys["ArrowRight"]) player_x_vel += player_x_speed;
  if (keys["ArrowLeft"]) player_x_vel -= player_x_speed;
  if (player_jump > 0.01) {
    player_y_vel -= player_jump;
    player_jump *= friction_y;
  } else {
    player_y_vel += gravity_y;
  }
  player_x_vel += gravity_x;
  player_x_vel *= friction_x;
  player_y_vel *= friction_y;
  player_x_vel = player_x_vel < 0.01 && player_x_vel > -0.01 ? 0 :player_x_vel;
  player_y_vel = player_y_vel < 0.01 && player_y_vel > -0.01 ? 0 :player_y_vel;
  screen.collide(player,player.x+player_x_vel,player.y,
    function(element,target){
      if (target.name != "wall") {
        player.x += player_x_vel;
      } else {
        player_x_vel = 0;
      }
    }
  );
  screen.collide(player,player.x,player.y+player_y_vel,
    function(element,target){
      if (target.name != "wall") {
        if (keys['ArrowDown'] || player_y_vel < 0 || target.name != "plateforme") {
          player.y += player_y_vel;
        } else {
          if (keys['ArrowUp'] && player_y_vel > 0) player_jump = 0.5;
          player_y_vel = 0;
        }
      } else {
        if (keys['ArrowUp'] && player_y_vel > 0) player_jump = 0.5;
        player_y_vel = 0;
      }
    }
  );
  player.setList[0][0] = (
    player_y_vel < -0.1 ? (
      player_x_vel < -0.1 ? '⇖' :
      player_x_vel >  0.1 ? '⇗' :
      '⇑'
    ) :
    player_y_vel > 0.1 ? (
      player_x_vel < -0.1 ? '⇙' :
      player_x_vel >  0.1 ? '⇘' :
      '⇓'
    ) : 
    player_x_vel < -0.1 ? '⇐' :
    player_x_vel >  0.1 ? '⇒' :
    '⇔'
  );
  player_interact.x = player.x;
  player_interact.y = player.y-2;
});
*/
