# Solutions — Aggregate Two Time Series

## Merge scan with running values

Every output timestamp comes from the union of the two series' timestamps,
and merging two sorted sequences into that union is the classic merge step:
walk both series from their ends, repeatedly take whichever tail timestamp
is larger, and take both when they are equal. Processing from right to left
is what makes the "next available value" rule cheap — while sweeping, each
series keeps one running value, the value of the last element seen so far,
which for any timestamp still ahead of the cursor is exactly its next
available value.

At each step the taken elements update their own series' running value
first (an element present at this timestamp always wins), the other series'
value simply persists across the gap, and the emitted pair is the timestamp
together with the sum of the two running values. A series contributes 0
exactly while its running value has not been set yet — that happens only
for timestamps before the sweep reaches the series' first element going
rightward, i.e. timestamps where the series has no entry at or after them.
The sweep yields the pairs in ascending order when they are written from
the back of a right-sized buffer (or by reversing the collected list).
Summed values reach `2 * 10^9`, past 32-bit range, so fixed-width
languages accumulate in 64-bit integers.

**Complexity:** `O(n)` time, `O(n)` space, for `n` the combined length of
both series.
