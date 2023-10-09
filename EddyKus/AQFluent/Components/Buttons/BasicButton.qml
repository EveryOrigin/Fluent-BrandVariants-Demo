import QtQuick
import QtQuick.Controls

AbstractButton {

    id: btn

    property real borderWidth: 1
    property real backgroundRadius: 4

    //定义颜色
    property var colors: {
        "NormalColor": theme.colorBrandBackground,
        "HoveredColor": theme.colorBrandBackgroundHover,
        "PressedColor": theme.colorBrandBackgroundPressed,
    }
    hoverEnabled: true
    implicitWidth: 50
    implicitHeight: 25

    background: Rectangle {
        id: bg
        radius: backgroundRadius
        color: enabled ? (pressed ? colors.PressedColor : (hovered  ? colors.HoveredColor : colors.NormalColor)) : colors.DisableColor
    }

}
