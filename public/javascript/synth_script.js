// Time
let t = 0;

// Every
function e(a,b){
  return !((t+b)%a);
}

// Blink
function b(a){
  return f(t/a)%2;
}

// Index
function x(a,b) {
  return f((t/b)%a.length);
}

// Synth
const s = [C[3],0.1,0.01,0,1,100,0,0,0];
const s1 = [C[3],0.1,0.01,0,1,100,0,0,0];

// Play
function p(a,b){
  if (e(a,b))play(...s);
}
function p1(a,b){
  if (e(a,b))play(...s1);
}

// Change 
function c(a,b,s,i,c) {
  if (e(a,b))s[i] = c;
}

// Floor
function f(a){
  return Math.floor(a);
}

// Random
function r(a){
  return Math.random()*a;
}

// SCRIPT
script="";
working_script="";

// LOG
let log_memory = [];
function l(a){
  log_memory.push(String(a));
}



// INIT
// play music

start_animation_event(1,function(frame){
  t = frame;
});
function play_music(){
  start_animation_event(1,function(frame){
    log_memory = [];
    try {
      eval(script);
      working_script = script;
      error_log_element.textContent = "";
    } catch(e){
      eval(working_script);
      error_log_element.textContent = String(e);
    }
    let textContent = "";
    for (var i = 0; i < log_memory.length; i++) {
      textContent += log_memory[i]+'\n';
    }
    log_element.textContent = textContent;
  });
}

// DOM
let log_element = document.createElement("pre");
document.body.appendChild(log_element);
let error_log_element = document.createElement("pre");
error_log_element.style.color = "#f00";
document.body.appendChild(error_log_element);

let started = false;
document.addEventListener("keydown",function(e){
  if (started) return;
  started = true;
  start_animation_event(1,function(frame){
      fetch("music_script.js").then(function(response){
        response.text().then(function(text){
          script = text;
        });
      });
  })
});

/*
  let tempo = 12;
  let gamme = 0;

  start_animation_event(tempo*48,function(){
    if (gamme) {
      synth_note("lead",[D[3],E[3],A[3]]);
      synth_note("lead1",[D[4],E[4],G[4]]);
    } else {
      synth_note("lead",[C[3],E[3],G[3]]);
      synth_note("lead1",[D[4],E[4],A[4]]);
    }
    gamme = !gamme;
  });

  new synth_interface("lead");
  synth_note("lead",[D[3],E[3],A[3]]);
  synth_speed("lead",tempo);
  synth_note_speed("lead",tempo/2);
  synth_mul("lead",[1,2,3]);
  synth_min_gain("lead",0.05);
  synth_gain_step("lead",0.01);
  synth_max_gain("lead",0.1);
  synth_min_res("lead",4);
  synth_res_step("lead",1);
  synth_res_speed("lead",tempo);
  synth_max_res("lead",8);

  new synth_interface("lead1");
  synth_note("lead1",[D[4],E[4],G[4]]);
  synth_speed("lead1",tempo);
  synth_note_speed("lead1",tempo/2);
  synth_mul("lead1",[1,2]);
  synth_min_gain("lead1",0.025);
  synth_gain_step("lead1",0.01);
  synth_max_gain("lead1",0.1);
  synth_min_res("lead1",8);
  synth_res_step("lead1",1);
  synth_res_speed("lead1",tempo);
  synth_max_res("lead1",16);

  new synth_interface("bass");
  synth_note("bass",[C[3],E[3],G[3],A[3]]);
  synth_speed("bass",tempo*3);
  synth_min_gain("bass",0.01);
  synth_gain_step("bass",0.01);
  synth_max_gain("bass",0.1);
  synth_min_mid("bass",0.2);
  synth_mid_step("bass",0.1);
  synth_max_mid("bass",0.3);
  synth_min_out("bass",0.9);
  synth_out_step("bass",0.1);
  synth_max_out("bass",1);
  synth_note_speed("bass",tempo*3*4);

  new synth_interface("bass1");
  synth_note("bass1",[C[2],E[2],G[2],A[2]]);
  synth_speed("bass1",tempo*3);
  synth_min_mid("bass1",0.1);
  synth_mid_step("bass1",0.1);
  synth_max_mid("bass1",1);
  synth_min_out("bass1",1);
  synth_out_step("bass1",0.1);
  synth_max_out("bass1",2);
  synth_note_speed("bass1",tempo*3*4);

  start_animation(60); 
});*/
