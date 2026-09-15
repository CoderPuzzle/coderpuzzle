# Solutions — Remove Element

## Two-pointer compaction

The survivors only have to occupy the front of `nums`, in any order — so removal never needs to shift anything. Keep a write index `k` that always marks the next free slot in the compacted prefix and scan the array once with a read cursor: whenever the cursor sees a value different from `val`, that value belongs in the prefix, so it is copied to slot `k` and `k` advances.

The two cursors start together and the read cursor never falls behind the write cursor, so every write lands at or before the position being read — no survivor is overwritten before it has already been copied. Elements equal to `val` are simply skipped: they stay wherever they are, past `k`, and the statement explicitly frees both their values and everything beyond the new length.

After the scan the method returns `nums[:k]`, the compacted prefix; its length is `k`, the count of elements not equal to `val`, which is exactly what the judge compares as an order-free multiset.

**Complexity:** `O(n)` time, `O(1)` extra space.
