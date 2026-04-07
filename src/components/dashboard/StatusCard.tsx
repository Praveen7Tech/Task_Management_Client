
export const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);


