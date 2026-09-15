# Minimum Sum After Divisible Sum Deletions

## Description

You are given an integer array `nums` and an integer `k`.

Any number of times, you may choose a contiguous subarray of `nums` whose
elements sum to a multiple of `k` and delete it. When a subarray is deleted
the remaining elements close the gap, so the neighbors of the removed block
become adjacent and later deletions may reach across where it used to be.

Return the minimum possible sum of `nums` after performing any number of
these deletions, including none at all.

### Example 1

```text
Input: nums = [1,1,1], k = 2
Output: 1
Explanation: Delete the subarray [1,1], whose sum is 2 — a multiple of 2.
The gap closes behind the lone survivor and no remaining subarray sums to a
multiple of 2, so 1 is the smallest reachable sum.
```

### Example 2

```text
Input: nums = [3,1,4,1,5], k = 3
Output: 5
Explanation: Delete [1,4,1] first (sum 6, a multiple of 3); the gap closes
to leave [3,5]. Then delete [3] (sum 3), leaving [5]. The surviving sum is
5, and no sequence removes more.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁶`
- `1 <= k <= 10⁵`

## Hints

### Hint 1

A subarray sums to a multiple of `k` precisely when the prefix sums at its two endpoints leave the same remainder mod `k`.

### Hint 2

Define `dp[i]` as the minimum total remaining sum after processing the first `i` elements.

### Hint 3

Keep a map from each remainder to the smallest `dp[j]` seen so far for that remainder; it decides each `dp[i]` in constant time.

### Hint 4

Maintain a running prefix sum so you never recompute subarray totals from scratch.
