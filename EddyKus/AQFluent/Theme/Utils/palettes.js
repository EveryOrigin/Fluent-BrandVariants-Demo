//此文件包含将几何图形和颜色数学结合起来创建的函数
//并使用调色板曲线。
/**
*沿曲线分布输出阴影时，对于每个阴影的亮度
*对数分布的值用线性分布的平均值
*介于0和1之间的值，0表示使用对数
*值，意思是使用线性值。
*/
.import "csswg.js" as CssWg
.import "geometry.js" as Geometry
.import "../Utils/hueMap.js" as HueMap

var defaultLinearity = 0.75;

/**
 * 根据关键颜色计算吸附点范围
 * @param {string} keyColor - 关键颜色
 * @returns {number[]} - 吸附点范围
 */
function snappingPointsForKeyColor(keyColor) {
    var hue = HueMap.hexToHue(keyColor);
    var range = [
        HueMap.hueToSnappingPointsMap[hue][0] * 100,
        HueMap.hueToSnappingPointsMap[hue][1] * 100,
        HueMap.hueToSnappingPointsMap[hue][2] * 100,
    ];
    return range;
};

/**
 * 根据关键颜色、范围和中心点计算线性插值
 * @param {string} keyColor - 关键颜色
 * @param {number[]} range - 吸附点范围
 * @param {number} centerPoint - 中心点
 * @returns {number[]} - 线性插值结果
 */
function pointsForKeyColor(keyColor, range, centerPoint) {
    var hue = HueMap.hexToHue(keyColor);
    var center = HueMap.hueToSnappingPointsMap[hue][1] * 100;
    var linear = linearInterpolationThroughPoint(range[0], range[1], center, 16);
    return linear;
};

/**
 * 通过给定的起点、终点、中间值和样本数进行线性插值计算
 * @param {number} start - 起点
 * @param {number} end - 终点
 * @param {number} inBetween - 中间值
 * @param {number} numSamples - 样本数
 * @returns {number[]} - 插值结果数组
 */
function linearInterpolationThroughPoint(start, end, inBetween, numSamples) {
    if (numSamples < 3) {
        throw new Error('样本数必须至少为3。');
    }
    // 计算中间值的比例
    var inBetweenRatio = (inBetween - start) / (end - start);
    // 计算中间值在结果数组中的索引
    var inBetweenIndex = Math.floor((numSamples - 1) * inBetweenRatio);
    // 初始化输出数组
    var result = new Array(numSamples);
    // 在结果数组中设置起点、中间值和终点
    result[0] = start;
    result[inBetweenIndex] = inBetween;
    result[numSamples - 1] = end;
    // 计算每段的步长
    var stepBefore = (inBetween - start) / inBetweenIndex;
    var stepAfter = (end - inBetween) / (numSamples - 1 - inBetweenIndex);
    // 在中间值之前的段中填充插值结果
    for (var i = 1; i < inBetweenIndex; i++) {
        result[i] = start + i * stepBefore;
    }
    // 在中间值之后的段中填充插值结果
    for (var i = inBetweenIndex + 1; i < numSamples - 1; i++) {
        result[i] = inBetween + (i - inBetweenIndex) * stepAfter;
    }
    return result;
}

// 定义一个函数，返回在指定范围内的以对数刻度分布的数组
function getLogSpace(min, max, n) {
    var a = min <= 0 ? 0 : Math.log(min);
    var b = Math.log(max);
    var delta = (b - a) / n;
    var result = [Math.pow(Math.E, a)];
    for (var i = 1; i < n; i += 1) {
        result.push(Math.pow(Math.E, a + delta * i));
    }
    result.push(Math.pow(Math.E, b));
    return result;
};

// 根据曲线点集生成颜色调色板阴影
function paletteShadesFromCurvePoints(curvePoints, nShades, linearity = defaultLinearity, keyColor) {
    if (curvePoints.length <= 2) {
        return [];
    }
    var snappingPoints = snappingPointsForKeyColor(keyColor);
    var paletteShades = [];
    var range = [snappingPoints[0], snappingPoints[2]];

    // 在颜色空间中获得二维路径以获取点
    var logLightness = getLogSpace(Math.log10(0), Math.log10(100), nShades);
    var linearLightness = pointsForKeyColor(keyColor, range, snappingPoints[1]);

    var c = 0;
    for (var i = 0; i < nShades; i++) {
        var l = Math.min(range[1], Math.max(range[0], logLightness[i] * (1 - linearity) + linearLightness[i] * linearity));

        // 在曲线点集中找到合适的插值点
        while (l > curvePoints[c + 1][0]) {
            c++;
        }

        var _a = curvePoints[c], l1 = _a[0], a1 = _a[1], b1 = _a[2];
        var _b = curvePoints[c + 1], l2 = _b[0], a2 = _b[1], b2 = _b[2];
        var u = (l - l1) / (l2 - l1);

        // 根据插值计算得到对应的颜色值
        paletteShades[i] = [l1 + (l2 - l1) * u, a1 + (a2 - a1) * u, b1 + (b2 - b1) * u];
    }

    return paletteShades.map(CssWg.snap_into_gamut);
}

// 基于曲线生成颜色调色板
function paletteShadesFromCurve(keyColor, curve, nShades = 15, linearity = defaultLinearity, curveDepth = 24) {
    var points = Geometry.getPointsOnCurvePath(curve, Math.ceil((curveDepth * (1 + Math.abs(curve.torsion || 1))) / 2)).map(function (curvePoint) {
        return getPointOnHelix(curvePoint, curve.torsion, curve.torsionT0);
    });
    return paletteShadesFromCurvePoints(points, nShades, linearity, keyColor);
}

function sRGB_to_hex(rgb) {
    return "#".concat(rgb
        .map(function (x) {
            var channel = x < 0 ? 0 : Math.floor(x >= 1.0 ? 255 : x * 256);
            return channel.toString(16).padStart(2, '0');
        })
        .join(''));
}

function Lab_to_hex(lab) {
    var sRGB = CssWg.LAB_to_sRGB(lab);
    return sRGB_to_hex(sRGB);
}


// 将十六进制颜色转换为sRGB表示形式
function hex_to_sRGB(hex) {
    var aRgbHex = hex.match(/#?(..)(..)(..)/);
    return aRgbHex
        ? [parseInt(aRgbHex[1], 16) / 255, parseInt(aRgbHex[2], 16) / 255, parseInt(aRgbHex[3], 16) / 255]
        : [0, 0, 0];
}

// 将十六进制颜色转换为LCH表示形式
function hex_to_LCH(hex) {
    var sRGB = hex_to_sRGB(hex);
    return CssWg.sRGB_to_LCH(sRGB);
}


// 将调色板阴影转换为hex表示形式的数组
function paletteShadesToHex(paletteShades) {
    return paletteShades.map(Lab_to_hex);
}

// 获取螺旋曲线上的点
function getPointOnHelix(pointOnCurve, torsion = 0, torsionT0 = 50) {
    var t = pointOnCurve[0];
    var [l, c, h] = CssWg.Lab_to_LCH(pointOnCurve);
    var hueOffset = torsion * (t - torsionT0);
    return CssWg.LCH_to_Lab([l, c, h + hueOffset]);
}


// 从调色板参数生成曲线路径
function curvePathFromPalette(_a) {
    var keyColor = _a.keyColor, darkCp = _a.darkCp, lightCp = _a.lightCp, hueTorsion = _a.hueTorsion;

    // 将十六进制颜色转换为LCH表示形式
    keyColor = hex_to_LCH(keyColor);

    var blackPosition = [0, 0, 0];
    var whitePosition = [100, 0, 0];
    var keyColorPosition = CssWg.LCH_to_Lab(keyColor);
    var l = keyColorPosition[0], a = keyColorPosition[1], b = keyColorPosition[2];
    var darkControlPosition = [l * (1 - darkCp), a, b];
    var lightControlPosition = [l + (100 - l) * lightCp, a, b];

    return {
        curves: [
            { points: [blackPosition, darkControlPosition, keyColorPosition] },
            { points: [keyColorPosition, lightControlPosition, whitePosition] },
        ],
        torsion: hueTorsion,
        torsionT0: l,
    };
}


/**
 * 从调色板中生成一系列十六进制颜色
 * @param {string} keyColor - 主要颜色的十六进制表示形式
 * @param {Object} palette - 调色板对象
 * @param {number} nShades - 生成的颜色数量，默认为16
 * @param {number} linearity - 颜色生成的线性度，默认为0.75
 * @param {number} curveDepth - 曲线深度，默认为24
 * @returns {string[]} 生成的十六进制颜色数组
 */
function hexColorsFromPalette(keyColor, palette, nShades = 16, linearity = defaultLinearity, curveDepth = 24) {
    var curve = curvePathFromPalette(palette);
    var shades = paletteShadesFromCurve(keyColor, curve, nShades, linearity, curveDepth);
    return paletteShadesToHex(shades);
}




