type Props = {
  title: string;
  value: string | number;
  delay?: number;
};

export function MetricCard({ title, value, delay = 0 }: Props) {
  return (
    <div
      className="metric-card-anim"
      style={{
        flex: 1,
        padding: "20px",
        borderRadius: "12px",
        background: "#1f2937",
        color: "white",
        boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
        animationDelay: `${delay}s`
      }}
    >
      <p style={{ opacity: 0.7 }}>{title}</p>
      <h2>{value}</h2>
      <style>{`
        .metric-card-anim {
          opacity: 0;
          transform: translateY(30px);
          animation: metricFadeIn 0.8s cubic-bezier(.23,1.02,.32,1) forwards;
        }
        @keyframes metricFadeIn {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
