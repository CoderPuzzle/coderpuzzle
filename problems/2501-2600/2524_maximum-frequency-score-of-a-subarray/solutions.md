# Solutions — Maximum Frequency Score of a Subarray

## Sliding window with per-value power deltas

Every window's score is a sum with one term per distinct value,
`v^count(v)`, under the modulus `10⁹ + 7`. When the window slides one
step, exactly two values change their counts: the value entering gets
`count → count + 1` and the value leaving gets `count → count − 1`. Only
those two terms of the sum ever move, so recomputing every window from
scratch is wasted work; instead the running score is repaired in place
as the window moves.

The trick is never to touch untouched terms. Keep, next to the window's
frequency map, each in-window value's _current_ power term. When a slide
brings a value in or out, only that value's term is recomputed at its
new count and the running score takes the difference — including the
boundary cases, where a value entering from absent contributes its whole
`v^1` and a count dropping to zero removes its entire term rather than
stepping down from `v^0`. Each update costs two modular exponentiations
via iterative binary powering (`O(log MOD)` multiplications), the first
window assembles through the same true deltas starting from an empty
score, and maximization happens over the residues themselves, per the
statement's maximize-under-the-modulus rule.

All residues stay below `2³⁰`, so every intermediate product fits in a
64-bit integer before its reduction (JavaScript keeps exactness by
splitting one factor at 2¹⁵, bounding intermediates below `2⁴⁶ < 2⁵³`).

**Complexity:** `O(n log MOD)` time across the sweep, `O(min(n, U))`
space for the frequency map where `U` is the number of distinct values.
