# Solutions — Minimum Cost to Make All Characters Equal

## Independent border fixes

Look at what each operation does to one _border_ — the gap between
positions `i - 1` and `i`. Every prefix flip whose index is less than
`i - 1` or at least `i` moves both neighbors together and leaves their
relative order untouched; only the prefix flip ending exactly at `i - 1`
(with cost `i`) inverts the left side alone, and only the suffix flip
starting exactly at `i` (with cost `n - i`) inverts the right side alone.
So if `s[i - 1] != s[i]`, the final string can only be uniform when one of
those two specific operations has been applied an odd number of times;
applying either twice cancels out and only adds cost, so once or never is
always at least as good.

That makes the borders independent: border `i` costs nothing when its
neighbors match, and otherwise costs exactly `min(i, n - i)` for the
cheaper of the two operations that can fix it. No operation participates
in two borders' constraints — each prefix index touches exactly one border
from the left list and each suffix index exactly one from the right — so
summing the per-border minima yields the global minimum. The scan tracks
just the running total; no arrays are needed.

The total can reach `n² / 4 ≈ 2.5 × 10⁹` on a fully alternating string of
length 10⁵, which overflows a signed 32-bit integer — hence 64-bit
accumulators in Java/C++/Go/Rust, while JavaScript's `number` stays exact
well below 2⁵³ and Python integers are unbounded.

**Complexity:** `O(n)` time, `O(1)` space.
