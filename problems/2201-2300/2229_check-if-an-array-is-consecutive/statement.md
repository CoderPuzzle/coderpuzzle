# Check if an Array Is Consecutive

## Description

Given an integer array nums, return true if nums is consecutive, otherwise
return false.

An array is consecutive if it contains every number in the range
`[x, x + n - 1]` (inclusive), where x is the minimum number in the array and
n is the length of the array.

### Example 1

```text
Input: nums = [1,3,4,2]
Output: true
Explanation:
The minimum value is 1 and the length of nums is 4.
All of the values in the range [x, x + n - 1] = [1, 1 + 4 - 1] = [1, 4] = (1, 2, 3, 4) occur in nums.
Therefore, nums is consecutive.
```

### Example 2

```text
Input: nums = [1,3]
Output: false
Explanation:
The minimum value is 1 and the length of nums is 2.
The value 2 in the range [x, x + n - 1] = [1, 1 + 2 - 1], = [1, 2] = (1, 2) does not occur in nums.
Therefore, nums is not consecutive.
```

### Example 3

```text
Input: nums = [3,5,4]
Output: true
Explanation:
The minimum value is 3 and the length of nums is 3.
All of the values in the range [x, x + n - 1] = [3, 3 + 3 - 1] = [3, 5] = (3, 4, 5) occur in nums.
Therefore, nums is consecutive.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Try sorting nums.

### Hint 2

If nums is consecutive and sorted in ascending order, then nums[i] + 1 = nums[i + 1] for every i in the range 0 ≤ i < nums.length - 1.
