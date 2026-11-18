export function Squiggle({
  width,
  height,
  startY,
  dip,
  repeats,
  color = "#F062A8",
}: {
  width: number;
  height: number;
  startY: number;
  dip: number;
  repeats: number;
  color?: string;
}) {
  const path = `M2 ${startY} q 9 ${dip} 18 0 ` + "t 18 0 ".repeat(repeats);
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    >
      <path d={path} />
    </svg>
  );
}
