import QtQuick

BasicButton {

    id: btn

    property alias iconText: contText.text
    property string iconColor: "white"
    property alias iconFont: contText.font.family
    property alias iconSize: contText.font.pixelSize

    implicitWidth: contText.implicitWidth
    implicitHeight: contText.implicitHeight

    Text {
        id: contText
        anchors.centerIn: btn
        color: btn.enabled ? iconColor : "#A5A5A5"
        font.pixelSize: 10
        text: ""
        horizontalAlignment: Text.AlignHCenter
        verticalAlignment: Text.AlignVCenter
    }

}
