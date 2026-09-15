# Make Sum Divisible by P

## Description

Given an array of positive integers `nums`, remove the smallest subarray
(possibly empty) so that the sum of the remaining elements is divisible by
`p`. It is **not allowed** to remove the whole array.

Return the length of the smallest subarray you need to remove, or `-1` if
it is impossible.

A subarray is a contiguous block of elements of the array.

### Example 1

```text
Input: nums = [3,1,4,2], p = 6
Output: 1
Explanation: The sum of the elements in nums is 10, which is not divisible
by 6. We can remove the subarray [4], and the sum of the remaining
elements is 6, which is divisible by 6.
```

### Example 2

```text
Input: nums = [6,3,5,2], p = 9
Output: 2
Explanation: We cannot remove a single element to get a sum divisible by
9. The best way is to remove the subarray [5,2], leaving us with [6,3]
with sum 9.
```

### Example 3

```text
Input: nums = [1,2,3], p = 3
Output: 0
Explanation: The sum is 6, which is already divisible by 3. Thus we do
not need to remove anything.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `1 <= p <= 10⁹`

## Hints

### Hint 1

Use prefix sums to calculate the subarray sums.

### Hint 2

Suppose you know the remainder for the sum of the entire array. How does
removing a subarray affect that remainder? What remainder does the
subarray need to have in order to make the rest of the array sum up to be
divisible by `p`?

### Hint 3

Use a map to keep track of the rightmost index for every prefix sum mod
`p`.
