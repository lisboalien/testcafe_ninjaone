import { Selector } from "testcafe";
import mainPage from "./pages/main_page";

fixture`Test structure`.page`http://localhost:3001/`;

test(`Checking Devices List`, async (t) => {
  const results = await t.request(`http://localhost:3000/devices`).body;

  results.forEach(async (element, index) => {
    const device = await mainPage.newDeviceCard(element.system_name);
    await t
      .expect(device.deviceCardName.innerText)
      .contains(element.system_name)
      .expect(device.deviceCardType.innerText)
      .contains(element.type)
      .expect(device.deviceCardCapacity.innerText)
      .contains(element.hdd_capacity)
      .expect(device.deviceCardEdit.exists)
      .ok()
      .expect(device.deviceCardRemove.exists)
      .ok();
  });
});
