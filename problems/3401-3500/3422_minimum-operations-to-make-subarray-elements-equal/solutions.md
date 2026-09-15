# Solutions — Minimum Operations to Make Subarray Elements Equal

Making one window of k elements all equal to a common value t costs
sum(|x - t|), which is minimized when t is a median of that window. The
answer is the cheapest window, so the whole problem reduces to
maintaining a median — and the two sums around it — while a window of
size k slides across the array.

## Sliding median in two heap halves

Split each window into a lower and an upper half held in two heaps, the
lower half allowed to hold one element more; its top is a median of the
window. Running sums of both halves turn the current window's cost into
O(1) arithmetic — `(median * |low| - sumLow) + (sumHigh - median * |high|)` —
so each slide only pushes the entering element onto the half it belongs
to, books the leaving element as removed, and rebalances at most one
element across the split: O(log n) heap work per position.

Deletion is lazy, and it is made exact by a packing trick: every element
carries the unique key `(v + 2^20) << 17 | index`, so heap keys never
tie and the halves partition by key with max(low) strictly below
min(high). An outgoing element then routes to its true half with a
single comparison against the low top, and a stale copy is dropped only
when it finally surfaces at a heap top. Window costs reach
k * 2 * 10^6 = 2 * 10^11, past 32-bit range, so the sums and the answer
are 64-bit throughout; the packed keys stay under 2^38, exact as JS
numbers.

**Complexity:** `O(n log n)` time, `O(n)` space.
