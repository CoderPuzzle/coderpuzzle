# Subtree Inversion Sum II

## Description

An undirected tree is rooted at node 0. Inverting a node multiplies every value in its rooted subtree by `-1`. Any two inverted nodes must have distance at least `k`.

Given `edges`, node values `nums`, and `k`, return the maximum possible sum after valid inversions.

### Example 1

![diagram](figures/3949-1.svg)

```text
Input: edges = [[0,1],[0,2],[0,3],[1,4],[1,5]], nums = [1,0,-10,3,4,5], k = 2
Output: 23
```

### Example 2

![diagram](figures/3949-2.svg)

```text
Input: edges = [[0,1],[1,2]], nums = [5,-10,-10], k = 1
Output: 25
```

### Example 3

![diagram](figures/3949-3.svg)

```text
Input: edges = [[0,1],[0,2]], nums = [1,-5,-6], k = 2
Output: 12
```

### Example 4

![diagram](figures/3949-4.svg)

```text
Input: edges = [[0,1],[0,2]], nums = [1,-5,-6], k = 3
Output: 10
```

### Constraints

- `2 <= nums.length <= 5 * 10⁴`
- `edges.length == nums.length - 1`
- `-4 * 10⁴ <= nums[i] <= 4 * 10⁴`
- `1 <= k <= 50`
- `edges` forms a tree.

## Hints

### Hint 1

Track the closest inverted node in each rooted subtree, with distances capped at `k`.

### Hint 2

When child subtrees merge, closest distances `a` and `b` are compatible when `a + b >= k`.

### Hint 3

Store both maximum and minimum sums because inverting a node negates its whole subtree.
