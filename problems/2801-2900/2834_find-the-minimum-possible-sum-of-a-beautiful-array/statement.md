# Find the Minimum Possible Sum of a Beautiful Array

## Description

You are given positive integers `n` and `target`.

An array `nums` is beautiful if it meets the following conditions:

- `nums.length == n`.
- `nums` consists of pairwise distinct positive integers.
- There doesn't exist two distinct indices, `i` and `j`, in the range
  `[0, n - 1]`, such that `nums[i] + nums[j] == target`.

Return the minimum possible sum that a beautiful array could have modulo
10⁹ + 7.

### Example 1

```text
Input: n = 2, target = 3
Output: 4
Explanation: We can see that nums = [1,3] is beautiful.
- The array nums has length n = 2.
- The array nums consists of pairwise distinct positive integers.
- There doesn't exist two distinct indices, i and j, with nums[i] + nums[j]
== 3.
It can be proven that 4 is the minimum possible sum that a beautiful array
could have.
```

### Example 2

```text
Input: n = 3, target = 3
Output: 8
Explanation: We can see that nums = [1,3,4] is beautiful.
- The array nums has length n = 3.
- The array nums consists of pairwise distinct positive integers.
- There doesn't exist two distinct indices, i and j, with nums[i] + nums[j]
== 3.
It can be proven that 8 is the minimum possible sum that a beautiful array
could have.
```

### Example 3

```text
Input: n = 1, target = 1
Output: 1
Explanation: We can see, that nums = [1] is beautiful.
```

### Constraints

- `1 <= n <= 10⁹`
- `1 <= target <= 10⁹`

## Hints

### Hint 1

Greedily try to add the smallest possible number in the array nums, such that
nums contains distinct positive integers, and there are no two indices i and
j with nums[i] + nums[j] == target.
