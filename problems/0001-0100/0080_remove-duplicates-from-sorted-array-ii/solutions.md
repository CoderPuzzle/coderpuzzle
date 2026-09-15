# Solutions — Remove Duplicates from Sorted Array II

## Read/write two-pointer compaction

Because `nums` arrives sorted, all copies of a value sit in one adjacent run, and a single forward scan is enough to lay out the at-most-twice answer. Two indexes share the walk: `read` examines each element in order, while `write` marks the end of the kept prefix built so far. The first two elements always belong to the answer — each value may appear twice — so both start at `2`, and arrays of length at most two are returned untouched.

Whenever `nums[read]` differs from `nums[write - 2]` — the value two slots back in the kept prefix — the current value has not yet used up its two allowed copies, so it is copied down into `nums[write]` before `write` advances. Equality can only mean one thing in a sorted array: the kept prefix already ends with two copies of `nums[read]`, so the rest of that run is stepped over, and everything from `write` onward is scratch space the contract lets us ignore. The invariant throughout is that `nums[0..write)` holds each value seen among `nums[0..read]` at most twice, in sorted order, so when the scan ends the method returns `nums[:write]`, the compacted prefix — its length is `k`, the element count after removal, which is exactly what the judge compares as a sorted array.

No second array is ever allocated, which is what "in place with O(1) extra memory" demands; the Rust port receives the `Vec` by value and compacts that same allocation. At the extremes the two indexes tell the whole story: on one long run `write` stops at `2` and `k` is `2`, while on an all-distinct array every element is copied onto itself (`write` and `read` advance in lockstep) and `k` is the length.

**Complexity:** `O(n)` time, `O(1)` space.
