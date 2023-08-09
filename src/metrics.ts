import { Gauge } from 'prom-client';

// https://atmotube.com/blog/tvoc-monitoring-in-commercial-and-office-buildings
export const tvocGauge = new Gauge({
  name: 'tvoc',
  help: `Since so many chemicals fall into the category of VOCs, it’s not possible to monitor each one continuously. Instead, you can estimate VOC levels in the air by monitoring concentrations of a few common VOCs representing the group as a whole. This group is called total volatile organic compounds (TVOC). TVOC levels shouldn't exceed 0.20 ppm (ppm)`,
});

export const pm1Gauge = new Gauge({
  name: 'pm1',
  help: `PM1 are ultrafine particles with a diameter smaller than 1 micrometer: dust, combustion particles, bacteria. It's major subnet of PM2.5. (ug/m3)`,
});

export const pm25Gauge = new Gauge({
  name: 'pm25',
  help: `PM2.5 or fine particles are 2.5 micrometers in diameter or smaller. (ug/m3)`,
});

export const pm4Gauge = new Gauge({
  name: 'pm4',
  help: `PM4 are 4 micrometers in diameter or smaller. (ug/m3)`,
});

export const pm10Gauge = new Gauge({
  name: 'pm10',
  help: `PM10 or coarse dust particles refer to particles with a diameter less than or equal to 10 microns in size. (ug/m3)`,
});

export const co2Gauge = new Gauge({
  name: 'co2',
  help: 'Carbon dioxide, CO2, is an odorless non-toxic gas. (ppm)',
});

export const temperatureGauge = new Gauge({
  name: 'temperature',
  help: 'Generally people feel comfortable at temperatures between 21C to 27C',
});

export const humidityGauge = new Gauge({
  name: 'humidity',
  help: 'Generally people feel comfortable at a relative humidity between 40% to 60%',
});

export const absoluteHumidityGauge = new Gauge({
  name: 'absolute_humidity',
  help: 'a measure of the actual amount of water vapor (moisture) in the air. (g/m3)',
});

export const pressureGauge = new Gauge({
  name: 'pressure',
  help: 'mbar',
});

export const noiseGauge = new Gauge({
  name: 'noise',
  help: 'dB',
});

export const lightGauge = new Gauge({
  name: 'light',
  help: 'Lx',
});

export const no2Gauge = new Gauge({
  name: 'no2',
  help: 'ppm',
});

export const coGauge = new Gauge({
  name: 'co',
  help: 'ppm',
});

export const o3Gauge = new Gauge({
  name: 'o3',
  help: 'ppm',
});

export const ch2oGauge = new Gauge({
  name: 'ch2o',
  help: 'ppm',
});

export const peopleGauge = new Gauge({
  name: 'people',
  help: 'count',
});

export const vocIndexGauge = new Gauge({
  name: 'voc_index',
  help: 'index',
});

export const noxIndexGauge = new Gauge({
  name: 'nox_index',
  help: 'index',
});
