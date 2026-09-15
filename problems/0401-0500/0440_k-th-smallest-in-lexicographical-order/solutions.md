# Solutions — K-th Smallest in Lexicographical Order

## Denary Tree Walk with Subtree Counting

The integers 1 to n, read lexicographically, are the preorder traversal of a denary tree: the roots are 1 through 9, and each node's children are formed by appending the digits 0 through 9. Finding the k-th smallest number is therefore a matter of walking this tree in preorder, but n can be 10^9, so whole subtrees must be skipped rather than visited.

The helper `count_steps(n, n1, n2)` counts how many numbers in `[1, n]` lie in the numeric range `[n1, n2)` — the subtree rooted at prefix `n1` excluding its next sibling. It does so level by level: at each step the interval `[n1, n2)` covers all numbers sharing the current prefix at that depth, so it adds `min(n + 1, n2) - n1` (clamping the right edge past n) and scales both bounds by ten for the next level, stopping once `n1` exceeds n. The loop runs at most one iteration per digit.

The walk itself starts at `cur = 1` with `k` decremented to a zero-based skip count. At each step it computes the size of the subtree between `cur` and `cur + 1`: if that block fits within the remaining budget (`steps <= k`), the entire subtree is skipped by moving right (`cur += 1`, `k -= steps`); otherwise the answer lies below, so the walk descends one level (`cur *= 10`, `k -= 1`, consuming the current node itself). When `k` reaches 0 the current node is the answer.

![Numbers 1…13 of example 1 as a denary tree: the subtree under prefix 1 holds five numbers {1, 10, 11, 12, 13} while prefix 2 holds only {2}, so with k = 2 the walk descends from 1 to 10.](figures/solution-denary-tree.svg)

Because each level of the tree allows at most nine right-moves before a descent, and the depth is at most the number of digits of n, the walk takes O(number of digits) moves, each costing an O(number of digits) subtree count. No numbers are ever materialized, so n up to 10^9 is handled instantly.

**Complexity:** `O(log^2 n)` time, `O(1)` space.
