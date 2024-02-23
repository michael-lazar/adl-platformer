console.log("input.js");

/* * * * * *
 * ANCHOR  *
 * * * * * */

txtAnchor = function(x,y) {
  this.x = x;
  this.y = y;
  this.visible = true;
  this.attached = [];
}

txtAnchor.prototype.move = function(x,y) {
  this.x = x;
  this.y = y;
  for (var i = 0; i < this.attached.length; i++) {
    if (this.attached[i]["update_"+this.attached[i].type]) {
      this.attached[i]["update_"+this.attached[i].type]();
    }
  }
}

txtAnchor.prototype.hide = function() {
  this.visible = false;
  for (var i = 0; i < this.attached.length; i++) {
    this.attached[i].hide();
  }
}

txtAnchor.prototype.show = function() {
  this.visible = true;
  for (var i = 0; i < this.attached.length; i++) {
    this.attached[i].show();
  }
}

/* * * *
 * Ui  *
 * * * */

let ui_bottom_priority = 995;
let ui_low_priority = 996;
let ui_medium_priority = 997;
let ui_high_priority = 998;

let txtUis = [];

// UiCloseAll

function txtUiCloseAll() {
  for (var i = 0; i < txtUis.length; i++){
    let txtUiElement = txtUis[i];
    if (txtUiElement["close_"+txtUiElement.type]) {
      txtUiElement["close_"+txtUiElement.type]();
    }
  }
}

txtUi = function(anchor,x,y) {
  this.anchor = anchor;
  this.x = x;
  this.y = y;
  this.event = false;
  this.visible = true;
  this.children = [];
  this.anchor.attached.push(this);
  txtUis.push(this);
}

txtUi.prototype.clear = function(){
  while (this.children.length){
    let child = this.children.pop();
    remove_txtElement(child);
  }
}

txtUi.prototype.hide = function(){
  this.visible = false;
  for (var i = 0; i < this.children.length; i++){
    this.children[i].visible = false;
  }
}

txtUi.prototype.show = function(){
  this.visible = true;
  for (var i = 0; i < this.children.length; i++){
    this.children[i].visible = true;
  }
}

// Line

txtUi.prototype.setup_line = function(str) {
  this.clear();
  this.type = "line";
  this.line_element = new txtElement(
    "line",
    txtSetList(str),
    0,
    0,
    ui_bottom_priority
  );
  this.line_element.parent = this;
  this.children.push(this.line_element);
}

txtUi.prototype.update_line = function(){
  this.line_element.x = this.anchor.x + this.x;
  this.line_element.y = this.anchor.y + this.y;
}

// Box

txtUi.prototype.setup_box = function(w,h) {
  this.clear();
  this.type = "box";
  this.box_element = new txtElement(
    "box",
    txtSetList(txtFrame(w,h)),
    0,
    0,
    ui_bottom_priority
  );
  this.box_element.parent = this;
  this.children.push(this.box_element);
}

txtUi.prototype.update_box = function(){
  this.box_element.x = this.anchor.x + this.x;
  this.box_element.y = this.anchor.y + this.y;
}

// Select

txtUi.prototype.setup_select = function(label,choice_list) {
  this.clear();
  this.type = "select";
  this.open = false;
  this.label = label;
  this.label_element = new txtElement(
    "select label",
    txtSetList(this.label+' '),
    0,
    0,
    ui_low_priority
  );
  this.label_element.parent = this;
  this.children.push(this.label_element);
  
  this.choice_index = 0;
  
  this.choice_list = [];
  for (var i = 0; i < choice_list.length; i++) {
    let index = i;
    let choice_element = new txtElement(
      choice_list[i],
      [],
      0,
      0,
      ui_high_priority,
      function(element,match){
        if (mouse_down && match.name == "mouse") {
          let parent = element.parent;
          if (parent.open) {
            parent.trigger_select(index);
            parent.close_select();
            mouse_down = false;
          } else {
            parent.open_select();
            mouse_down = false;
          }
        }
      }
    );
    choice_element.parent = this;
    this.children.push(choice_element);
    this.choice_list.push(choice_element);
  };
  
  this.value = this.choice_list[this.choice_index].name;
  this.value_element = new txtElement(
    "select value",
    txtSetList('< '+this.choice_list[this.choice_index].name+' >'),
    0,
    0,
    ui_low_priority,
    function(element,match){
      if (mouse_down && match.name == "mouse") {
        let parent = element.parent;
        if (parent.open) {
          parent.close_select();
          mouse_down = false;
        } else {
          parent.open_select();
          mouse_down = false;
        }
      }
    }
  );
  this.value_element.parent = this;
  this.children.push(this.value_element);
  
  this.wrapper_element = new txtElement(
    "select wrapper element",
    [],
    0,
    0,
    ui_medium_priority
  );
  this.wrapper_element.parent = this;
  this.children.push(this.wrapper_element);

  this.update_select();
}

txtUi.prototype.trigger_select = function(index){
  this.choice_index = index;
  this.value = this.choice_list[this.choice_index].name;
  this.value_element.setList = txtSetList('< '+this.choice_list[this.choice_index].name+' >');
  if (this.event) {
    this.event(this);
  }
}

txtUi.prototype.update_select = function() {
  this.label_element.x = this.anchor.x + this.x;
  this.label_element.y = this.anchor.y + this.y;
  this.value_element.x = this.anchor.x + this.x + this.label.length + 1;
  this.value_element.y = this.anchor.y + this.y;
  for (var i = 0 ; i < this.choice_list.length; i++) {
    let choice_element = this.choice_list[i];
    choice_element.x = this.anchor.x + this.x + this.label.length + 3;
    choice_element.y = this.anchor.y + this.y + i + 2;
  }
  this.wrapper_element.x = this.anchor.x + this.x + this.label.length + 1;
  this.wrapper_element.y = this.anchor.y + this.y + 1;
  this.wrapper_element.priority = ui_medium_priority;
}

txtUi.prototype.open_select = function() {
  txtUiCloseAll();
  this.open = true;
  let max_width = 0;
  for (var i = 0 ; i < this.choice_list.length; i++) {
    let choice_element = this.choice_list[i];
    choice_element.setList = txtSetList(
      choice_element.name
    );
    if (choice_element.name.length > max_width) max_width = choice_element.name.length;
  }
  this.wrapper_element.setList = txtSetList(txtFrame(max_width+4,this.choice_list.length+2));
}

txtUi.prototype.close_select = function(){
  this.wrapper_element.setList = [];
  for (var i = 0 ; i < this.choice_list.length; i++) {
    let choice_element = this.choice_list[i];
    choice_element.setList = [];
  }
  this.update_select();
  this.open = false;
}

// Range

txtUi.prototype.setup_range = function(label,w,min,max) {
  this.clear();
  this.type = "range";
  this.w = w;
  this.min = min;
  this.max = max;
  this.value = min;
  
  this.label = label;
  this.label_element = new txtElement(
    "range label",
    txtSetList(this.label+' '),
    0,
    0,
    ui_low_priority
  );
  this.label_element.parent = this;
  this.children.push(this.label_element);

  this.value_element = new txtElement(
    "range value",
    [],
    0,//this.x + this.label.length + w + 3,
    0,
    ui_low_priority,
  );
  this.value_element.parent = this;
  this.children.push(this.value_element);
  
  this.range_index = 0;
  this.range_elements = [];
  while (this.range_elements.length-1 < this.w) {
    let index = this.range_elements.length;
    let range_element = new txtElement(
      "range element",
      [],
      0,
      0,
      ui_low_priority,
      function(element,match){
        if (match.name == "mouse" && mouse_down) {
          txtUiCloseAll();
          allow_mouse_y = false;
          let parent = element.parent;
          parent.range_index = index;
          if (parent.event) {
            parent.event(parent);
          }
          parent.update_range();
        }
      }
    );
    range_element.parent = this;
    this.children.push(range_element);
    this.range_elements.push(range_element);
  }
}

txtUi.prototype.update_range = function(){
  this.label_element.x = this.anchor.x + this.x;
  this.label_element.y = this.anchor.y + this.y;
  let value = this.min;
  let mod = this.range_index / this.w;
  let add_value = (this.max-this.min) * mod;
  value += add_value;
  this.value = value;
  this.value_element.setList = txtSetList(this.value.toFixed(2));
  this.value_element.x = this.anchor.x + this.x + this.label.length + 1 + this.w + 2;
  this.value_element.y = this.anchor.y + this.y;
  for (var i = 0; i < this.range_elements.length; i++) {
    let range_element = this.range_elements[i];
    range_element.x = this.anchor.x + this.x + this.label.length + 1 + i;
    range_element.y = this.anchor.y + this.y;
    range_element.setList = txtSetList(i == this.range_index ? 'O' : '-');
  }
}

// Button

txtUi.prototype.setup_button = function(label) {
  this.clear();
  this.type = "button";
  this.label = label;
  
  this.button_element = new txtElement(
    "button element",
    txtSetList('[ '+this.label+' ]'),
    0,//this.x,
    0,//this.y,
    ui_low_priority,
    function(element,match){
      if (match.name == "mouse" && mouse_down) {
        let parent = element.parent;
        if (parent.event) {
          parent.event(parent);
        }
        mouse_down = false;
      }
    }
  );
  this.button_element.parent = this;
  this.children.push(this.button_element);
}

txtUi.prototype.update_button = function() {
  this.button_element.x = this.anchor.x + this.x;
  this.button_element.y = this.anchor.y + this.y;
}
// input checkbox
// input number
// input text
// KEYBOARD COMPATIBLE 
