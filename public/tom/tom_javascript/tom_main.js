function main_process(frame){
  display_process(
    screen,
    screen_print,
    screen_background,
    font_size,
    font_x_ratio,
    font_y_ratio,
    color,
    background
  );
  remove_txtElements();
  for (var i = 0; i < txtElements.length; i++) {
    let element = txtElements[i];
    // REMOVE/ADD ELEMENTS INSTEAD OF HIDE/SHOW ?
    if (txtElements[i].onProcess) txtElements[i].onProcess(txtElements[i],frame);
    if (!element.visible) continue;
    if (element.name == "mouse") console.log("COUCOU");
    element.met = [];
    let x,y;
    if (element.project) {
      if (element.pt.z <= camera.z*-1) continue;
      //if (element.name == "cyclist") console.log(element.pt);
      let projection =  camera.project(element.pt);
      x = projection[0];
      y = projection[1];
    } else {
      x = element.pt.x;
      y = element.pt.y;
    }
    //if (element.name == "cyclist") console.log(x,y);
    screen.add(txtElements[i],x,y);
    if (txtElements[i].onDisplay) txtElements[i].onDisplay(txtElements[i],frame);
  }
  //mouse_element.met = [];
  //screen.add(mouse_element,mouse_element.pt.x,mouse_element.pt.y);
  screen_print.textContent = screen.print(frame);
}
