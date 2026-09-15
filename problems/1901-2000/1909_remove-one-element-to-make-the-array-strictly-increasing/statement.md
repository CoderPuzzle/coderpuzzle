# Remove One Element to Make the Array Strictly Increasing

## Description

Given a 0-indexed integer array `nums`, return true if it can be made
strictly increasing after removing exactly one element, or false otherwise.
If the array is already strictly increasing, return true.

The array `nums` is strictly increasing if `nums[i - 1] < nums[i]` for each
index (1 <= i < nums.length).

### Example 1

```text
Input: nums = [1,2,10,5,7]
Output: true
Explanation: By removing 10 at index 2 from nums, it becomes [1,2,5,7].
[1,2,5,7] is strictly increasing, so return true.
```

### Example 2

```text
Input: nums = [2,3,1,2]
Output: false
Explanation:
[3,1,2] is the result of removing the element at index 0.
[2,1,2] is the result of removing the element at index 1.
[2,3,2] is the result of removing the element at index 2.
[2,3,1] is the result of removing the element at index 3.
No resulting array is strictly increasing, so return false.
```

### Example 3

```text
Input: nums = [1,1,1]
Output: false
Explanation: The result of removing any element is [1,1].
[1,1] is not strictly increasing, so return false.
```

### Constraints

- `2 <= nums.length <= 1000`
- `1 <= nums[i] <= 1000`

## Hints

### Hint 1

For each index i in nums remove this index.

### Hint 2

If the array becomes sorted return true, otherwise revert to the original
array and try different index.
