type MenuBarProps = {
  items: string[];
};

export function MenuBar({ items }: MenuBarProps) {
  return (
    <div className="w98-menubar">
      {items.map((item) => (
        <button key={item} type="button" className="w98-menubar-item">
          <span>{item.charAt(0)}</span>
          {item.slice(1)}
        </button>
      ))}
    </div>
  );
}
