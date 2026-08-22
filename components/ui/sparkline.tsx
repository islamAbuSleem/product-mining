type SparklineProps = {
  points: number[];
  width?: number;
  height?: number;
  area?: boolean;
  stroke?: string;
};

export function Sparkline({
  points,
  width = 120,
  height = 36,
  area = true,
  stroke = "#2563eb",
}: SparklineProps) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const stepX = width / (points.length - 1 || 1);
  const coords = points.map((point, index) => {
    const x = index * stepX;
    const y = height - ((point - min) / span) * (height - 4) - 2;
    return `${x},${y}`;
  });
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {area ? (
        <polygon points={`0,${height} ${coords.join(" ")} ${width},${height}`} fill="rgba(37, 99, 235, 0.1)" />
      ) : null}
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
