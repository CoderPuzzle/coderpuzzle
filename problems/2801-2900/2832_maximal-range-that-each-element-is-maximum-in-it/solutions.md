# Solutions — Maximal Range That Each Element Is Maximum in It

## Monotonic Stack Boundaries

The longest subarray in which `nums[i]` is the maximum is exactly the window that extends from `i` until it hits a strictly greater element on either side: `nums[i]` can include anything smaller as the maximum, but one step past a greater element the crown changes heads. So `ans[i] = (R[i] - L[i] + 1)` where `L[i]` is the nearest position to the left holding a greater value (or 0 past the array edge) and `R[i]` the nearest greater on the right (or `n - 1`).

Both boundary arrays come from a monotonic stack of indices whose values are kept in decreasing order. Scanning left to right, before pushing index `i` every index with a smaller value is popped — those indices have just found their nearest greater element to the right, namely `i`. Whatever remains on the stack is the nearest greater element to the left of `i`. A symmetric right-to-left pass fills the other array. Each index is pushed and popped at most once per pass.

![Each element of [1,5,4,3,6] with the bracket spanning its nearest greater boundaries, giving ans = [1,4,2,1,5].](figures/solution-monotonic-stack-spans.svg)

Because all elements are distinct, there are no equal-value ties to break, and the strict/non-strict distinction never matters; every window boundary is unambiguous. A monotone array like `[1, 2, 3, 4, 5]` simply leaves the stack empty in the left pass, so each range extends to the edge, giving `ans[i] = i + 1`.

**Complexity:** `O(n)` time, `O(n)` space.
