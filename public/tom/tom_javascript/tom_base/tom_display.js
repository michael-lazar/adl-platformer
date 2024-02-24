console.log("tom_display.js");

let hex = '0123456789ABCDEF';
let dark_hex =  '01234567';
let light_hex = '89ABCDEF';

let cam_x = 0;
let cam_y = 0;

function print_color(color){
  return ( 
    '#'+(
      color[0] < hex.length-1 ? 
        color[0] > 0 ? hex[color[0]] : 0
        : hex[hex.length-1]
    ) + (
      color[1] < hex.length-1 ? 
        color[1] > 0 ? hex[color[1]] : 0
        : hex[hex.length-1]
    ) + (
      color[2] < hex.length-1 ? 
        color[2] > 0 ? hex[color[2]] : 0
        : hex[hex.length-1]
    )
  );
}

function display_process(
  screen,
  screen_print,
  screen_background,
  font_size,
  font_x_ratio,
  font_y_ratio,
  color,
  background
) {
  screen_print.style.fontSize = font_size+"px";
  screen_print.style.lineHeight = font_size+"px";
  screen_background.style.color = print_color(color);
  screen_background.style.backgroundColor = print_color(background);
  character_width = font_size*font_x_ratio;
  character_height = font_size*font_y_ratio;
  // screen_width = window.innerWidth/character_width;
  // screen_height = window.innerHeight/character_height;
  screen_width = 80;
  screen_height = 32;
  screen.update(screen_width,screen_height);
  camera.center_x = screen.width/2;
  camera.center_y = screen.height/2;
}
