console.log("txtGen.js");

function txtArea(w,h,process){
  let txt = '';
  let i = -1;
  while (i++ < w*h-1){
    let x = i%w;
    let y = (i-x)/w;
    let left = !x;
    let top = !y;
    let right = x==w-1;
    let bottom = y==h-1;
    txt += process(i,x,y,left,top,right,bottom);
  }
  return txt;
}

function txtFill(w,h,fill){
  return txtClean(txtArea(w,h,function(i,x,y,left,top,right,bottom){return (
    right ? fill+'\n' :
    fill
  )}));
}

function txtOutline(w,h,fill,transparency){
  return txtClean(txtArea(w,h,function(i,x,y,left,top,right,bottom){return (
    top ? (
      right ? fill+'\n' :
      fill
    ) :
    bottom ? (
      right ? fill+'\n' :
      fill
    ) :
    left ? fill :
    right ? fill+'\n' :
    transparency
  )}));
}
function txtFrame(w,h,fill){
  return txtClean(txtArea(w,h,function(i,x,y,left,top,right,bottom){return (
    top ? (
      left ? '┌' :
      right ? '┐\n' :
      '-'
    ) :
    bottom ? (
      left ? '└' :
      right ? '┘\n' :
      '-'
    ) :
    left ? '|' :
    right ? '|\n' :
    fill
  )}));
}
function txtPad(w,h){
  return txtClean(txtArea(w,h,function(i,x,y,left,top,right,bottom){return (
    top ? (
      left ? '┌' :
      right ? '┐\n' :
      '-'
    ) :
    bottom ? (
      left ? '╘' :
      right ? '╛\n' :
      '═'
    ) :
    left ? '|' :
    right ? '|\n' :
    ' '
  )}));
}

function txtButton(str){
  str = ' '+str+' ';
  let str_size = txtSize(str);
  let label_content = str;
  return txtClean(txtArea(str_size[0]+2,str_size[1]+2,function(i,x,y,left,top,right,bottom){
    return (
      top ? (
        left ? '┌' :
        right ? '┐\n' :
        '-'
      ) :
      bottom ? (
        left ? '╘' :
        right ? '╛\n' :
        '═'
      ) :
      left ? '|' :
      right ? '|\n' :
      str[i-(1+str_size[0]+str_size[1]*2)]
    )
  }));
}

function txtTitle(str){
  let str_size = txtSize(str);
  let label_content = str;
  return txtClean(txtArea(str_size[0],str_size[1]+1,function(i,x,y,left,top,right,bottom){
    return (
      bottom ? (
        right ? '¯\n' :
        '¯'
      ) :
      str[i] + (right ? '\n' : '')
    )
  }));
}

function txtSign(str){
  str = ' '+str+' ';
  let str_size = txtSize(str);
  let label_content = str;
  return txtClean(txtArea(str_size[0]+2,str_size[1]+2,function(i,x,y,left,top,right,bottom){
    return (
      top ? (
        left ? '┌' :
        right ? '┐\n' :
        '-'
      ) :
      bottom ? (
        left ? '└' :
        right ? '┘\n' :
        '-'
      ) :
      left ? '|' :
      right ? '|\n' :
      str[i-(1+str_size[0]+str_size[1]*2)]
    )
  }));
}

function txtLabel(str){
  str = ' '+str+' ';
  let str_size = txtSize(str);
  let label_content = str;
  return txtClean(txtArea(str_size[0]+2,str_size[1]+2,function(i,x,y,left,top,right,bottom){
    return (
      top ? (
        left ? '┌' :
        right ? '┐\n' :
        (!(i%2) ? '-' : ' ')
      ) :
      bottom ? (
        left ? '└' :
        right ? '┘\n' :
        (!(i%2) ? '-' : ' ')
      ) :
      left ? '¦' :
      right ? '¦\n' :
      str[i-(1+str_size[0]+str_size[1]*2)]
    )
  }));
}

function txtReverseSlopedRoof(w,h,dirt){
  return txtClean(txtArea(w,h,function(i,x,y,left,top,right,bottom){return (
    bottom ? (
      left ? '-' :
      right ? '-\n' :
      x == w-(h-y)-1 || x == h-y ? '\'' :
      ' '
    ) :
    top ? (
      x == w-(h-y) || x == h-y-1 ? '.' :
      right ? '-\n' :
      '-'
    ) :
    right ? (
      !((i+(y%2?1:0))%2) ? '_' : '|'
    )+'\n' :
    x == h-y-1 ? '/' :
    x == h-y ? '/' :
    x == w-(h-y) ? '\\' :
    x == w-(h-y)-1 ? '\\' :
    y == 1 && x > h-y-1 && x < w-(h-y) ? '¯' :
    x < h-y-1 || x > w-(h-y) ? (
      !((i+(y%2?1:0))%2) ? '_' : '|'
    ) :
    Math.random() < dirt ? Math.random() > 0.5 ? ':' : '.' :
    ' '
  )}));
}

function txtSlopedRoof(w,h,transparent){
  return txtClean(txtArea(w,h,function(i,x,y,left,top,right,bottom){return (
    bottom ? (
      left ? '\'' :
      right ? '\'\n' :
      x == 1 ? '┬' : 
      x == w-2 ? '┬' : 
      '-'
    ) :
    right ? transparent+'\n' :
    top ? (
      x > h-y-1 && x < w-(h-y) ? '-' :
      x == w-(h-y) || x == h-y-1 ? '.' :
      transparent
    ) :
    x == h-y-1 ? '/' :
    x == w-(h-y) ? '\\' :
    x > h-y-1 && x < w-(h-y) ? (
      !((i+(y%2?1:0))%2) ? '_' : '|'
    ) :
    transparent
  )}));
}

function txtRoof(w,h){
  return txtClean(txtArea(w,h,function(i,x,y,left,top,right,bottom){return (
    top ? (
      left ? '┌' :
      right ? '┐\n' :
      '-'
    ) :
    bottom ? (
      left ? '└' :
      right ? '┘\n' :
      x == 1 ? '┬' : 
      x == w-2 ? '┬' : 
      '-'
    ) :
    left ? '|' :
    right ? '|\n' :
    !((x+(y%2?1:0))%2) ? '|' : 
    '_'
  )}));
}

function txtBalcony(w,h,dirt){
  return txtClean(txtArea(w,h,function(i,x,y,left,top,right,bottom){return (
    top ? (
      left ? 'l' :
      right ? 'l\n' :
      '='
    ) :
    bottom ? (
      left ? '└' :
      right ? '┘\n' :
      '-'
    ) :
    left ? '|' :
    right ? '|\n' :
    Math.random() < dirt ? Math.random() > 0.5 ? ':' : '.' :
    ' '
  )}));
}

function txtClosedWall(w,h,dirt){
  return txtClean(txtArea(w,h,function(i,x,y,left,top,right,bottom){return (
    top ? (
      left ? '┌' :
      right ? '┐\n' :
      '-'
    ) :
    bottom ? (
      left ? '└' :
      right ? '┘\n' :
      '-'
    ) :
    left ? '|' :
    right ? '|\n' :
    Math.random() < dirt ? Math.random() > 0.5 ? ':' : '.' :
    ' '
  )}));
}

function txtWall(w,h,dirt){
  return txtClean(txtArea(w,h,function(i,x,y,left,top,right,bottom){return (
    left ? '|' :
    right ? '|\n' :
    Math.random() < dirt ? Math.random() > 0.5 ? ':' : '.' :
    ' '
  )}));
}

function txtBottomWall(w,h,dirt){
  return txtClean(txtArea(w,h,function(i,x,y,left,top,right,bottom){return (
    bottom ? (
      left ? '└' :
      right ? '┘\n' :
      '-'
    ) :
    left ? '|' :
    right ? '|\n' :
    Math.random() < dirt ? Math.random() > 0.5 ? ':' : '.' :
    ' '
  )}));
}

function txtBottomDoor(w,wn,h){
  let total_w = w * wn + wn + 1;
  return txtClean(txtArea(total_w,h,function(i,x,y,left,top,right,bottom){
    let w_div = !(x%(w+1));
    return(
      top ? (
        left ? '┌' : 
        right ? '┐\n' : 
        w_div ? '┬' : 
        '─' 
      ) :
      bottom ? (
        left ? '┘' : 
        right ? '└\n' : 
        '¯' 
      ) :
      left ? (
        '|'
      ) :
      right ? (
        '|\n'
      ) :
      (wn%2) && y == h-3 && !((x-1)%(w+1))? '∟':
      !(wn%2) && y == h-3 && !((x-w)%((w+1)*2))? '∟':
      !(wn%2) && y == h-3 && !((x-(w+2))%((w+1)*2))? '∟':
      w_div ? '|' :
      ':'
    )
  }));
}

function txtDoor(w,wn,h){
  let total_w = w * wn + wn + 1;
  return txtClean(txtArea(total_w,h,function(i,x,y,left,top,right,bottom){
    let w_div = !(x%(w+1));
    return(
      top ? (
        left ? '┌' : 
        right ? '┐\n' : 
        w_div ? '┬' : 
        '─' 
      ) :
      bottom ? (
        left ? '└' : 
        right ? '┘\n' : 
        w_div ? '┴' : 
        '─' 
      ) :
      left ? (
        '|'
      ) :
      right ? (
        '|\n'
      ) :
      (wn%2) && y == h-3 && !((x-1)%(w+1))? '∟':
      !(wn%2) && y == h-3 && !((x-w)%((w+1)*2))? '∟':
      !(wn%2) && y == h-3 && !((x-(w+2))%((w+1)*2))? '∟':
      w_div ? '|' :
      ':'
    )
  }));
}

function txtSimpleWindow(w,wn,h,hn){
  let total_w = w * wn + wn + 1;
  let total_h = h * hn + hn + 1;
  return txtClean(txtArea(total_w,total_h,function(i,x,y,left,top,right,bottom){
    let w_div = !(x%(w+1));
    let h_div = !(y%(h+1));
    return(
      top ? (
        left ? '┌' : 
        right ? '┐\n' : 
        w_div ? '┬' : 
        '─' 
      ) :
      bottom ? (
        left ? '└' : 
        right ? '┘\n' : 
        w_div ? '┴' : 
        '─' 
      ) :
      left ? (
        '|'
      ) :
      right ? (
        '|\n'
      ) :
      w_div ? '|' :
      h_div ? '-' :
      w > 1 && h > 1 && x == 1 ? ':' :
      w > 1 && h > 1 && y == total_h-2 ? '.' :
      ' '
    )
  }));
}

function txtClosedWindow(w,h){
  return txtClean(txtArea(w,h,function(i,x,y,left,top,right,bottom){
    return(
      top ? (
        left ? '┌' : 
        (w%2) && x == Math.floor(w/2) ? '┬' :
        right ? '┐\n' : 
        '┬' 
      ) :
      bottom ? (
        left ? '└' : 
        (w%2) && x == Math.floor(w/2) ? '┴' :
        right ? '┘\n' : 
        '┴' 
      ) :
      (w%2) && x == Math.floor(w/2) ? '|' :
      left ? (
        '|'
      ) :
      right ? (
        '|\n'
      ) :
      '¦'
    )
  }));
}

function txtShutterWindow(w,wn,h,hn){
  let total_w = w * wn + wn + 1;
  let total_h = h * hn + hn + 1;
  let shutter_w = Math.floor((total_w-1)/2);
  total_w += shutter_w*2;
  return txtClean(txtArea(total_w,total_h,function(i,x,y,left,top,right,bottom){
    let left_shutter = x < shutter_w;
    let right_shutter = x > shutter_w * 3;
    let w_div = !((x-shutter_w)%(w+1));
    let h_div = !(y%(h+1));
    return(
      top ? (
        left ? '┌' : 
        right ? '┐\n' : 
        w_div 
        || left_shutter
        || right_shutter
        ? '┬' : 
        '─' 
      ) :
      bottom ? (
        left ? '└' : 
        right ? '┘\n' : 
        w_div 
        || left_shutter
        || right_shutter
        ? '┴' : 
        '─' 
      ) :
      left ? (
        '|'
      ) :
      right ? (
        '|\n'
      ) :
      left_shutter ? '¦' :
      (w_div && x == shutter_w * 3 + 1) ? '|' :
      right_shutter ? (
        right ? '¦\n' :
        '¦' 
      ) :
      w_div ? '|' :
      h_div ? '-' :
      w > 1 && h > 1 && x == shutter_w + 1 ? ':' :
      w > 1 && h > 1 && y == total_h-2 ? '.' :
      ' '
    )
  }));
}
