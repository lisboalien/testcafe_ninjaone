import { Selector, t } from "testcafe";

class DeviceCard {
  constructor(deviceName) {
    this.deviceCard = Selector(`.device-main-box:contains(${deviceName})`);
    this.deviceCardName = Selector(`.device-main-box:contains(${deviceName}) .device-name`);
    this.deviceCardType = Selector(`.device-main-box:contains(${deviceName}) .device-type`);
    this.deviceCardCapacity = Selector(`.device-main-box:contains(${deviceName}) .device-capacity`);
    this.deviceCardEdit = Selector(`.device-main-box:contains(${deviceName} .device-edit`);
    this.deviceCardRemove = Selector(`.device-main-box:contains(${deviceName}) .device-remove`);
  }
}

class MainPage {
  constructor() {
    this.title = Selector(".ninja-logo-container");
    this.deviceType = Selector("#device_type");
    this.sortBy = Selector("#sort_by");
    this.addDevice = Selector(".submitButton");
  }

  async newDeviceCard(deviceName) {
    return new DeviceCard(deviceName);
  }
}

export default new MainPage();
