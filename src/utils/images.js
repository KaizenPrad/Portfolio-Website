/**
 * Responsive image helpers.
 * Project screenshots are stored at 640 / 1024 / 1600 px widths.
 */

/** Build a srcset for a project screenshot path like `/images/projects/x/01.webp`. */
export function srcSetFor(src) {
  if (!src) return undefined
  const base = src.replace(/\.webp$/, '')
  return `${base}-640.webp 640w, ${base}-1024.webp 1024w, ${src} 1600w`
}
