console.log("txtElements.js");

// TODO CHANGE txtElements list system to something more close to "parent.appendChild" / "screen.addElement" ?

let txtElements = [];
let txtElementsToRemove = [];

function remove_txtElement(element) {
  if (txtElementsToRemove.indexOf(element) == -1) {
    txtElementsToRemove.push(element);
  }
}

function remove_txtElements(){
  while (txtElementsToRemove.length) {
    txtElements.splice(txtElements.indexOf(txtElementsToRemove.pop()),1);
  }
}

// ANCHOR ?
let txtElement = function(name,setList,pt,meetable) {
  this.name = name;
  this.setList = setList;
  this.pt = pt;
  this.meetable = meetable ? meetable : false;
  this.project = false;
  this.met = [];
  this.parent = false;
  this.shader = false;
  this.clickable = false;
  this.visible = true;
  this.onDisplay = false;
  this.onProcess = false;
  txtElements.push(this);
}

let empty_element = new txtElement("empty",[],new Pt(0,0,Infinity));
