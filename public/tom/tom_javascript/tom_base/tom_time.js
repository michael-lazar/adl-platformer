console.log("time.js");
// TIME

let time_speed = 1;
var game_time = new Date('July 1, 1996, 08:00:00');
let chronometer = Date.now();

function eval_time_elapsed(){
  let time_elapsed = Date.now() - chronometer;
  chronometer += time_elapsed;
  game_time = new Date(game_time.getTime() + time_elapsed * time_speed);
  return time_elapsed * time_speed;
}
