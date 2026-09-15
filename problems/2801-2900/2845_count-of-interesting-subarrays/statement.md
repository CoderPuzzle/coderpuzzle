# Count of Interesting Subarrays

## Description

You are given a 0-indexed integer array `nums`, an integer `modulo`, and an
integer `k`.

Your task is to find the count of subarrays that are interesting.

A subarray `nums[l..r]` is interesting if the following condition holds:

Let `cnt` be the number of indices `i` in the range `[l, r]` such that
`nums[i] % modulo == k`. Then, `cnt % modulo == k`.

Return an integer denoting the count of interesting subarrays.

Note: A subarray is a contiguous non-empty sequence of elements within an
array.

### Example 1

```text
Input: nums = [3,2,4], modulo = 2, k = 1
Output: 3
Explanation: The interesting subarrays are:
- nums[0..0] = [3]: only index 0 satisfies nums[i] % 2 == 1, so cnt = 1 and 1 % 2 == 1.
- nums[0..1] = [3,2]: only index 0 satisfies nums[i] % 2 == 1, so cnt = 1 and 1 % 2 == 1.
- nums[0..2] = [3,2,4]: only index 0 satisfies nums[i] % 2 == 1, so cnt = 1 and 1 % 2 == 1.
It can be shown that there are no other interesting subarrays, so the answer is 3.
```

### Example 2

```text
Input: nums = [3,1,9,6], modulo = 3, k = 0
Output: 2
Explanation: The interesting subarrays are:
- nums[0..3] = [3,1,9,6]: three indices (0, 2, 3) satisfy nums[i] % 3 == 0, so cnt = 3 and 3 % 3 == 0.
- nums[1..1] = [1]: no index satisfies nums[i] % 3 == 0, so cnt = 0 and 0 % 3 == 0.
It can be shown that there are no other interesting subarrays, so the answer is 2.
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= modulo <= 10^9`
- `0 <= k < modulo`

## Hints

### Hint 1

The problem can be solved using prefix sums.

### Hint 2

Let count[i] be the number of indices j < i with nums[j] % modulo == k, where count[0] = 0.

### Hint 3

A subarray is interesting when (count[r + 1] - count[l]) % modulo == k, which rewrites to count[l] % modulo == (count[r + 1] - k) % modulo.

### Hint 4

Using a hash map, for each prefix index i sum up map[(count[i] + modulo - k) % modulo] before incrementing map[count[i] % modulo]; the total is the answer.
