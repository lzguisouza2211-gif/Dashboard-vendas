type Props = {
  title: string;
  value: string | number;
};

export function MetricCard({ title, value }: Props) {
  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        borderRadius: "12px",
        background: "#1f2937",
        color: "white",
        boxShadow: "0 6px 15px rgba(0,0,0,0.25)"
      }}
    >
      <p style={{ opacity: 0.7 }}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}
