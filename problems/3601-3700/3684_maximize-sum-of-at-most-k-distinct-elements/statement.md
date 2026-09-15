# Maximize Sum of At Most K Distinct Elements

## Description

You are given a positive integer array `nums` and an integer `k`.

Pick numbers from `nums` so that their sum is as large as possible. You may
pick at most `k` numbers, and every picked number must be distinct — a value
that appears several times in `nums` is still only one candidate.

Return an array containing the picked numbers in strictly descending order.

### Example 1

```text
Input: nums = [84,93,100,77,90], k = 3
Output: [100,93,90]
Explanation: The largest possible sum is 283, attained by picking 100, 93
and 90. Arranged in strictly descending order they read [100,93,90].
```

### Example 2

```text
Input: nums = [84,93,100,77,93], k = 3
Output: [100,93,84]
Explanation: The value 93 appears twice but may be picked only once, so the
best picks are 100, 93 and 84, whose sum is 277.
```

### Example 3

```text
Input: nums = [1,1,1,2,2,2], k = 6
Output: [2,1]
Explanation: Only two distinct values exist even though up to six picks are
allowed, so the answer is just [2,1] with a sum of 3.
```

### Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 10⁹`
- `1 <= k <= nums.length`

## Hints

### Hint 1

A repeated copy never improves a pick, so collapse `nums` to its distinct values first. Sorting those descending and taking the first `k` maximizes the sum; when fewer than `k` remain, take all of them.
