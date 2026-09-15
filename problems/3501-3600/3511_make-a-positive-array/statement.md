# Make a Positive Array

## Description

You are given an array `nums`. An array is considered positive if the sum
of all numbers in each subarray with more than two elements is positive.

You can perform the following operation any number of times:

- Replace one element in `nums` with any integer between -10¹⁸ and 10¹⁸.

Find the minimum number of operations needed to make `nums` positive.

### Example 1

```text
Input: nums = [-10,15,-12]
Output: 1
Explanation:
The only subarray with more than 2 elements is the array itself. The sum of all elements is (-10) + 15 + (-12) = -7. By replacing nums[0] with 0, the new sum becomes 0 + 15 + (-12) = 3. Thus, the array is now positive.
```

### Example 2

```text
Input: nums = [-1,-2,3,-1,2,6]
Output: 1
Explanation:
The only subarrays with more than 2 elements and a non-positive sum are:
nums[0...2]: [-1, -2, 3], sum 0; after replacement (set nums[1] = 1): [-1, 1, 3], new sum 3.
nums[0...3]: [-1, -2, 3, -1], sum -1; after replacement (set nums[1] = 1): [-1, 1, 3, -1], new sum 2.
nums[1...3]: [-2, 3, -1], sum 0; after replacement (set nums[1] = 1): [1, 3, -1], new sum 3.
Thus, nums is positive after one operation.
```

### Example 3

```text
Input: nums = [1,2,3]
Output: 0
Explanation:
The array is already positive, so no operations are needed.
```

### Constraints

- `3 <= nums.length <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`

## Hints

### Hint 1

Only check subarrays up to a specific size.

### Hint 2

Find the subarrays containing between 3 and 5 elements with a non-positive total sum.

### Hint 3

Use a greedy approach to assign certain indices the maximum value.

### Hint 4

Start with the subarray with the smallest last index i. Replace the element at index i with the maximum value. Find the selected subarray with the next smallest last index j that does not contain index i. Replace the element at index j with the maximum value, and repeat this process until all non-positive subarrays are fixed.
