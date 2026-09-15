# Solutions — Remove Duplicates from Sorted Array

## Read/write two-pointer compaction

Because `nums` arrives sorted, all copies of a value sit in one adjacent run, and a single forward scan is enough to find every run boundary. Two indexes share the walk: `read` examines each element in order, while `write` marks the end of the deduplicated prefix built so far. The first element always belongs to the answer, so both start at `1`.

Whenever `nums[read]` differs from `nums[write - 1]` — the last value kept — a new run has started, and its value is copied down into `nums[write]` before `write` advances. Duplicates are never moved at all; they are simply stepped over, and everything from `write` onward is scratch space the contract lets us ignore. The invariant throughout is that `nums[0..write)` holds exactly the unique values seen among `nums[0..read]`, in sorted order, so when the scan ends the method returns `nums[:write]`, the compacted prefix — its length is `k`, the count of unique elements, which is exactly what the judge compares as a sorted array.

No second array is ever allocated, which is what "in place" demands; the Rust port receives the `Vec` by value and compacts that same allocation. At the extremes the two indexes tell the whole story: on an all-identical array `write` never moves and `k` is `1`, while on an all-distinct array every element is copied onto itself (`write` and `read` advance in lockstep) and `k` is the length.

**Complexity:** `O(n)` time, `O(1)` space.
