import QtQuick 2.0
import "../Utils/palettes.js" as Palette

Item {

    property BrandPalette brandPalette: BrandPalette{}

    property var hexColors: {
        return Palette.hexColorsFromPalette(brandPalette.keyColor, brandPalette, 16, 1);
    }

    property string brand10: hexColors[0]
    property string brand20: hexColors[1]
    property string brand30: hexColors[2]
    property string brand40: hexColors[3]
    property string brand50: hexColors[4]
    property string brand60: hexColors[5]
    property string brand70: hexColors[6]
    property string brand80: hexColors[7]
    property string brand90: hexColors[8]
    property string brand100: hexColors[9]
    property string brand110: hexColors[10]
    property string brand120: hexColors[11]
    property string brand130: hexColors[12]
    property string brand140: hexColors[13]
    property string brand150: hexColors[14]
    property string brand160: hexColors[15]


}
