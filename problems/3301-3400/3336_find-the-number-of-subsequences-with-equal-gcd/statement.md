# Find the Number of Subsequences With Equal GCD

## Description

You are given an integer array `nums`.

Your task is to find the number of pairs of non-empty subsequences `(seq1, seq2)` of `nums` that satisfy the following conditions:

- The subsequences `seq1` and `seq2` are disjoint, meaning no index of `nums` is common between them.
- The GCD of the elements of `seq1` is equal to the GCD of the elements of `seq2`.

Return the total number of such pairs.

Since the answer may be very large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: nums = [1,2,3,4]
Output: 10
```

### Example 2

```text
Input: nums = [10,20,30]
Output: 2
```

### Example 3

```text
Input: nums = [1,1,1,1]
Output: 50
```

### Constraints

- `1 <= nums.length <= 200`
- `1 <= nums[i] <= 200`

## Hints

### Hint 1

Use dynamic programming to store the number of subsequences up to index i with gcd g1 and g2.

### Hint 2

Each element can be put into the first subsequence, the second subsequence, or neither.
