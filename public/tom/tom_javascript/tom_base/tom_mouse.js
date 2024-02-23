console.log("mouse.js");

let client_x = 0;
let client_y = 0;
let mouse_x = 0;
let mouse_y = 0;
let float_mouse_x = 0;
let float_mouse_y = 0;
let allow_mouse_x = true;
let allow_mouse_y = true;
let mouse_down = false;
let true_mouse_down = false;
let mouse_element = undefined;

document.addEventListener("mousemove",function(e){
  if (allow_mouse_x) {
    client_x = e.clientX;
  }
  if (allow_mouse_y) {
    client_y = e.clientY;
  }
});
document.addEventListener("mousedown",function(e){
  mouse_down = true;
  true_mouse_down = true;
});
document.addEventListener("mouseup",function(e){
  mouse_down = false;
  true_mouse_down = false;
  allow_mouse_y = true;
});

function mouse_init(){
  mouse_element = new txtElement("mouse",txtSetList('█'),new Pt(0,0,0),
    function(element,match){
      if (true_mouse_down) {
          if (match.meetable) {
            mouse_element.setList = txtSetList('■');
          } else {
            mouse_element.setList = txtSetList('•');
            if (match.name != "select wrapper element") {
              txtUiCloseAll();
            }
          }
      } else if (match.meetable) {
        mouse_element.setList = txtSetList('□');
      } else {
        mouse_element.setList = txtSetList('+');
      }
    }
  );
  remove_txtElement(mouse_element);
  
  screen.onUpdate.push(function(screen) {
    mouse_x = Math.floor(client_x/character_width);
    mouse_y = Math.floor(client_y/character_height);
    float_mouse_x = client_x/character_width;
    float_mouse_y = client_y/character_height;
    mouse_element.pt.x = mouse_x;
    mouse_element.pt.y = mouse_y;
  });
}

let keys = {};
let key_down = false;

document.addEventListener("keydown",function(e){
  keys[e.key] = true;
  key_down = true;
});
document.addEventListener("keyup",function(e){
  keys[e.key] = false;
  key_down = false;
});
