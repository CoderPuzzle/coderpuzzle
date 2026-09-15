# Apply Operations to Maximize Score

## Description

You are given an array `nums` of `n` positive integers and an integer `k`.

Initially, you start with a score of `1`. You have to maximize your score by applying the following operation at most `k` times:

- Choose any non-empty subarray `nums[l, ..., r]` that you have not chosen previously.
- Choose an element `x` of `nums[l, ..., r]` with the highest prime score. If multiple such elements exist, choose the one with the smallest index.
- Multiply your score by `x`.

Here, `nums[l, ..., r]` denotes the subarray of `nums` starting at index `l` and ending at index `r`, both ends being inclusive.

The prime score of an integer `x` is equal to the number of distinct prime factors of `x`. For example, the prime score of `300` is `3` since `300 = 2 * 2 * 3 * 5 * 5`.

Return the maximum possible score after applying at most `k` operations.

Since the answer may be large, return it modulo `10^9 + 7`.

### Example 1

```text
Input: nums = [8,3,9,3,8], k = 2
Output: 81
Explanation:
- Choose subarray nums[2, ..., 2]. nums[2] is the only element in this subarray. Hence, we multiply the score by nums[2]. The score becomes 1 * 9 = 9.
- Choose subarray nums[2, ..., 3]. Both nums[2] and nums[3] have a prime score of 1, but nums[2] has the smaller index. Hence, we multiply the score by nums[2]. The score becomes 9 * 9 = 81.
It can be proven that 81 is the highest score one can obtain.
```

### Example 2

```text
Input: nums = [19,12,14,6,10,18], k = 3
Output: 4788
Explanation:
- Choose subarray nums[0, ..., 0]. nums[0] is the only element in this subarray. Hence, we multiply the score by nums[0]. The score becomes 1 * 19 = 19.
- Choose subarray nums[5, ..., 5]. nums[5] is the only element in this subarray. Hence, we multiply the score by nums[5]. The score becomes 19 * 18 = 342.
- Choose subarray nums[2, ..., 3]. Both nums[2] and nums[3] have a prime score of 2, but nums[2] has the smaller index. Hence, we multiply the score by nums[2]. The score becomes 342 * 14 = 4788.
It can be proven that 4788 is the highest score one can obtain.
```

### Constraints

- `1 <= nums.length == n <= 10^5`
- `1 <= nums[i] <= 10^5`
- `1 <= k <= min(n * (n + 1) / 2, 10^9)`

## Hints

### Hint 1

Calculate nums[i]'s prime score s[i] by factoring in O(sqrt(nums[i])) time.

### Hint 2

For each nums[i], find the nearest index left[i] on the left (if any) such that s[left[i]] >= s[i]; if none is found, set left[i] to -1. Similarly, find the nearest index right[i] on the right (if any) such that s[right[i]] > s[i]; if none is found, set right[i] to n.

### Hint 3

Use a monotonic stack to compute left[i] and right[i].

### Hint 4

For each index i there are ranges[i] = (i - left[i]) * (right[i] - i) subarrays where i is chosen; loop over elements by non-increasing prime score and use each min(ranges[i], remaining operations) times, with fast exponentiation.
