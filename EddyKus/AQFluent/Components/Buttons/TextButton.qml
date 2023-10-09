import QtQuick

BasicButton {

    id: btn

    property alias contentText: contText.text
    property string textColor: "white"
    property alias textFont: contText.font.family
    property alias textSize: contText.font.pixelSize

    implicitWidth: contText.implicitWidth
    implicitHeight: contText.implicitHeight

    Text {
        id: contText
        anchors.centerIn: btn
        color: btn.enabled ? textColor : "#A5A5A5"
        text: "Input"
        font.pixelSize: 14
        horizontalAlignment: Text.AlignHCenter
        verticalAlignment: Text.AlignVCenter
    }

}
