# Find the Minimum Cost Array Permutation

## Description

You are given an array `nums` which is a permutation of `[0, 1, 2, ..., n - 1]`.
The score of any permutation of `[0, 1, 2, ..., n - 1]` named `perm` is defined
as:

`score(perm) = |perm[0] - nums[perm[1]]| + |perm[1] - nums[perm[2]]| + ... + |perm[n - 1] - nums[perm[0]]|`

Return the permutation `perm` which has the minimum possible score. If multiple
permutations exist with this score, return the one that is lexicographically
smallest among them.

### Example 1

```text
Input: nums = [1,0,2]
Output: [0,1,2]
Explanation: The lexicographically smallest permutation with minimum cost is [0,1,2]. The cost of this permutation is |0 - 0| + |1 - 2| + |2 - 1| = 2.
```

![Each perm[i] pairs cyclically with nums[perm[i+1]], giving score 0 + 1 + 1 = 2 for perm = [0,1,2].](figures/example-1.svg)

### Example 2

```text
Input: nums = [0,2,1]
Output: [0,2,1]
Explanation: The lexicographically smallest permutation with minimum cost is [0,2,1]. The cost of this permutation is |0 - 1| + |2 - 2| + |1 - 0| = 2.
```

![The optimal pairing swaps positions 1 and 2, giving score 1 + 0 + 1 = 2 for perm = [0,2,1].](figures/example-2.svg)

### Constraints

- `2 <= n == nums.length <= 14`
- `nums` is a permutation of `[0, 1, 2, ..., n - 1]`

## Hints

### Hint 1

The score function is cyclic, so we can always set perm[0] = 0 for the smallest lexical order.

### Hint 2

It is similar to the Traveling Salesman Problem. Use Dynamic Programming.

### Hint 3

Use a bitmask to track which elements have been assigned to perm.
