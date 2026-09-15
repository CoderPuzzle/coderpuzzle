# Concatenated Divisibility

## Description

You are given an array of positive integers `nums` and a positive integer `k`.

A permutation of `nums` is said to form a **divisible concatenation** if, when you concatenate the decimal representations of the numbers in the order specified by the permutation, the resulting number is divisible by `k`.

Return the **lexicographically smallest** permutation (when considered as a list of integers) that forms a divisible concatenation. If no such permutation exists, return an empty list.

### Example 1

```text
Input: nums = [3,12,45], k = 5
Output: [3,12,45]
Explanation: The permutations and their concatenated values are [3,12,45] -> 31245,
[3,45,12] -> 34512, [12,3,45] -> 12345, [12,45,3] -> 12453, [45,3,12] -> 45312,
and [45,12,3] -> 45123. The ones divisible by 5 are 31245 and 12345, and the
lexicographically smallest permutation is [3,12,45].
```

### Example 2

```text
Input: nums = [10,5], k = 10
Output: [5,10]
Explanation: 510 is divisible by 10, but 105 is not. The lexicographically
smallest valid permutation is [5,10].
```

### Example 3

```text
Input: nums = [1,2,3], k = 5
Output: []
Explanation: No permutation of nums forms a valid divisible concatenation,
so the answer is an empty list.
```

### Constraints

- `1 <= nums.length <= 13`
- `1 <= nums[i] <= 10⁵`
- `1 <= k <= 100`

## Hints

### Hint 1

Can we write a recursive solution for this?

### Hint 2

Can we use bitmasks with dynamic programming to optimize the above recursion?

### Hint 3

Use the idea of bitmask-based dynamic programming.

### Hint 4

Use the idea to reconstruct the answer from the dynamic programming table using the state variables, such as mask and remainder.
