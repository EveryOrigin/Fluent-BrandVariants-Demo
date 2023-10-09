import QtQuick
import "./AQFluent/Components/Buttons"

Rectangle {

    id: titlebar
    width: parent.width
    height: 32
    radius: 0
    color: activeBackgroundColorChange ?
               (!mainWindow.active ?
                    Qt.lighter(backgroundColor, activeBackgroundLighterRatio)
                    : backgroundColor)
               : backgroundColor

    property bool dragEnabled: true
    property bool activeBackgroundColorChange: true
    property bool activeTitleColorChange: true
    property bool titleEnabled: true
    property string backgroundColor: "#EEF4F9"
    property string dividerColor: "#E6EBF0"
    property real activeBackgroundLighterRatio: 0.98
    property real activeTextLighterRatio: 0.5
    property alias titleFont: appTitle.font.family
    property alias titlePSize: appTitle.font.pixelSize
    property alias titleText: appTitle.text
    property string titleColor: "white"

    //窗口顶部拖动功能实现
    //记录点击事件时坐标作为初始坐标
    //在按住移动时不断计算坐标差并移动主窗口
    MouseArea {
        property int origin_x: 0
        property int origin_y: 0
        anchors.fill: parent
        onPressed: function(mouse){
            origin_x = mouse.x
            origin_y = mouse.y
        }
        onPositionChanged: function(mouse){
            var dx = mouse.x - origin_x
            var dy = mouse.y - origin_y
            if(!dragEnabled) return
            mainWindow.x += dx
            mainWindow.y += dy
        }
    }

    Text {
        id: appTitle
        x: 12
        enabled: titleEnabled
        color: mainWindow.active ? titleColor : "#999999"
        font.pixelSize: 12
        horizontalAlignment: Text.AlignHCenter
        verticalAlignment: Text.AlignVCenter
        anchors.verticalCenter: parent.verticalCenter
    }

    Rectangle {
        id: divider
        width: parent.width
        height: 1
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.bottom: parent.bottom
        color: dividerColor
    }

    Row {
        anchors.right: parent.right
        height: parent.height
        width: 144
        spacing: 0
        IconButton {
            id: minBtn
            z: 10
            backgroundRadius: 0
            colors: {
                    "NormalColor": "white",
                    "HoveredColor": "#EAEAEA",
                    "PressedColor": "#CACACB",
                    "BorderColor": "white",
                    "HoverBorderColor": "#EAEAEA",
                    "ClickBorderColor": "#CACACB",
                    "DisableColor": "#404040",
                    "DisableBorderColor": "#404040",
                }
            implicitWidth: 48
            implicitHeight: parent.height
            iconColor: "black"
            iconFont: aliFont.name
            iconText: "\ue7c0"
            onClicked: mainWindow.showMinimized()
        }
        IconButton {
            id: maxBtn
            z: 10
            backgroundRadius: 0
            colors: {
                    "NormalColor": "white",
                    "HoveredColor": "#EAEAEA",
                    "PressedColor": "#CACACB",
                    "BorderColor": "white",
                    "HoverBorderColor": "#EAEAEA",
                    "ClickBorderColor": "#CACACB",
                    "DisableColor": "#404040",
                    "DisableBorderColor": "#404040",
                }
            implicitWidth: 48
            implicitHeight: parent.height
            iconColor: "black"
            iconFont: aliFont.name
            iconText: mainWindow.visibility===2 ? "\ue7c1" : "\ue7bf"
            onClicked: mainWindow.visibility===2 ? mainWindow.showMaximized() : mainWindow.showNormal()
        }
        IconButton {
            id: closeBtn
            z: 10
            backgroundRadius: 0
            colors: {
                    "NormalColor": "white",
                    "HoveredColor": "#E81123",
                    "PressedColor": "#F1707A",
                    "BorderColor": "white",
                    "HoverBorderColor": "#E81123",
                    "ClickBorderColor": "#F1707A",
                    "DisableColor": "#404040",
                    "DisableBorderColor": "#404040",
                }
            implicitWidth: 48
            implicitHeight: parent.height
            iconColor: hovered ? "white" : "black"
            iconFont: aliFont.name
            iconText: "\ue7b4"
            onClicked: mainWindow.close()
        }
    }

}
