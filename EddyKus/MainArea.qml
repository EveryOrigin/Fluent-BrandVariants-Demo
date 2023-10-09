import QtQuick
import "./AQFluent/Components/GroupBox"

Item {

    id: area

    BasicGroupBox {
        id: deviceCommandArea
        y: 4
        x: parent.width - 4 - width
        width: parent.width * 0.12
        height: parent.height * 0.3
        title: "Commands"
        headerBackgroundColor: "#EEF2F5"
        backgroundColor: "#F6F8FA"
        borderColor: "#A9B0B6"
        titleColor: "#404142"
        DeviceCommandGroup {
            id: deviceCommandGroup
        }
    }

    BasicGroupBox {
        id: deviceStatusArea
        y: 4
        x: deviceCommandArea.x - 4 - width
        width: parent.width * 0.12
        height: parent.height * 0.3
        title: "Device Status"
        headerBackgroundColor: "#EEF2F5"
        backgroundColor: "#F6F8FA"
        borderColor: "#A9B0B6"
        titleColor: "#404142"
    }

    BasicGroupBox {
        id: actualReadingArea
        y: 4
        x: deviceStatusArea.x - 4 - width
        width: parent.width * 0.12
        height: parent.height * 0.3
        title: "Actual Reading"
        headerBackgroundColor: "#EEF2F5"
        backgroundColor: "#F6F8FA"
        borderColor: "#A9B0B6"
        titleColor: "#404142"
    }

    BasicGroupBox {
        id: readingDataArea
        y: 4
        x: actualReadingArea.x - 4 - width
        width: parent.width * 0.3
        height: parent.height * 0.3
        title: "Reading Data"
        headerBackgroundColor: "#EEF2F5"
        backgroundColor: "#F6F8FA"
        borderColor: "#A9B0B6"
        titleColor: "#404142"
    }

    BasicGroupBox {
        id: scanSettingArea
        y: 4
        x: 4
        width: readingDataArea.x - 8
        height: parent.height * 0.3
        title: "Scan Setting"
        headerBackgroundColor: "#EEF2F5"
        backgroundColor: "#F6F8FA"
        borderColor: "#A9B0B6"
        titleColor: "#404142"
    }

    BasicGroupBox {
        id: scanResultArea
        y: scanSettingArea.height + 8
        x: 4
        width: parent.width - 8
        height: parent.height - 12 - scanSettingArea.height
        title: "ScanResult"
        headerBackgroundColor: "#EEF2F5"
        backgroundColor: "#F6F8FA"
        borderColor: "#A9B0B6"
        titleColor: "#404142"
    }

}
