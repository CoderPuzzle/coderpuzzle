# Maximum Good Subtree Score

## Description

You are given an undirected tree rooted at node `0` with `n` nodes numbered from `0` to `n - 1`. Each node `i` has an integer value `vals[i]`, and its parent is given by `par[i]`.

A subset of nodes within the subtree of a node is called **good** if every digit from `0` to `9` appears at most once in the decimal representation of the values of the selected nodes.

The score of a good subset is the sum of the values of its nodes.

Define an array `maxScore` of length `n`, where `maxScore[u]` represents the maximum possible sum of values of a good subset of nodes that belong to the subtree rooted at node `u`, including `u` itself and all its descendants.

Return the sum of all values in `maxScore`.

Since the answer may be large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: vals = [2,3], par = [-1,0]
Output: 8
Explanation: The subtree rooted at node 0 includes nodes (0, 1). The subset
(2, 3) is good, so maxScore[0] = 5. The subtree rooted at node 1 has maxScore[1] = 3.
The maxScore array is [5, 3], so the sum is 8.
```

![The two-node tree where the good subset {2, 3} gives maxScore[0] = 5 and maxScore[1] = 3, summing to 8.](figures/example-1.svg)

### Example 2

```text
Input: vals = [1,5,2], par = [-1,0,0]
Output: 15
Explanation: The maxScore array is [8, 5, 2], so the sum is 15.
```

![Node 0 with values 1, 5 and 2 below it; maxScore = [8, 5, 2] since every digit is distinct, summing to 15.](figures/example-2.svg)

### Example 3

```text
Input: vals = [34,1,2], par = [-1,0,1]
Output: 42
Explanation: The maxScore array is [37, 3, 2], so the sum is 42.
```

![The chain 34 - 1 - 2 where maxScore = [37, 3, 2] because no digit repeats, summing to 42.](figures/example-3.svg)

### Example 4

```text
Input: vals = [3,22,5], par = [-1,0,1]
Output: 18
Explanation: The subtree rooted at node 1 includes nodes (1, 2). The subset
(22, 5) is not good, as digit 2 appears twice in 22. The valid subset 5 has
score 5. The maxScore array is [8, 5, 5], so the sum is 18.
```

### Constraints

- `1 <= n == vals.length <= 500`
- `1 <= vals[i] <= 10⁹`
- `par.length == n`
- `par[0] == -1`
- `0 <= par[i] < n` for `i` in `[1, n - 1]`
- The input is generated such that the parent array `par` represents a valid tree.

## Hints

### Hint 1

Use tree dynamic programming.

### Hint 2

Use bits (integer) to represent which digits are used.

### Hint 3

A node can be selected only when all of its own digits are distinct.
