# Count Subarrays With K Distinct Integers

## Description

You are given an integer array `nums` and two integers `k` and `m`.

Return an integer denoting the count of subarrays of `nums` such that:

- The subarray contains exactly `k` distinct integers.
- Within the subarray, each distinct integer appears at least `m` times.

### Example 1

```text
Input: nums = [1,2,1,2,2], k = 2, m = 2
Output: 2
Explanation:
The possible subarrays with k = 2 distinct integers, each appearing at least m = 2 times are:

Subarray             Distinct numbers       Frequency
[1, 2, 1, 2]         {1, 2} → 2             {1: 2, 2: 2}
[1, 2, 1, 2, 2]      {1, 2} → 2             {1: 2, 2: 3}

Thus, the answer is 2.
```

### Example 2

```text
Input: nums = [3,1,2,4], k = 2, m = 1
Output: 3
Explanation:
The possible subarrays with k = 2 distinct integers, each appearing at least m = 1 times are:

Subarray             Distinct numbers       Frequency
[3, 1]               {3, 1} → 2             {3: 1, 1: 1}
[1, 2]               {1, 2} → 2             {1: 1, 2: 1}
[2, 4]               {2, 4} → 2             {2: 1, 4: 1}

Thus, the answer is 3.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`
- `1 <= k, m <= nums.length`

## Hints

### Hint 1

Use sliding window.

### Hint 2

Use the reduction: answer = at_most(k) - at_most(k-1). at_most(K) = number of subarrays with distinct values where every present value appears >= m times.
