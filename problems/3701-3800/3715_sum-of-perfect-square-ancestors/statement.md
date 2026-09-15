# Sum of Perfect Square Ancestors

## Description

You are given an integer array `parent` of length `n` representing a rooted
tree with nodes labeled from `0` to `n - 1`. The tree is rooted at node `0`,
so `parent[0] = -1`; for every other node `i`, `parent[i]` denotes the parent
of node `i`.

You are also given an integer array `nums` of length `n`, where `nums[i]` is
the positive integer assigned to node `i`.

The ancestors of a node are all the nodes on the path from it to the root,
excluding the node itself. Define `t_i` as the number of ancestors `a` of
node `i` such that the product `nums[i] * nums[a]` is a perfect square.

Return the sum of `t_i` over all nodes `i` from `1` to `n - 1`.

### Example 1

```text
Input: parent = [-1,0,1], nums = [2,8,2]
Output: 3
Explanation: Node 1 has ancestor list [0], and nums[1] * nums[0] =
8 * 2 = 16, a perfect square, so t_1 = 1. Node 2 has ancestor list
[1, 0]; nums[2] * nums[1] = 2 * 8 = 16 and nums[2] * nums[0] = 2 * 2 = 4
are both perfect squares, so t_2 = 2. The total is 1 + 2 = 3.
```

### Example 2

```text
Input: parent = [-1,0,0], nums = [1,2,4]
Output: 1
Explanation: Node 1 has ancestor list [0], and nums[1] * nums[0] =
2 * 1 = 2 is not a perfect square, so t_1 = 0. Node 2 has ancestor list
[0], and nums[2] * nums[0] = 4 * 1 = 4 is a perfect square, so t_2 = 1.
The total is 1.
```

### Example 3

```text
Input: parent = [-1,0,0,1], nums = [1,2,9,4]
Output: 2
Explanation: Node 1 has ancestor list [0], and nums[1] * nums[0] =
2 * 1 = 2 is not a perfect square, so t_1 = 0. Node 2 has ancestor list
[0], and nums[2] * nums[0] = 9 * 1 = 9 is a perfect square, so t_2 = 1.
Node 3 has ancestor list [1, 0]; nums[3] * nums[1] = 4 * 2 = 8 is not a
perfect square while nums[3] * nums[0] = 4 * 1 = 4 is, so t_3 = 1. The
total is 0 + 1 + 1 = 2.
```

### Constraints

- `1 <= n <= 10⁵`
- `n == parent.length == nums.length`
- `parent[0] == -1`
- `0 <= parent[i] <= n - 1` for all `i` in `[1, n - 1]`
- `1 <= nums[i] <= 10⁵`
- The input is generated such that `parent` represents a valid tree rooted
  at node `0`.

## Hints

### Hint 1

The product `nums[i] * nums[a]` is a perfect square exactly when both values
share the same square-free kernel — what remains after every prime's even
powers are stripped away.

### Hint 2

Precompute each value's kernel; a smallest-prime-factor sieve up to
`max(nums[i])` turns every factorization into a handful of divisions.

### Hint 3

Walk the tree downward from the root, maintaining a frequency map of the
kernels currently on the root-to-node path.

### Hint 4

Each node's `t_i` is simply the number of ancestors whose kernel equals its
own.

### Hint 5

Undo each node's contribution when leaving its subtree, so the map always
describes exactly the current path.
