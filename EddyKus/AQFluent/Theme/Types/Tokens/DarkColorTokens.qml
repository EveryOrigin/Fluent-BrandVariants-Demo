import QtQuick 2.0
import "../"

ColorTokens {

    id: tokens

    property PreDefinedColor preDefinedColor: PreDefinedColor {}

    colorNeutralForeground1:  "white" // #ffffff Global.Color.White
    colorNeutralForeground1Hover:  "white" // #ffffff Global.Color.White
    colorNeutralForeground1Pressed:  "white" // #ffffff Global.Color.White
    colorNeutralForeground1Selected:  "white" // #ffffff Global.Color.White
    colorNeutralForeground2: preDefinedColor.greys[84] // #d6d6d6 Global.Color.preDefinedColor.greys.84
    colorNeutralForeground2Hover:  "white" // #ffffff Global.Color.White
    colorNeutralForeground2Pressed:  "white" // #ffffff Global.Color.White
    colorNeutralForeground2Selected:  "white" // #ffffff Global.Color.White
    colorNeutralForeground2BrandHover: brand.brand100 // #2899f5 Global.Color.Brand.100
    colorNeutralForeground2BrandPressed: brand.brand90 // #1890f1 Global.Color.Brand.90
    colorNeutralForeground2BrandSelected: brand.brand100 // #2899f5 Global.Color.Brand.100
    colorNeutralForeground3: preDefinedColor.greys[68] // #adadad Global.Color.preDefinedColor.greys.68
    colorNeutralForeground3Hover: preDefinedColor.greys[84] // #d6d6d6 Global.Color.preDefinedColor.greys.84
    colorNeutralForeground3Pressed: preDefinedColor.greys[84] // #d6d6d6 Global.Color.preDefinedColor.greys.84
    colorNeutralForeground3Selected: preDefinedColor.greys[84] // #d6d6d6 Global.Color.preDefinedColor.greys.84
    colorNeutralForeground3BrandHover: brand.brand100 // #2899f5 Global.Color.Brand.100
    colorNeutralForeground3BrandPressed: brand.brand90 // #1890f1 Global.Color.Brand.90
    colorNeutralForeground3BrandSelected: brand.brand100 // #2899f5 Global.Color.Brand.100
    colorNeutralForeground4: preDefinedColor.greys[60] // #999999 Global.Color.preDefinedColor.greys.60
    colorNeutralForegroundDisabled: preDefinedColor.greys[36] // #5c5c5c Global.Color.preDefinedColor.greys.36
    colorNeutralForegroundInvertedDisabled: preDefinedColor.whiteAlpha[40] // rgba(255 255 255 0.4) Global.Color.preDefinedColor.whiteAlpha.40
    colorBrandForegroundLink: brand.brand100 // #2899f5 Global.Color.Brand.100
    colorBrandForegroundLinkHover: brand.brand110 // #3aa0f3 Global.Color.Brand.110
    colorBrandForegroundLinkPressed: brand.brand90 // #1890f1 Global.Color.Brand.90
    colorBrandForegroundLinkSelected: brand.brand100 // #2899f5 Global.Color.Brand.100
    colorNeutralForeground2Link: preDefinedColor.greys[84] // #d6d6d6 Global.Color.preDefinedColor.greys.84
    colorNeutralForeground2LinkHover:  "white" // #ffffff Global.Color.White
    colorNeutralForeground2LinkPressed:  "white" // #ffffff Global.Color.White
    colorNeutralForeground2LinkSelected:  "white" // #ffffff Global.Color.White
    colorCompoundBrandForeground1: brand.brand100 // #2899f5 Global.Color.Brand.100
    colorCompoundBrandForeground1Hover: brand.brand110 // #3aa0f3 Global.Color.Brand.110
    colorCompoundBrandForeground1Pressed: brand.brand90 // #1890f1 Global.Color.Brand.90
    colorBrandForeground1: brand.brand100 // #2899f5 Global.Color.Brand.100
    colorBrandForeground2: brand.brand110 // #3aa0f3 Global.Color.Brand.110
    colorBrandForeground2Hover: brand.brand130 // #82c7ff Global.Color.Brand.130
    colorBrandForeground2Pressed: brand.brand160 // #eff6fc Global.Color.Brand.160
    colorNeutralForeground1Static: preDefinedColor.greys[14] // #242424 Global.Color.preDefinedColor.greys.14
    colorNeutralForegroundStaticInverted:  "white" // #ffffff Global.Color.White
    colorNeutralForegroundInverted: preDefinedColor.greys[14] // #242424 Global.Color.preDefinedColor.greys.14
    colorNeutralForegroundInvertedHover: preDefinedColor.greys[14] // #242424 Global.Color.preDefinedColor.greys.14
    colorNeutralForegroundInvertedPressed: preDefinedColor.greys[14] // #242424 Global.Color.preDefinedColor.greys.14
    colorNeutralForegroundInvertedSelected: preDefinedColor.greys[14] // #242424 Global.Color.preDefinedColor.greys.14
    colorNeutralForegroundInverted2: preDefinedColor.greys[14] // #242424 Global.Color.preDefinedColor.greys.14
    colorNeutralForegroundOnBrand:  "white" // #ffffff Global.Color.White
    colorNeutralForegroundInvertedLink:  "white" // #ffffff Global.Color.White
    colorNeutralForegroundInvertedLinkHover:  "white" // #ffffff Global.Color.White
    colorNeutralForegroundInvertedLinkPressed:  "white" // #ffffff Global.Color.White
    colorNeutralForegroundInvertedLinkSelected:  "white" // #ffffff Global.Color.White
    colorBrandForegroundInverted: brand.brand80 // #0078d4 Global.Color.Brand.80
    colorBrandForegroundInvertedHover: brand.brand70 // #106ebe Global.Color.Brand.70
    colorBrandForegroundInvertedPressed: brand.brand60 // #005a9e Global.Color.Brand.60
    colorBrandForegroundOnLight: brand.brand80 // #0078d4 Global.Color.Brand.80
    colorBrandForegroundOnLightHover: brand.brand70 // #106ebe Global.Color.Brand.70
    colorBrandForegroundOnLightPressed: brand.brand50 // #004c87 Global.Color.Brand.50
    colorBrandForegroundOnLightSelected: brand.brand60 // #005a9e Global.Color.Brand.60
    colorNeutralBackground1: preDefinedColor.greys[16] // #292929 Global.Color.preDefinedColor.greys.16
    colorNeutralBackground1Hover: preDefinedColor.greys[24] // #3d3d3d Global.Color.preDefinedColor.greys.24
    colorNeutralBackground1Pressed: preDefinedColor.greys[12] // #1f1f1f Global.Color.preDefinedColor.greys.12
    colorNeutralBackground1Selected: preDefinedColor.greys[22] // #383838 Global.Color.preDefinedColor.greys.22
    colorNeutralBackground2: preDefinedColor.greys[12] // #1f1f1f Global.Color.preDefinedColor.greys.12
    colorNeutralBackground2Hover: preDefinedColor.greys[20] // #333333 Global.Color.preDefinedColor.greys.20
    colorNeutralBackground2Pressed: preDefinedColor.greys[8] // #141414 Global.Color.preDefinedColor.greys.8
    colorNeutralBackground2Selected: preDefinedColor.greys[18] // #2e2e2e Global.Color.preDefinedColor.greys.18
    colorNeutralBackground3: preDefinedColor.greys[8] // #141414 Global.Color.preDefinedColor.greys.8
    colorNeutralBackground3Hover: preDefinedColor.greys[16] // #292929 Global.Color.preDefinedColor.greys.16
    colorNeutralBackground3Pressed: preDefinedColor.greys[4] // #0a0a0a Global.Color.preDefinedColor.greys.4
    colorNeutralBackground3Selected: preDefinedColor.greys[14] // #242424 Global.Color.preDefinedColor.greys.14
    colorNeutralBackground4: preDefinedColor.greys[4] // #0a0a0a Global.Color.preDefinedColor.greys.4
    colorNeutralBackground4Hover: preDefinedColor.greys[12] // #1f1f1f Global.Color.preDefinedColor.greys.12
    colorNeutralBackground4Pressed: "black" // #000000 Global.Color.Black
    colorNeutralBackground4Selected: preDefinedColor.greys[10] // #1a1a1a Global.Color.preDefinedColor.greys.10
    colorNeutralBackground5: "black" // #000000 Global.Color.Black
    colorNeutralBackground5Hover: preDefinedColor.greys[8] // #141414 Global.Color.preDefinedColor.greys.8
    colorNeutralBackground5Pressed: preDefinedColor.greys[2] // #050505 Global.Color.preDefinedColor.greys.2
    colorNeutralBackground5Selected: preDefinedColor.greys[6] // #0f0f0f Global.Color.preDefinedColor.greys.6
    colorNeutralBackground6: preDefinedColor.greys[20] // #333333 Global.Color.preDefinedColor.greys.20
    colorNeutralBackgroundInverted:  "white" // #ffffff Global.Color.White
    colorNeutralBackgroundStatic: preDefinedColor.greys[24] // #3d3d3d Global.Color.preDefinedColor.greys.24
    colorNeutralBackgroundAlpha: preDefinedColor.greys10Alpha[50] // rgba(26 26 26 0.5) Global.Color.preDefinedColor.greys10Alpha.50
    colorNeutralBackgroundAlpha2: preDefinedColor.greys12Alpha[70] // rgba(31 31 31 0.7) Global.Color.preDefinedColor.greys12Alpha.70
    colorSubtleBackground: 'transparent' // transparent undefined
    colorSubtleBackgroundHover: preDefinedColor.greys[22] // #383838 Global.Color.preDefinedColor.greys.22
    colorSubtleBackgroundPressed: preDefinedColor.greys[18] // #2e2e2e Global.Color.preDefinedColor.greys.18
    colorSubtleBackgroundSelected: preDefinedColor.greys[20] // #333333 Global.Color.preDefinedColor.greys.20
    colorSubtleBackgroundLightAlphaHover: preDefinedColor.greys14Alpha[80] // rgba(36 36 36 0.8) Global.Color.preDefinedColor.greys14Alpha.80
    colorSubtleBackgroundLightAlphaPressed: preDefinedColor.greys14Alpha[50] // rgba(36 36 36 0.5) Global.Color.preDefinedColor.greys14Alpha.50
    colorSubtleBackgroundLightAlphaSelected: 'transparent' // transparent undefined
    colorSubtleBackgroundInverted: 'transparent' // transparent undefined
    colorSubtleBackgroundInvertedHover: preDefinedColor.blackAlpha[10] // rgba(0 0 0 0.1) Global.Color.preDefinedColor.blackAlpha.10
    colorSubtleBackgroundInvertedPressed: preDefinedColor.blackAlpha[30] // rgba(0 0 0 0.3) Global.Color.preDefinedColor.blackAlpha.30
    colorSubtleBackgroundInvertedSelected: preDefinedColor.blackAlpha[20] // rgba(0 0 0 0.2) Global.Color.preDefinedColor.blackAlpha.20
    colorTransparentBackground: 'transparent' // transparent undefined
    colorTransparentBackgroundHover: 'transparent' // transparent undefined
    colorTransparentBackgroundPressed: 'transparent' // transparent undefined
    colorTransparentBackgroundSelected: 'transparent' // transparent undefined
    colorNeutralBackgroundDisabled: preDefinedColor.greys[8] // #141414 Global.Color.preDefinedColor.greys.8
    colorNeutralBackgroundInvertedDisabled: preDefinedColor.whiteAlpha[10] // rgba(255 255 255 0.1) Global.Color.preDefinedColor.whiteAlpha.10
    colorNeutralStencil1: preDefinedColor.greys[34] // #575757 Global.Color.preDefinedColor.greys.34
    colorNeutralStencil2: preDefinedColor.greys[20] // #333333 Global.Color.preDefinedColor.greys.20
    colorNeutralStencil1Alpha: preDefinedColor.whiteAlpha[10] // rgba(255 255 255 0.1) Global.Color.preDefinedColor.whiteAlpha.10
    colorNeutralStencil2Alpha: preDefinedColor.whiteAlpha[5] // rgba(255 255 255 0.05) Global.Color.preDefinedColor.whiteAlpha.5
    colorBackgroundOverlay: preDefinedColor.blackAlpha[50] // rgba(0 0 0 0.5) Global.Color.preDefinedColor.blackAlpha.50
    colorScrollbarOverlay: preDefinedColor.whiteAlpha[60] // rgba(255 255 255 0.6) Global.Color.preDefinedColor.whiteAlpha.60
    colorBrandBackground: brand.brand70 // #106ebe Global.Color.Brand.70
    colorBrandBackgroundHover: brand.brand80 // #0078d4 Global.Color.Brand.80
    colorBrandBackgroundPressed: brand.brand40 // #004578 Global.Color.Brand.40
    colorBrandBackgroundSelected: brand.brand60 // #005a9e Global.Color.Brand.60
    colorCompoundBrandBackground: brand.brand100 // #2899f5 Global.Color.Brand.100
    colorCompoundBrandBackgroundHover: brand.brand110 // #3aa0f3 Global.Color.Brand.110
    colorCompoundBrandBackgroundPressed: brand.brand90 // #1890f1 Global.Color.Brand.90
    colorBrandBackgroundStatic: brand.brand80 // #0078d4 Global.Color.Brand.80
    colorBrandBackground2: brand.brand20 // #002848 Global.Color.Brand.20
    colorBrandBackground2Hover: brand.brand40 // #004578 Global.Color.Brand.40
    colorBrandBackground2Pressed: brand.brand10 // #001526 Global.Color.Brand.10
    colorBrandBackgroundInverted:  "white" // #ffffff Global.Color.White
    colorBrandBackgroundInvertedHover: brand.brand160 // #eff6fc Global.Color.Brand.160
    colorBrandBackgroundInvertedPressed: brand.brand140 // #c7e0f4 Global.Color.Brand.140
    colorBrandBackgroundInvertedSelected: brand.brand150 // #deecf9 Global.Color.Brand.150
    colorNeutralStrokeAccessible: preDefinedColor.greys[68] // #adadad Global.Color.preDefinedColor.greys.68
    colorNeutralStrokeAccessibleHover: preDefinedColor.greys[74] // #bdbdbd Global.Color.preDefinedColor.greys.74
    colorNeutralStrokeAccessiblePressed: preDefinedColor.greys[70] // #b3b3b3 Global.Color.preDefinedColor.greys.70
    colorNeutralStrokeAccessibleSelected: brand.brand100 // #2899f5 Global.Color.Brand.100
    colorNeutralStroke1: preDefinedColor.greys[40] // #666666 Global.Color.preDefinedColor.greys.40
    colorNeutralStroke1Hover: preDefinedColor.greys[46] // #757575 Global.Color.preDefinedColor.greys.46
    colorNeutralStroke1Pressed: preDefinedColor.greys[42] // #6b6b6b Global.Color.preDefinedColor.greys.42
    colorNeutralStroke1Selected: preDefinedColor.greys[44] // #707070 Global.Color.preDefinedColor.greys.44
    colorNeutralStroke2: preDefinedColor.greys[32] // #525252 Global.Color.preDefinedColor.greys.32
    colorNeutralStroke3: preDefinedColor.greys[24] // #3d3d3d Global.Color.preDefinedColor.greys.24
    colorNeutralStrokeSubtle: preDefinedColor.greys[4] // #0a0a0a Global.Color.preDefinedColor.greys.4
    colorNeutralStrokeOnBrand: preDefinedColor.greys[16] // #292929 Global.Color.preDefinedColor.greys.16
    colorNeutralStrokeOnBrand2:  "white" // #ffffff Global.Color.White
    colorNeutralStrokeOnBrand2Hover:  "white" // #ffffff Global.Color.White
    colorNeutralStrokeOnBrand2Pressed:  "white" // #ffffff Global.Color.White
    colorNeutralStrokeOnBrand2Selected:  "white" // #ffffff Global.Color.White
    colorBrandStroke1: brand.brand100 // #2899f5 Global.Color.Brand.100
    colorBrandStroke2: brand.brand50 // #004c87 Global.Color.Brand.50
    colorBrandStroke2Hover: brand.brand50 // #004c87 Global.Color.Brand.50
    colorBrandStroke2Pressed: brand.brand30 // #043862 Global.Color.Brand.30
    colorBrandStroke2Contrast: brand.brand50 // #004c87 Global.Color.Brand.50
    colorCompoundBrandStroke: brand.brand100 // #2899f5 Global.Color.Brand.100
    colorCompoundBrandStrokeHover: brand.brand110 // #3aa0f3 Global.Color.Brand.110
    colorCompoundBrandStrokePressed: brand.brand90 // #1890f1 Global.Color.Brand.90
    colorNeutralStrokeDisabled: preDefinedColor.greys[26] // #424242 Global.Color.preDefinedColor.greys.26
    colorNeutralStrokeInvertedDisabled: preDefinedColor.whiteAlpha[40] // rgba(255 255 255 0.4) Global.Color.preDefinedColor.whiteAlpha.40
    colorTransparentStroke: 'transparent' // transparent undefined
    colorTransparentStrokeInteractive: 'transparent' // transparent undefined
    colorTransparentStrokeDisabled: 'transparent' // transparent undefined
    colorNeutralStrokeAlpha: preDefinedColor.whiteAlpha[10] // rgba(255 255 255 0.1) Global.Color.preDefinedColor.whiteAlpha.10
    colorNeutralStrokeAlpha2: preDefinedColor.whiteAlpha[20] // rgba(255 255 255 0.2) Global.Color.preDefinedColor.whiteAlpha.20
    colorStrokeFocus1: "black" // #000000 Global.Color.Black
    colorStrokeFocus2:  "white" // #ffffff Global.Color.White
    colorNeutralShadowAmbient: Qt.rgba(0,0,0,0.24)  // rgba(0,0,0,0.24) undefined
    colorNeutralShadowKey: Qt.rgba(0,0,0,0.28)  // rgba(0,0,0,0.28) undefined
    colorNeutralShadowAmbientLighter: Qt.rgba(0,0,0,0.12)  // rgba(0,0,0,0.12) undefined
    colorNeutralShadowKeyLighter: Qt.rgba(0,0,0,0.14)  // rgba(0,0,0,0.14) undefined
    colorNeutralShadowAmbientDarker: Qt.rgba(0,0,0,0.40)  // rgba(0,0,0,0.40) undefined
    colorNeutralShadowKeyDarker: Qt.rgba(0,0,0,0.48)  // rgba(0,0,0,0.48) undefined
    colorBrandShadowAmbient: Qt.rgba(0,0,0,0.30)  // rgba(0,0,0,0.30) undefined
    colorBrandShadowKey: Qt.rgba(0,0,0,0.25)  // rgba(0,0,0,0.25) undefined

}
