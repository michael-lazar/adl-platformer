console.log("animation.js");

let animation = [];
let paused_animation = [];
let global_frame_index = 0;
var fpsInterval, total_elapsed = 0, total_frames = 0, frames_per_second = 0, animation_fps = "00", elapsed_per_second = 0;

// ANIMATION

// start_animation() and animate() are from https://stackoverflow.com/a/19772220
// initialize the timer variables and start the animation

function start_animation(fps) {
  fpsInterval = Math.floor(1000 / fps);
  then = Date.now();
  animate();
}

// the animation loop calculates time elapsed since the last loop
// and only draws if your specified fps interval is achieved

function animate() {

  // request another frame
  requestAnimationFrame(animate);

  let time_elapsed = eval_time_elapsed();
  total_elapsed += time_elapsed;
  elapsed_per_second += time_elapsed;
  // calc elapsed time since last loop
  //now = Date.now();
  //elapsed = now - then;
  //console.log(elapsed,fpsInterval);

  // if enough time has elapsed, draw the next frame
  if (total_elapsed/total_frames >= fpsInterval) {

    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    //then = now - (elapsed % fpsInterval);

    // Put your drawing code here
    draw_animation();
    total_frames++;
    frames_per_second++;
  }
 
  if (elapsed_per_second > 1000) {
    animation_fps = String(frames_per_second+' FPS');
    elapsed_per_second = 0;
    frames_per_second = 0;
  } 
  //// get animation fps
  //cumulated_time += time_elapsed;
  //cumulated_frames++;
  //if (cumulated_time > 1000) {
  //  cumulated_time = 0;
  //  cumulated_frames = 0;
  //}
}

function draw_animation() {
  let loop = animation.length;
  while(loop--) {
    if (!every(animation[loop][0])) continue;
    animation[loop][1](animation[loop][2]++);
  }
  global_frame_index = global_frame_index + (animation.length ? 1 : 0);
}

function pause_animation() {
  while(animation.length) paused_animation.push(animation.shift());
}

function resume_animation() {
  while(paused_animation.length) animation.push(paused_animation.shift());
}

function every(frame_divider) {
  return Number.isInteger(global_frame_index/frame_divider);
}

// ANIMATION EVENT

function start_animation_event(frame_divider,fn) {
  let animation_event = [
    frame_divider,
    fn,
    0, // local_frame_index
    frame_divider  // frame_divider_memory
  ];
  animation.push(animation_event);
  return animation_event;
}

// ## `start_animation_event()` init method
//
// `let animation_event = start_animation_event(frame_divider, function(local_frame_index){animation_event_code});`
//
// ### `frame_divider`
// 
// The animation_event speed adjustement, for a given value of 2 in a 60 fps context the animation_event will be at 30 fps
//
// ### `local_frame_index`
//
// Argument for catching the local frame index number (the speed adjustement obtained by `frame_divider`) given by the global animation draw (see draw function)
// 
// ### `animation_event_code` 
//
// Your animation event code

function pause_animation_event(animation_event) {
  animation_event[0] = 0;
}

function resume_animation_event(animation_event) {
  animation_event[0] = animation_event[3];
}

function switch_animation_event(animation_event) {
  animation_event[0] = !animation_event[0] ? animation_event[3] : 0;
}

function delete_animation_event(animation_event) {
  let index = animation.indexOf(animation_event);
  animation.splice(index,1);
}

function change_animation_event_speed(animation_event, frame_divider) {
  animation_event[0] = frame_divider;
  animation_event[3] = frame_divider;
}
