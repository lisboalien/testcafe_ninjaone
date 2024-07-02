import mainPage from "./pages/main_page";
import newDevicePage from "./pages/new_device_page";
import * as apiRequests from "./helper/api_requests";
import { getTestCounter } from "./helper/utils";
import { generateDevice } from "./data/new_device";

fixture`Test structure`.page`http://localhost:3001/`;

test(`${getTestCounter()} - Checking Devices List`, async (t) => {
  // Fetch the list of devices from the API
  const results = await apiRequests.getDevicesAPI();

  // Iterate over each device to verify its presence in the UI
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
  test(`${getTestCounter()} - Create a new device - '${type}'`, async (t) => {
    // Generate a new device
    const newDevice = generateDevice(null, type, null);

    // Navigate to the add device page
    await t.click(mainPage.addDevice);
    await newDevicePage.pageOpened();

    // Add the new device
    await newDevicePage.addDevice(newDevice);

    // Verify that the main page is displayed after adding the device
    await t.expect(mainPage.title.exists).ok("Main page is not displayed");
    await t.expect(mainPage.deviceList.count).gt(0, "Device list is empty");

    // Verify that the new device is displayed on the main page
    await mainPage.verifyDeviceCard(
      newDevice.system_name,
      newDevice.type === "WINDOWS SERVER"
        ? newDevice.type.replace(" ", "_")
        : newDevice.type,
      newDevice.hdd_capacity
    );
  });
});

test(`${getTestCounter()} - Rename Device using API`, async (t) => {
  // Get the first device from the list
  const results = await apiRequests.getDevicesAPI();
  const firstDevice = results[0];

  // Generate new device details
  const renamedDevice = generateDevice(
    "Renamed Device",
    firstDevice.type,
    firstDevice.hdd_capacity
  );

  // Update device name
  await apiRequests.updateDeviceAPI(firstDevice.id, renamedDevice);

  // Verify device update in the API
  const updatedDevice = await apiRequests.getDeviceAPI(firstDevice.id);
  await t
    .expect(updatedDevice.system_name)
    .eql(renamedDevice.system_name, "Device name is not updated");

  // Reload to reflect changes
  await t.eval(() => location.reload());

  // Verify device update
  await mainPage.verifyDeviceCard(
    renamedDevice.system_name,
    renamedDevice.type,
    renamedDevice.hdd_capacity,
    0
  );
});

test(`${getTestCounter()} - Delete the last device using API`, async (t) => {
  // Get the list of devices
  const results = await apiRequests.getDevicesAPI();

  // Get the last device from the list
  const lastDevice = results[results.length - 1];

  // Delete the last device
  await apiRequests.deleteDeviceAPI(lastDevice.id);

  // Get the list of devices
  const resultAfterDeletion = await apiRequests.getDevicesAPI();

  // Verify that the last device is not present in the list
  await t
    .expect(resultAfterDeletion)
    .notContains(
      lastDevice,
      "The last device should not be present in the list"
    );

  // Reload to reflect changes
  await t.eval(() => location.reload());

  // Verify that the last device is not displayed on the main page
  await mainPage.verifyDeviceCard(
    lastDevice.system_name,
    lastDevice.type,
    lastDevice.hdd_capacity,
    -1,
    false
  );
});
