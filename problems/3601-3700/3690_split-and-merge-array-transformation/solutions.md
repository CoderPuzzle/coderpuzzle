# Solutions — Split and Merge Array Transformation

## Breadth-first search over array states

Every split-and-merge operation costs exactly one, so the minimum number of
operations to turn `nums1` into `nums2` is a shortest-path length in an
unweighted graph whose nodes are array configurations and whose edges are
the cut-and-paste moves. Breadth-first search from `nums1` explores that
graph layer by layer, and the first time `nums2` appears is its distance.
The search space stays tiny: with `n <= 6` there are at most `n! = 720`
configurations (fewer when values repeat), so no pruning beyond a visited
set is ever needed.

From each dequeued state the successors come from trying every subarray
`[l..r]` — single elements included — cutting it out of the state, and
pasting it back at every slot of what remains: before the first element,
between any two elements, or after the last one. Pasting the piece back
where it came from just reproduces the current state, and other repeats are
absorbed by hashing each generated configuration in a visited set keyed by
the whole tuple. If the arrays already match, the answer is 0 without any
search; the goal test runs on generation rather than on dequeue, which
returns one layer earlier.

The search always terminates with an answer: `nums2` is guaranteed to be a
permutation of `nums1`, and moving one element at a time reaches any
permutation, so `nums2` is reachable. At most `n!` states are visited, and
generating the roughly `n^3 / 3` successors of a state costs `O(n)` each.

**Complexity:** `O(n! · n^4)` time, `O(n! · n)` space.
