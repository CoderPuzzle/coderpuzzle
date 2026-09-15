# Number of Squareful Arrays

## Description

An array is **squareful** if the sum of every pair of adjacent elements is a
perfect square.

Given an integer array `nums`, return the number of permutations of `nums`
that are squareful.

Two permutations `perm1` and `perm2` are different if there is some index `i`
such that `perm1[i] != perm2[i]` — swapping two equal elements does not
produce a new permutation. A permutation uses every element of `nums` exactly
once; a single-element array has no adjacent pairs, so it is always squareful.

### Example 1

```text
Input: nums = [1,17,8]
Output: 2
Explanation: [1,8,17] and [17,8,1] are the valid permutations.
```

### Example 2

```text
Input: nums = [2,2,2]
Output: 1
```

### Constraints

- `1 <= nums.length <= 12`
- `0 <= nums[i] <= 10⁹`
