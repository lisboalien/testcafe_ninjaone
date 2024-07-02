import mainPage from "./pages/main_page";
import newDevicePage from "./pages/new_device_page";
import { generateDevice } from "./data/newDevice";

fixture`Test structure`.page`http://localhost:3001/`;

test(`Checking Devices List`, async (t) => {
  const results = await t.request(`http://localhost:3000/devices`).body;

  results.forEach(async (element, index) => {
    await mainPage.verifyDeviceCard(
      element.system_name,
      element.type,
      element.hdd_capacity
    );
  });
});

// BUG When creating a Windows Server device, the card shows the "WINDOWS_SERVER" with an underscore instead of a space
["MAC", "WINDOWS SERVER", "WINDOWS WORKSTATION"].forEach((type) => {
  test(`Create a new device - '${type}'`, async (t) => {
    const newDevice = generateDevice(null, type, null);

    await t.click(mainPage.addDevice);
    await newDevicePage.pageOpened();

    await newDevicePage.addDevice(newDevice);

    await t.expect(mainPage.title.exists).ok();
    await t.expect(mainPage.deviceList.count).gt(0);

    await mainPage.verifyDeviceCard(
      newDevice.system_name,
      newDevice.type,
      newDevice.hdd_capacity
    );
  });
});
