# Solutions — K-th Largest Perfect Subtree Size in Binary Tree

## Bottom-up perfect-size aggregation

A subtree is perfect exactly when both of its children are perfect and
have equal sizes — a leaf is the size-1 base case, and a node with a
single child can never qualify. So one bottom-up sweep computes, for
every node, its subtree size when that subtree is perfect and a "not
perfect" marker otherwise, and every node that comes out perfect
contributes its size to a running list.

![In Example 1's 13-node tree the bottom-up sweep marks both inner 5 nodes perfect with size 3 and every leaf size 1, and the sorted list [3, 3, 1, 1, 1, 1, 1, 1] puts 3 at k = 2.](figures/solution-perfect-size-aggregation.svg)

The sweep visits children before parents without recursion (chains run
2000 nodes deep, past every recursion budget): a first pass records the
nodes in breadth-first order, and a second pass walks that order
backwards, so every node is read only after both of its children. With
every perfect size collected, one descending sort puts the kth largest at
index `k - 1`; fewer than `k` entries means the answer is `-1`.

**Complexity:** `O(n log n)` time, `O(n)` space.
