interface CheckboxItemProps {
  label: string;
  checked?: boolean;
  count?: number;
  onChange?: () => void;
}

export default function CheckboxItem({
  label,
  checked = false,
  count,
  onChange,
}: CheckboxItemProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-2 border-input accent-primary cursor-pointer"
      />
      <span className="text-sm text-foreground flex-1">{label}</span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </label>
  );
}
