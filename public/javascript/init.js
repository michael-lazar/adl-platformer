console.log("init.js");
screen.onUpdate.push(function(screen){
  if (window.innerHeight > window.innerWidth) {
    while (font_size*(level_size+4) > window.innerWidth) font_size--;
    while (font_size*(level_size+6) < window.innerWidth) font_size++;
  } else {
    while (font_size*(level_size+4) > window.innerHeight) font_size--;
    while (font_size*(level_size+6) < window.innerHeight) font_size++;
  }
})
