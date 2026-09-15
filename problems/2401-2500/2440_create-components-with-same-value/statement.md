# Create Components With Same Value

## Description

There is an undirected tree with `n` nodes labeled from `0` to `n - 1`.

You are given a **0-indexed** integer array `nums` of length `n` where `nums[i]`
is the value of the `i`-th node. You are also given a 2D integer array `edges`
of length `n - 1` where `edges[i] = [a, b]` indicates that there is an
undirected edge between nodes `a` and `b` in the tree.

You are allowed to delete some edges, splitting the tree into multiple
connected components. The value of a component is the sum of all `nums[i]` for
which node `i` is in the component.

Return the maximum number of edges you can delete such that every connected
component in the tree has the same value.

### Example 1

```text
Input: nums = [6,2,2,2,6], edges = [[0,1],[1,2],[1,3],[3,4]]
Output: 2
Explanation: We can delete the edges [0,1] and [3,4]. The created components are nodes [0], [1,2,3] and [4]. The sum of the values in each component equals 6. It can be proven that no better deletion exists, so the answer is 2.
```

![The tree with the deleted edges dashed; the components 0, 1-2-3 and 4 each sum to 6.](figures/example-1.svg)

### Example 2

```text
Input: nums = [2], edges = []
Output: 0
Explanation: There are no edges to be deleted.
```

### Constraints

- `1 <= n <= 2 * 10⁴`
- `nums.length == n`
- `1 <= nums[i] <= 50`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= edges[i][0], edges[i][1] <= n - 1`
- `edges` represents a valid tree.

### Follow-up

Can you solve it in `O(n · d)` time, where `d` is the number of divisors of
the total value sum?

## Hints

### Hint 1

If the tree splits into `k` components of equal value, each component's value
is `total / k`, so `k` must be a divisor of the total sum of all values —
enumerate the divisors of the total.

### Hint 2

Root the tree anywhere and compute every subtree sum with one DFS. For a
candidate component value `s`, the topmost node of any valid component has a
subtree sum divisible by `s`.

### Hint 3

Greedy check: cut above a node whenever its accumulated subtree remainder is
divisible by `s`. The split into pieces of value `s` exists exactly when the
number of such nodes equals `total / s`. Try the divisor counts from most
components to fewest and take the first that works.
