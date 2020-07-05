export default function generateShades({ hue, saturation, lightness }) {
  let hs = [];
  let dx = hue.range / 9;
  console.log(hue)
  for (let x = 0; x < 9; x += 1) {
    const y = (hue.start + x * dx) % 360;
    hs.push(Math.round(y));
  }

  let ls = [];
  dx = lightness.range / 9;
  for (let x = 0; x < 9; x += 1) {
    ls.push(Math.min(100, Math.round(lightness.start + x * dx)));
  }

  let ss = [];
  for (let x = 10; x < 100; x += 10) {
    const {a, b, c} = saturation;
    let y = Math.round(a * ((x - b) ** 2) + c)
    y = Math.max(0, y);
    y = Math.min(100, y);
    ss.push(y);
  }

  let props = [];
  for (let i = 0; i < 9; i++) {
    props.push({
      hue: hs[i],
      saturation: ss[i],
      lightness: ls[i],
    });
  }

  console.log(JSON.stringify(props, null, 4));
  // console.log(saturation)

  return props;
}