import ModbusRTU from '@widesky/modbus-serial';
import express from 'express';
import { register } from 'prom-client';
import {
  tvocGauge,
  pm1Gauge,
  pm25Gauge,
  pm4Gauge,
  pm10Gauge,
  co2Gauge,
  temperatureGauge,
  humidityGauge,
  absoluteHumidityGauge,
  pressureGauge,
  noiseGauge,
  lightGauge,
  no2Gauge,
  coGauge,
  o3Gauge,
  ch2oGauge,
  peopleGauge,
  vocIndexGauge,
  noxIndexGauge,
} from './metrics';
import { isUndefined } from 'lodash';

const app = express();

app.get('/info', async (req, res) => {
  const status = await getStatus();
  res.set('Content-Type', 'application/json');
  res.json(status);
});

// API endpoint to expose Prometheus metrics
app.get('/metrics', async (req, res) => {
  const status = await getStatus();
  if (!isUndefined(status.tvoc)) tvocGauge.set(status.tvoc);
  pm1Gauge.set(status.pm1);
  pm25Gauge.set(status.pm25);
  pm4Gauge.set(status.pm4);
  pm10Gauge.set(status.pm10);
  co2Gauge.set(status.co2);
  temperatureGauge.set(status.temperature);
  humidityGauge.set(status.humidity);
  absoluteHumidityGauge.set(status.abs_humidity);
  pressureGauge.set(status.pressure);
  noiseGauge.set(status.noise);
  lightGauge.set(status.light);
  if (!isUndefined(status.no2)) no2Gauge.set(status.no2);
  if (!isUndefined(status.co)) coGauge.set(status.co);
  if (!isUndefined(status.o3)) o3Gauge.set(status.o3);
  if (!isUndefined(status.ch2o)) ch2oGauge.set(status.ch2o);
  if (!isUndefined(status.people)) peopleGauge.set(status.people);
  if (!isUndefined(status.VOC_index)) vocIndexGauge.set(status.VOC_index);
  if (!isUndefined(status.NOx_index)) noxIndexGauge.set(status.NOx_index);

  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

async function getStatus() {
  const client = new ModbusRTU();
  await client.connectTCP(process.env.MODBUS_TCP_IP || '192.168.1.138', {
    port: parseInt(process.env.MODBUS_TCP_PORT || '502', 10),
  });

  // set the client's unit id (default: 1)
  client.setID(1);
  client.setTimeout(1000);

  const result = (await client.readInputRegisters(0x0040, 20)).buffer;
  const available = (await client.readDiscreteInputs(0x0040, 20)).data;
  await new Promise<void>((resolve) => client.close(resolve));

  return {
    ...(available[0] ? { tvoc: result.readUInt16BE(0) / 1000 } : {}),
    pm1: result.readUInt16BE(2) / 10,
    pm25: result.readUInt16BE(4) / 10,
    pm4: result.readUInt16BE(6) / 10,
    pm10: result.readUInt16BE(8) / 10,
    co2: result.readUInt16BE(10),
    temperature: result.readInt16BE(12) / 100,
    humidity: result.readUInt16BE(14) / 100,
    abs_humidity: result.readUInt16BE(16),
    pressure: result.readUInt16BE(18) / 10,
    noise: result.readUInt16BE(20),
    light: result.readUInt16BE(22),
    ...(available[12] ? { no2: result.readUInt16BE(24) / 1000 } : {}),
    ...(available[13] ? { co: result.readUInt16BE(26) / 1000 } : {}),
    ...(available[14] ? { o3: result.readUInt16BE(28) / 1000 } : {}),
    ...(available[15] ? { ch2o: result.readUInt16BE(30) / 1000 } : {}),
    ...(available[17] ? { people: result.readUInt16BE(34) } : {}),
    ...(available[18] ? { VOC_index: result.readUInt16BE(36) } : {}),
    ...(available[19] ? { NOx_index: result.readUInt16BE(38) } : {}),
  };
}

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// getStatus().then((xxx) => {
//   console.log(`
//   tvoc: ${xxx.tvoc} ppm
//   pm1: ${xxx.pm1} ug/m3
//   pm2.5: ${xxx.pm25} ug/m3
//   pm4: ${xxx.pm4} ug/m3
//   pm10: ${xxx.pm10} ug/m3
//   CO2: ${xxx.co2} ppm
//   t: ${xxx.temperature} C
//   h: ${xxx.humidity} %
//   abs_h: ${xxx.abs_humidity} g/m3
//   p: ${xxx.pressure} mbar
//   noise: ${xxx.noise} dB
//   light: ${xxx.light} Lux
//   no2: ${xxx.no2} ppm
//   co: ${xxx.co} ppm
//   o3: ${xxx.o3} ppm
//   ch2o: ${xxx.ch2o} ppm
//   people: ${xxx.people} count
//   voc_index: ${xxx.VOC_index} Index points
//   nox_index: ${xxx.NOx_index} Index points
//   `);
// });
