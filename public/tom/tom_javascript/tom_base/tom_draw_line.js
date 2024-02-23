console.log("tom_draw_line.js");

let sub_chars = ['⠀', '⠁', '⠂', '⠃', '⠄', '⠅', '⠆', '⠇', '⠈', '⠉', '⠊', '⠋', '⠌', '⠍', '⠎', '⠏', '⠐', '⠑', '⠒', '⠓', '⠔', '⠕', '⠖', '⠗', '⠘', '⠙', '⠚', '⠛', '⠜', '⠝', '⠞', '⠟', '⠠', '⠡', '⠢', '⠣', '⠤', '⠥', '⠦', '⠧', '⠨', '⠩', '⠪', '⠫', '⠬', '⠭', '⠮', '⠯', '⠰', '⠱', '⠲', '⠳', '⠴', '⠵', '⠶', '⠷', '⠸', '⠹', '⠺', '⠻', '⠼', '⠽', '⠾', '⠿', '⡀', '⡁' ];

function sub_char(from,to) {
	if (to[0] == 0   && to[1] == 0    && from[0] == 0.5  && from[1] == 0    || from[0] == 0   && from[1] == 0    && to[0] == 0.5  && to[1] == 0    ) return sub_chars[ 0];
	if (to[0] == 0   && to[1] == 0    && from[0] == 1    && from[1] == 0    || from[0] == 0   && from[1] == 0    && to[0] == 1    && to[1] == 0    ) return sub_chars[ 1];
	if (to[0] == 0   && to[1] == 0    && from[0] == 1    && from[1] == 0.25 || from[0] == 0   && from[1] == 0    && to[0] == 1    && to[1] == 0.25 ) return sub_chars[ 2];
	if (to[0] == 0   && to[1] == 0    && from[0] == 1    && from[1] == 0.5  || from[0] == 0   && from[1] == 0    && to[0] == 1    && to[1] == 0.5  ) return sub_chars[ 3];
	if (to[0] == 0   && to[1] == 0    && from[0] == 1    && from[1] == 0.75 || from[0] == 0   && from[1] == 0    && to[0] == 1    && to[1] == 0.75 ) return sub_chars[ 4];
	if (to[0] == 0   && to[1] == 0    && from[0] == 1    && from[1] == 1    || from[0] == 0   && from[1] == 0    && to[0] == 1    && to[1] == 1    ) return sub_chars[ 5];
	if (to[0] == 0   && to[1] == 0    && from[0] == 0.5  && from[1] == 1    || from[0] == 0   && from[1] == 0    && to[0] == 0.5  && to[1] == 1    ) return sub_chars[ 6];
	if (to[0] == 0   && to[1] == 0    && from[0] == 0    && from[1] == 1    || from[0] == 0   && from[1] == 0    && to[0] == 0    && to[1] == 1    ) return sub_chars[ 7];
	if (to[0] == 0   && to[1] == 0    && from[0] == 0    && from[1] == 0.75 || from[0] == 0   && from[1] == 0    && to[0] == 0    && to[1] == 0.75 ) return sub_chars[ 8];
	if (to[0] == 0   && to[1] == 0    && from[0] == 0    && from[1] == 0.5  || from[0] == 0   && from[1] == 0    && to[0] == 0    && to[1] == 0.5  ) return sub_chars[ 9];
	if (to[0] == 0   && to[1] == 0    && from[0] == 0    && from[1] == 0.25 || from[0] == 0   && from[1] == 0    && to[0] == 0    && to[1] == 0.25 ) return sub_chars[10];
	if (to[0] == 0.5 && to[1] == 0    && from[0] == 1    && from[1] == 0    || from[0] == 0.5 && from[1] == 0    && to[0] == 1    && to[1] == 0    ) return sub_chars[11];
	if (to[0] == 0.5 && to[1] == 0    && from[0] == 1    && from[1] == 0.25 || from[0] == 0.5 && from[1] == 0    && to[0] == 1    && to[1] == 0.25 ) return sub_chars[12];
	if (to[0] == 0.5 && to[1] == 0    && from[0] == 1    && from[1] == 0.5  || from[0] == 0.5 && from[1] == 0    && to[0] == 1    && to[1] == 0.5  ) return sub_chars[13];
	if (to[0] == 0.5 && to[1] == 0    && from[0] == 1    && from[1] == 0.75 || from[0] == 0.5 && from[1] == 0    && to[0] == 1    && to[1] == 0.75 ) return sub_chars[14];
	if (to[0] == 0.5 && to[1] == 0    && from[0] == 1    && from[1] == 1    || from[0] == 0.5 && from[1] == 0    && to[0] == 1    && to[1] == 1    ) return sub_chars[15];
	if (to[0] == 0.5 && to[1] == 0    && from[0] == 0.5  && from[1] == 1    || from[0] == 0.5 && from[1] == 0    && to[0] == 0.5  && to[1] == 1    ) return sub_chars[16];
	if (to[0] == 0.5 && to[1] == 0    && from[0] == 0    && from[1] == 1    || from[0] == 0.5 && from[1] == 0    && to[0] == 0    && to[1] == 1    ) return sub_chars[17];
	if (to[0] == 0.5 && to[1] == 0    && from[0] == 0    && from[1] == 0.75 || from[0] == 0.5 && from[1] == 0    && to[0] == 0    && to[1] == 0.75 ) return sub_chars[18];
	if (to[0] == 0.5 && to[1] == 0    && from[0] == 0    && from[1] == 0.5  || from[0] == 0.5 && from[1] == 0    && to[0] == 0    && to[1] == 0.5  ) return sub_chars[19];
	if (to[0] == 0.5 && to[1] == 0    && from[0] == 0    && from[1] == 0.25 || from[0] == 0.5 && from[1] == 0    && to[0] == 0    && to[1] == 0.25 ) return sub_chars[20];
	if (to[0] == 1   && to[1] == 0    && from[0] == 1    && from[1] == 0.25 || from[0] == 1   && from[1] == 0    && to[0] == 1    && to[1] == 0.25 ) return sub_chars[21];
	if (to[0] == 1   && to[1] == 0    && from[0] == 1    && from[1] == 0.5  || from[0] == 1   && from[1] == 0    && to[0] == 1    && to[1] == 0.5  ) return sub_chars[22];
	if (to[0] == 1   && to[1] == 0    && from[0] == 1    && from[1] == 0.75 || from[0] == 1   && from[1] == 0    && to[0] == 1    && to[1] == 0.75 ) return sub_chars[23];
	if (to[0] == 1   && to[1] == 0    && from[0] == 1    && from[1] == 1    || from[0] == 1   && from[1] == 0    && to[0] == 1    && to[1] == 1    ) return sub_chars[24];
	if (to[0] == 1   && to[1] == 0    && from[0] == 0.5  && from[1] == 1    || from[0] == 1   && from[1] == 0    && to[0] == 0.5  && to[1] == 1    ) return sub_chars[25];
	if (to[0] == 1   && to[1] == 0    && from[0] == 0    && from[1] == 1    || from[0] == 1   && from[1] == 0    && to[0] == 0    && to[1] == 1    ) return sub_chars[26];
	if (to[0] == 1   && to[1] == 0    && from[0] == 0    && from[1] == 0.75 || from[0] == 1   && from[1] == 0    && to[0] == 0    && to[1] == 0.75 ) return sub_chars[27];
	if (to[0] == 1   && to[1] == 0    && from[0] == 0    && from[1] == 0.5  || from[0] == 1   && from[1] == 0    && to[0] == 0    && to[1] == 0.5  ) return sub_chars[28];
	if (to[0] == 1   && to[1] == 0    && from[0] == 0    && from[1] == 0.25 || from[0] == 1   && from[1] == 0    && to[0] == 0    && to[1] == 0.25 ) return sub_chars[29];
	if (to[0] == 1   && to[1] == 0.25 && from[0] == 1    && from[1] == 0.5  || from[0] == 1   && from[1] == 0.25 && to[0] == 1    && to[1] == 0.5  ) return sub_chars[30];
	if (to[0] == 1   && to[1] == 0.25 && from[0] == 1    && from[1] == 0.75 || from[0] == 1   && from[1] == 0.25 && to[0] == 1    && to[1] == 0.75 ) return sub_chars[31];
	if (to[0] == 1   && to[1] == 0.25 && from[0] == 1    && from[1] == 1    || from[0] == 1   && from[1] == 0.25 && to[0] == 1    && to[1] == 1    ) return sub_chars[32];
	if (to[0] == 1   && to[1] == 0.25 && from[0] == 0.5  && from[1] == 1    || from[0] == 1   && from[1] == 0.25 && to[0] == 0.5  && to[1] == 1    ) return sub_chars[33];
	if (to[0] == 1   && to[1] == 0.25 && from[0] == 0    && from[1] == 1    || from[0] == 1   && from[1] == 0.25 && to[0] == 0    && to[1] == 1    ) return sub_chars[34];
	if (to[0] == 1   && to[1] == 0.25 && from[0] == 0    && from[1] == 0.75 || from[0] == 1   && from[1] == 0.25 && to[0] == 0    && to[1] == 0.75 ) return sub_chars[35];
	if (to[0] == 1   && to[1] == 0.25 && from[0] == 0    && from[1] == 0.5  || from[0] == 1   && from[1] == 0.25 && to[0] == 0    && to[1] == 0.5  ) return sub_chars[36];
	if (to[0] == 1   && to[1] == 0.25 && from[0] == 0    && from[1] == 0.25 || from[0] == 1   && from[1] == 0.25 && to[0] == 0    && to[1] == 0.25 ) return sub_chars[37];
	if (to[0] == 1   && to[1] == 0.5  && from[0] == 1    && from[1] == 0.75 || from[0] == 1   && from[1] == 0.5  && to[0] == 1    && to[1] == 0.75 ) return sub_chars[38];
	if (to[0] == 1   && to[1] == 0.5  && from[0] == 1    && from[1] == 1    || from[0] == 1   && from[1] == 0.5  && to[0] == 1    && to[1] == 1    ) return sub_chars[39];
	if (to[0] == 1   && to[1] == 0.5  && from[0] == 0.5  && from[1] == 1    || from[0] == 1   && from[1] == 0.5  && to[0] == 0.5  && to[1] == 1    ) return sub_chars[40];
	if (to[0] == 1   && to[1] == 0.5  && from[0] == 0    && from[1] == 1    || from[0] == 1   && from[1] == 0.5  && to[0] == 0    && to[1] == 1    ) return sub_chars[41];
	if (to[0] == 1   && to[1] == 0.5  && from[0] == 0    && from[1] == 0.75 || from[0] == 1   && from[1] == 0.5  && to[0] == 0    && to[1] == 0.75 ) return sub_chars[42];
	if (to[0] == 1   && to[1] == 0.5  && from[0] == 0    && from[1] == 0.5  || from[0] == 1   && from[1] == 0.5  && to[0] == 0    && to[1] == 0.5  ) return sub_chars[43];
	if (to[0] == 1   && to[1] == 0.5  && from[0] == 0    && from[1] == 0.25 || from[0] == 1   && from[1] == 0.5  && to[0] == 0    && to[1] == 0.25 ) return sub_chars[44];
	if (to[0] == 1   && to[1] == 0.75 && from[0] == 1    && from[1] == 1    || from[0] == 1   && from[1] == 0.75 && to[0] == 1    && to[1] == 1    ) return sub_chars[45];
	if (to[0] == 1   && to[1] == 0.75 && from[0] == 0.5  && from[1] == 1    || from[0] == 1   && from[1] == 0.75 && to[0] == 0.5  && to[1] == 1    ) return sub_chars[46];
	if (to[0] == 1   && to[1] == 0.75 && from[0] == 0    && from[1] == 1    || from[0] == 1   && from[1] == 0.75 && to[0] == 0    && to[1] == 1    ) return sub_chars[47];
	if (to[0] == 1   && to[1] == 0.75 && from[0] == 0    && from[1] == 0.75 || from[0] == 1   && from[1] == 0.75 && to[0] == 0    && to[1] == 0.75 ) return sub_chars[48];
	if (to[0] == 1   && to[1] == 0.75 && from[0] == 0    && from[1] == 0.5  || from[0] == 1   && from[1] == 0.75 && to[0] == 0    && to[1] == 0.5  ) return sub_chars[49];
	if (to[0] == 1   && to[1] == 0.75 && from[0] == 0    && from[1] == 0.25 || from[0] == 1   && from[1] == 0.75 && to[0] == 0    && to[1] == 0.25 ) return sub_chars[50];
	if (to[0] == 1   && to[1] == 1    && from[0] == 0.5  && from[1] == 1    || from[0] == 1   && from[1] == 1    && to[0] == 0.5  && to[1] == 1    ) return sub_chars[51];
	if (to[0] == 1   && to[1] == 1    && from[0] == 0    && from[1] == 1    || from[0] == 1   && from[1] == 1    && to[0] == 0    && to[1] == 1    ) return sub_chars[52];
	if (to[0] == 1   && to[1] == 1    && from[0] == 0    && from[1] == 0.75 || from[0] == 1   && from[1] == 1    && to[0] == 0    && to[1] == 0.75 ) return sub_chars[53];
	if (to[0] == 1   && to[1] == 1    && from[0] == 0    && from[1] == 0.5  || from[0] == 1   && from[1] == 1    && to[0] == 0    && to[1] == 0.5  ) return sub_chars[54];
	if (to[0] == 1   && to[1] == 1    && from[0] == 0    && from[1] == 0.25 || from[0] == 1   && from[1] == 1    && to[0] == 0    && to[1] == 0.25 ) return sub_chars[55];
	if (to[0] == 0.5 && to[1] == 1    && from[0] == 0    && from[1] == 1    || from[0] == 0.5 && from[1] == 1    && to[0] == 0    && to[1] == 1    ) return sub_chars[56];
	if (to[0] == 0.5 && to[1] == 1    && from[0] == 0    && from[1] == 0.75 || from[0] == 0.5 && from[1] == 1    && to[0] == 0    && to[1] == 0.75 ) return sub_chars[57];
	if (to[0] == 0.5 && to[1] == 1    && from[0] == 0    && from[1] == 0.5  || from[0] == 0.5 && from[1] == 1    && to[0] == 0    && to[1] == 0.5  ) return sub_chars[58];
	if (to[0] == 0.5 && to[1] == 1    && from[0] == 0    && from[1] == 0.25 || from[0] == 0.5 && from[1] == 1    && to[0] == 0    && to[1] == 0.25 ) return sub_chars[59];
	if (to[0] == 0   && to[1] == 1    && from[0] == 0    && from[1] == 0.75 || from[0] == 0   && from[1] == 1    && to[0] == 0    && to[1] == 0.75 ) return sub_chars[60];
	if (to[0] == 0   && to[1] == 1    && from[0] == 0    && from[1] == 0.5  || from[0] == 0   && from[1] == 1    && to[0] == 0    && to[1] == 0.5  ) return sub_chars[61];
	if (to[0] == 0   && to[1] == 1    && from[0] == 0    && from[1] == 0.25 || from[0] == 0   && from[1] == 1    && to[0] == 0    && to[1] == 0.25 ) return sub_chars[62];
	if (to[0] == 0   && to[1] == 0.75 && from[0] == 0    && from[1] == 0.5  || from[0] == 0   && from[1] == 0.75 && to[0] == 0    && to[1] == 0.5  ) return sub_chars[63];
	if (to[0] == 0   && to[1] == 0.75 && from[0] == 0    && from[1] == 0.25 || from[0] == 0   && from[1] == 0.75 && to[0] == 0    && to[1] == 0.25 ) return sub_chars[64];
	if (to[0] == 0   && to[1] == 0.5  && from[0] == 0    && from[1] == 0.25 || from[0] == 0   && from[1] == 0.5  && to[0] == 0    && to[1] == 0.25 ) return sub_chars[65];
	return '#';
}

function h_node(val) {
	return (Math.round(val * 2)/2);
}
function v_node(val) {
	return (Math.round(val * 4)/4);
}

function calc_slope(a,b) {
	return (a[1] - b[1]) / (a[0] - b[0]);
}

function y_SAX(slope,a,x) {
	return slope * (x - a[0]) + a[1];
}

function x_SAY(slope,a,y) {
	return (slope * a[0] + y - a[1])/slope;
}

function txtSmoothLineSetList(a,b){
  let setList = [];
	let dx;
	let dy;
	let breaks = [];
	let slope = calc_slope(a,b);	

	dx = b[0] - a[0];
	if (dx > 0) {
		let start_x = Math.ceil(a[0]);
		for (var i = start_x-1; i < dx+start_x; i++) {
			let y = y_SAX(slope,a,i);
			let node = [h_node(i),v_node(y)];
			if (node[0] > b[0]) continue;
			breaks.push(node);
		}
	} else {
		let start_x = Math.floor(a[0]);
		for (var i = start_x-1; i > dx+start_x; i--) {
			let y = y_SAX(slope,a,i);
			let node = [h_node(i),v_node(y)];
			if (node[0] < b[0]) continue;
			breaks.push(node);
		}
	}

	dy = b[1] - a[1];
	if (dy > 0) {
		let start_y = Math.ceil(a[1]);
		for (var i = start_y; i < dy+start_y; i++) {
			let x = x_SAY(slope,a,i);
			let node = [h_node(x),v_node(i)];
			if (node[1] > b[1]) continue;
			breaks.push(node);
		}
	} else {
		let start_y = Math.floor(a[1]);
		for (var i = start_y; i > dy+start_y; i--) {
			let x = x_SAY(slope,a,i);
			let node = [h_node(x),v_node(i)];
			if (node[1] < b[1]) continue;
			breaks.push(node);
		}
	}

	breaks.sort(function(a,b) {
		return a[0] == b[0] ? dy > 0 ? (a[1] - b[1]) : (b[1] - a[1]) : dx > 0  ? (a[0] - b[0]) : (b[0] - a[0]);
	});

	for (var i = 0; i < breaks.length-1; i++) {
		let break_x = breaks[i][0];
		let break_y = breaks[i][1];
		let break_x1 = breaks[i+1][0];
		let break_y1 = breaks[i+1][1];
		if (break_x == break_x1 && break_y == break_y1) continue;
		let pos = [
			dx < 0 ? Math.floor(break_x1) : Math.floor(break_x),
			dy < 0 ? Math.floor(break_y1) : Math.floor(break_y)
		];
		let from = [break_x-pos[0],break_y-pos[1]];
		let to = [break_x1-pos[0],break_y1-pos[1]];
    setList.push([sub_char(from,to),pos[0],pos[1]]);
	}
  return setList;
}

function txtLineSetList(a,b,h_weight,v_weight,fill){
  let setList = [];
	let dx;
	let dy;
	let breaks = [];
	let slope = calc_slope(a,b);	

	dx = b[0] - a[0];
	if (dx > 0) {
		let start_x = Math.ceil(a[0]);
		for (var i = start_x-1; i < dx+start_x; i++) {
			let y = y_SAX(slope,a,i);
			let node = [h_node(i),v_node(y)];
			if (node[0] > b[0]) continue;
			breaks.push(node);
		}
	} else {
		let start_x = Math.floor(a[0]);
		for (var i = start_x-1; i > dx+start_x; i--) {
			let y = y_SAX(slope,a,i);
			let node = [h_node(i),v_node(y)];
			if (node[0] < b[0]) continue;
			breaks.push(node);
		}
	}

	dy = b[1] - a[1];
	if (dy > 0) {
		let start_y = Math.ceil(a[1]);
		for (var i = start_y; i < dy+start_y; i++) {
			let x = x_SAY(slope,a,i);
			let node = [h_node(x),v_node(i)];
			if (node[1] > b[1]) continue;
			breaks.push(node);
		}
	} else {
		let start_y = Math.floor(a[1]);
		for (var i = start_y; i > dy+start_y; i--) {
			let x = x_SAY(slope,a,i);
			let node = [h_node(x),v_node(i)];
			if (node[1] < b[1]) continue;
			breaks.push(node);
		}
	}

	//breaks.sort(function(a,b) {
	//	return a[0] == b[0] ? dy > 0 ? (a[1] - b[1]) : (b[1] - a[1]) : dx > 0  ? (a[0] - b[0]) : (b[0] - a[0]);
	//});

	for (var i = 0; i < breaks.length-1; i++) {
		let break_x = breaks[i][0];
		let break_y = breaks[i][1];
		let break_x1 = breaks[i+1][0];
		let break_y1 = breaks[i+1][1];
		if (break_x == break_x1 && break_y == break_y1) continue;
		let pos = [
			dx < 0 ? Math.floor(break_x1) : Math.floor(break_x),
			dy < 0 ? Math.floor(break_y1) : Math.floor(break_y)
		];
    for (var j = 0; j < v_weight; j++) {
      for (var k = 0; k < h_weight; k++) {
        setList.push([fill,pos[0]+k,pos[1]+j]);
      }
    }
	}
  return setList;
}
