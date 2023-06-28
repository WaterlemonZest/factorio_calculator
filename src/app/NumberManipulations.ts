export function presentable(value: number) {
  const RESOLUTION = 0.01;
  //round up to the nearest RESOLUTION multiple
  const quantized = Math.ceil((1 / RESOLUTION) * value) * RESOLUTION;
  //strip the trailing zeros (and potentially the dot)
  return quantized.toFixed(2).replace(/\.?0*$/, "");
}

export function presentableInt(value: number) {
  // round up to the nearest integer
  return Math.ceil(value).toFixed(0);
}
