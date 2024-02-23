console.log("txtUtils.js");
function txtSetList(txt,ignore) {
  let setList = [];
  let lines = txt.split('\n');
  for (var y = 0; y < lines.length; y++) {
    for (var x = 0; x < lines[y].length; x++) {
      if (lines[y][x] == ignore) continue;
      setList.push([lines[y][x],x,y]);
    }
  }
  return setList;
}

function txtClean(txt) {
  return (
    txt.slice(-1) == '\n' ? txt.slice(0,-1):
    txt
  );
}

function txtSize(txt){
  let lines = txt.split('\n');
  return [
    lines[0].length,
    lines.length
  ]
}

function txtConcatH(txtA,txtB,offset,transparency){
  let txtA_size = txtSize(txtA);
  let txtB_size = txtSize(txtB);
  let txtA_setList = txtSetList(txtA,transparency);
  let txtB_setList = txtSetList(txtB,transparency);
  let grid = new Grid(transparency,txtA_size[0]+txtB_size[0]+offset,txtA_size[1] > txtB_size[1] ? txtA_size[1] : txtB_size[1]);
  grid.add(txtA_setList,0,0);
  grid.add(txtB_setList,txtA_size[0]+offset,0);
  return grid.print();
}

function txtConcatV(txtA,txtB,offset,transparency){
  let txtA_size = txtSize(txtA);
  let txtB_size = txtSize(txtB);
  let txtA_setList = txtSetList(txtA,transparency);
  let txtB_setList = txtSetList(txtB,transparency);
  let grid = new Grid(transparency,txtA_size[0] > txtB_size[0] ? txtA_size[0] : txtB_size[0],txtA_size[1]+txtB_size[1]+offset);
  grid.add(txtA_setList,0,0);
  grid.add(txtB_setList,0,txtA_size[1]+offset);
  return grid.print();
}

function txtMerge(txtA,txtB,x,y,transparency){
  let txtA_size = txtSize(txtA);
  let txtB_size = txtSize(txtB);
  let txtA_setList = txtSetList(txtA,transparency);
  let txtB_setList = txtSetList(txtB,transparency);
  let grid = new Grid(transparency,txtA_size[0],txtA_size[1]);
  grid.add(txtA_setList,0,0);
  grid.add(txtB_setList,x,y);
  return grid.print();
}

function txtMargin(txt,left,top,right,bottom,transparency) {
  let size = txtSize(txt);
  let w = size[0] + left + right;
  let h = size[1] + top + bottom;
  let txtA = txtFill(w,h,transparency);
  return txtMerge(txtA,txt,left,top);
}
