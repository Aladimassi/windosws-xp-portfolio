import { useRef, useState } from "react";

const COLORS = ["#000", "#808080", "#800000", "#ff0000", "#008000", "#00ff00", "#000080", "#ff00ff", "#008080", "#ffff00", "#fff", "#c0c0c0"];

export function PaintApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#000");
  const [size, setSize] = useState(3);
  const drawing = useRef(false);

  const getCtx = () => canvasRef.current?.getContext("2d");

  const startDraw = (x: number, y: number) => {
    const ctx = getCtx();
    if (!ctx) return;
    drawing.current = true;
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (x: number, y: number) => {
    if (!drawing.current) return;
    const ctx = getCtx();
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const clear = () => {
    const ctx = getCtx();
    const c = canvasRef.current;
    if (ctx && c) ctx.clearRect(0, 0, c.width, c.height);
  };

  return (
    <div className="w98-paint">
      <div className="w98-paint-toolbar w98-outset">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            className={`w98-paint-color${color === c ? " selected" : ""}`}
            style={{ background: c }}
            onClick={() => setColor(c)}
            aria-label={`Color ${c}`}
          />
        ))}
        <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="w98-paint-size">
          <option value={2}>1px</option>
          <option value={4}>2px</option>
          <option value={8}>4px</option>
        </select>
        <button type="button" className="w98-btn w98-outset" onClick={clear}>
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={480}
        height={300}
        className="w98-paint-canvas w98-inset"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          const p = pos(e);
          startDraw(p.x, p.y);
        }}
        onPointerMove={(e) => {
          const p = pos(e);
          draw(p.x, p.y);
        }}
        onPointerUp={() => {
          drawing.current = false;
        }}
      />
    </div>
  );
}
