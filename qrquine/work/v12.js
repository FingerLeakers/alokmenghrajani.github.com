function fs(r,c,v){
  modules[r][c]=v
//  v&&cx.fillRect(c*3,r*3,3,3);
//  id[3*C*c+r]=v
}
function setupPositionProbePattern(i,j){
  for(r=-1;r<8;r++)
    if(i+r>-1&&##count##>i+r)
      for(c=-1;c<8;c++)
        fs(i+r,j+c,0<r&&(r<7&&!(c%6))||((c+1)%8&&!(r%6)||1<r&&(r<5&&(1<c&&c<5))))
}

function QRPolynomial(num, shift) {
  var offset = 0;
  while (offset < num.length && num[offset] == 0) {
    offset++;
  }
  this.num = new Array(num.length - offset + shift);
  for (var i = 0; i < num.length - offset; i++) {
    this.num[i] = num[i + offset];
  }
}

QRPolynomial.prototype = {
  get : function(index) {
    return this.num[index];
  },
  getLength : function() {
    return this.num.length;
  },
}

getRSBlocks = function() {
  var r = [];
  for (var i=0; i<##rsBlocks.count##; i++) {
    if (i<##rsBlocks.offset##) {
      r.push([##rsBlocks.value## + 30, ##rsBlocks.value##]);
    } else {
      r.push([##rsBlocks.value## + 30 + 1, ##rsBlocks.value## + 1]);      
    }
  }
  return r;
}

// TODO: make arr a global?
function QRBitBuffer2set(arr, val, length) {
  for (var i = 1; i <= length; i++) {
    arr.push(val >> (length-i)&1);
  }
}
function QRBitBuffer2get(arr, val) {
  var r=0
  for (var i=0; i<8; i++) {
    r = (r<<1) | arr[val*8+i];
  }
  return r;
}

modules = null;
moduleCount = 0;
dataList = [unescape_location_href_]
dataCache = null;
moduleCount = ##count##;
modules = [moduleCount];
for (row = 0; row < moduleCount; row++) {
  modules[row] = [moduleCount]; // TODO: avoid doing this?
  for (col = 0; col < moduleCount; col++) {
      modules[row][col] = null;
  }
}
setupPositionProbePattern(0, 0);
setupPositionProbePattern(moduleCount - 7, 0);
setupPositionProbePattern(0, moduleCount - 7);

var pos = ##pos##;
for (var i = 0; i < 6; i++) {    
  for (var j = 0; j < 6; j++) {
    var row = pos[i];
    var col = pos[j];
    if (modules[row][col] != null) {
      continue;
    }
    for (var r = -2; r <= 2; r++) {
      for (var c = -2; c <= 2; c++) {
        if (r == -2 || r == 2 || c == -2 || c == 2 
            || (r == 0 && c == 0) ) {
          modules[row + r][col + c] = true;
        } else {
          modules[row + r][col + c] = false;
        }
      }
    }
  }
}

for (var r = 8; r < moduleCount - 8; r++) {
  if (modules[r][6] != null) {
    continue;
  }
  modules[r][6] = (r % 2 == 0);
}
for (var c = 8; c < moduleCount - 8; c++) {
  if (modules[6][c] != null) {
    continue;
  }
  modules[6][c] = (c % 2 == 0);
}

var bits = ##BCHTypeInfo##;
// vertical   
for (var i = 0; i < 15; i++) {
  var mod = ( (bits >> i) & 1) == 1;
  if (i < 6) {
    modules[i][8] = mod;
  } else if (i < 8) {
    modules[i + 1][8] = mod;
  } else {
    modules[moduleCount - 15 + i][8] = mod;
  }
}
// horizontal
for (var i = 0; i < 15; i++) {
  var mod = ( (bits >> i) & 1) == 1;
  if (i < 8) {
    modules[8][moduleCount - i - 1] = mod;
  } else if (i < 9) {
    modules[8][15 - i - 1 + 1] = mod;
  } else {
    modules[8][15 - i - 1] = mod;
  }
}
// fixed module
modules[moduleCount - 8][8] = true; 

var bits = ##BCHTypeNumber##;
for (var i = 0; i < 18; i++) {
  var mod = (( (bits >> i) & 1) == 1);
  modules[Math.floor(i / 3)][i % 3 + moduleCount - 8 - 3] = mod;
}
for (var i = 0; i < 18; i++) {
  var mod = (( (bits >> i) & 1) == 1);
  modules[i % 3 + moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
}

var rsBlocks = getRSBlocks();
var buffer2 = [];
for (var i = 0; i < dataList.length; i++) {
  var data = dataList[i];
  QRBitBuffer2set(buffer2, 4, 4);
  QRBitBuffer2set(buffer2, data.length, 16);
  for (var j = 0; j < data.length; j++) {
    QRBitBuffer2set(buffer2, data.charCodeAt(j), 8);
  }
}
// calc num max data.
var totalDataCount = ##totalDataCount##;
// end code
if (buffer2.length + 4 <= totalDataCount * 8) {
  QRBitBuffer2set(buffer2, 0, 4);
}
// padding
while (buffer2.length % 8 != 0) {
  QRBitBuffer2set(buffer2, 0, 1);
}
// padding
while (true) {
  if (buffer2.length >= totalDataCount * 8) {
    break;
  }
  QRBitBuffer2set(buffer2, 0xEC, 8);
  if (buffer2.length >= totalDataCount * 8) {
    break;
  }
  QRBitBuffer2set(buffer2, 0x11, 8);
}

function poly_mult(a, b) {
  var z=0
  for (;b;) {
    if (b&1) 
      z^=a
    a<<=1
    b>>=1
    if (a>255)
      a^=285
  }
  return z
}

function long_div(a, b) {
  if (a.length < b.length) {
    return a;
  }
  var n = a[0] / b[0];
  for (var i=0; i<b.length; i++) {
    var t1 = a[i] ^ poly_mult(n, b[i]);
    a[i] = t1;
  }
  a.shift();
  return long_div(a, b);
}

var offset = 0;
var maxDcCount = 0;
var maxEcCount = 0;
var dcdata = new Array(##rsBlocks.count##);
var ecdata = new Array(##rsBlocks.count##);
for (var r = 0; r < ##rsBlocks.count##; r++) {
  var dcCount = rsBlocks[r][1];
  var ecCount = rsBlocks[r][0] - dcCount;
  maxDcCount = Math.max(maxDcCount, dcCount);
  maxEcCount = Math.max(maxEcCount, ecCount);
  dcdata[r] = new Array(dcCount);
  for (var i = 0; i < dcdata[r].length; i++) {
    dcdata[r][i] = QRBitBuffer2get(buffer2, i+offset);
  }
  offset += dcCount;
  // it might be shorter to compute this?
  var rsPoly = new QRPolynomial([1, 212, 246, 77, 73, 195, 192, 75, 98, 5, 70, 103, 177, 22, 217, 138, 51, 181, 246, 72, 25, 18, 46, 228, 74, 216, 195, 11, 106, 130, 150], 0)
  var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
  var t = long_div(rawPoly.num, rsPoly.num);
  var modPoly = new QRPolynomial(t, 0);

  ecdata[r] = new Array(rsPoly.getLength() - 1);
  for (var i = 0; i < ecdata[r].length; i++) {
    var modIndex = i + modPoly.getLength() - ecdata[r].length;
    ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
  }
}
var totalCodeCount = ##totalCodeCount##;
var data = new Array(totalCodeCount);
var index = 0;
for (var i = 0; i < maxDcCount; i++) {
  for (var r = 0; r < ##rsBlocks.count##; r++) {
    if (i < dcdata[r].length) {
      data[index++] = dcdata[r][i];
    }
  }
}
for (var i = 0; i < maxEcCount; i++) {
  for (var r = 0; r < ##rsBlocks.count##; r++) {
    if (i < ecdata[r].length) {
      data[index++] = ecdata[r][i];
    }
  }
}

var inc = -1;
var row = moduleCount - 1;
var bitIndex = 7;
var byteIndex = 0;    
for (var col = moduleCount - 1; col > 0; col -= 2) {  
  if (col == 6) col--;  
  while (true) {  
    for (var c = 0; c < 2; c++) {
      if (modules[row][col - c] == null) {
        var dark = false;
        if (byteIndex < data.length) {
          dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
        }
        var mask = (row % 2 == 0)
        if (mask) {
          dark = !dark;
        }
        modules[row][col - c] = dark;
        bitIndex--;
        if (bitIndex == -1) {
          byteIndex++;
          bitIndex = 7;
        }
      }
    }
    row += inc;
    if (row < 0 || moduleCount <= row) {
      row -= inc;
      inc = -inc;
      break;
    }
  }
}

C.width = ##count##*3;
C.height = ##count##*3;
var ctx= C.getContext('2d');
// draw in the canvas
for( var row = 0; row < ##count##; row++ ){
  for( var col = 0; col < ##count##; col++ ){
    ctx.fillStyle = modules[row][col] ? "#000000" : "#ffffff";
    var w = (Math.ceil((col+1)*3) - Math.floor(col*3));
    var h = (Math.ceil((row+1)*3) - Math.floor(row*3));
    ctx.fillRect(Math.round(col*3),Math.round(row*3), w, h);
  }
}