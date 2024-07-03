import { t } from "testcafe";

const apiUrl = `http://localhost:3000`;

/**
 * Get the list of devices using API
 * @param {String} sortedBy device property to sort by [system_name, type, hdd_capacity]
 * @returns Array of devices objects sorted or not
 */
export async function getDevicesAPI(sortedBy = null) {
  const results = await t.request(`${apiUrl}/devices`);
  await t.expect(results.status).eql(200, "Response status should be 200");
  await t
    .expect(results.body.length)
    .gt(0, "There should be at least one device");

  const body = results.body;
  if (sortedBy) {
    if (!Object.keys(body[0]).includes(sortedBy)) {
      throw new Error(`Invalid sort key: ${sortedBy}`);
    }

    body.sort((a, b) => (a[sortedBy] || "").localeCompare(b[sortedBy] || ""));
  }

  return body;
}

/**
 * Get the device object using API
 * @param {String} deviceId Device Id
 * @returns The device object
 */
export async function getDeviceAPI(deviceId) {
  const results = await t.request(`${apiUrl}/devices/${deviceId}`);
  await t.expect(results.status).eql(200, "Response status should be 200");
  return results.body;
}

/**
 * Update the device using API
 * @param {String} deviceId Device Id
 * @param {Object} updatedDevice The object of the updated device
 */
export async function updateDeviceAPI(deviceId, updatedDevice) {
  const results = await t.request.put(`${apiUrl}/devices/${deviceId}`, {
    body: updatedDevice,
  });
  await t.expect(results.status).eql(200, "Response status should be 200");
}

/**
 * Delete the device using API
 * @param {String} deviceId Device Id
 */
export async function deleteDeviceAPI(deviceId) {
  const results = await t.request.delete(`${apiUrl}/devices/${deviceId}`);
  await t.expect(results.status).eql(200, "Response status should be 200");
}
