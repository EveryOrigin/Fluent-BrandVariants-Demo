QT +=   \
        quick   \
        gui

SOURCES += \
        main.cpp

resources.files += \
        main.qml \
        AQFluent/Components/Buttons/BasicButton.qml \
        AQFluent/Components/Buttons/IconButton.qml \
        AQFluent/Components/Buttons/TextButton.qml \
        AQFluent/Theme/Types/BrandPalette.qml \
        AQFluent/Theme/Types/Tokens/ColorTokens.qml \
        AQFluent/Theme/Types/Tokens/DarkColorTokens.qml \
        AQFluent/Theme/Types/Tokens/LightColorTokens.qml \
        AQFluent/Theme/Types/BrandVariants.qml \
        AQFluent/Theme/Types/ColorVariants.qml \
        AQFluent/Theme/Utils/csswg.js \
        AQFluent/Theme/Utils/csswgTest.js \
        AQFluent/Theme/Utils/hueMap.js \
        AQFluent/Theme/Utils/geometry.js \
        AQFluent/Theme/Utils/palettes.js \
        AQFluent/Theme/Types/PreDefinedColor.qml \
        TitleBar.qml

resources.prefix = /$${TARGET}
RESOURCES += resources \
    resource.qrc

TRANSLATIONS += \
    language/EddyKus_zh_CN.ts

CONFIG += lrelease
CONFIG += embed_translations

# Additional import path used to resolve QML modules in Qt Creator's code model
QML_IMPORT_PATH = $$PWD

# Additional import path used to resolve QML modules just for Qt Quick Designer
QML_DESIGNER_IMPORT_PATH =

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target

DISTFILES += \
    AQFluent/Components/Buttons/BasicButton.qml \
    AQFluent/Components/Buttons/IconButton.qml \
    AQFluent/Components/Buttons/TextButton.qml \
    AQFluent/Components/GroupBox/BasicGroupBox.qml \
    AQFluent/Components/InfoBar.qml \
    AQFluent/Theme/Types/BrandPalette.qml \
    AQFluent/Theme/Types/Tokens/ColorTokens.qml \
    AQFluent/Theme/Types/Tokens/DarkColorTokens.qml \
    AQFluent/Theme/Types/Tokens/LightColorTokens.qml \
    AQFluent/Theme/Types/BrandVariants.qml \
    AQFluent/Theme/Types/ColorVariants.qml \
    AQFluent/Theme/Types/PreDefinedColor.qml \
    AQFluent/Theme/Utils/csswg.js \
    AQFluent/Theme/Utils/csswgTest.js \
    AQFluent/Theme/Utils/geometry.js \
    AQFluent/Theme/Utils/hueMap.js \
    AQFluent/Theme/Utils/palettes.js \
    DeviceCommandGroup.qml \
    MainArea.qml \
    TitleBar.qml \
    language/EddyKus_zh_CN.ts
