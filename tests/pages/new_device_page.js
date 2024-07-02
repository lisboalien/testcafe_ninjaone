import { Selector, ClientFunction, t } from "testcafe";

class DeviceCard {
  constructor() {
    this.title = Selector("h3");
    this.systemName = Selector("#system_name");
    this.type = Selector("#type");
    this.typeOption = Selector("#type option");
    this.hddCapacity = Selector("#hdd_capacity");
    this.saveButton = Selector(".submitButton");
  }

  async pageOpened() {
    const getLocation = ClientFunction(() => document.location.href);
    await t
      .expect(getLocation())
      .contains("/devices/add")
      .expect(this.title.innerText)
      .contains("NEW DEVICE");
  }

  async addDevice(newDevice) {
    await t
      .typeText(this.systemName, newDevice.system_name)
      .click(this.type)
      .click(this.typeOption.withText(newDevice.type))
      .typeText(this.hddCapacity, `${newDevice.hdd_capacity}`)
      .click(this.saveButton);
  }
}

export default new DeviceCard();
