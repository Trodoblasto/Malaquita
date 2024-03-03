function multiplyM(matrix, point) {
    let x = point[0];
    let y = point[1];
    let z = point[2];
    let w = point[3];
    
    let resultX = x * matrix[0] + y * matrix[1] + z * matrix[2] + w * matrix[3];    
    let resultY = x * matrix[4] + y * matrix[5] + z * matrix[6] + w * matrix[7];    
    let resultZ = x * matrix[8] + y * matrix[9] + z * matrix[10] + w * matrix[11];    
    let resultW = x * matrix[12] + y * matrix[13] + z * matrix[14] + w * matrix[15];  
    return [resultX, resultY, resultZ, resultW];
  }