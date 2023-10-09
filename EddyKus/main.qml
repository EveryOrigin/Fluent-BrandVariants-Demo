import QtQml
import QtQuick
import QtQuick.Controls
import "./AQFluent/Theme/Types/"
import "./AQFluent/Theme/Types/Tokens"
import "./AQFluent/Components/"
import "./AQFluent/Components/Buttons"

Window {

    id: mainWindow

    // 避免双屏情景下的宽度溢出
    minimumWidth: Screen.width * 0.8
    minimumHeight: Screen.desktopAvailableHeight * 0.8
    // 设置窗口属性为无边框
    flags: Qt.Window | Qt.FramelessWindowHint
    visible: true
    color: "white"

    property bool darkMode: false
    property var theme: darkMode ? dark : light

    LightColorTokens {
        id: light
        brand: BrandVariants {
            id: brand
            brandPalette.keyColor: "#0F6CBD"
        }
    }

    DarkColorTokens {
        id: dark
        brand: BrandVariants {
            brandPalette.keyColor: "#0F6CBD"
        }
    }

    Rectangle {
        width: 150
        height: 50
        x: testBtn.x + 250
        y: parent.height * 0.9
        border.width: 1
        TextInput {
            anchors.fill: parent
            horizontalAlignment: TextInput.AlignHCenter
            verticalAlignment: TextInput.AlignVCenter
            text: "#0F6CBD"
            font.pixelSize: 16
            onEditingFinished: {
                light.brand.brandPalette.keyColor = text
                dark.brand.brandPalette.keyColor = text
            }
        }
    }
    Text {
        x: testBtn.x + 450
        y: parent.height * 0.9
        text: "输入主题色，完毕后回车"
    }

    BasicButton {
        id: testBtn
        width: 150
        height: 50
        x: (parent.width - 100) / 2
        y: parent.height * 0.9
        onClicked: darkMode = !darkMode
        Text {
            anchors.centerIn: parent
            color: "white"
            text: "Change Dark Mode"
        }
    }

    Component.onCompleted: {
        mainWindow.showMaximized()
        //infoBar.showSuccess("Hello")
    }

    TitleBar {
        id: titleBar
        titleColor: "#1E1F1F"
        titleText: "FluentUI示范"
        activeBackgroundColorChange: false
        backgroundColor: light.colorNeutralBackground1
        dividerColor: light.colorNeutralBackground2
    }

    Row {
        id: row
        anchors.centerIn: parent
        width: mainWindow.width * 0.7
        height: mainWindow.height * 0.7
        spacing: 0
        Repeater {
            model: brand.hexColors.length
            Rectangle {
                width: row.width / 16
                height: row.height
                color: brand.hexColors[index]
                Text {
                    color: "white"
                    anchors.centerIn: parent
                    text: brand.hexColors[index]
                }
            }
        }
    }

    FontLoader {
        id: aliFont
        source: "qrc:/icon/iconfont.ttf"
    }

}


