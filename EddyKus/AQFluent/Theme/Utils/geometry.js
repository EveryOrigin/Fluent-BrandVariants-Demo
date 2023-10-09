var curveResolution = 128;
// Many of these functions are ported from ThreeJS, which is distributed under
// the MIT license. Retrieved from https://github.com/mrdoob/three.js on
// 14 October 2021.
function distanceTo(v1, v2) {
    return Math.sqrt(distanceToSquared(v1, v2));
}
function distanceToSquared(v1, v2) {
    var dx = v1[0] - v2[0];
    var dy = v1[1] - v2[1];
    var dz = v1[2] - v2[2];
    return dx * dx + dy * dy + dz * dz;
}
function equals(v1, v2) {
    return v1[0] === v2[0] && v1[1] === v2[1] && v1[2] === v2[2];
}
function quadraticBezierP0(t, p) {
    var k = 1 - t;
    return k * k * p;
}
function quadraticBezierP1(t, p) {
    return 2 * (1 - t) * t * p;
}
function quadraticBezierP2(t, p) {
    return t * t * p;
}
function quadraticBezier(t, p0, p1, p2) {
    return quadraticBezierP0(t, p0) + quadraticBezierP1(t, p1) + quadraticBezierP2(t, p2);
}
function getPointOnCurve(curve, t) {
    var _a = curve.points, v0 = _a[0], v1 = _a[1], v2 = _a[2];
    return [
        quadraticBezier(t, v0[0], v1[0], v2[0]),
        quadraticBezier(t, v0[1], v1[1], v2[1]),
        quadraticBezier(t, v0[2], v1[2], v2[2]),
    ];
}
function getPointsOnCurve(curve, divisions) {
    var points = [];
    for (var d = 0; d <= divisions; d++) {
        points.push(getPointOnCurve(curve, d / divisions));
    }
    return points;
}
function getCurvePathLength(curvePath) {
    var lengths = getCurvePathLengths(curvePath);
    return lengths[lengths.length - 1];
}
function getCurvePathLengths(curvePath) {
    if (curvePath.cacheLengths && curvePath.cacheLengths.length === curvePath.curves.length) {
        return curvePath.cacheLengths;
    }
    // Get length of sub-curve
    // Push sums into cached array
    var lengths = [];
    var sums = 0;
    for (var i = 0, l = curvePath.curves.length; i < l; i++) {
        sums += getCurveLength(curvePath.curves[i]);
        lengths.push(sums);
    }
    curvePath.cacheLengths = lengths;
    return lengths;
}
function getCurveLength(curve) {
    var lengths = getCurveLengths(curve);
    return lengths[lengths.length - 1];
}
function getCurveLengths(curve, divisions) {
    if (divisions === void 0) { divisions = curveResolution; }
    if (curve.cacheArcLengths && curve.cacheArcLengths.length === divisions + 1) {
        return curve.cacheArcLengths;
    }
    var cache = [];
    var current;
    var last = getPointOnCurve(curve, 0);
    var sum = 0;
    cache.push(0);
    for (var p = 1; p <= divisions; p++) {
        current = getPointOnCurve(curve, p / divisions);
        sum += distanceTo(current, last);
        cache.push(sum);
        last = current;
    }
    curve.cacheArcLengths = cache;
    return cache; // { sums: cache, sum: sum }; Sum is in the last element.
}
function getCurveUtoTMapping(curve, u, distance) {
    var arcLengths = getCurveLengths(curve);
    var i = 0;
    var il = arcLengths.length;
    var targetArcLength; // The targeted u distance value to get
    if (distance) {
        targetArcLength = distance;
    }
    else {
        targetArcLength = u * arcLengths[il - 1];
    }
    // binary search for the index with largest value smaller than target u distance
    var low = 0;
    var high = il - 1;
    var comparison;
    while (low <= high) {
        i = Math.floor(low + (high - low) / 2); // less likely to overflow, though probably not issue here, JS doesn't really have integers, all numbers are floats
        comparison = arcLengths[i] - targetArcLength;
        if (comparison < 0) {
            low = i + 1;
        }
        else if (comparison > 0) {
            high = i - 1;
        }
        else {
            high = i;
            break;
        }
    }
    i = high;
    if (arcLengths[i] === targetArcLength) {
        return i / (il - 1);
    }
    // we could get finer grain at lengths, or use simple interpolation between two points
    var lengthBefore = arcLengths[i];
    var lengthAfter = arcLengths[i + 1];
    var segmentLength = lengthAfter - lengthBefore;
    // determine where we are between the 'before' and 'after' points
    var segmentFraction = (targetArcLength - lengthBefore) / segmentLength;
    // add that fractional amount to t
    var t = (i + segmentFraction) / (il - 1);
    return t;
}
function getPointOnCurveAt(curve, u) {
    return getPointOnCurve(curve, getCurveUtoTMapping(curve, u));
}
function getPointOnCurvePath(curvePath, t) {
    var d = t * getCurvePathLength(curvePath);
    var curveLengths = getCurvePathLengths(curvePath);
    var i = 0;
    while (i < curveLengths.length) {
        if (curveLengths[i] >= d) {
            var diff = curveLengths[i] - d;
            var curve = curvePath.curves[i];
            var segmentLength = getCurveLength(curve);
            var u = segmentLength === 0 ? 0 : 1 - diff / segmentLength;
            return getPointOnCurveAt(curve, u);
        }
        i++;
    }
    return null;
}

function getPointsOnCurvePath(curvePath, divisions) {
    if (divisions === void 0) { divisions = curveResolution; }
    var points = [];
    var last;
    for (var i = 0, curves = curvePath.curves; i < curves.length; i++) {
        var curve = curves[i];
        var pts = getPointsOnCurve(curve, divisions);
        for (var _i = 0, pts_1 = pts; _i < pts_1.length; _i++) {
            var point = pts_1[_i];
            if (last && equals(last, point)) {
                // ensures no consecutive points are duplicates
                continue;
            }
            points.push(point);
            last = point;
        }
    }
    return points;
}

