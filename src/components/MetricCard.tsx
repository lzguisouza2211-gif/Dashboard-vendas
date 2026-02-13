type Props = {
  title: string;
  value: string | number;
};

export function MetricCard({ title, value }: Props) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "10px",
        background: "#1f2937",
        color: "white",
        minWidth: "200px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
      }}
    >
      <p style={{ opacity: 0.7 }}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}
