# Solutions — Minimum Array End

## Embed Sequence Bits into Zero Positions

Every element's AND with the others must keep every bit of `x`, so each
element must be a bitwise superset of `x` — no element can clear any bit `x`
holds. Conversely, if all elements are supersets of `x`, the AND keeps at
least `x`; and because the smallest possible element is `x` itself, which
the optimal array always includes as its first member (it is free: `x` is
valid, positive, and the smallest superset), the AND loses nothing extra
and equals exactly `x`. The construction problem therefore collapses to
picking `n` distinct supersets of `x`, strictly increasing, as cheaply as
possible.

Supersets of `x` enumerate in a tidy order: they are `x` OR'd with every
subset of its zero positions. Counting those free slots like a binary
counter produces the sorted sequence, so element `v` (0-indexed) of the
optimal array is "`merge(x, v)`": scatter the bits of `v`, lowest first,
into consecutive zero-bit slots of `x`, keeping `x`'s own bits untouched.
The minimal last element is that merge for `v = n - 1`.

One upward walk over bit positions finishes in constant time. Bounds stay
honest: since `x <= 10⁸ < 2²⁷ − 1`, `x` cannot occupy all 27 low bits, so
every free slot sits low enough that the merged answer tops out near bit 52
— beyond 32 bits (which is why the return is 64-bit everywhere), yet safely
inside JavaScript Number's exact window below 2⁵³.

**Complexity:** `O(log n + log x)` time (`≤ ~54 slot visits`), `O(1)` space.
