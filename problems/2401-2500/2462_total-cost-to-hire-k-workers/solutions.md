# Solutions — Total Cost to Hire K Workers

## Two Min-Heaps over the Front and Back Windows

Each hiring session sees only the first `candidates` and last `candidates` remaining workers, so the frontier itself is what matters — not the whole array. Maintain two min-heaps: `left` covers the live window starting at index 0 and growing rightward, `right` covers the window ending at the last index and shrinking leftward. Each heap is ordered by `(cost, index)`, which makes Python's tuple comparison break ties by the smaller index automatically.

Each round pops the cheaper heap top, preferring `left` on ties — the `left[0] <= right[0]` comparison encodes both the cost rule and the tie rule, since an equal pair resolves to the left one. After a hire from one side, the window on that side refills from the untouched middle: pointer `i` feeds `left` and pointer `j` feeds `right`, but only while `i <= j`, so no middle worker is ever inserted twice. Exactly `k` rounds run, accumulating the popped costs.

The degenerate case gets special treatment: when `2 * candidates >= n`, the two windows overlap or cover everything, meaning every remaining worker is always eligible, and the greedy is simply "hire the `k` cheapest overall" — computed by one sort. Handling this up front keeps the two-pointer refill logic free of overlap bugs, and it is also the faster path when it applies.

Initialization heapifies the two windows in linear time; afterwards each of the `k` hires does a constant number of `O(log candidates)` heap operations. With `k <= n <= 10^5` the logarithmic factor is the whole cost of the main path, and the fallback path is a single sort.

**Complexity:** `O(n log n)` time, `O(n)` space.
