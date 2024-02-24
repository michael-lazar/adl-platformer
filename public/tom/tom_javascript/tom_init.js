console.log("init.js");

// SCREEN INIT

let screen_print = undefined;
let screen_background = undefined;
let character_width = 0;
let character_height = 0;
let screen_width = 0;
let screen_height = 0;
let screen = new TextScreen(
  screen_width,screen_height
);

// CAMERA INIT

let camera = new Cam(0,0,0);
camera.mod_y = 0.5;

// MOUSE INIT

mouse_init();

// UI INIT
// Fps
let fps_element = new txtElement("FPS",[],new Pt(0,0,1));
screen.onUpdate.push(function(screen){
  fps_element.setList = txtSetList(animation_fps);
});

// DOM INIT
document.addEventListener("DOMContentLoaded", function() {
  screen_print = document.createElement("pre");
  screen_print.id = "screenPrint"
  screen_background = document.body;
  screen_background.appendChild(screen_print);
  start_animation_event(1,function(frame){
    main_process(frame);
  })
  start_animation(fps);
}, false);
