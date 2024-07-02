import { t } from "testcafe";

/**
 * Get the list of devices using API
 * @returns {Object} - List of devices
 */
export async function getDevicesAPI() {
  const results = await t.request(`http://localhost:3000/devices`).body;
  return results;
}

/**
 * Update the device using API
 * @param {String} deviceId Device Id
 * @param {Object} updatedDevice The object of the updated device
 */
export async function updateDeviceAPI(deviceId, updatedDevice) {
  await t.request.put(`http://localhost:3000/devices/${deviceId}`, {
    body: updatedDevice,
  });
}
