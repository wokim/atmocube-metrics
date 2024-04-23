/**
 * Function to calculate the dew point.
 * @param temperature Current temperature (°C)
 * @param relativeHumidity Relative humidity (%)
 * @returns Dew point (°C)
 */
export function calculateDewPoint(
  temperature: number,
  relativeHumidity: number,
): number {
  // Magnus formula constants
  const a = 17.27;
  const b = 237.7;

  // Calculation of dew point using Magnus formula
  const alpha =
    (a * temperature) / (b + temperature) + Math.log(relativeHumidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);

  return parseFloat(dewPoint.toFixed(1));
}
