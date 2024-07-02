/**
 * Generate a device object with random values
 * @param {String} name Name of the device, if null, a random name will be generated
 * @param {String} type Type of the device, if null, a random type will be generated [MAC, WINDOWS SERVER, WINDOWS WORKSTATION]
 * @param {String} capacity Capacity of the device, if null, a random capacity will be generated
 * @returns
 */
export function generateDevice(name = null, type = null, capacity = null) {
  // Arrays of possible values for types
  const types = ["MAC", "WINDOWS SERVER", "WINDOWS WORKSTATIONS"];

  // Function to get a random element from an array
  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Function to generate a 'Test System' name with a random number
  const generateSystemName = () =>
    `Test System ${Math.floor(Math.random() * 1000) + 1}`;

  // Function to get a random HDD capacity between 100 and 1000
  const getRandomHddCapacity = () =>
    Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

  // Creating a new device object with random values
  const newDevice = {
    system_name: name === null ? generateSystemName() : name,
    type: type === null ? getRandomElement(types) : type,
    hdd_capacity: capacity === null ? getRandomHddCapacity() : capacity,
  };

  return newDevice;
}
