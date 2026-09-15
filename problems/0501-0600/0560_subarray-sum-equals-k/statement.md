# Subarray Sum Equals K

## Description

Given an array of integers `nums` and an integer `k`, return the total number
of contiguous subarrays whose sum equals to `k`.

A subarray is a contiguous non-empty sequence of elements within an array.

### Example 1

```text
Input: nums = [1,1,1], k = 2
Output: 2
```

### Example 2

```text
Input: nums = [1,2,3], k = 3
Output: 2
```

### Constraints

- `1 <= nums.length <= 2 * 10^4`
- `-1000 <= nums[i] <= 1000`
- `-10^7 <= k <= 10^7`

## Hints

### Hint 1

sum(i, j) = sum(0, j) - sum(0, i): a subarray ending at j sums to k exactly when an earlier prefix equals the current prefix minus k.

### Hint 2

Store prefix-sum frequencies in a hash table while scanning the array once.

### Hint 3

Seed the table with prefix 0 occurring once, so subarrays that start at index 0 are counted.

### Hint 4

Brute force over all subarray endpoints is O(n^2); the hash table of prefixes makes it O(n).
