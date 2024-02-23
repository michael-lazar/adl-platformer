
// LEVEL 0

// wall, pike, trampoline, plateform
//new txtElement("wall",txtSetList(txtFill(20,15,'█')),0,10,998);
//new txtElement("wall",txtSetList(txtFill(20,10,'█')),20,13,998);
//new txtElement("pike",txtSetList(txtFill(10,1,'▲')),20,12,998);
//new txtElement("trampoline",txtSetList(txtFill(3,1,'┬')),25,9,998);
//new txtElement("wall",txtSetList(txtFill(10,1,'█')),7,5,998);
//new txtElement("plateform",txtSetList(txtFill(2,5,'≣')),5,5,998);
//new txtElement("plateform",txtSetList(txtFill(20,1,'¯')),20,10,998);

function init_level(width,player_x,player_y){
  checkpoints = [];
  player_x_vel = 0;
  player_y_vel = 0;
  player_jump = 0;
  player.x = Infinity;
  player.y = Infinity;
  for (var i = 0; i < txtElements.length; i++) {
    remove_txtElement(txtElements[i]);
  }
  txtElements.push(player);
  txtElements.push(fps_element);
  color = [0,0,0];
  background = [0,0,0];
  level_width = width;
  level_height = Math.floor(level_width/16*9/2);
  last_safe_pos = [player_x,player_y];
}

let checkpoints = [];
function checkpoint(x,y){
  let element = new txtElement("checkpoint",txtSetList('.\n║'),x,y,998,
    function(element,target) {
      if (target.name == "player" && element.setList[0][0] == '.') {
        for (var i = 0; i < checkpoints.length; i++){
          if (checkpoints[i].setList[0][0] = '*' && checkpoints[i] != element) {
            for (var j = 0; j < 5; j++) {
              fx = new txtElement("check",txtSetList('+'),checkpoints[i].x+Math.random()*4-2,checkpoints[i].y-Math.random()*2,2);
              fx.onDisplay = function(element,target){
                if (!element.health) {
                  remove_txtElement(element);
                } else {
                  element.health--;
                }
              }
              fx.health = Math.floor(Math.random()*50);
            }
          }
          checkpoints[i].setList[0][0] = '.';
        }
        let effect = new txtElement("check",txtSetList('CHECK'),player.x+Math.random()*5-5,player.y-1-Math.random()*2,3);
        effect.onDisplay = function(element){
          if (!element.health) {
            remove_txtElement(element);
          } else {
            element.health--;
          }
        }
        effect.health = 50;
        checkpoints.push(element);
        element.setList[0][0] = '*';
        last_safe_pos = [element.x,element.y+1];
      }
    }
  );
}

// @LVL0

function level_0(player_x,player_y){
  console.log("level 0");
  init_level(40,player_x,player_y); 
  window.setTimeout(function(){
    player.x = player_x;
    player.y = player_y;
    color = [0,0,0];
    background = [8,8,8];

    new txtElement("wall",txtSetList(txtFill(level_width,level_height,'█')),0,level_height-1,998);
    let info = "  Move      Jump    Interact\n\n←-    -→     ↑         ↓";
    new txtElement("info",txtSetList(
      info
    ),6,2,998);
    new txtElement("exit",txtSetList(
      "┌-┐\n"+
      "| |\n"
    ),35,level_height-3,998,
      function(element,target){
        if (target.name == "player"){
          player_interact.visible = true;
          if (keys["ArrowDown"]) {
            level_1(2,12);
          }
        }
      }
    );
    
    txtElements.push(player_interact);
  },500);
}

// @LVL1

function level_1(player_x,player_y){
  console.log("level 1");
  init_level(50,player_x,player_y);
  window.setTimeout(function(){
    color = [0,0,0];
    background = [8,8,8];
    player.x = player_x;
    player.y = player_y;
  
    new txtElement("wall",txtSetList(txtFill(level_width,level_height,'█')),0,level_height-1,998);
    new txtElement("entrance",txtSetList(
      "┌-┐\n"+
      "| |\n"
    ),1,level_height-3,998,
      function(element,target){
        if (target.name == "player"){
          player_interact.visible = true;
          if (keys["ArrowDown"]) {
            level_0(36,9);
          }
        }
      }
    );
    new txtElement("wall",txtSetList(
      txtFill(8,2,'█')
    ),level_width/2-4,level_height-3,998);
    new txtElement("exit",txtSetList(
      "┌-┐\n"+
      "| |\n"
    ),level_width-4,level_height-3,998,
      function(element,target){
        if (target.name == "player"){
          player_interact.visible = true;
          if (keys["ArrowDown"]) {
            level_2(2,12);
          }
        }
      }
    );

    txtElements.push(player_interact);
  },500);
}

// @LVL2

function level_2(player_x,player_y){
  console.log("level 2");
  init_level(50,player_x,player_y);
  
  window.setTimeout(function(){
    color = [0,0,0];
    background = [8,8,8];
    player.x = player_x;
    player.y = player_y;

    new txtElement("wall",txtSetList(txtFill(level_width,level_height,'█')),0,level_height-1,998);
    new txtElement("entrance",txtSetList(
      "┌-┐\n"+
      "| |\n"
    ),1,level_height-3,998,
      function(element,target){
        if (target.name == "player"){
          player_interact.visible = true;
          if (keys["ArrowDown"]) {
            level_1(47,12);
          }
        }
      }
    );
    new txtElement("wall",txtSetList(
      txtFill(8,8,'█')
    ),level_width/2+2,level_height-7,998);
    new txtElement("trampoline",txtSetList(txtFill(4,1,'┬')),level_width/2-6,level_height-2,998);
    new txtElement("exit",txtSetList(
      "┌-┐\n"+
      "| |\n"
    ),level_width-4,level_height-3,998,
      function(element,target){
        if (target.name == "player"){
          player_interact.visible = true;
          if (keys["ArrowDown"]) {
            level_3(2,9);
          }
        }
      }
    );
    
    txtElements.push(player_interact);
  },500);
}

// @LVL3

function level_3(player_x,player_y){
  console.log("level 3");
  init_level(50,player_x,player_y);
  
  
  window.setTimeout(function(){
    color = [0,0,0];
    background = [8,8,8];
    player.x = player_x;
    player.y = player_y;
  
    new txtElement("wall",txtSetList(txtFill(level_width,level_height,'█')),0,level_height-1,998);
    new txtElement("wall",txtSetList(txtFill(20,level_height,'█')),0,level_height-4,998);
    new txtElement("wall",txtSetList(txtFill(21,level_height,'█')),29,level_height-4,998);
    new txtElement("pike",txtSetList(txtFill(9,1,'▲')),20,level_height-2,998);
    //new txtElement("wall",txtSetList(txtFill(12,1,'█')),Math.floor(level_width/4)*1.6,level_height-4,998);
    
    new txtElement("entrance",txtSetList(
      "┌-┐\n"+
      "| |\n"
    ),1,level_height-6,998,
      function(element,target){
        if (target.name == "player"){
          player_interact.visible = true;
          if (keys["ArrowDown"]) {
            level_2(47,12);
          }
        }
      }
    );
    new txtElement("exit",txtSetList(
      "┌-┐\n"+
      "| |\n"
    ),level_width-4,level_height-6,998,
      function(element,target){
        if (target.name == "player"){
          player_interact.visible = true;
          if (keys["ArrowDown"]) {
            level_4(2,14);
          }
        }
      }
    );
    
    txtElements.push(player_interact);
  },500);
}

// @LVL4

function level_4(player_x,player_y){
  console.log("level 4");
  init_level(70,player_x,player_y);
  
  
  window.setTimeout(function(){
    color = [0,0,0];
    background = [8,8,8];
    player.x = player_x;
    player.y = player_y;
  
    new txtElement("wall",txtSetList(txtFill(level_width,level_height,'█')),0,level_height-1,998);
    new txtElement("wall",txtSetList(txtFill(11,level_height,'█')),0,level_height-4,998);
    new txtElement("pike",txtSetList(txtFill(9,1,'▲')),11,level_height-2,998);
    new txtElement("wall",txtSetList(txtFill(11,level_height,'█')),20,level_height-4,998);
    new txtElement("plateforme",txtSetList(txtFill(9,1,'¯')),21,level_height-6,998);
    new txtElement("deco",txtSetList(txtFill(1,2,'▏')),30,level_height-6,998);
    new txtElement("deco",txtSetList(txtFill(1,2,'▕')),20,level_height-6,998);
    checkpoint(25,level_height-8);

    new txtElement("pike",txtSetList(txtFill(9,1,'▲')),31,level_height-2,998);
    new txtElement("wall",txtSetList(txtFill(11,level_height,'█')),40,level_height-4,998);
    new txtElement("plateforme",txtSetList(txtFill(9,1,'¯')),41,level_height-6,998);
    new txtElement("deco",txtSetList(txtFill(1,2,'▏')),50,level_height-6,998);
    new txtElement("deco",txtSetList(txtFill(1,2,'▕')),40,level_height-6,998);
    checkpoint(45,level_height-8);

    new txtElement("pike",txtSetList(txtFill(9,1,'▲')),51,level_height-2,998);
    new txtElement("wall",txtSetList(txtFill(10,level_height,'█')),60,level_height-4,998);
    
    
    new txtElement("entrance",txtSetList(
      "┌-┐\n"+
      "| |\n"
    ),1,level_height-6,998,
      function(element,target){
        if (target.name == "player"){
          player_interact.visible = true;
          if (keys["ArrowDown"]) {
            level_3(47,9);
          }
        }
      }
    );
    new txtElement("exit",txtSetList(
      "┌-┐\n"+
      "| |\n"
    ),level_width-4,level_height-6,998,
      function(element,target){
        if (target.name == "player"){
          player_interact.visible = true;
          if (keys["ArrowDown"]) {
            level_5(2,20);
          }
        }
      }
    );
    
    txtElements.push(player_interact);
  },500);
}

// @LVL5

function level_5(player_x,player_y){
  console.log("level 5");
  init_level(80,player_x,player_y);
  
  
  window.setTimeout(function(){
    color = [0,0,0];
    background = [8,8,8];
    player.x = player_x;
    player.y = player_y;
  
    new txtElement("wall",txtSetList(txtFill(20,level_height,'█')),0,level_height-1,998);
    new txtElement("pike",txtSetList(txtFill(level_width,1,'▲')),20,level_height,998);
    new txtElement("wall",txtSetList(txtFill(level_width,level_height,'█')),20,level_height+1,998);
    new txtElement("entrance",txtSetList(
      "┌-┐\n"+
      "| |\n"
    ),1,level_height-3,998,
      function(element,target){
        if (target.name == "player"){
          player_interact.visible = true;
          if (keys["ArrowDown"]) {
            level_4(67,14);
          }
        }
      }
    );
    
    for (var i = 0; i < 8; i ++) {
      let coin = new txtElement("coin",txtSetList('o'),11+i,level_height-2-i*2,998);
      coin.onDisplay = function(element,frame) {
        let f = Math.floor(frame/6)+element.x+element.y;
        element.setList[0][0] = (
          !((f)%2) ? '*' :
          '☼'
        )
      }
      coin = new txtElement("coin",txtSetList('o'),18-i,level_height-2-i*2,998);
      coin.onDisplay = function(element,frame) {
        let f = Math.floor(frame/6)+element.x+element.y;
        element.setList[0][0] = (
          !(f%8) ? '.' :
          !((f+1)%8) ? 'o' :
          !((f+2)%8) ? 'O' :
          !((f+3)%8) ? '°' :
          !((f+4)%8) ? '\'' :
          !((f+5)%8) ? '°' :
          !((f+6)%8) ? 'O' :
          'o'
        )
      }
      new txtElement("plateforme",txtSetList(txtFill(10,1,'¯')),10,level_height-3-i*2,998);
      new txtElement("deco",txtSetList(txtFill(1,2,'▕')),9,level_height-3-i*2,998);
      new txtElement("deco",txtSetList(txtFill(1,2,'▏')),20,level_height-3-i*2,998);
    }
    let y = 6;
    let x = 3;
    new txtElement("plateforme",txtSetList(txtFill(10,1,'¯')),10*x,level_height-3-y*2,998);
    new txtElement("plateforme",txtSetList(txtFill(10,1,'¯')),10*x,level_height-3-(y-1)*2,998);
    new txtElement("deco",txtSetList(txtFill(1,2,'▕')),10*x-1,level_height-3-y*2,998);
    new txtElement("deco",txtSetList(txtFill(1,2,'▏')),10*x+10,level_height-3-y*2,998);
    
    y = 0;
    x = 3;
    new txtElement("plateforme",txtSetList(txtFill(5,1,'¯')),10*x-5,level_height-3-y*2,998);
    new txtElement("plateforme",txtSetList(txtFill(5,1,'¯')),10*x-5,level_height-3-(y-1)*2,998);
    new txtElement("deco",txtSetList(txtFill(1,2,'▕')),10*x-1-5,level_height-3-y*2,998);
    new txtElement("deco",txtSetList(txtFill(1,2,'▏')),10*x+5-5,level_height-3-y*2,998);
    
    txtElements.push(player_interact);
  },500);
}
