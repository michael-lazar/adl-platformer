console.log("synth.js");
// Audio Context
var ctx;

function play(note,gain,in_dur,mid_dur,out_dur,res,noise,flat,dist) {
  if(!ctx) ctx = new(window.AudioContext || window.webkitAudioContext)();
  if(!gain  || !note || (!in_dur && !mid_dur && !out_dur)) return;
  if(!res   || res   < 0) res = 10000;
  if(!noise || noise < 0) noise = 0;
  if(!flat  || flat  < 0) flat = 1;
  if(!dist  || dist  < 0) dist = 1;
  //console.log(note,gain,in_dur,mid_dur,out_dur,res,noise,flat,dist);
  
  // Gain
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(in_dur ? 0.00001 : gain, ctx.currentTime);
  if (in_dur) gainNode.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + in_dur);
  if (mid_dur) gainNode.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + in_dur + mid_dur);
  if (out_dur) gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + in_dur + mid_dur + out_dur);

  // Oscillator
  const oscNode = noise_oscillator(ctx,note,in_dur+mid_dur+out_dur,res,noise,flat,dist);

  // Play
  oscNode.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscNode.start(ctx.currentTime);
  oscNode.stop(ctx.currentTime+in_dur+mid_dur+out_dur);
}

let buffers = {};

function noise_oscillator(ctx, note, dur, res, noise, flat, dist){
  let pattern = [];
  let i = 0;
  let buffer_key = 
    String(Math.floor(note *1   ))+'.'+
    String(Math.floor(dur  *100 ))+'.'+
    String(Math.floor(res  *1   ))+'.'+
    String(Math.floor(noise*100 ))+'.'+
    String(Math.floor(flat *1   ))+'.'+
    String(Math.floor(dist *10  ));
  var buffer;
  if (buffers[buffer_key]) {
    buffer = buffers[buffer_key];
  } else {
    while (i < ctx.sampleRate/note) {
      let rdm_val = Math.random() - Math.random();
      let val = (Math.sin(2*Math.PI*note * (i/ctx.sampleRate)) + rdm_val * noise) * dist;
      val = Math.floor(val * res)/res;
      for (var r = 0; r < flat; r++) {
        pattern.push(val > 1 ? 1 : val < -1 ? -1 : val);
        i++;
      }
    }
    buffer = ctx.createBuffer(1, ctx.sampleRate*dur, ctx.sampleRate)
    for (let ch=0; ch<buffer.numberOfChannels; ch++) {
      let samples = buffer.getChannelData(ch);
      for (let s=0; s<buffer.length; s++) {
        samples[s] = pattern[s > pattern.length-1 ? s - Math.floor(s/pattern.length) * pattern.length : s ];
      }
    }
    buffers[buffer_key] = buffer;
  }
  return new AudioBufferSourceNode(ctx, {buffer:buffer})
}

let C =[16.35, 32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093.0, 4186.01];
let Db=[17.32, 34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92];
let D =[18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64];
let Eb=[19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03];
let E =[20.6, 41.2, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02];
let F =[21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83];
let Gb=[23.12, 46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96];
let G =[24.5, 49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96];
let Ab=[25.96, 51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44];
let A =[27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0];
let Bb=[29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31];
let B =[30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07];

// Synth
Synth = function(
  init_speed,
  init_note_list,
  init_gain,
  init_in,
  init_mid,
  init_out,
  init_res,
  init_noise,
  init_flat,
  init_dist
){
  this.play_speed = init_speed;

  this.note_list = init_note_list;
  this.note_index = 0;
  this.note_step = 1;
  
  this.mul_list = [1];
  this.mul_index = 0;
  this.mul_step = 1;

  this.gain = init_gain;
  this.gain_dir = 0;
  this.max_gain = init_gain;
  this.min_gain = init_gain;
  this.gain_step = 0;

  this.in = init_in;
  this.in_dir = 0;
  this.max_in = init_in;
  this.min_in = init_in;
  this.in_step = 0;
  
  this.mid = init_mid;
  this.mid_dir = 0;
  this.max_mid = init_mid;
  this.min_mid = init_mid;
  this.mid_step = 0;
  
  this.out = init_out;
  this.out_dir = 0;
  this.max_out = init_out;
  this.min_out = init_out;
  this.out_step = 0;

  this.res = init_res;
  this.res_dir = 0;
  this.max_res = init_res;
  this.min_res = init_res;
  this.res_step = 0;

  this.noise = init_noise;
  this.noise_dir = 0;
  this.max_noise = init_noise;
  this.min_noise = init_noise;
  this.noise_step = 0;

  this.flat = init_flat;
  this.flat_dir = 0;
  this.max_flat = init_flat;
  this.min_flat = init_flat;
  this.flat_step = 0;

  this.dist = init_dist;
  this.dist_dir = 0;
  this.max_dist = init_dist;
  this.min_dist = init_dist;
  this.dist_step = 0;


  this.play_event = start_animation_event(this.play_speed,function(frame){
    play(
      this.note_list[Math.floor(this.note_index)] * this.mul_list[Math.floor(this.mul_index)],
      this.gain,
      this.in,
      this.mid,
      this.out,
      this.res,
      this.noise,
      this.flat,
      this.dist
    );
  }.bind(this));
  
  this.note_event = start_animation_event(this.play_speed,function(frame){
    this.note_index = 
      this.note_index + this.note_step < this.note_list.length ?
      this.note_index + this.note_step :
      this.note_index + this.note_step  - Math.floor((this.note_index + this.note_step) / this.note_list.length) * this.note_list.length;
  }.bind(this));

  this.mul_event = start_animation_event(this.play_speed,function(frame){
    this.mul_index = 
      this.mul_index + this.mul_step < this.mul_list.length ?
      this.mul_index + this.mul_step :
      this.mul_index + this.mul_step  - Math.floor((this.mul_index + this.mul_step) / this.mul_list.length) * this.mul_list.length;
  }.bind(this));

  this.gain_event = start_animation_event(this.play_speed,function(frame){
    if (this.gain_dir) {
      this.gain = this.gain - this.gain_step > this.min_gain ? this.gain - this.gain_step : this.min_gain;
      this.gain_dir = this.gain == this.min_gain ? !this.gain_dir:this.gain_dir;
    } else {
      this.gain = this.gain + this.gain_step < this.max_gain ? this.gain + this.gain_step : this.max_gain;
      this.gain_dir = this.gain == this.max_gain ? !this.gain_dir:this.gain_dir;
    }
  }.bind(this));
  
  this.in_event = start_animation_event(this.play_speed,function(frame){
    if (this.in_dir) {
      this.in = this.in - this.in_step > this.min_in ? this.in - this.in_step : this.min_in;
      this.in_dir = this.in == this.min_in ? !this.in_dir:this.in_dir;
    } else {
      this.in = this.in + this.in_step < this.max_in ? this.in + this.in_step : this.max_in;
      this.in_dir = this.in == this.max_in ? !this.in_dir:this.in_dir;
    }
  }.bind(this));
  
  this.mid_event = start_animation_event(this.play_speed,function(frame){
    if (this.mid_dir) {
      this.mid = this.mid - this.mid_step > this.min_mid ? this.mid - this.mid_step : this.min_mid;
      this.mid_dir = this.mid == this.min_mid ? !this.mid_dir:this.mid_dir;
    } else {
      this.mid = this.mid + this.mid_step < this.max_mid ? this.mid + this.mid_step : this.max_mid;
      this.mid_dir = this.mid == this.max_mid ? !this.mid_dir:this.mid_dir;
    }
  }.bind(this));
  
  this.out_event = start_animation_event(this.play_speed,function(frame){
    if (this.out_dir) {
      this.out = this.out - this.out_step > this.min_out ? this.out - this.out_step : this.min_out;
      this.out_dir = this.out == this.min_out ? !this.out_dir:this.out_dir;
    } else {
      this.out = this.out + this.out_step < this.max_out ? this.out + this.out_step : this.max_out;
      this.out_dir = this.out == this.max_out ? !this.out_dir:this.out_dir;
    }
  }.bind(this));
  
  this.res_event = start_animation_event(this.play_speed,function(frame){
    if (this.res_dir) {
      this.res = this.res - this.res_step > this.min_res ? this.res - this.res_step : this.min_res;
      this.res_dir = this.res == this.min_res ? !this.res_dir:this.res_dir;
    } else {
      this.res = this.res + this.res_step < this.max_res ? this.res + this.res_step : this.max_res;
      this.res_dir = this.res == this.max_res ? !this.res_dir:this.res_dir;
    }
  }.bind(this));
  
  this.noise_event = start_animation_event(this.play_speed,function(frame){
    if (this.noise_dir) {
      this.noise = this.noise - this.noise_step > this.min_noise ? this.noise - this.noise_step : this.min_noise;
      this.noise_dir = this.noise == this.min_noise ? !this.noise_dir:this.noise_dir;
    } else {
      this.noise = this.noise + this.noise_step < this.max_noise ? this.noise + this.noise_step : this.max_noise;
      this.noise_dir = this.noise == this.max_noise ? !this.noise_dir:this.noise_dir;
    }
  }.bind(this));
  
}

let synths = {};

// SYNTH
synth_interface = function(
  name,
  init_speed,
  init_note_list,
  init_gain,
  init_in,
  init_mid,
  init_out,
  init_res,
  init_noise,
  init_flat,
  init_dist
){
  if (typeof(name) != "string") return null;
  init_speed     = init_speed     == undefined ? 40    : init_speed;
  init_note_list = init_note_list == undefined ? [400] : init_note_list;
  init_gain      = init_gain      == undefined ? 0.1   : init_gain;
  init_in        = init_in        == undefined ? 0.01  : init_in;
  init_mid       = init_mid       == undefined ? 0.01  : init_mid;
  init_out       = init_out       == undefined ? 1     : init_out;
  init_res       = init_res       == undefined ? 0     : init_res;
  init_noise     = init_noise     == undefined ? 0     : init_noise;
  init_flat      = init_flat      == undefined ? 0     : init_flat;
  init_dist      = init_dist      == undefined ? 0     : init_dist;
  synths[name] = new Synth(
    init_speed,
    init_note_list,
    init_gain,
    init_in,
    init_mid,
    init_out,
    init_res,
    init_noise,
    init_flat,
    init_dist
  );
}

function synth_note(
  name,
  note_list
) {
  console.log(name,note_list);
  if (
    typeof(name) != "string" ||
    typeof(note_list) != "object"
  ) return null;
  synths[name].note_list = note_list;
  console.log(synths[name].note_list);
}

function synth_mul(
  name,
  mul_list
) {
  console.log(name,mul_list);
  if (
    typeof(name) != "string" ||
    typeof(mul_list) != "object"
  ) return null;
  synths[name].mul_list = mul_list;
  console.log(synths[name].mul_list);
}

function synth_speed(
  name,
  speed
) {
  if (
    typeof(name) != "string" ||
    typeof(speed) != "number"
  ) return null;
  change_animation_event_speed(synths[name].play_event,speed);
  change_animation_event_speed(synths[name].note_event,speed);
}

function synth_play_speed(
  name,
  speed
) {
  if (
    typeof(name) != "string" ||
    typeof(speed) != "number"
  ) return null;
  change_animation_event_speed(synths[name].play_event,speed);
}

function synth_note_speed(
  name,
  speed
) {
  if (
    typeof(name) != "string" ||
    typeof(speed) != "number"
  ) return null;
  change_animation_event_speed(synths[name].note_event,speed);
}

function synth_note_step (
  name,
  step
) {
  if (
    typeof(name) != "string" ||
    typeof(step) != "number"
  ) return null;
  synths[name].note_step = step;
}

function synth_mul_speed(
  name,
  speed
) {
  if (
    typeof(name) != "string" ||
    typeof(speed) != "number"
  ) return null;
  change_animation_event_speed(synths[name].mul_event,speed);
}

function synth_mul_step(
  name,
  step
) {
  if (
    typeof(name) != "string" ||
    typeof(step) != "number"
  ) return null;
  synths[name].mul_step = step;
}

function synth_min_gain(
  name,
  min_gain
) {
  if (
    typeof(name) != "string" ||
    typeof(min_gain) != "number"
  ) return null;
  synths[name].min_gain = min_gain;
}

function synth_max_gain(
  name,
  max_gain
) {
  if (
    typeof(name) != "string" ||
    typeof(max_gain) != "number"
  ) return null;
  synths[name].max_gain = max_gain;
}

function synth_gain_step(
  name,
  step
) {
  if (
    typeof(name) != "string" ||
    typeof(step) != "number"
  ) return null;
  synths[name].gain_step = step;
}

function synth_gain_speed(
  name,
  speed
) {
  if (
    typeof(name) != "string" ||
    typeof(speed) != "number"
  ) return null;
  change_animation_event_speed(synths[name].gain_event,speed);
}

function synth_min_in(
  name,
  min_in
) {
  if (
    typeof(name) != "string" ||
    typeof(min_in) != "number"
  ) return null;
  synths[name].min_in = min_in;
}

function synth_max_in(
  name,
  max_in
) {
  if (
    typeof(name) != "string" ||
    typeof(max_in) != "number"
  ) return null;
  synths[name].max_in = max_in;
}

function synth_in_step(
  name,
  step
) {
  if (
    typeof(name) != "string" ||
    typeof(step) != "number"
  ) return null;
  synths[name].in_step = step;
}

function synth_in_speed(
  name,
  speed
) {
  if (
    typeof(name) != "string" ||
    typeof(speed) != "number"
  ) return null;
  change_animation_event_speed(synths[name].in_event,speed);
}

function synth_min_mid(
  name,
  min_mid
) {
  if (
    typeof(name) != "string" ||
    typeof(min_mid) != "number"
  ) return null;
  synths[name].min_mid = min_mid;
}

function synth_max_mid(
  name,
  max_mid
) {
  if (
    typeof(name) != "string" ||
    typeof(max_mid) != "number"
  ) return null;
  synths[name].max_mid = max_mid;
}

function synth_mid_step(
  name,
  step
) {
  if (
    typeof(name) != "string" ||
    typeof(step) != "number"
  ) return null;
  synths[name].mid_step = step;
}

function synth_mid_speed(
  name,
  speed
) {
  if (
    typeof(name) != "string" ||
    typeof(speed) != "number"
  ) return null;
  change_animation_event_speed(synths[name].mid_event,speed);
}

function synth_min_out(
  name,
  min_out
) {
  if (
    typeof(name) != "string" ||
    typeof(min_out) != "number"
  ) return null;
  synths[name].min_out = min_out;
}

function synth_max_out(
  name,
  max_out
) {
  if (
    typeof(name) != "string" ||
    typeof(max_out) != "number"
  ) return null;
  synths[name].max_out = max_out;
}

function synth_out_step(
  name,
  step
) {
  if (
    typeof(name) != "string" ||
    typeof(step) != "number"
  ) return null;
  synths[name].out_step = step;
}

function synth_out_speed(
  name,
  speed
) {
  if (
    typeof(name) != "string" ||
    typeof(speed) != "number"
  ) return null;
  change_animation_event_speed(synths[name].out_event,speed);
}

function synth_min_res(
  name,
  min_res
) {
  if (
    typeof(name) != "string" ||
    typeof(min_res) != "number"
  ) return null;
  synths[name].min_res = min_res;
}

function synth_max_res(
  name,
  max_res
) {
  if (
    typeof(name) != "string" ||
    typeof(max_res) != "number"
  ) return null;
  synths[name].max_res = max_res;
}

function synth_res_step(
  name,
  step
) {
  if (
    typeof(name) != "string" ||
    typeof(step) != "number"
  ) return null;
  synths[name].res_step = step;
}

function synth_res_speed(
  name,
  speed
) {
  if (
    typeof(name) != "string" ||
    typeof(speed) != "number"
  ) return null;
  change_animation_event_speed(synths[name].res_event,speed);
}

function synth_min_noise(
  name,
  min_noise
) {
  if (
    typeof(name) != "string" ||
    typeof(min_noise) != "number"
  ) return null;
  synths[name].min_noise = min_noise;
}

function synth_max_noise(
  name,
  max_noise
) {
  if (
    typeof(name) != "string" ||
    typeof(max_noise) != "number"
  ) return null;
  synths[name].max_noise = max_noise;
}

function synth_noise_step(
  name,
  step
) {
  if (
    typeof(name) != "string" ||
    typeof(step) != "number"
  ) return null;
  synths[name].noise_step = step;
}

function synth_noise_speed(
  name,
  speed
) {
  if (
    typeof(name) != "string" ||
    typeof(speed) != "number"
  ) return null;
  change_animation_event_speed(synths[name].noise_event,speed);
}








// 
// vars
//
// play_speed
// note_list
// note_index
// note_speed
// gain
// max_gain
// min_gain
// gain_speed
// in_dur
// max_in_dur
// min_in_dur
// in_dur_speed
// mid_dur
// max_mid_dur
// min_mid_dur
// mid_dur_speed
// out_dur
// max_out_dur
// min_out_dur
// out_dur_speed
// res
// max_res
// min_res
// res_speed
// noise
// max_noise
// min_noise
// res_speed
// flat
// max_flat
// min_flat
// flat_speed
// dist
// max_dist
// min_dist
// dist_speed
//
// anims
//
// fun note_loop
// gain_loop
// in_dur_loop
// mid_dur_loop
// out_dur_loop
// res_loop
// noise_loop
// flat_loop
// dist_loop
