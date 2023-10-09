/**
 * 判断一个二维数组是否是"扁平化"的数组
 * @param {Array} arr - 输入的二维数组
 * @returns {boolean} - 如果输入的二维数组是"扁平化"的，则返回true；否则返回false
 */
function isFlat(arr) {
    // 遍历数组中的每个元素
    for (let i = 0; i < arr.length; i++) {
      // 如果当前元素是一个数组，则递归检查该数组是否扁平化
      if (Array.isArray(arr[i])) {
        return false; //如果有嵌套数组存在则返回false
      }
    }
    return true;
}

/**
 * 矩阵相乘函数
 * @param {Array} AMatrixOrVector - 输入的矩阵A或向量A，表示为二维数组或一维数组
 * @param {Array} BMatrixOrVector - 输入的矩阵B或向量B，表示为二维数组或一维数组
 * @returns {Array} - 相乘得到的矩阵或向量，表示为二维数组或一维数组
 */
function multiplyMatrices(AMatrixOrVector, BMatrixOrVector) {
    // 获取矩阵A的行数m
    var m = AMatrixOrVector.length;

    // 将A转换为二维数组，如果A本身是一维数组（向量）
    var A = isFlat(AMatrixOrVector)
        ? [AMatrixOrVector] // A是向量，转换为[[a, b, c, ...]]格式
        : AMatrixOrVector;  // A是矩阵，保持不变

    // 将B转换为二维数组，如果B本身是一维数组（向量）
    var B = isFlat(BMatrixOrVector)
        ? BMatrixOrVector.map(function (x) { return [x]; }) // B是向量，转换为[[a], [b], [c], ...]]格式
        : BMatrixOrVector;  // B是矩阵，保持不变

    // 获取矩阵B的列数p
    var p = B[0].length;

    // 转置矩阵B，得到B的列向量组成的二维数组B_cols
    var B_cols = B[0].map(function (_, i) { return B.map(function (x) { return x[i]; }); });

    // 计算矩阵相乘的结果product
    var product = A.map(function (row) {
        return B_cols.map(function (col) {
            if (!Array.isArray(row)) {
                // 如果A是向量，则使用点乘计算
                return col.reduce(function (a, c) { return a + c * row; }, 0);
            }
            // 如果A是矩阵，则使用矩阵乘法计算
            return row.reduce(function (a, c, i) { return a + c * (col[i] || 0); }, 0);
        });
    });

    if (m === 1) {
        // 如果A只有一行，将product转换为一维数组
        product = product[0];
    }

    if (p === 1) {
        // 如果B只有一列，将product转换为一维数组
        return product.map(function (x) { return x[0]; });
    }

    // 返回相乘结果product
    return product;
}

// Sample code for color conversions
// Conversion can also be done using ICC profiles and a Color Management System
// For clarity, a library is used for matrix multiplication (multiply-matrices.js)
// [willshown]: Adjusted to export a TypeScript module. Retrieved on 24 May 2021
// from https://drafts.csswg.org/css-color-4/conversions.js
// sRGB-related functions
function lin_sRGB(RGB) {
    // convert an array of sRGB values
    // where in-gamut values are in the range [0 - 1]
    // to linear light (un-companded) form.
    // https://en.wikipedia.org/wiki/SRGB
    // Extended transfer function:
    // for negative values,  linear portion is extended on reflection of axis,
    // then reflected power function is used.
    return RGB.map(function (val) {
        var sign = val < 0 ? -1 : 1;
        var abs = Math.abs(val);
        if (abs < 0.04045) {
            return val / 12.92;
        }
        return sign * Math.pow((abs + 0.055) / 1.055, 2.4);
    });
}

/**
 * 将线性光sRGB值数组转换为伽马校正形式
 * @param {number[]} RGB - 包含线性光sRGB值范围在 0.0-1.0 内的数组
 * @returns {number[]} - 转换为伽马校正形式的值数组
 */
function gam_sRGB(RGB) {
    // 转换线性光sRGB值数组为伽马校正形式
    // 参考链接：https://en.wikipedia.org/wiki/SRGB
    // 扩展的传输函数：
    // 对于负值，线性部分的延伸在坐标轴的反射上进行，
    // 然后在下方使用反射的幂函数

    return RGB.map(function (val) {
        var sign = val < 0 ? -1 : 1;
        var abs = Math.abs(val);
        if (abs > 0.0031308) {
            return sign * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
        }
        return 12.92 * val;
    });
}

/**
 * 将线性光sRGB值数组转换为CIE XYZ
 * 使用sRGB自身的白点D65（无色差适应）
 * @param {number[]} rgb - 包含线性光sRGB值的数组
 * @returns {number[]} - 转换为CIE XYZ的值数组
 */
function lin_sRGB_to_XYZ(rgb) {
    // 将线性光sRGB值数组转换为CIE XYZ
    // 使用sRGB自身的白点D65（无色差适应）
    var M = [
        [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
        [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
        [0.01933081871559182, 0.11919477979462598, 0.9505321522496607],
    ];
    return multiplyMatrices(M, rgb);
}

/**
 * 将CIE XYZ转换为线性光sRGB值数组
 * @param {number[]} XYZ - 包含CIE XYZ值的数组
 * @returns {number[]} - 转换为线性光sRGB值的数组
 */
function XYZ_to_lin_sRGB(XYZ) {
    // 将CIE XYZ转换为线性光sRGB值数组
    var M = [
        [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
        [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
        [0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
    ];
    return multiplyMatrices(M, XYZ);
}

function lin_P3(RGB) {
    // convert an array of display-p3 RGB values in the range 0.0 - 1.0
    // to linear light (un-companded) form.
    return lin_sRGB(RGB); // same as sRGB
}

function gam_P3(RGB) {
    // convert an array of linear-light display-p3 RGB  in the range 0.0-1.0
    // to gamma corrected form
    return gam_sRGB(RGB); // same as sRGB
}

/**
 * 将线性光Display P3值数组转换为CIE XYZ
 * @param {number[]} rgb - 包含线性光Display P3值的数组
 * @returns {number[]} - 转换为CIE XYZ值的数组
 */
function lin_P3_to_XYZ(rgb) {
    // 使用 D65（无色差适应）将线性光Display P3值数组转换为CIE XYZ
    // 参考：http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
    var M = [
        [0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
        [0.2289745640697488, 0.6917385218365064, 0.079286914093745],
        [0.0, 0.04511338185890264, 1.043944368900976],
    ];
    // 计算结果中的 0 实际上是经过计算的无穷小值 -3.972075516933488e-17
    return multiplyMatrices(M, rgb);
}

/**
 * 将CIE XYZ值数组转换为线性光P3值数组
 * @param {number[]} XYZ - 包含CIE XYZ值的数组
 * @returns {number[]} - 转换为线性光P3值的数组
 */
function XYZ_to_lin_P3(XYZ) {
    // 将CIE XYZ值数组转换为线性光P3值数组
    var M = [
        [2.493496911941425, -0.9313836179191239, -0.40271078445071684],
        [-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
        [0.03584583024378447, -0.07617238926804182, 0.9568845240076872],
    ];
    return multiplyMatrices(M, XYZ);
}

/**
 * 将 ProPhoto RGB 值数组转换为线性光形式
 * @param {number[]} RGB - 包含 ProPhoto RGB 值的数组
 * @returns {number[]} - 转换为线性光形式的数组
 */
function lin_ProPhoto(RGB) {
    // 转换 ProPhoto RGB 值数组为线性光形式
    // 其中色域内的颜色范围为 [0.0 - 1.0]
    // 转换曲线为伽马 1.8 且带有一个小的线性部分
    // 扩展的转换函数
    var Et2 = 16 / 512;
    return RGB.map(function (val) {
        var sign = val < 0 ? -1 : 1;
        var abs = Math.abs(val);
        if (abs <= Et2) {
            return val / 16;
        }
        return sign * Math.pow(val, 1.8);
    });
}

/**
 * 将线性光 ProPhoto RGB 值数组转换为伽马校正形式
 * @param {number[]} RGB - 包含线性光 ProPhoto RGB 值的数组
 * @returns {number[]} - 转换为伽马校正形式的数组
 */
function gam_ProPhoto(RGB) {
    // 将线性光 ProPhoto RGB 值数组转换为伽马校正形式
    // 其中线性光范围为 0.0-1.0
    // 转换曲线为伽马 1.8 且带有一个小的线性部分
    // TODO 对于负值，将线性部分延伸在对称轴上，然后添加 pow 函数
    var Et = 1 / 512;
    return RGB.map(function (val) {
        var sign = val < 0 ? -1 : 1;
        var abs = Math.abs(val);
        if (abs >= Et) {
            return sign * Math.pow(abs, 1 / 1.8);
        }
        return 16 * val;
    });
}

/**
 * 将线性光 ProPhoto RGB 值数组转换为 CIE XYZ 值
 * 使用 D50 白点（因此后续不需要色彩适应）
 * @param {number[]} rgb - 包含线性光 ProPhoto RGB 值的数组
 * @returns {number[]} - 转换为 CIE XYZ 值的数组
 */
function lin_ProPhoto_to_XYZ(rgb) {
    // 将线性光 ProPhoto RGB 值数组转换为 CIE XYZ 值
    // 使用 D50 白点（因此后续不需要色彩适应）
    // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
    var M = [
        [0.7977604896723027, 0.13518583717574031, 0.0313493495815248],
        [0.2880711282292934, 0.7118432178101014, 0.00008565396060525902],
        [0.0, 0.0, 0.8251046025104601],
    ];
    return multiplyMatrices(M, rgb);
}

/**
 * 将 CIE XYZ 值数组转换为线性光 ProPhoto RGB 值
 * @param {number[]} XYZ - 包含 CIE XYZ 值的数组
 * @returns {number[]} - 转换为线性光 ProPhoto RGB 值的数组
 */
function XYZ_to_lin_ProPhoto(XYZ) {
    // 将 CIE XYZ 值数组转换为线性光 ProPhoto RGB 值
    var M = [
        [1.3457989731028281, -0.25558010007997534, -0.05110628506753401],
        [-0.5446224939028347, 1.5082327413132781, 0.02053603239147973],
        [0.0, 0.0, 1.2119675456389454],
    ];
    return multiplyMatrices(M, XYZ);
}

/**
 * 将 a98-rgb 值数组转换为线性光形式
 * @param {number[]} RGB - 包含 a98-rgb 值的数组
 * @returns {number[]} - 转换为线性光形式的数组
 */
function lin_a98rgb(RGB) {
    // 将 a98-rgb 值数组转换为线性光形式
    // 色域内的颜色范围为 0.0 - 1.0
    // 负值也被接受
    return RGB.map(function (val) {
        var sign = val < 0 ? -1 : 1;
        var abs = Math.abs(val);
        return sign * Math.pow(abs, 563 / 256);
    });
}

/**
 * 将线性光的 a98-rgb 值数组转换为伽马校正形式
 * @param {number[]} RGB - 包含线性光的 a98-rgb 值的数组
 * @returns {number[]} - 转换为伽马校正形式的数组
 */
function gam_a98rgb(RGB) {
    // 将线性光的 a98-rgb 值数组转换为伽马校正形式
    // 色域内的颜色范围为 0.0 - 1.0
    // 负值也被接受
    return RGB.map(function (val) {
        var sign = val < 0 ? -1 : 1;
        var abs = Math.abs(val);
        return sign * Math.pow(abs, 256 / 563);
    });
}

/**
 * 将线性光 a98-rgb 值数组转换为 CIE XYZ 值
 * @param {number[]} rgb - 包含线性光 a98-rgb 值的数组
 * @returns {number[]} - 转换为 CIE XYZ 值的数组
 */
function lin_a98rgb_to_XYZ(rgb) {
    // 将线性光 a98-rgb 值数组转换为 CIE XYZ 值
    // 使用 http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
    // 比 https://www.adobe.com/digitalimag/pdfs/AdobeRGB1998.pdf 的第 4.3.5.3 节更精确
    // 但下面的数值是根据 R、G、B、W 的色度坐标从头原理计算得出的
    // 参见 matrixmaker.html
    var M = [
        [0.5766690429101305, 0.1855582379065463, 0.1882286462349947],
        [0.29734497525053605, 0.6273635662554661, 0.07529145849399788],
        [0.02703136138641234, 0.07068885253582723, 0.9913375368376388],
    ];
    return multiplyMatrices(M, rgb);
}

/**
 * 将 CIE XYZ 值数组转换为线性光 a98-rgb 值
 * @param {number[]} XYZ - 包含 CIE XYZ 值的数组
 * @returns {number[]} - 转换为线性光 a98-rgb 值的数组
 */
function XYZ_to_lin_a98rgb(XYZ) {
    var M = [
        [2.0415879038107465, -0.5650069742788596, -0.34473135077832956],
        [-0.9692436362808795, 1.8759675015077202, 0.04155505740717557],
        [0.013444280632031142, -0.11836239223101838, 1.0151749943912054],
    ];
    return multiplyMatrices(M, XYZ);
}

/**
 * 将 rec2020 RGB 值数组转换为线性光形式
 * @param {number[]} RGB - 包含 rec2020 RGB 值的数组
 * @returns {number[]} - 转换为线性光形式的数组
 */
function lin_2020(RGB) {
    // 色域内的颜色范围为 0.0 - 1.0
    // 参考 ITU-R BT.2020-2 第 4 页
    var α = 1.09929682680944;
    var β = 0.018053968510807;
    return RGB.map(function (val) {
        var sign = val < 0 ? -1 : 1;
        var abs = Math.abs(val);
        if (abs < β * 4.5) {
            return val / 4.5;
        }
        return sign * Math.pow((abs + α - 1) / α, 1 / 0.45);
    });
}

/**
 * 将线性光的 rec2020 RGB 值数组转换为伽马校正形式
 * @param {number[]} RGB - 包含线性光的 rec2020 RGB 值的数组
 * @returns {number[]} - 转换为伽马校正形式的数组
 */
function gam_2020(RGB) {
    // 色域内的颜色范围为 0.0 - 1.0
    // 参考 ITU-R BT.2020-2 第 4 页
    var α = 1.09929682680944;
    var β = 0.018053968510807;
    return RGB.map(function (val) {
        var sign = val < 0 ? -1 : 1;
        var abs = Math.abs(val);
        if (abs > β) {
            return sign * (α * Math.pow(abs, 0.45) - (α - 1));
        }
        return 4.5 * val;
    });
}

/**
 * 将线性光的 rec2020 值数组转换为 CIE XYZ 值
 * @param {number[]} rgb - 包含线性光的 rec2020 值的数组
 * @returns {number[]} - 转换为 CIE XYZ 值的数组
 */
function lin_2020_to_XYZ(rgb) {
    // 使用 D65（无色彩适应）
    // 使用 http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
    var M = [
        [0.6369580483012914, 0.14461690358620832, 0.1688809751641721],
        [0.2627002120112671, 0.6779980715188708, 0.05930171646986196],
        [0.0, 0.028072693049087428, 1.060985057710791],
    ];
    // 实际上，0 是计算为 4.994106574466076e-17
    return multiplyMatrices(M, rgb);
}

/**
 * 将 CIE XYZ 值数组转换为线性光的 rec2020 值
 * @param {number[]} XYZ - 包含 CIE XYZ 值的数组
 * @returns {number[]} - 转换为线性光的 rec2020 值的数组
 */
function XYZ_to_lin_2020(XYZ) {
    // 将 CIE XYZ 值数组转换为线性光的 rec2020 值
    var M = [
        [1.7166511879712674, -0.35567078377639233, -0.25336628137365974],
        [-0.6666843518324892, 1.6164812366349395, 0.01576854581391113],
        [0.017639857445310783, -0.042770613257808524, 0.9421031212354738],
    ];
    return multiplyMatrices(M, XYZ);
}

/**
 * 将 CIE XYZ 值从 D65 白点转换到 D50 白点
 * 使用 Bradford 色彩适应
 * @param {number[]} XYZ - 包含 CIE XYZ 值的数组
 * @returns {number[]} - 转换为 D50 白点的 CIE XYZ 值的数组
 */
function D65_to_D50(XYZ) {
    // 将 CIE XYZ 值从 D65 白点转换到 D50 白点
    // 使用 Bradford 色彩适应
    // 矩阵 M 的结果是三个操作的合并：
    // - 从 XYZ 转换到视网膜锥体域
    // - 将分量从一个参考白点缩放到另一个参考白点
    // - 转换回 XYZ
    // 使用 http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html
    var M = [
        [1.0479298208405488, 0.022946793341019088, -0.05019222954313557],
        [0.029627815688159344, 0.990434484573249, -0.01707382502938514],
        [-0.009243058152591178, 0.015055144896577895, 0.7518742899580008],
    ];
    return multiplyMatrices(M, XYZ);
}

/**
 * 将 CIE XYZ 值从 D50 白点转换到 D65 白点
 * 使用 Bradford 色彩适应
 * @param {number[]} XYZ - 包含 CIE XYZ 值的数组
 * @returns {number[]} - 转换为 D65 白点的 CIE XYZ 值的数组
 */
function D50_to_D65(XYZ) {
    var M = [
        [0.9554734527042182, -0.023098536874261423, 0.0632593086610217],
        [-0.028369706963208136, 1.0099954580058226, 0.021041398966943008],
        [0.012314001688319899, -0.020507696433477912, 1.3303659366080753],
    ];
    return multiplyMatrices(M, XYZ);
}

/**
 * 将相对于 D50 白点的 CIE XYZ 值转换为 CIE Lab 值
 * @param {number[]} XYZ - 包含相对于 D50 白点的 CIE XYZ 值的数组
 * @returns {number[]} - 转换为 CIE Lab 值的数组
 */
function XYZ_to_Lab(XYZ) {
    // 假设 XYZ 值相对于 D50 白点，并根据 CIE 标准进行转换
    // 这里的常数 ε 和 κ 是根据标准定义的有理数
    var ε = 216 / 24389; // 6^3/29^3
    var κ = 24389 / 27; // 29^3/3^3
    var white = [0.96422, 1.0, 0.82521]; // D50 参考白点
    // 计算 xyz，即相对于参考白点进行缩放的 XYZ 值
    var xyz = XYZ.map(function (value, i) { return value / white[i]; });
    // 现在计算 f
    var f = xyz.map(function (value) { return (value > ε ? Math.cbrt(value) : (κ * value + 16) / 116); });
    return [
        116 * f[1] - 16,
        500 * (f[0] - f[1]),
        200 * (f[1] - f[2]), // b
    ];
}

/**
 * 将 CIE Lab 值转换为相对于 D50 白点的 CIE XYZ 值
 * @param {number[]} Lab - 包含 CIE Lab 值的数组
 * @returns {number[]} - 转换为相对于 D50 白点的 CIE XYZ 值的数组
 */
function Lab_to_XYZ(Lab) {
    // 参考链接：http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
    var κ = 24389 / 27; // 29^3/3^3
    var ε = 216 / 24389; // 6^3/29^3
    var white = [0.96422, 1.0, 0.82521]; // D50 参考白点
    var f = [];
    // 计算 f，从与亮度相关的项开始
    f[1] = (Lab[0] + 16) / 116;
    f[0] = Lab[1] / 500 + f[1];
    f[2] = f[1] - Lab[2] / 200;
    // 计算 xyz
    var xyz = [
        Math.pow(f[0], 3) > ε ? Math.pow(f[0], 3) : (116 * f[0] - 16) / κ,
        Lab[0] > κ * ε ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / κ,
        Math.pow(f[2], 3) > ε ? Math.pow(f[2], 3) : (116 * f[2] - 16) / κ,
    ];
    // 通过参考白点对 xyz 进行缩放来计算 XYZ
    return xyz.map(function (value, i) { return value * white[i]; });
}

/**
 * 将 CIE Lab 值转换为 CIE LCH 值
 * @param {number[]} Lab - 包含 CIE Lab 值的数组
 * @returns {number[]} - 转换为 CIE LCH 值的数组
 */
function Lab_to_LCH(Lab) {
    // 转换为极坐标形式
    var hue = (Math.atan2(Lab[2], Lab[1]) * 180) / Math.PI;
    return [
        Lab[0], // L 值不变
        Math.sqrt(Math.pow(Lab[1], 2) + Math.pow(Lab[2], 2)), // 计算色度 C
        hue >= 0 ? hue : hue + 360, // 色相 H，范围是 [0, 360)
    ];
}

/**
 * 将 CIE LCH 值转换为 CIE Lab 值
 * @param {number[]} LCH - 包含 CIE LCH 值的数组
 * @returns {number[]} - 转换为 CIE Lab 值的数组
 */
function LCH_to_Lab(LCH) {
    // 从极坐标形式转换
    return [
        LCH[0], // L 值不变
        LCH[1] * Math.cos((LCH[2] * Math.PI) / 180), // 计算 a
        LCH[1] * Math.sin((LCH[2] * Math.PI) / 180), // 计算 b
    ];
}

/**
 * 将 RGB 颜色值转换为 HSV 颜色空间。转换公式改编自 http://en.wikipedia.org/wiki/HSV_color_space。
 * 假设 r、g 和 b 的取值范围为 [0, 1]，并返回的 h、s 和 v 在 [0, 1] 范围内。
 *
 * @param   {number[]} rgb  包含红、绿、蓝颜色值的数组
 * @return  {number[]}      HSV 表示的数组
 */
function rgbToHsv(rgb) {
    var r = rgb[0], g = rgb[1], b = rgb[2];
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // 无色
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h = h / 6;
    }
    return [h, s, v];
}

/**
 * 将伽马校正的 sRGB 值数组（范围在 0.0 到 1.0）转换为亮度值。
 * @param {number[]} RGB - 包含伽马校正的 sRGB 值的数组
 * @returns {number} - 亮度值 (Y 值)
 */
function sRGB_to_luminance(RGB) {
    var XYZ = lin_sRGB_to_XYZ(lin_sRGB(RGB));
    return XYZ[1];
}

/**
 * 计算两个 sRGB 值的 WCAG 2.1 对比度比值。
 * @param {number[]} RGB1 - 包含 sRGB 值的数组 [R, G, B]，范围为 0.0 到 1.0
 * @param {number[]} RGB2 - 包含 sRGB 值的数组 [R, G, B]，范围为 0.0 到 1.0
 * @returns {number} - WCAG 2.1 对比度比值
 */
function contrast(RGB1, RGB2) {
    // 获取两个 sRGB 值的亮度值
    var L1 = sRGB_to_luminance(RGB1);
    var L2 = sRGB_to_luminance(RGB2);
    // 根据亮度比较的结果计算对比度比值
    if (L1 > L2) {
        return (L1 + 0.05) / (L2 + 0.05);
    }
    return (L2 + 0.05) / (L1 + 0.05);
}

/**
 * 将伽马校正的 sRGB 值数组（范围在 0.0 到 1.0）转换为 CIE LCH 值。
 * @param {number[]} RGB - 包含伽马校正的 sRGB 值的数组
 * @returns {number[]} - 包含 L、C、H 值的数组
 */
function sRGB_to_LCH(RGB) {
    // 将伽马校正的 sRGB 值转换为线性光 sRGB 值，然后转换为 CIE XYZ，
    // 再从 D65 适应到 D50，然后将 XYZ 转换为 CIE Lab，
    // 最后将 Lab 转换为 CIE LCH
    return Lab_to_LCH(XYZ_to_Lab(D65_to_D50(lin_sRGB_to_XYZ(lin_sRGB(RGB)))));
}

/**
 * 将伽马校正的 sRGB 值数组（范围在 0.0 到 1.0）转换为 CIE LAB 值。
 * @param {number[]} RGB - 包含伽马校正的 sRGB 值的数组
 * @returns {number[]} - 包含 L、a、b 值的数组
 */
function sRGB_to_LAB(RGB) {
    // 将伽马校正的 sRGB 值转换为线性光 sRGB 值，然后转换为 CIE XYZ
    // 再从 D65 适应到 D50，然后将 XYZ 转换为 CIE LAB
    return XYZ_to_Lab(D65_to_D50(lin_sRGB_to_XYZ(lin_sRGB(RGB))));
}

/**
 * 将伽马校正的 Display P3 值数组（范围在 0.0 到 1.0）转换为 CIE LCH 值。
 * @param {number[]} RGB - 包含伽马校正的 Display P3 值的数组
 * @returns {number[]} - 包含 L、C、H 值的数组
 */
function P3_to_LCH(RGB) {
    // 将伽马校正的 Display P3 值转换为线性光 Display P3 值，然后转换为 CIE XYZ，
    // 再从 D65 适应到 D50，然后将 XYZ 转换为 CIE Lab，
    // 最后将 Lab 转换为 CIE LCH
    return Lab_to_LCH(XYZ_to_Lab(D65_to_D50(lin_P3_to_XYZ(lin_P3(RGB)))));
}

/**
 * 将伽马校正的 Rec.2020 值数组（范围在 0.0 到 1.0）转换为 CIE LCH 值。
 * @param {number[]} RGB - 包含伽马校正的 Rec.2020 值的数组
 * @returns {number[]} - 包含 L、C、H 值的数组
 */
function r2020_to_LCH(RGB) {
    // 将伽马校正的 Rec.2020 值转换为线性光 sRGB 值，然后转换为 CIE XYZ，
    // 再从 D65 适应到 D50，然后将 XYZ 转换为 CIE Lab，
    // 最后将 Lab 转换为 CIE LCH
    return Lab_to_LCH(XYZ_to_Lab(D65_to_D50(lin_2020_to_XYZ(lin_2020(RGB)))));
}

/**
 * 将包含 CIE LCH 值的数组转换为伽马校正的 sRGB 值。
 *
 * @param {number[]} LCH - 包含 L、C、H 值的数组
 * @returns {number[]} - 包含伽马校正的 sRGB 值的数组
 */
function LCH_to_sRGB(LCH) {
    // 将 CIE LCH 值转换为 CIE Lab，然后转换为 CIE XYZ，
    // 适应从 D50 到 D65，然后将 XYZ 转换为线性光 sRGB，
    // 最后进行伽马校正得到 sRGB 值。
    // 对于在色域内的颜色，各分量范围在 0.0 到 1.0。
    // 超出色域的颜色可能会有负分量或大于 1.0 的分量，
    // 因此需要检查处理。
    return gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}

/**
 * 将包含 CIE LAB 值的数组转换为伽马校正的 sRGB 值。
 * @param {number[]} LAB - 包含 L、a、b 值的数组
 * @returns {number[]} - 包含伽马校正的 sRGB 值的数组
 */
function LAB_to_sRGB(LAB) {
    // 将 CIE LAB 值转换为 CIE XYZ，适应从 D50 到 D65，
    // 然后将 XYZ 转换为线性光 sRGB，最后进行伽马校正得到 sRGB 值。
    // 对于在色域内的颜色，各分量范围在 0.0 到 1.0。
    // 超出色域的颜色可能会有负分量或大于 1.0 的分量，因此需要检查处理。
    return gam_sRGB(XYZ_to_lin_sRGB(D50_to_D65(Lab_to_XYZ(LAB))));
}

/**
 * 将包含 CIE LCH 值的数组转换为伽马校正的 Display P3 值。
 * @param {number[]} LCH - 包含 L、C、H 值的数组
 * @returns {number[]} - 包含伽马校正的 Display P3 值的数组
 */
function LCH_to_P3(LCH) {
    // 将 CIE LCH 值转换为 CIE Lab，然后转换为 CIE XYZ，
    // 适应从 D50 到 D65，然后将 XYZ 转换为线性光 Display P3，
    // 最后进行伽马校正得到 Display P3 值。
    // 对于在色域内的颜色，各分量范围在 0.0 到 1.0。
    // 超出色域的颜色可能会有负分量或大于 1.0 的分量，
    // 因此需要检查处理。
    return gam_P3(XYZ_to_lin_P3(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}

/**
 * 将包含 CIE LCH 值的数组转换为伽马校正的 Rec.2020 值。
 *
 * @param {number[]} LCH - 包含 L、C、H 值的数组
 * @returns {number[]} - 包含伽马校正的 Rec.2020 值的数组
 */
function LCH_to_r2020(LCH) {
    // 将 CIE LCH 值转换为 CIE Lab，然后转换为 CIE XYZ，
    // 适应从 D50 到 D65，然后将 XYZ 转换为线性光 Rec.2020，
    // 最后进行伽马校正得到 Rec.2020 值。
    // 对于在色域内的颜色，各分量范围在 0.0 到 1.0。
    // 超出色域的颜色可能会有负分量或大于 1.0 的分量，
    // 因此需要检查处理。
    return gam_2020(XYZ_to_lin_2020(D50_to_D65(Lab_to_XYZ(LCH_to_Lab(LCH)))));
}

/**
 * 将 HSL 值转换为 RGB 值。
 *
 * @param {number} hue - 色调值（范围：[0, 6)）
 * @param {number} sat - 饱和度值（范围：[0, 1]）
 * @param {number} light - 亮度值（范围：[0, 1]）
 * @returns {number[]} - 包含红色、绿色和蓝色通道值的数组（范围：[0, 1]）
 */
function hslToRgb(hue, sat, light) {
    // 算法假设色调已经归一化到半开区间 [0, 6)，饱和度和亮度已归一化到区间 [0, 1]。
    // 返回一个包含红色、绿色和蓝色通道值的数组，范围为 [0, 1]。
    var t2 = light <= 0.5 ? light * (sat + 1) : light + sat - light * sat;
    var t1 = light * 2 - t2;
    var r = hueToChannel(t1, t2, hue + 2);
    var g = hueToChannel(t1, t2, hue);
    var b = hueToChannel(t1, t2, hue - 2);
    return [r, g, b];
}

/**
 * 根据提供的参数 t1、t2 和 hue，计算并返回通道值，
 * 用于将 HSL 值转换为 RGB 值。
 *
 * @param {number} t1 - 范围计算中使用的参数
 * @param {number} t2 - 范围计算中使用的参数
 * @param {number} hue - 色调值
 * @returns {number} - 通道值
 */
function hueToChannel(t1, t2, hue) {
    // 根据 hue 的值进行调整，使其在 [0, 6) 的范围内
    if (hue < 0) {
        hue += 6;
    }
    if (hue >= 6) {
        hue -= 6;
    }

    if (hue < 1) {
        // 在第一段范围内
        return (t2 - t1) * hue + t1;
    }
    else if (hue < 3) {
        // 在第二段范围内
        return t2;
    }
    else if (hue < 4) {
        // 在第三段范围内
        return (t2 - t1) * (4 - hue) + t1;
    }
    else {
        // 在第四段范围内
        return t1;
    }
}

/**
 * 使用简易算法将 CMYK 颜色转换为 sRGB 颜色。
 *
 * @param {number[]} CMYK - 由四个值组成的数组，范围为 [0.0, 1.0]
 * @returns {number[]} - 包含三个 sRGB 值的数组，范围为 [0.0, 1.0]
 *
 * 由于简易算法不生成超出色域范围的颜色，
 * 也不生成实际 CMYK 颜色的准确模拟，
 * 因此输出结果仅用于参考。
 */
function naive_CMYK_to_sRGB(CMYK) {
    var cyan = CMYK[0];
    var magenta = CMYK[1];
    var yellow = CMYK[2];
    var black = CMYK[3];

    // 根据简易算法计算 RGB 值
    var red = 1 - Math.min(1, cyan * (1 - black) + black);
    var green = 1 - Math.min(1, magenta * (1 - black) + black);
    var blue = 1 - Math.min(1, yellow * (1 - black) + black);

    return [red, green, blue];
}

/**
 * 使用简易算法将 sRGB 颜色转换为 CMYK 颜色。
 *
 * @param {number[]} RGB - 由三个值组成的数组，范围为 [0.0, 1.0]
 * @returns {number[]} - 包含四个 CMYK 值的数组，范围为 [0.0, 1.0]
 *
 * 由于简易算法不会生成超出色域范围的颜色，
 * 也不能准确模拟实际 CMYK 颜色，
 * 因此输出结果仅供参考。
 * 使用最大 GCR 和 (我认为是) 200% TAC。
 */
function naive_sRGB_to_CMYK(RGB) {
    var red = RGB[0];
    var green = RGB[1];
    var blue = RGB[2];

    // 根据简易算法计算 CMYK 值
    var black = 1 - Math.max(red, green, blue);
    var cyan = black === 1.0 ? 0 : (1 - red - black) / (1 - black);
    var magenta = black === 1.0 ? 0 : (1 - green - black) / (1 - black);
    var yellow = black === 1.0 ? 0 : (1 - blue - black) / (1 - black);

    return [cyan, magenta, yellow, black];
}

/**
 * 将三个 XYZ 值的数组转换为 x、y 色度坐标。
 *
 * @param {number[]} XYZ - 由三个值组成的数组
 * @returns {number[]} - 包含 x 和 y 色度坐标的数组
 */
function XYZ_to_xy(XYZ) {
    var X = XYZ[0];
    var Y = XYZ[1];
    var Z = XYZ[2];
    var sum = X + Y + Z;
    var x = X / sum;
    var y = Y / sum;
    return [x, y];
}

/**
 * 将 x、y 色度坐标转换为 u*、v* 色度坐标。
 *
 * @param {number[]} xy - 由 x 和 y 色度坐标组成的数组
 * @returns {number[]} - 包含 u* 和 v* 色度坐标的数组
 */
function xy_to_uv(xy) {
    var x = xy[0];
    var y = xy[1];
    // 计算 u* 和 v* 的分母
    var denom = -2 * x + 12 * y + 3;
    // 计算 u* 和 v*
    var u = (4 * x) / denom;
    var v = (9 * y) / denom;
    return [u, v];
}

/**
 * 将三个 XYZ 值的数组转换为 u*、v* 色度坐标。
 *
 * @param {number[]} XYZ - 由三个值组成的数组
 * @returns {number[]} - 包含 u* 和 v* 色度坐标的数组
 */
function XYZ_to_uv(XYZ) {
    var X = XYZ[0];
    var Y = XYZ[1];
    var Z = XYZ[2];
    // 计算 u* 和 v* 的分母
    var denom = X + 15 * Y + 3 * Z;
    // 计算 u* 和 v*
    var u = (4 * X) / denom;
    var v = (9 * Y) / denom;

    return [u, v];
}

/**
 * 检查给定的 LCH 颜色值是否位于 sRGB 色彩空间内部。
 *
 * @param {number} l - L 值
 * @param {number} c - C 值
 * @param {number} h - H 值
 * @returns {boolean} - 如果 LCH 颜色值在 sRGB 色彩空间内部，则返回 true；否则返回 false
 */
function is_LCH_inside_sRGB(l, c, h) {
    var ε = 0.000005;
    var rgb = LCH_to_sRGB([+l, +c, +h]);

    // 判断转换得到的 RGB 值是否在 [0 - ε, 1 + ε] 范围内
    return rgb.reduce(function(a, b) {
        return a && b >= 0 - ε && b <= 1 + ε;
    }, true);
}

/**
 * 将一个 Lab 颜色值调整到 sRGB 色域内，
 * 通过保持 l 和 h 不变，通过二分搜索调整 c 直到颜色位于 sRGB 边界上。
 * ε = 0.0001 被任意选为 "足够接近" 的值。
 *
 * @param {number[]} Lab - Lab 颜色值的数组
 * @returns {number[]} - 调整后处于 sRGB 色域内的 Lab 颜色值数组
 */
function snap_into_gamut(Lab) {
    var ε = 0.0001;
    var LCH = Lab_to_LCH(Lab);
    var l = LCH[0];
    var c = LCH[1];
    var h = LCH[2];

    if (is_LCH_inside_sRGB(l, c, h)) {
        return Lab;
    }
    var hiC = c;
    var loC = 0;
    c /= 2;
    while (hiC - loC > ε) {
        if (is_LCH_inside_sRGB(l, c, h)) {
            loC = c;
        } else {
            hiC = c;
        }
        c = (hiC + loC) / 2;
    }
    return LCH_to_Lab([l, c, h]);
}
