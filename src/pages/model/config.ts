const setDefaultLight = (light: any) => ({
  min: -20,
  max: 20,
  step: 0.01,
  open: true,
  helper: false,
  ...light,
});

export const cameraConfig = {
  position: {
    x: 2.15,
    y: 2.343,
    z: 2.235,
    min: -10,
    max: 10,
    step: 0.001,
    enablePan: true,
    helper: false,
  },
  scale: {
    x: 0.37,
    y: 0.49,
    z: 0.701,
    min: 0.1,
    max: 2,
    step: 0.001,
    zoom: 0.9,
    enableZoom: false,
  },
  rotation: {
    x: -1.271,
    y: 1.068,
    z: 1.232,
    min: -10,
    max: 10,
    step: 0.001,
    enableRotate: true,
  },
};
//direction light 平行光
export const directionLightConfig = setDefaultLight({
  rotation: {
    x: 1.01,
    y: 0.63,
    z: 0.56,
  },
  position: {
    x: 2.06,
    y: 2.06,
    z: 8.8,
  },
  intensity: 1.5,
  color: 0x8cf2ff,
  castShadow: true,
});
export const directionLightConfig1 = setDefaultLight({
  rotation: {
    x: -6.68,
    y: 3.1,
    z: -3.8,
  },
  position: {
    x: -0.65,
    y: 2.05,
    z: -7.38,
  },
  intensity: 1.5,
  color: 0xab8bff,
  castShadow: true,
});
//point light 点光
export const pointLightConfig = setDefaultLight({
  position: {
    x: 4.53,
    y: 5.56,
    z: 2.13,
  },
  power: 5.57,
  color: 0xffffff,
  open: true,
  helper: false,
  sphereSize: 2,
});
//hemisphere light 半球光
export const hemisphereLightConfig = setDefaultLight({
  rotation: {
    x: 0,
    y: 0,
    z: 0,
  },
  position: {
    x: 10,
    y: 10,
    z: 10,
  },
  skyColor: 0xffffff,
  intensity: 0.5,
  groundColor: 0xffffff,
});
