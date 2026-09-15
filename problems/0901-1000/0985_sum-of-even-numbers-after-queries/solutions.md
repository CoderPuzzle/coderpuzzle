# Solutions — Sum of Even Numbers After Queries

A query rewrites exactly one element, yet the naive answer rescans all of
`nums` to re-sum the evens after every query. The sum cannot move anywhere
except through the element being rewritten, so a running total that is
adjusted by that one element's before-and-after contribution replaces the
rescan with constant work per query.

## Running even sum, adjusted by the rewritten element

Compute the even sum of `nums` once, before the first query. For each
`[val, index]`, look at the value currently at `index`: if it is even, it is
about to stop being part of the sum, so subtract it; then apply the update
`nums[index] += val`; if the new value is even, it has just joined the sum,
so add it. The recorded answer for the query is the total after both
adjustments, which is exactly the sum of even values of the post-update
array. The order matters — the old value must leave the total before the
addition lands — so an element that flips parity is never counted on either
side of the flip, and one that keeps its parity is subtracted and re-added
as the same or a shifted value.

The parity test is `value % 2 == 0`, which is sign-safe in every language
here: a negative even value such as `-2` yields remainder `0` everywhere,
while the odd `-3` yields `-1` or `1` by language — never `0` — so testing
evenness, not oddness, needs no special casing. A `val` of `0` and repeated
hits on the same index fall out of the same two adjustments unchanged. The
arithmetic stays well inside 32-bit integers: the even sum's magnitude is
bounded by the total initial magnitude plus the total added magnitude, at
most `10⁴ · 10⁴ + 10⁴ · 10⁴ = 2 · 10⁸`, and even a single element driven by
every query reaches only `10⁴ + 10⁴ · 10⁴ ≈ 10⁸` — both far below the
32-bit limit of `2.147 · 10⁹`.

**Complexity:** `O(n + q)` time, `O(q)` space (output).
