/* Decorative (faux) QR with the Nirmie emblem in the centre — deterministic,
   so it renders identically on server and client. Phase 2: swap for a real QR
   pointing at the download page. */
export default function QrCode() {
  const N = 21;
  const cell = 100 / N;
  let r = 7;
  const rnd = () => (r = (r * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;

  const rects: { x: number; y: number }[] = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const finder = (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7);
      const center = x > 7 && x < 13 && y > 7 && y < 13;
      if (center) continue;
      const fill = finder
        ? x % 6 === 0 ||
          y % 6 === 0 ||
          (x >= 2 && x <= 4 && y >= 2 && y <= 4) ||
          (x >= N - 5 && x <= N - 3 && y >= 2 && y <= 4) ||
          (x >= 2 && x <= 4 && y >= N - 5 && y <= N - 3)
        : rnd() > 0.55;
      if (fill) rects.push({ x: x * cell, y: y * cell });
    }
  }

  return (
    <svg viewBox="0 0 100 100" id="qr-svg">
      <rect width="100" height="100" fill="#fff" />
      {rects.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={cell} height={cell} fill="#022800" rx="1" />
      ))}
      <image href="/assets/emblem-forest.png" x="38" y="38" width="24" height="24" />
    </svg>
  );
}
