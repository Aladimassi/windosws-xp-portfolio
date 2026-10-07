/**
 * The Win98 UI is drawn in fixed 11px pixels. On large screens we zoom the
 * whole desktop so it stays readable; every pointer coordinate must then be
 * divided by the same factor.
 */
export function getUiScale(): number {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w >= 2300 && h >= 1200) return 1.5;
  if (w >= 1700 && h >= 900) return 1.25;
  return 1;
}

/** Logical (unzoomed) size of the desktop work area, taskbar excluded. */
export function getWorkArea() {
  const s = getUiScale();
  return { width: window.innerWidth / s, height: window.innerHeight / s - 28 };
}

/** Width reserved on the left for the two columns of desktop icons. */
export const ICON_AREA_WIDTH = 196;
