Blockly.JavaScript.minecraft = function() {
  Blockly.JavaScript.definitions_['minecraft'] = "//initialize Minecraft code\r\n"+
"\r\n"+
"var MCPI = Object.create(null);\r\n"+
"\r\n"+
"MCPI.TO_RADIANS = Math.PI / 180;\r\n"+
"MCPI.block = \"1\";\r\n"+
"MCPI.penDown = true;\r\n"+
"MCPI.nib = [[0,0,0]];\r\n"+
"\r\n"+
"MCPI.mmMultiply = function(a,b) {\r\n"+
"    var c = [[0,0,0],[0,0,0],[0,0,0]];\r\n"+
"    for (var i = 0; i < 3 ; i++) for (var j = 0; j < 3 ; j++)\r\n"+
"      c[i][j] = a[i][0]*b[0][j] + a[i][1]*b[1][j] + a[i][2]*b[2][j];\r\n"+
"    return c;\r\n"+
"};\r\n"+
"\r\n"+
"MCPI.yawMatrix = function(angleDegrees) {\r\n"+
"    var theta = angleDegrees * MCPI.TO_RADIANS;\r\n"+
"    return [[Math.cos(theta), 0., -Math.sin(theta)],\r\n"+
"            [0.,         1., 0.],\r\n"+
"            [Math.sin(theta), 0., Math.cos(theta)]];\r\n"+
"};\r\n"+
"\r\n"+
"MCPI.rollMatrix = function(angleDegrees) {\r\n"+
"    var theta = angleDegrees * MCPI.TO_RADIANS;\r\n"+
"    return [[Math.cos(theta), -Math.sin(theta), 0.],\r\n"+
"            [Math.sin(theta), Math.cos(theta),0.],\r\n"+
"            [0.,          0.,          1.]];\r\n"+
"};\r\n"+
"\r\n"+
"MCPI.pitchMatrix = function(angleDegrees) {\r\n"+
"    var theta = angleDegrees * MCPI.TO_RADIANS;\r\n"+
"    return [[1.,          0.,          0.],\r\n"+
"            [0., Math.cos(theta),Math.sin(theta)],\r\n"+
"            [0., -Math.sin(theta),Math.cos(theta)]];\r\n"+
"};\r\n"+
"\r\n"+
"MCPI.getLine = function(x1,y1,z1,x2,y2,z2) {\r\n"+
"    var line = [];\r\n"+
"    x1 = Math.round(x1);\r\n"+
"    y1 = Math.round(y1);\r\n"+
"    z1 = Math.round(z1);\r\n"+
"    x2 = Math.round(x2);\r\n"+
"    y2 = Math.round(y2);\r\n"+
"    z2 = Math.round(z2);\r\n"+
"    var point = [x1,y1,z1];\r\n"+
"    var dx = x2 - x1;\r\n"+
"    var dy = y2 - y1;\r\n"+
"    var dz = z2 - z1;\r\n"+
"    var x_inc = dx < 0 ? -1 : 1;\r\n"+
"    var l = Math.abs(dx);\r\n"+
"    var y_inc = dy < 0 ? -1 : 1;\r\n"+
"    var m = Math.abs(dy);\r\n"+
"    var z_inc = dz < 0 ? -1 : 1;\r\n"+
"    var n = Math.abs(dz);\r\n"+
"    var dx2 = l * 2;\r\n"+
"    var dy2 = m * 2;\r\n"+
"    var dz2 = n * 2;\r\n"+
"\r\n"+
"    if (l >= m && l >= n) {\r\n"+
"        var err_1 = dy2 - l;\r\n"+
"        var err_2 = dz2 - l;\r\n"+
"        for (var i=0; i<l; i++) {\r\n"+
"            line.push([point[0],point[1],point[2]]);\r\n"+
"            if (err_1 > 0) {\r\n"+
"                point[1] += y_inc;\r\n"+
"                err_1 -= dx2;\r\n"+
"            }\r\n"+
"            if (err_2 > 0) {\r\n"+
"                point[2] += z_inc;\r\n"+
"                err_2 -= dx2;\r\n"+
"            }\r\n"+
"            err_1 += dy2;\r\n"+
"            err_2 += dz2;\r\n"+
"            point[0] += x_inc;\r\n"+
"        }\r\n"+
"    }\r\n"+
"    else if (m >= l && m >= n) {\r\n"+
"        err_1 = dx2 - m;\r\n"+
"        err_2 = dz2 - m;\r\n"+
"        for (var i=0; i<m; i++) {\r\n"+
"            line.push([point[0],point[1],point[2]]);\r\n"+
"            if (err_1 > 0) {\r\n"+
"                point[0] += x_inc;\r\n"+
"                err_1 -= dy2;\r\n"+
"            }\r\n"+
"            if (err_2 > 0) {\r\n"+
"                point[2] += z_inc;\r\n"+
"                err_2 -= dy2;\r\n"+
"            }\r\n"+
"            err_1 += dx2;\r\n"+
"            err_2 += dz2;\r\n"+
"            point[1] += y_inc;\r\n"+
"        }\r\n"+
"    }\r\n"+
"    else {\r\n"+
"        err_1 = dy2 - n;\r\n"+
"        err_2 = dx2 - n;\r\n"+
"        for (var i=0; i < n; i++) {\r\n"+
"            line.push([point[0],point[1],point[2]]);\r\n"+
"            if (err_1 > 0) {\r\n"+
"                point[1] += y_inc;\r\n"+
"                err_1 -= dz2;\r\n"+
"            }\r\n"+
"            if (err_2 > 0) {\r\n"+
"                point[0] += x_inc;\r\n"+
"                err_2 -= dz2;\r\n"+
"            }\r\n"+
"            err_1 += dy2;\r\n"+
"            err_2 += dx2;\r\n"+
"            point[2] += z_inc;\r\n"+
"        }\r\n"+
"    }\r\n"+
"    line.push([point[0],point[1],point[2]]);\r\n"+
"    if (point[0] != x2 || point[1] != y2 || point[2] != z2) {\r\n"+
"        line.push([x2,y2,z2]);\r\n"+
"    }\r\n"+
"    return line;\r\n"+
"};\r\n"+
"\r\n"+
"MCPI.postToChat = function(message) {\r\n"+
"  MCPI.socket.send(\"chat.post(\"+message+\")\");\r\n"+
"};\r\n"+
"\r\n"+
"MCPI.setBlock = function(x,y,z,block) {\r\n"+
"  if (block != \"0\" && Math.floor(x) == Math.floor(MCPI.playerX) && Math.floor(z) == Math.floor(MCPI.playerZ)\r\n"+
"      && (Math.floor(y) >= MCPI.playerShiftedHeight) ) {\r\n"+
"        MCPI.playerShiftedHeight = Math.floor(y) + 1;\r\n"+
"        MCPI.socket.send(\"player.setPos(\"+MCPI.playerX+\",\"+MCPI.playerShiftedHeight+\",\"+MCPI.playerZ+\")\");\r\n"+
"  }\r\n"+
"  MCPI.socket.send(\"world.setBlock(\"+x+\",\"+y+\",\"+z+\",\"+block+\")\");\r\n"+
"};\r\n"+
"\r\n"+
"MCPI.drawPoint = function(x0,y0,z0) {\r\n"+
"    var l = MCPI.nib.length;\r\n"+
"    if (l == 0) {\r\n"+
"        return;\r\n"+
"    }\r\n"+
"    else if (l == 1) {\r\n"+
"        MCPI.setBlock(x0,y0,z0,MCPI.block);\r\n"+
"        return;\r\n"+
"    }\r\n"+
"\r\n"+
"    for (var i = 0 ; i < l ; i++) {\r\n"+
"        var p = MCPI.nib[i];\r\n"+
"        var x = p[0] + x0;\r\n"+
"        var y = p[1] + y0;\r\n"+
"        var z = p[2] + z0;\r\n"+
"        var indexable = \"\"+x+\",\"+y+\",\"+z;\r\n"+
"        if (! (indexable in MCPI.saved)) {\r\n"+
"            MCPI.setBlock(x,y,z,MCPI.block);\r\n"+
"            MCPI.saved[indexable] = 1;\r\n"+
"        }\r\n"+
"    }\r\n"+
"}\r\n"+
"\r\n"+
"MCPI.drawLine = function(x1,y1,z1,x2,y2,z2) {\r\n"+
"    MCPI.saved = Object.create(null);\r\n"+
"    var l = MCPI.getLine(x1,y1,z1,x2,y2,z2);\r\n"+
"    for (var i=0; i<l.length ; i++) {\r\n"+
"        MCPI.drawPoint(l[i][0],l[i][1],l[i][2]);\r\n"+
"    }\r\n"+
"}\r\n"+
"\r\n"+
"MCPI.turtleSetWidth = function(w) {\r\n"+
"    MCPI.nib = [];\r\n"+
"    if (w == 0) {\r\n"+
"        return;\r\n"+
"    }\r\n"+
"    else if (w == 1) {\r\n"+
"        MCPI.nib = [[0,0,0]];\r\n"+
"    }\r\n"+
"    else if (w == 2) {\r\n"+
"        for (x=-1; x<=0; x++)\r\n"+
"          for (y=0; y<=1; y++)\r\n"+
"            for (z=-1; z<=0; z++)\r\n"+
"              MCPI.nib.push([x,y,z]);\r\n"+
"    }\r\n"+
"    else {\r\n"+
"      var r = w/2;\r\n"+
"      var r2 = r*r;\r\n"+
"      for (var x = -Math.ceil(r) ; x <= Math.ceil(r); x++)\r\n"+
"        for (var y = -Math.ceil(r) ; y <= Math.ceil(r); y++)\r\n"+
"          for (var z = -Math.ceil(r) ; z <= Math.ceil(r); z++)\r\n"+
"            if (x*x + y*y + z*z <= r2)\r\n"+
"               MCPI.nib.push([x,y,z]);\r\n"+
"    }\r\n"+
"}\r\n"+
"\r\n"+
"MCPI.turtleYaw = function(angleDegrees) {\r\n"+
"    MCPI.matrix = MCPI.mmMultiply(MCPI.matrix, MCPI.yawMatrix(angleDegrees));\r\n"+
"};\r\n"+
"\r\n"+
"MCPI.turtlePitch = function(angleDegrees) {\r\n"+
"    MCPI.matrix = MCPI.mmMultiply(MCPI.matrix, MCPI.pitchMatrix(angleDegrees));\r\n"+
"};\r\n"+
"\r\n"+
"MCPI.turtleRoll = function(angleDegrees) {\r\n"+
"    MCPI.matrix = MCPI.mmMultiply(MCPI.matrix, MCPI.rollMatrix(angleDegrees));\r\n"+
"};\r\n"+
"\r\n"+
"MCPI.turtleGo = function(distance) {\r\n"+
"    console.log('MCPI.matrix: ', MCPI.matrix, distance);\r\n"+
"    var newX = MCPI.curX + Math.round(MCPI.matrix[0][2] * distance*1000)/1000;\r\n"+
"    var newY = MCPI.curY + Math.round(MCPI.matrix[1][2] * distance*1000)/1000;\r\n"+
"    var newZ = MCPI.curZ + Math.round(MCPI.matrix[2][2] * distance*1000)/1000;\r\n"+
"    console.log(MCPI.curX+\",\"+MCPI.curY+\",\"+MCPI.curZ,' -> ', newX+\",\"+ newY+\",\"+ newZ);\r\n"+
"    if (MCPI.penDown)\r\n"+
"        MCPI.drawLine(MCPI.curX,MCPI.curY,MCPI.curZ,newX,newY,newZ);\r\n"+
"    MCPI.curX = newX;\r\n"+
"    MCPI.curY = newY;\r\n"+
"    MCPI.curZ = newZ;\r\n"+
"};\r\n"+
"\r\n"+
"\r\n"+
"MCPI.socket = new WebSocket(\"ws://\" + (location.search.length ? location.search.substr(1) : \"127.0.0.1\") + \":14711\");\r\n"+
"var originalSocketSend = MCPI.socket.send\r\n"+
"MCPI.socket.send = function(data) {\r\n"+
"    console.log('SEND: '+ data);\r\n"+
"    return originalSocketSend.apply(this, arguments);\r\n"+
"};\r\n"+
"\r\n"+
"\r\n"+
"MCPI.timeoutFunction = function() {\r\n"+
"   MCPI.socket.close();\r\n"+
"   window.alert('Cannot connect to Minecraft API. Make sure you have Minecraft running with Raspberry Jam Mod.');\r\n"+
"   exit();\r\n"+
"};\r\n"+
"\r\n"+
"MCPI.timerID = setTimeout(MCPI.timeoutFunction, 5000);\r\n"+
"\r\n"+
"MCPI.socket.onopen = function(event) {\r\n"+
"  MCPI.socket.onmessage = function(event) {\r\n"+
"    var args = event.data.trim().split(\",\");\r\n"+
"    MCPI.playerX = Math.floor(parseFloat(args[0]));\r\n"+
"    MCPI.playerY = Math.floor(parseFloat(args[1]));\r\n"+
"    MCPI.playerZ = Math.floor(parseFloat(args[2]));\r\n"+
"    MCPI.curX = MCPI.playerX;\r\n"+
"    MCPI.curY = MCPI.playerY;\r\n"+
"    MCPI.curZ = MCPI.playerZ;\r\n"+
"    MCPI.playerShiftedHeight = MCPI.playerY;\r\n"+
"\r\n"+
"    MCPI.socket.onmessage = function(event) {\r\n"+
"      var yaw = parseFloat(event.data.trim());\r\n"+
"      MCPI.matrix = MCPI.yawMatrix(yaw);\r\n"+
"      clearTimeout(MCPI.timerID);\r\n"+
"\r\n"+
"\r\n";
  Blockly.JavaScript.cleanups_['minecraft'] = "MCPI.socket.close();\r\n"+
"}; // end MCPI.socket.onmessage for player.getRotation()\r\n"+
"MCPI.socket.send(\"player.getRotation()\");\r\n"+
"}; // end MCPI.socket.onmessage for player.getPos()\r\n"+
"MCPI.socket.send(\"player.getPos()\");\r\n"+
"}; // end MCPI.socket.onopen\r\n";
};

Blockly.JavaScript['minecraft_set_block'] = function(block) {
  Blockly.JavaScript.minecraft();

  var dropdown_block = block.getFieldValue('BLOCK');
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ADDITION);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ADDITION);
  var value_z = Blockly.JavaScript.valueToCode(block, 'z', Blockly.JavaScript.ORDER_ADDITION);
  var code = 'MCPI.setBlock('+value_x+'+MCPI.playerX,'+value_y+'+MCPI.playerY,'+value_z+'+MCPI.playerZ,"'+dropdown_block+'");\n';
  return code;
};

Blockly.JavaScript['minecraft_turtle_go'] = function(block) {
  Blockly.JavaScript.minecraft();
  var value_distance = Blockly.JavaScript.valueToCode(block, 'DISTANCE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'MCPI.turtleGo('+value_distance+');\n';
  return code;
};

Blockly.JavaScript['minecraft_post_to_chat'] = function(block) {
  Blockly.JavaScript.minecraft();
  var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'MCPI.postToChat('+value_message+');\n';
  return code;
};

Blockly.JavaScript['minecraft_turtle_yaw'] = function(block) {
  Blockly.JavaScript.minecraft();
  var dropdown_direction = block.getFieldValue('DIRECTION');
  if (dropdown_direction == '1') {
    var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'MCPI.turtleYaw('+value_angle+');\n';
  }
  else {
    var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_UNARY_NEGATION);
    var code = 'MCPI.turtleYaw(-'+value_angle+');\n';
  }
  return code;
};

Blockly.JavaScript['minecraft_turtle_pitch'] = function(block) {
  Blockly.JavaScript.minecraft();
  var dropdown_direction = block.getFieldValue('DIRECTION');
  if (dropdown_direction == '1') {
    var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'MCPI.turtlePitch('+value_angle+');\n';
  }
  else {
    var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_UNARY_NEGATION);
    var code = 'MCPI.turtlePitch(-'+value_angle+');\n';
  }
  return code;
};

Blockly.JavaScript['minecraft_turtle_roll'] = function(block) {
  Blockly.JavaScript.minecraft();
  var dropdown_direction = block.getFieldValue('DIRECTION');
  if (dropdown_direction == '1') {
    var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'MCPI.turtleRoll('+value_angle+');\n';
  }
  else {
    var value_angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_UNARY_NEGATION);
    var code = 'MCPI.turtleRoll(-'+value_angle+');\n';
  }
  return code;
};

Blockly.JavaScript['minecraft_turtle_pen_block'] = function(block) {
  Blockly.JavaScript.minecraft();
  var dropdown_block = block.getFieldValue('BLOCK');
  var code = 'MCPI.block = "'+dropdown_block+'";\n';
  return code;
};

Blockly.JavaScript['minecraft_turtle_pen_width'] = function(block) {
  Blockly.JavaScript.minecraft();
  var value_width = Blockly.JavaScript.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'MCPI.turtleSetWidth('+value_width+');\n';
  return code;
};

Blockly.JavaScript['minecraft_turtle_pen'] = function(block) {
  Blockly.JavaScript.minecraft();
  var dropdown_mode = block.getFieldValue('MODE');
  var code = 'MCPI.penDown = '+Boolean(parseInt(dropdown_mode))+';\n';
  return code;
};
