let testCounter = 0;

/**
 * Get the test counter string
 * @returns {String} - Test counter string
 */
export function getTestCounter() {
  testCounter += 1;
  return `TC${testCounter.toString().padStart(2, "0")}`;
}
