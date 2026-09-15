# Solutions — Rotate Non Negative Elements

Only the non-negative values move, and they move solely among their own
slots, so the whole task reduces to rotating one extracted sequence and
scattering it back.

## Gather, rotate by index, scatter

Collect the non-negative values into a list `values` in scan order; if it
is empty the array is all negatives and comes back unchanged, which also
guards the modulo against dividing by zero. Otherwise reduce the requested
shift once to `k % m`, where `m` is the number of values collected, since
rotating a cycle of length `m` by `m` positions is the identity — the
statement allows `k` up to `10⁵` regardless of how few non-negatives there
are, and the reduction absorbs all of that.

Then walk `nums` a second time with a counter `at` over the non-negative
positions: the `at`-th such slot receives `values[(at + shift) % m]`, which
is exactly the left rotation — the element that used to sit `shift` places
earlier in the gathered order slides into the current slot. Copying `nums`
into the result first means every negative position is already correct and
is simply never revisited.

The two passes touch each element a constant number of times, so the work
is linear. Values live within ±10⁵, `k` and the length within 10⁵, and the
only arithmetic is one modulo plus index sums below 2 × 10⁵ — everything
fits comfortably in 32-bit integers in every language, with no sums or
products of element values anywhere. The gathered list and the result make
the space `O(n)`.

**Complexity:** `O(n)` time, `O(n)` space.
