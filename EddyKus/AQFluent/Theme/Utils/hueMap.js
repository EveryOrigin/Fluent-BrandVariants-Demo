function hexToHue(hexColor) {
    // Parse the hex color string into its red, green, and blue components
    var red = parseInt(hexColor.substring(1, 3), 16);
    var green = parseInt(hexColor.substring(3, 5), 16);
    var blue = parseInt(hexColor.substring(5, 7), 16);
    // Convert the RGB color to HSL color space
    var r = red / 255;
    var g = green / 255;
    var b = blue / 255;
    var cmax = Math.max(r, g, b);
    var cmin = Math.min(r, g, b);
    var delta = cmax - cmin;
    var hue;
    // Calculate the hue value based on the RGB color values
    if (delta === 0) {
        hue = 0;
    }
    else if (cmax === r) {
        hue = ((g - b) / delta) % 6;
    }
    else if (cmax === g) {
        hue = (b - r) / delta + 2;
    }
    else {
        hue = (r - g) / delta + 4;
    }
    // Convert the hue value to degrees and return it
    hue = Math.round(hue * 60);
    if (hue < 0) {
        hue += 360;
    }
    return hue;
}

// map of hue to [min, center, max], generated from Arman
var hueToSnappingPointsMap = [
    [0.0085504, 0.148504, 0.858504],
    [0.00855388, 0.1485388, 0.8585388],
    [0.0085582, 0.148582, 0.858582],
    [0.00856192, 0.1486192, 0.8586192],
    [0.00856644, 0.1486644, 0.8586644],
    [0.00857184, 0.1487184, 0.8587184],
    [0.0085802, 0.148802, 0.858802],
    [0.00858752, 0.1488752, 0.8588752],
    [0.00859616, 0.1489616, 0.8589616],
    [0.00860584, 0.1490584, 0.8590584],
    [0.00861948, 0.1491948, 0.8591948],
    [0.00863172, 0.1493172, 0.8593172],
    [0.00864508, 0.1494508, 0.8594508],
    [0.00865968, 0.1495968, 0.8595968],
    [0.00867968, 0.1497968, 0.8597968],
    [0.00869708, 0.1499708, 0.8599708],
    [0.00871576, 0.1501576, 0.8601576],
    [0.0087358, 0.150358, 0.860358],
    [0.00876272, 0.1506272, 0.8606272],
    [0.0087858, 0.150858, 0.860858],
    [0.00881028, 0.1511028, 0.8611028],
    [0.0088362, 0.151362, 0.861362],
    [0.0088706, 0.151706, 0.861706],
    [0.0088998, 0.151998, 0.861998],
    [0.00893052, 0.1523052, 0.8623052],
    [0.00896272, 0.1526272, 0.8626272],
    [0.00900516, 0.1530516, 0.8630516],
    [0.00904084, 0.1534084, 0.8634084],
    [0.00907812, 0.1537812, 0.8637812],
    [0.00911704, 0.1541704, 0.8641704],
    [0.00916792, 0.1546792, 0.8646792],
    [0.00921048, 0.1551048, 0.8651048],
    [0.00925472, 0.1555472, 0.8655472],
    [0.00930064, 0.1560064, 0.8660064],
    [0.00934824, 0.1564824, 0.8664824],
    [0.0094102, 0.157102, 0.867102],
    [0.00946168, 0.1576168, 0.8676168],
    [0.00951496, 0.1581496, 0.8681496],
    [0.00957, 0.1587, 0.8687],
    [0.00964128, 0.1594128, 0.8694128],
    [0.00970036, 0.1600036, 0.8700036],
    [0.00976128, 0.1606128, 0.8706128],
    [0.00982404, 0.1612404, 0.8712404],
    [0.00990508, 0.1620508, 0.8720508],
    [0.009972, 0.16272, 0.87272],
    [0.01004084, 0.1634084, 0.8734084],
    [0.0101296, 0.164296, 0.874296],
    [0.01020272, 0.1650272, 0.8750272],
    [0.01027784, 0.1657784, 0.8757784],
    [0.01035488, 0.1665488, 0.8765488],
    [0.01045392, 0.1675392, 0.8775392],
    [0.0105354, 0.168354, 0.878354],
    [0.01061892, 0.1691892, 0.8791892],
    [0.0107044, 0.170044, 0.880044],
    [0.01081412, 0.1711412, 0.8811412],
    [0.0109042, 0.172042, 0.882042],
    [0.01099636, 0.1729636, 0.8829636],
    [0.01109056, 0.1739056, 0.8839056],
    [0.01121124, 0.1751124, 0.8851124],
    [0.01131016, 0.1761016, 0.8861016],
    [0.0114112, 0.177112, 0.887112],
    [0.01138116, 0.1768116, 0.8868116],
    [0.01135176, 0.1765176, 0.8865176],
    [0.01131588, 0.1761588, 0.8861588],
    [0.01128788, 0.1758788, 0.8858788],
    [0.01126048, 0.1756048, 0.8856048],
    [0.01122712, 0.1752712, 0.8852712],
    [0.01120108, 0.1750108, 0.8850108],
    [0.01117568, 0.1747568, 0.8847568],
    [0.01115088, 0.1745088, 0.8845088],
    [0.01112068, 0.1742068, 0.8842068],
    [0.0110972, 0.173972, 0.883972],
    [0.01107428, 0.1737428, 0.8837428],
    [0.01105196, 0.1735196, 0.8835196],
    [0.01102488, 0.1732488, 0.8832488],
    [0.01100384, 0.1730384, 0.8830384],
    [0.0109834, 0.172834, 0.882834],
    [0.01096348, 0.1726348, 0.8826348],
    [0.01094416, 0.1724416, 0.8824416],
    [0.01092072, 0.1722072, 0.8822072],
    [0.01090264, 0.1720264, 0.8820264],
    [0.01088508, 0.1718508, 0.8818508],
    [0.01086388, 0.1716388, 0.8816388],
    [0.01084752, 0.1714752, 0.8814752],
    [0.01083168, 0.1713168, 0.8813168],
    [0.01081636, 0.1711636, 0.8811636],
    [0.010798, 0.17098, 0.88098],
    [0.0107838, 0.170838, 0.880838],
    [0.01077016, 0.1707016, 0.8807016],
    [0.010757, 0.17057, 0.88057],
    [0.01074436, 0.1704436, 0.8804436],
    [0.01072924, 0.1702924, 0.8802924],
    [0.01071768, 0.1701768, 0.8801768],
    [0.01070656, 0.1700656, 0.8800656],
    [0.010696, 0.16996, 0.87996],
    [0.01068336, 0.1698336, 0.8798336],
    [0.01067376, 0.1697376, 0.8797376],
    [0.01066464, 0.1696464, 0.8796464],
    [0.010656, 0.16956, 0.87956],
    [0.01064572, 0.1694572, 0.8794572],
    [0.01063804, 0.1693804, 0.8793804],
    [0.01063076, 0.1693076, 0.8793076],
    [0.01062224, 0.1692224, 0.8792224],
    [0.01061588, 0.1691588, 0.8791588],
    [0.01060996, 0.1690996, 0.8790996],
    [0.0106044, 0.169044, 0.879044],
    [0.0105992, 0.168992, 0.878992],
    [0.01059328, 0.1689328, 0.8789328],
    [0.01058892, 0.1688892, 0.8788892],
    [0.01058496, 0.1688496, 0.8788496],
    [0.01058132, 0.1688132, 0.8788132],
    [0.01057728, 0.1687728, 0.8787728],
    [0.0105744, 0.168744, 0.878744],
    [0.01057184, 0.1687184, 0.8787184],
    [0.01056956, 0.1686956, 0.8786956],
    [0.01056716, 0.1686716, 0.8786716],
    [0.01056556, 0.1686556, 0.8786556],
    [0.0105642, 0.168642, 0.878642],
    [0.01056284, 0.1686284, 0.8786284],
    [0.0105618, 0.168618, 0.878618],
    [0.0105608, 0.168608, 0.878608],
    [0.01056112, 0.1686112, 0.8786112],
    [0.01056148, 0.1686148, 0.8786148],
    [0.01056196, 0.1686196, 0.8786196],
    [0.0105624, 0.168624, 0.878624],
    [0.01056296, 0.1686296, 0.8786296],
    [0.0105636, 0.168636, 0.878636],
    [0.01056452, 0.1686452, 0.8786452],
    [0.0105654, 0.168654, 0.878654],
    [0.0105664, 0.168664, 0.878664],
    [0.01056748, 0.1686748, 0.8786748],
    [0.010569, 0.16869, 0.87869],
    [0.01057036, 0.1687036, 0.8787036],
    [0.0105718, 0.168718, 0.878718],
    [0.01057384, 0.1687384, 0.8787384],
    [0.0105756, 0.168756, 0.878756],
    [0.01057748, 0.1687748, 0.8787748],
    [0.01057948, 0.1687948, 0.8787948],
    [0.01058164, 0.1688164, 0.8788164],
    [0.01058456, 0.1688456, 0.8788456],
    [0.010587, 0.16887, 0.87887],
    [0.01058964, 0.1688964, 0.8788964],
    [0.0105924, 0.168924, 0.878924],
    [0.01059604, 0.1689604, 0.8789604],
    [0.01059916, 0.1689916, 0.8789916],
    [0.0106024, 0.169024, 0.879024],
    [0.01060668, 0.1690668, 0.8790668],
    [0.01061028, 0.1691028, 0.8791028],
    [0.01061408, 0.1691408, 0.8791408],
    [0.010618, 0.16918, 0.87918],
    [0.01062312, 0.1692312, 0.8792312],
    [0.01062744, 0.1692744, 0.8792744],
    [0.01063188, 0.1693188, 0.8793188],
    [0.01063652, 0.1693652, 0.8793652],
    [0.01064132, 0.1694132, 0.8794132],
    [0.0106476, 0.169476, 0.879476],
    [0.0106528, 0.169528, 0.879528],
    [0.01065816, 0.1695816, 0.8795816],
    [0.01066372, 0.1696372, 0.8796372],
    [0.01067092, 0.1697092, 0.8797092],
    [0.01067688, 0.1697688, 0.8797688],
    [0.01068304, 0.1698304, 0.8798304],
    [0.01068936, 0.1698936, 0.8798936],
    [0.01069756, 0.1699756, 0.8799756],
    [0.01070428, 0.1700428, 0.8800428],
    [0.01071124, 0.1701124, 0.8801124],
    [0.0107184, 0.170184, 0.880184],
    [0.0107276, 0.170276, 0.880276],
    [0.0107352, 0.170352, 0.880352],
    [0.01074296, 0.1704296, 0.8804296],
    [0.01075092, 0.1705092, 0.8805092],
    [0.01076116, 0.1706116, 0.8806116],
    [0.0107696, 0.170696, 0.880696],
    [0.01077824, 0.1707824, 0.8807824],
    [0.01078708, 0.1708708, 0.8808708],
    [0.0107984, 0.170984, 0.880984],
    [0.01080772, 0.1710772, 0.8810772],
    [0.0108172, 0.171172, 0.881172],
    [0.0108294, 0.171294, 0.881294],
    [0.0108394, 0.171394, 0.881394],
    [0.0108496, 0.171496, 0.881496],
    [0.01074856, 0.1704856, 0.8804856],
    [0.01064964, 0.1694964, 0.8794964],
    [0.01052896, 0.1682896, 0.8782896],
    [0.01043476, 0.1673476, 0.8773476],
    [0.0103426, 0.166426, 0.876426],
    [0.01025252, 0.1655252, 0.8755252],
    [0.0101428, 0.164428, 0.874428],
    [0.01005732, 0.1635732, 0.8735732],
    [0.0099738, 0.162738, 0.872738],
    [0.00987228, 0.1617228, 0.8717228],
    [0.009716, 0.16016, 0.87016],
    [0.0096412, 0.159412, 0.869412],
    [0.009568, 0.15868, 0.86868],
    [0.00947924, 0.1577924, 0.8677924],
    [0.0094104, 0.157104, 0.867104],
    [0.00934348, 0.1564348, 0.8664348],
    [0.0092624, 0.155624, 0.865624],
    [0.00919968, 0.1549968, 0.8649968],
    [0.0091388, 0.154388, 0.864388],
    [0.00907968, 0.1537968, 0.8637968],
    [0.0090224, 0.153224, 0.863224],
    [0.00895336, 0.1525336, 0.8625336],
    [0.00890008, 0.1520008, 0.8620008],
    [0.0088486, 0.151486, 0.861486],
    [0.00878664, 0.1508664, 0.8608664],
    [0.00873904, 0.1503904, 0.8603904],
    [0.00869312, 0.1499312, 0.8599312],
    [0.00864888, 0.1494888, 0.8594888],
    [0.00860632, 0.1490632, 0.8590632],
    [0.00855544, 0.1485544, 0.8585544],
    [0.00851652, 0.1481652, 0.8581652],
    [0.00851652, 0.1481652, 0.8581652],
    [0.00847924, 0.1477924, 0.8577924],
    [0.00844356, 0.1474356, 0.8574356],
    [0.00840112, 0.1470112, 0.8570112],
    [0.00836888, 0.1466888, 0.8566888],
    [0.0083382, 0.146382, 0.856382],
    [0.008309, 0.14609, 0.85609],
    [0.00827456, 0.1457456, 0.8557456],
    [0.00824868, 0.1454868, 0.8554868],
    [0.00822416, 0.1452416, 0.8552416],
    [0.00819556, 0.1449556, 0.8549556],
    [0.00817416, 0.1447416, 0.8547416],
    [0.00815416, 0.1445416, 0.8545416],
    [0.00813544, 0.1443544, 0.8543544],
    [0.00811804, 0.1441804, 0.8541804],
    [0.00809808, 0.1439808, 0.8539808],
    [0.00808348, 0.1438348, 0.8538348],
    [0.00807012, 0.1437012, 0.8537012],
    [0.00805504, 0.1435504, 0.8535504],
    [0.00804424, 0.1434424, 0.8534424],
    [0.00803456, 0.1433456, 0.8533456],
    [0.00802592, 0.1432592, 0.8532592],
    [0.00801832, 0.1431832, 0.8531832],
    [0.00801024, 0.1431024, 0.8531024],
    [0.0080048, 0.143048, 0.853048],
    [0.00800028, 0.1430028, 0.8530028],
    [0.00799572, 0.1429572, 0.8529572],
    [0.00799224, 0.1429224, 0.8529224],
    [0.0079888, 0.142888, 0.852888],
    [0.0079898, 0.142898, 0.852898],
    [0.00799084, 0.1429084, 0.8529084],
    [0.0079922, 0.142922, 0.852922],
    [0.0079936, 0.142936, 0.852936],
    [0.0079952, 0.142952, 0.852952],
    [0.00799704, 0.1429704, 0.8529704],
    [0.00799984, 0.1429984, 0.8529984],
    [0.0080024, 0.143024, 0.853024],
    [0.00800528, 0.1430528, 0.8530528],
    [0.00800848, 0.1430848, 0.8530848],
    [0.00801296, 0.1431296, 0.8531296],
    [0.00801692, 0.1431692, 0.8531692],
    [0.00802128, 0.1432128, 0.8532128],
    [0.0080272, 0.143272, 0.853272],
    [0.0080324, 0.143324, 0.853324],
    [0.00803796, 0.1433796, 0.8533796],
    [0.00804388, 0.1434388, 0.8534388],
    [0.00805024, 0.1435024, 0.8535024],
    [0.0080588, 0.143588, 0.853588],
    [0.00806604, 0.1436604, 0.8536604],
    [0.00807372, 0.1437372, 0.8537372],
    [0.008084, 0.14384, 0.85384],
    [0.00809264, 0.1439264, 0.8539264],
    [0.00810176, 0.1440176, 0.8540176],
    [0.00811136, 0.1441136, 0.8541136],
    [0.008124, 0.14424, 0.85424],
    [0.0081346, 0.144346, 0.854346],
    [0.00814568, 0.1444568, 0.8544568],
    [0.0081572, 0.144572, 0.854572],
    [0.00817236, 0.1447236, 0.8547236],
    [0.008185, 0.14485, 0.85485],
    [0.00819816, 0.1449816, 0.8549816],
    [0.0082118, 0.145118, 0.855118],
    [0.008226, 0.14526, 0.85526],
    [0.0082444, 0.145444, 0.855444],
    [0.00826, 0.1456, 0.8556],
    [0.00827552, 0.1457552, 0.8557552],
    [0.00829188, 0.1459188, 0.8559188],
    [0.00831308, 0.1461308, 0.8561308],
    [0.00833064, 0.1463064, 0.8563064],
    [0.00834872, 0.1464872, 0.8564872],
    [0.00837212, 0.1467212, 0.8567212],
    [0.00839148, 0.1469148, 0.8569148],
    [0.00841136, 0.1471136, 0.8571136],
    [0.00843184, 0.1473184, 0.8573184],
    [0.00845288, 0.1475288, 0.8575288],
    [0.00848, 0.1478, 0.8578],
    [0.00850228, 0.1480228, 0.8580228],
    [0.0085252, 0.148252, 0.858252],
    [0.00855464, 0.1485464, 0.8585464],
    [0.00857884, 0.1487884, 0.8587884],
    [0.00860368, 0.1490368, 0.8590368],
    [0.00862908, 0.1492908, 0.8592908],
    [0.00866172, 0.1496172, 0.8596172],
    [0.00868848, 0.1498848, 0.8598848],
    [0.00871588, 0.1501588, 0.8601588],
    [0.00874388, 0.1504388, 0.8604388],
    [0.00877976, 0.1507976, 0.8607976],
    [0.0088092, 0.151092, 0.861092],
    [0.0088392, 0.151392, 0.861392],
    [0.008829, 0.15129, 0.86129],
    [0.008819, 0.15119, 0.86119],
    [0.0088068, 0.151068, 0.861068],
    [0.00879732, 0.1509732, 0.8609732],
    [0.008788, 0.15088, 0.86088],
    [0.00877668, 0.1507668, 0.8607668],
    [0.00876784, 0.1506784, 0.8606784],
    [0.0087592, 0.150592, 0.860592],
    [0.0087508, 0.150508, 0.860508],
    [0.00874256, 0.1504256, 0.8604256],
    [0.00873256, 0.1503256, 0.8603256],
    [0.0087248, 0.150248, 0.860248],
    [0.0087172, 0.150172, 0.860172],
    [0.008708, 0.15008, 0.86008],
    [0.00870084, 0.1500084, 0.8600084],
    [0.00869388, 0.1499388, 0.8599388],
    [0.00868712, 0.1498712, 0.8598712],
    [0.00867896, 0.1497896, 0.8597896],
    [0.00867264, 0.1497264, 0.8597264],
    [0.00866648, 0.1496648, 0.8596648],
    [0.00866052, 0.1496052, 0.8596052],
    [0.00865332, 0.1495332, 0.8595332],
    [0.00864776, 0.1494776, 0.8594776],
    [0.0086424, 0.149424, 0.859424],
    [0.0086372, 0.149372, 0.859372],
    [0.00863092, 0.1493092, 0.8593092],
    [0.00862612, 0.1492612, 0.8592612],
    [0.00862148, 0.1492148, 0.8592148],
    [0.008617, 0.14917, 0.85917],
    [0.00861272, 0.1491272, 0.8591272],
    [0.0086076, 0.149076, 0.859076],
    [0.00860368, 0.1490368, 0.8590368],
    [0.00859988, 0.1489988, 0.8589988],
    [0.00859628, 0.1489628, 0.8589628],
    [0.008592, 0.14892, 0.85892],
    [0.00858876, 0.1488876, 0.8588876],
    [0.00858564, 0.1488564, 0.8588564],
    [0.00858272, 0.1488272, 0.8588272],
    [0.00857924, 0.1487924, 0.8587924],
    [0.0085766, 0.148766, 0.858766],
    [0.00857416, 0.1487416, 0.8587416],
    [0.0085718, 0.148718, 0.858718],
    [0.00856908, 0.1486908, 0.8586908],
    [0.00856708, 0.1486708, 0.8586708],
    [0.0085652, 0.148652, 0.858652],
    [0.008563, 0.14863, 0.85863],
    [0.0085614, 0.148614, 0.858614],
    [0.00856, 0.1486, 0.8586],
    [0.0085586, 0.148586, 0.858586],
    [0.00855736, 0.1485736, 0.8585736],
    [0.008556, 0.14856, 0.85856],
    [0.008555, 0.14855, 0.85855],
    [0.00855412, 0.1485412, 0.8585412],
    [0.0085532, 0.148532, 0.858532],
    [0.00855256, 0.1485256, 0.8585256],
    [0.008552, 0.14852, 0.85852],
    [0.00855156, 0.1485156, 0.8585156],
    [0.00855108, 0.1485108, 0.8585108],
    [0.00855072, 0.1485072, 0.8585072],
];
