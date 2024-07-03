import { Selector, t } from "testcafe";

class DeviceCard {
  constructor(identifier) {
    this.baseSelector = Selector(`.device-main-box`);
    this.deviceCard =
      typeof identifier === "number"
        ? this.baseSelector.nth(identifier)
        : this.baseSelector.withText(identifier);
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
    this.sortByOptions = this.sortBy.find("option");
    this.addDevice = Selector(".submitButton");
    this.deviceList = Selector(".device-main-box");
  }

  /**
   * Sort the list of devices by the given option
   * @param {String} option sortByOption [capacity, name]
   */
  async sortDevicesBy(option = "capacity") {
    const opt =
      option.toLowerCase() === "name" ? "SYSTEM NAME" : "HDD CAPACITY";

    await t.click(this.sortBy).click(this.sortByOptions.withText(opt));
  }

  /**
   * Create a new device card
   * @param {String} deviceName - Device name
   */
  async newDeviceCard(deviceName) {
    return new DeviceCard(deviceName);
  }

  /**
   *
   * @param {String} deviceName Device name
   * @param {String} deviceType Device type [MAC, WINDOWS SERVER, WINDOWS WORKSTATION]
   * @param {String} deviceCapacity (GB)
   * @param {Numver} nth Position of the card you want to verify, if null, it will verify the device name
   * @param {Boolean} contains To verify if the card contains the details or not
   */
  async verifyDeviceCard(
    deviceName,
    deviceType,
    deviceCapacity,
    nth = null,
    contains = true
  ) {
    const deviceCard = await this.newDeviceCard(
      nth === null ? deviceName : nth
    );
    try {
      if (contains) {
        await this.verifyDeviceDetails(
          deviceCard,
          deviceName,
          deviceType,
          deviceCapacity
        );
        await this.verifyDeviceActions(deviceCard);
      } else {
        await this.verifyDeviceDetailsNotContains(deviceCard, deviceName);
      }
    } catch (error) {
      console.log(error);
      throw new Error(`Error verifying device card: ${error}`);
    }
  }

  /**
   * Verify if the device card contains the correct details
   * @param {Selector} deviceCard The card you are verifying
   * @param {String} deviceName Device name
   * @param {String} deviceType Device type [MAC, WINDOWS SERVER, WINDOWS WORKSTATION]
   * @param {String} deviceCapacity Device capacity (GB)
   */
  async verifyDeviceDetails(
    deviceCard,
    deviceName,
    deviceType,
    deviceCapacity
  ) {
    await t
      .expect(deviceCard.deviceCardName.innerText)
      .contains(deviceName, "Device name does not match.")
      .expect(deviceCard.deviceCardType.innerText)
      .contains(deviceType, "Device type does not match.")
      .expect(deviceCard.deviceCardCapacity.innerText)
      .contains(deviceCapacity, "Device capacity does not match.");
  }

  /**
   * Verify if the device card contains the correct actions
   * @param {Selector} deviceCard The card you are verifying
   */
  async verifyDeviceActions(deviceCard) {
    await t
      .expect(deviceCard.deviceCardEdit.exists)
      .ok("Edit button does not exist.")
      .expect(deviceCard.deviceCardRemove.exists)
      .ok("Remove button does not exist.");
  }

  /**
   * Verify if the device card does not contain the details
   * @param {Selector} deviceCard The card you are verifying
   * @param {String} deviceName Device name
   */
  async verifyDeviceDetailsNotContains(deviceCard, deviceName) {
    await t
      .expect(deviceCard.deviceCardName.innerText)
      .notContains(deviceName, "Device name should not match.");
  }

  /**
   * Verify if there is no device card with the given name
   * @param {String} deviceName Device name
   */
  async verifyRemovedDevice(deviceName) {
    const device = await this.newDeviceCard(deviceName);
    await t
      .expect(device.deviceCard.exists)
      .notOk("Device card should not exist.");
  }
}

export default new MainPage();
