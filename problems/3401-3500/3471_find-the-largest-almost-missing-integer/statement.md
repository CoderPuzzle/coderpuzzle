# Find the Largest Almost Missing Integer

## Description

You are given an integer array nums and an integer k.

An integer x is almost missing from nums if x appears in exactly one
subarray of size k within nums.

Return the largest almost missing integer from nums. If no such integer
exists, return -1.

A subarray is a contiguous sequence of elements within an array.

### Example 1

```text
Input: nums = [3,9,2,1,7], k = 3
Output: 7
Explanation: 1 appears in 2 subarrays of size 3: [9, 2, 1] and [2, 1, 7].
2 appears in 3 subarrays of size 3: [3, 9, 2], [9, 2, 1], [2, 1, 7].
3 appears in 1 subarray of size 3: [3, 9, 2].
7 appears in 1 subarray of size 3: [2, 1, 7].
9 appears in 2 subarrays of size 3: [3, 9, 2], and [9, 2, 1].

We return 7 since it is the largest integer that appears in exactly one
subarray of size k.
```

### Example 2

```text
Input: nums = [3,9,7,2,1,7], k = 4
Output: 3
Explanation: 1 appears in 2 subarrays of size 4: [9, 7, 2, 1], [7, 2, 1, 7].
2 appears in 3 subarrays of size 4: [3, 9, 7, 2], [9, 7, 2, 1], [7, 2, 1, 7].
3 appears in 1 subarray of size 4: [3, 9, 7, 2].
7 appears in 3 subarrays of size 4: [3, 9, 7, 2], [9, 7, 2, 1], [7, 2, 1, 7].
9 appears in 2 subarrays of size 4: [3, 9, 7, 2], [9, 7, 2, 1].

We return 3 since it is the largest and only integer that appears in
exactly one subarray of size k.
```

### Example 3

```text
Input: nums = [0,0], k = 1
Output: -1
Explanation: There is no integer that appears in only one subarray of size 1.
```

### Constraints

- `1 <= nums.length <= 50`
- `0 <= nums[i] <= 50`
- `1 <= k <= nums.length`

## Hints

### Hint 1

Solve the problem for three different cases: k = 1, k = n, and 1 < k < n.

### Hint 2

If k = 1, return the largest element that occurs exactly once in nums

### Hint 3

If k = n, return the largest element in nums

### Hint 4

If 1 < k < n, all elements different from nums[0] and nums[n - 1] will occur
in more than one subarray of size k. Hence, the answer is the largest of
nums[0] and nums[n - 1] if they both occur exactly once in the array. If one
of them occurs more than once, return the other. If both of them occur more
than once, return -1.
