# Solutions — Choose K Elements With Maximum Sum

## Sweep by Value with a Top-k Min-Heap

The query for index `i` only depends on the set of `j` with `nums1[j] < nums1[i]`, which suggests sweeping indices in increasing order of `nums1`: by the time the sweep reaches a group of equal values, every strictly smaller element's `nums2` value is already in a pool, and the answer for the whole group is the sum of its `k` largest pool values. Sorting the indices once turns all `n` queries into a single left-to-right pass.

The pool is maintained as a min-heap of at most `k` values together with its running sum. Inserting a new value either fills the heap (sum grows) or, when the value exceeds the heap's minimum, evicts that minimum via `heapreplace` and adjusts the sum — so at every moment the heap holds the top-k of everything inserted so far and `total` is their sum, answering a query in `O(1)`.

![The sweep over nums1 = [4,2,1,5,3] in blocks: the top-2 pool and its sum when each block's answers are read, with the evictions caused by 50 and 40.](figures/solution-topk-heap.svg)

The one ordering trap is ties in `nums1`: equal values must not see each other (the condition is strict `<`), so the sweep processes indices in blocks of equal `nums1` — first read `result` for every member of the block from the current pool state, and only then insert the block's `nums2` values. This makes the block's answers reflect exactly the strictly-smaller predecessors.

Edge cases: all values equal (every answer 0, since nothing is strictly smaller — example 2), fewer than `k` predecessors (the heap holds what exists and the sum is of all of them — index 2 in example 1), and `k >= n` (the heap never evicts).

**Complexity:** `O(n log n)` time, `O(n)` space.
