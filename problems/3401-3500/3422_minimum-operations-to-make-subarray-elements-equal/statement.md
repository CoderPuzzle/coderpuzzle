# Minimum Operations to Make Subarray Elements Equal

## Description

You are given an integer array `nums` and an integer `k`. You can perform the
following operation any number of times:

- Increase or decrease any element of `nums` by 1.

Return the minimum number of operations required to ensure that at least one
subarray of size `k` in `nums` has all elements equal.

### Example 1

```text
Input: nums = [4,-3,2,1,-4,6], k = 3
Output: 5
Explanation: Use 4 operations to add 4 to nums[1]. The resulting array is
[4, 1, 2, 1, -4, 6]. Use 1 operation to subtract 1 from nums[2]. The
resulting array is [4, 1, 1, 1, -4, 6]. The array now contains a subarray
[1, 1, 1] of size k = 3 with all elements equal. Hence, the answer is 5.
```

### Example 2

```text
Input: nums = [-2,-2,3,1,4], k = 2
Output: 0
Explanation: The subarray [-2, -2] of size k = 2 already contains all equal
elements, so no operations are needed. Hence, the answer is 0.
```

### Constraints

- `2 <= nums.length <= 10⁵`
- `-10⁶ <= nums[i] <= 10⁶`
- `2 <= k <= nums.length`

## Hints

### Hint 1

It can be proven that for each subarray of size k, one optimal common value
is the median.

### Hint 2

Use 2 multisets to maintain the median dynamically.

### Hint 3

Calculate the sums of the 2 multisets dynamically to accelerate the answer
calculation.
