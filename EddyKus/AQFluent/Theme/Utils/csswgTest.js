.pragma library

.import "csswg.js" as CssWg

// 测试 isFlat 函数
function testIsFlat() {
  // 测试输入为扁平化数组的情况
  const flatArray = [1, 2, 3];
  console.log(CssWg.isFlat(flatArray)); // 期望输出: true

  // 测试输入为非扁平化数组的情况
  const nestedArray = [[1, 2, 3], [4, 5, 6]];
  console.log(CssWg.isFlat(nestedArray)); // 期望输出: false
}

// 测试 multiplyMatrices 函数
function testMultiplyMatrices() {
  // 测试二维矩阵相乘
  const matrixA = [[1, 2], [3, 4]];
  const matrixB = [[5, 6], [7, 8]];
  console.log(CssWg.multiplyMatrices(matrixA, matrixB)); // 期望输出: [[19, 22], [43, 50]]

  // 测试行向量与列向量的点乘
  const vectorA = [1, 2, 3];
  const vectorB = [[4], [5], [6]];
  console.log(CssWg.multiplyMatrices(vectorA, vectorB)); // 期望输出: [32]

  // 测试两个一维向量的点乘
  const vectorE = [1, 2, 3];
  const vectorF = [4, 5, 6];
  console.log(CssWg.multiplyMatrices(vectorE, vectorF)); // 期望输出: 32
}

// 调用测试函数进行测试
//testIsFlat();
//testMultiplyMatrices();
