# Count Subarrays With Even Odd Ratio II

## Description

You are given an integer array `nums` and two integers `a` and `b`.

For a subarray, let:

- `x` be the number of even elements.
- `y` be the number of odd elements.

The ratio of even to odd elements in a subarray is defined as `x / y`, where
ratios are compared by their exact rational values.

A subarray is considered valid if:

- `y > 0`, and
- `x / y <= a / b`.

Return the number of valid subarrays in `nums`.

### Example 1

```text
Input: nums = [1,2,1,2], a = 3, b = 2
Output: 7
Explanation: The following are the valid subarrays:
Thus, the number of valid subarrays is 7.
```

### Example 2

```text
Input: nums = [2,2,1], a = 2, b = 1
Output: 3
Explanation: The following are the valid subarrays:
Thus, the number of valid subarrays is 3.
```

### Example 3

```text
Input: nums = [2,2,2], a = 1, b = 1
Output: 0
Explanation: Every subarray contains 0 odd numbers, so no subarray is valid.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `1 <= a, b <= 10⁹`

## Hints

### Hint 1

Replace every even element with b and every odd element with -a. A subarray is valid exactly when its transformed sum is at most 0.

### Hint 2

The condition y > 0 is then automatic, because a non-empty subarray containing only even elements has a positive transformed sum.

### Hint 3

Let pref[i] be the prefix sum of the transformed array. A subarray [l, r] is valid when pref[r + 1] <= pref[l].

### Hint 4

Scan the prefix sums from left to right and count how many previous prefix sums are greater than or equal to the current one using coordinate compression and a Fenwick tree.
