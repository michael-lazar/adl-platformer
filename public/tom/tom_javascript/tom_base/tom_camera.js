console.log("tom_camera.js");

Pt = function(x,y,z){
  this.x = x;
  this.y = y;
  this.z = z;
}
Cam = function(x,y,z) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.center_x = 0;
  this.center_y = 0;
  this.dist = 100;
  this.mod_x = 1;
  this.mod_y = 1;
  this.mod_z = 1;
}
Cam.prototype.project = function(pt) {
	var dist_factor = this.dist / (pt.z * this.mod_z + this.z);
  return [
	  dist_factor * (pt.x * this.mod_x + this.x * this.mod_x) + this.center_x,
	  dist_factor * (pt.y * this.mod_y + this.y * this.mod_y) + this.center_y
  ];
} 
