import { Selector, t } from "testcafe";

class DeviceCard {
  constructor(deviceName) {
    this.deviceCard = Selector(`.device-main-box`).withText(deviceName);
    this.deviceCardName = this.deviceCard.find(`.device-name`);
    this.deviceCardType = this.deviceCard.find(`.device-type`);
    this.deviceCardCapacity = this.deviceCard.find(`.device-capacity`);
    this.deviceCardEdit = this.deviceCard.find(`.device-edit`);
    this.deviceCardRemove = this.deviceCard.find(`.device-remove`);
  }
}

class MainPage {
  constructor() {
    this.title = Selector(".ninja-logo-container");
    this.deviceType = Selector("#device_type");
    this.sortBy = Selector("#sort_by");
    this.addDevice = Selector(".submitButton");
    this.deviceList = Selector(".device-main-box");
  }

  /**
   * Create a new device card
   * @param {String} deviceName - Device name
   */
  async newDeviceCard(deviceName) {
    return new DeviceCard(deviceName);
  }

  /**
   * Verify if the device is on the devices list
   * @param {String} deviceName Device name
   * @param {String} deviceType Device type [MAC, WINDOWS SERVER, WINDOWS WORKSTATION]
   * @param {String} deviceCapacity Device capacity (GB)
   */
  async verifyDeviceCard(deviceName, deviceType, deviceCapacity) {
    const device = await this.newDeviceCard(deviceName);
    await t
      .expect(device.deviceCardName.innerText)
      .contains(deviceName)
      .expect(device.deviceCardType.innerText)
      .contains(deviceType)
      .expect(device.deviceCardCapacity.innerText)
      .contains(deviceCapacity)
      .expect(device.deviceCardEdit.exists)
      .ok()
      .expect(device.deviceCardRemove.exists)
      .ok();
  }
}

export default new MainPage();
