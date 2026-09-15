# Solutions — Find the Minimum Area to Cover All Ones I

## Single-pass bounding box

The covering rectangle has no freedom at all in where it sits: every `1`
must be inside it, so its top edge is forced up to the topmost `1`, its
bottom edge down to the bottommost `1`, and likewise for the two vertical
edges. Conversely any rectangle that tightens past those four extreme cells
would exclude one, so `(bottom − top + 1) * (right − left + 1)` is both a
valid cover and unbeatable.

The code therefore makes a single pass over the grid keeping only four
extremes. Each row is checked for containing a `1` and contributes just its
first and last set column; Python, JavaScript and TypeScript reach those
with native index searches while the typed languages track them inside the
column loop. Rows without ones simply update nothing, and since the input
guarantees at least one `1`, the extremes are always well defined at the
end.

The area fits comfortably in 32 bits: at most `1000 * 1000 = 10⁶`.

**Complexity:** `O(mn)` time, `O(1)` space.
