# Solutions — Min Stack

## Paired Minimum Stack

A plain array-backed stack already answers `push`, `pop`, and `top` in constant time; the difficulty is `getMin`. Scanning for the minimum is `O(n)`, and caching one global minimum breaks on `pop` — removing the cached minimum leaves nothing to consult without a rescan.

The fix is to make every stack entry self-contained: alongside each pushed value, store the minimum of the stack **as of the moment it was pushed** — `min(value, minimum of the entry below)` for a non-empty stack, `value` itself otherwise. The pair on top of the stack then answers both `top` and `getMin` by reading one field.

The key observation is that a `pop` returns the stack to a state it occupied before, and the exposed entry's stored minimum is precisely the minimum of that earlier state — so deletion needs no recomputation at all. Duplicates of the minimum need no special handling: each copy carries its own snapshot, so the minimum survives until the last copy is popped.

Both the Python and Java canonical solutions implement exactly this pairing (Python as a list of tuples, Java as two parallel `int` arrays grown geometrically, keeping values in raw `int` so the full `-2³¹..2³¹-1` range is exact).

**Complexity:** `O(1)` time per operation, `O(n)` space for a stack of `n` elements.
