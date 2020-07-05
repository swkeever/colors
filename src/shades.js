function generateHues(hue) {
  const hs = [];
  const dx = hue.range / 9;
  for (let x = 0; x < 9; x += 1) {
    const y = (hue.start + x * dx) % 360;
    hs.push(Math.round(y));
  }
  return hs;
}

function generateLightness(lightness) {
  const ls = [];
  const dx = lightness.range / 9;
  for (let x = 0; x < 9; x += 1) {
    ls.push(Math.min(100, Math.round(lightness.start + x * dx)));
  }
  return ls;
}

function generateSaturation(saturation) {
  const ss = [];
  for (let x = 10; x < 100; x += 10) {
    const { a, b, c } = saturation;
    let y = Math.round(a * (x - b) ** 2 + c);
    y = Math.max(0, y);
    y = Math.min(100, y);
    ss.push(y);
  }
  return ss;
}

function combineResults({ hs, ls, ss }) {
  const props = [];
  for (let i = 0; i < 9; i += 1) {
    props.push({
      hue: hs[i],
      saturation: ss[i],
      lightness: ls[i],
    });
  }
  return props;
}

export default function generateShades({ hue, saturation, lightness }) {
  const hs = generateHues(hue);
  const ls = generateLightness(lightness);
  const ss = generateSaturation(saturation);
  const props = combineResults({ hs, ls, ss });

  console.log(JSON.stringify(props, null, 4));

  return props;
}
