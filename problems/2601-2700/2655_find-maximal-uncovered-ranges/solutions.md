# Solutions — Find Maximal Uncovered Ranges

## Sort and Merge Covered Ranges

The array length n can be 10⁹, so every approach that paints cells or
sweeps positions is hopeless; the answer, however, is carved entirely
from range endpoints. Sorting the given ranges by start makes their union
something a single cursor can walk: each sorted range either overlaps or
extends the covered prefix already reached, or — when its start sits past
the cursor — leaves exactly one maximal uncovered stretch behind.

The sweep carries cur, the first index not yet known to be covered.
Because ranges were sorted by start, s > cur means no earlier range can
reach into `[cur, s - 1]` (any that did would end at or beyond cur and
have pulled the cursor up), so that block is emitted as one gap; then the
cursor jumps to `e + 1`, merging overlaps silently. After the last range,
a trailing cursor below n contributes the final uncovered block. The
emission order is automatically ascending by start, and gaps are maximal
by construction: adjacent emissions are always separated by at least one
covered cell belonging to some input range.

Widening: with n up to 10⁹ the cursor's `e + 1` reaches n itself, which
still fits 32 bits (10⁹ < 2³¹ − 1), though C++ and Rust keep the running
cursor in 64-bit as belt-and-braces; Python, Go ints, Java longs-free int
arithmetic, and JavaScript doubles are exact far beyond these bounds.

**Complexity:** `O(m log m)` time for m = ranges.length dominated by the
sort, `O(1)` extra space beside the sort and output.
