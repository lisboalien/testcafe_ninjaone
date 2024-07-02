import { t } from "testcafe";

/**
 * Get the list of devices using API
 * @returns {Object} - List of devices
 */
export async function getDevicesAPI() {
  const results = await t.request(`http://localhost:3000/devices`);
  await t.expect(results.status).eql(200, "Response status should be 200");
  await t
    .expect(results.body.length)
    .gt(0, "There should be at least one device");
  return results.body;
}

/**
 * Update the device using API
 * @param {String} deviceId Device Id
 * @param {Object} updatedDevice The object of the updated device
 */
export async function updateDeviceAPI(deviceId, updatedDevice) {
  const results = await t.request.put(
    `http://localhost:3000/devices/${deviceId}`,
    {
      body: updatedDevice,
    }
  );
  await t.expect(results.status).eql(200, "Response status should be 200");
}

export async function deleteDeviceAPI(deviceId) {
  const results = await t.request.delete(
    `http://localhost:3000/devices/${deviceId}`
  );
  await t.expect(results.status).eql(200, "Response status should be 200");
}
