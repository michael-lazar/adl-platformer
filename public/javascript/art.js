// art

let art = {};
let art_width = {};
let art_height = {};

// LEVEL ART

let numbers = "0123456789";

let doors = [];

function lvlSetList(txt) {
  let wallSetList = [];
  let decorSetList = [];
  let plateformSetList = [];
  let lines = txt.split('\n');
  for (var y = 0; y < lines.length; y++) {
    for (var x = 0; x < lines[y].length; x++) {
      let char = lines[y][x];
      if (char == 'D' && numbers.includes(lines[y][x+1]) && numbers.includes(lines[y][x+2]) && (lines[y][x+3] == 'U' || lines[y][x+3] == 'L')) {
        let locked = lines[y][x+3] == 'L' ? true : false;
        let door = new txtElement('door',
          txtSetList(
            '   \n'+
            '┌-┐\n'+
            '|'+(locked ? '╳' : ' ')+'|\n'
          ),
        new Pt(x*camera.mod_y,y-2,50));
        door.locked = locked;
        screen.onPrint.push(function(screen){
            door.setList[1][0] = door.met.includes(player) ? (door.locked && !player_keys ? '¥' : '↓') : ' ';
        });
        door.number = Number(lines[y][x+1]) * 10 + Number(lines[y][x+2]);
        door.project = true;
        doors.push(door);
        char = ' ';
      } else if(char == '§') {
        let peep = new txtElement('peep',[[' ',0,0],[' ',0,1]],
        new Pt(x*camera.mod_y,y-1,50));
        peep.onDisplay = function(element,frame){
          let f = Math.floor(frame/12+element.pt.x+element.pt.y);
          if (!((f)%2)) {
            peep.setList[0][0] = (
              ' '
            );
            peep.setList[1][0] = (
              '⇔'
            );
          } else {
            peep.setList[0][0] = (
              '⇑'
            );
            peep.setList[1][0] = (
              ' '
            );
          }
        }
        peep.project = true;
      } else if(
        char == '▲' 
       || char == '►'
       || char == '▼'
       || char == '◄'
      ) {
        let trap = new txtElement('trap',[[char,0,0]],
        new Pt(x*camera.mod_y,y,50));
        trap.project = true;
      } else if(char == '%') {
        let enter = new txtElement('enter',[],
        new Pt(x*camera.mod_y,y,50));
        enter.onDisplay = function(element,frame){
          if (keys["Enter"]) {
            play_music();
            player.pt.x = last_safe_pos[0];
            player.pt.y = last_safe_pos[1];
            s1[0] = C[3];
            s1[1] = 0.05;
            s1[2] = 0;
            s1[3] = 0;
            s1[4] = 3;
            s1[5] = 3;
            s1[6] = 0;
            s1[7] = 0;
            p1(0,0);
            s1[0] = E[4];
            p1(0,0);
            s1[0] = G[3];
            p1(0,0);
            s1[0] = B[4];
            p1(0,0);
            camera.x = Math.floor((player.pt.x+level_size/2)/level_size)*level_size*-1;
            camera.y = Math.floor((player.pt.y+level_size/2)/level_size)*level_size*-1;
            let player_pos = camera.project(player.pt);
            pos = [player_pos];
            memory = [];
            limit_index = 0;
            limit = 64;
            remove_txtElement(element);
          }
          if (!b(20)){
            element.setList = txtSetList("PRESS ENTER TO START");
          } else {
            element.setList = [];
          }
        }
        enter.project = true;
      } else if(char == '$') {
        let coin = new txtElement('coin',[[' ',0,0],[' ',1,0],[' ',2,0]],
        new Pt(x*camera.mod_y-0.5,y,50));
        coin.onDisplay = function(element,frame){
          let f = Math.floor(frame/12+element.pt.x+element.pt.y);
          coin.setList[1][0] = (
            !(f%4) ? '☺' :
            !((f+2)%4) ? '○' :
            'l'
          );
        }
        coin.project = true;
      } else if(char == '♪') {
        let key = new txtElement('key',[[' ',0,0],['♪',1,0],[' ',2,0]],
        new Pt(x*camera.mod_y,y,50));
        key.onDisplay = function(element,frame){
          let f = Math.floor(frame/12+element.pt.x+element.pt.y);
          element.setList[1][0] = (
            !(f%2) ? '¥' : 'l'
          );
        }
        key.project = true;
      } else if(char == '@') {
        //player.pt.x = x*camera.mod_y;
        //player.pt.y = y;
        last_safe_pos = [x*camera.mod_y,y];
      }
      if (
          (char == 'L' || char == 'U') && lines[y][x-3] == 'D'    
       || numbers.includes(char) && lines[y][x-2] == 'D'    
       || numbers.includes(char) && lines[y][x-1] == 'D'
       || char == '@'
       || char == ' '
       || char == '♪'
       || char == '$'
       || char == '§'
       || char == '%'
       || char == '▲'
       || char == '►'
       || char == '▼'
       || char == '◄'
      ) continue;
      if (char == '#') {
        wallSetList.push(['█',x,y]);
      } else if (
        char == '◙'
        || char == '◘'
      ) {
        wallSetList.push([char,x,y]);
      } else if (char == '¯') {
        plateformSetList.push([char,x,y]);
      } else {
        decorSetList.push([char,x,y]);
      }
    }
  }
  return [wallSetList,decorSetList,plateformSetList];
}

// init art

function art_init() {
	let art_sources = document.getElementsByClassName("art_source");
	for (var i = 0; i < art_sources.length; i++){
	  if (!art_sources[i].id.length) continue
    if (art_sources[i].id == "level") {
	    let art_content = art_sources[i].textContent;
      lists = lvlSetList(art_content); 
      art[art_sources[i].id+'_wall'] = lists[0];
      art[art_sources[i].id+'_decor'] = lists[1];
      art[art_sources[i].id+'_plateform'] = lists[2];
    }
    //let art_lines = art_content.split('\n');
	  //let width = art_lines[0].length-1;
	  //let height = art_lines.length-1;
	  //art[art_sources[i].id] = art_content;
	  //art_width[art_sources[i].id] = width;
	  //art_height[art_sources[i].id] = height;
	}
}

art_init();
