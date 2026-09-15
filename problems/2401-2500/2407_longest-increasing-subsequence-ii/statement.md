# Longest Increasing Subsequence II

## Description

You are given an integer array `nums` and an integer `k`.

Find the longest subsequence of `nums` that meets the following requirements:

- The subsequence is strictly increasing, and
- The difference between adjacent elements in the subsequence is at most `k`.

Return the length of the longest subsequence that meets the requirements.

A subsequence is an array that can be derived from another array by deleting
some or no elements without changing the order of the remaining elements.

### Example 1

```text
Input: nums = [4,2,1,4,3,4,5,8,15], k = 3
Output: 5
Explanation: The longest subsequence that meets the requirements is [1,3,4,5,8].
The subsequence has a length of 5, so we return 5.
Note that the subsequence [1,3,4,5,8,15] does not meet the requirements because 15 - 8 = 7 is larger than 3.
```

### Example 2

```text
Input: nums = [7,4,5,1,8,12,4,7], k = 5
Output: 4
Explanation: The longest subsequence that meets the requirements is [4,5,8,12].
The subsequence has a length of 4, so we return 4.
```

### Example 3

```text
Input: nums = [1,5], k = 1
Output: 1
Explanation: The longest subsequence that meets the requirements is [1].
The subsequence has a length of 1, so we return 1.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i], k <= 10^5`

**Follow up:** Can you solve it in `O(n log(m))` time, where `m` is the
maximum value in `nums`?

## Hints

### Hint 1

Think in value space: let best[v] be the length of the longest valid
subsequence, among the elements processed so far, that ends with the value v.

### Hint 2

When processing an element x, the previous element of its subsequence must be
some v with x - k <= v <= x - 1, so
best[x] = 1 + max(best[v]) over that window — a range-maximum query.

### Hint 3

Keep best[] inside a max segment tree indexed by value (1 to 10⁵): one
range-max query plus one point update per element, each O(log m).
