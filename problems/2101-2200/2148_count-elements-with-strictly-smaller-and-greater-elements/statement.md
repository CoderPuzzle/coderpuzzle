# Count Elements With Strictly Smaller and Greater Elements

## Description

Given an integer array `nums`, return the number of elements that have both a
strictly smaller and a strictly greater element appear in `nums`.

### Example 1

```text
Input: nums = [11,7,2,15]
Output: 2
Explanation: The element 7 has the element 2 strictly smaller than it and the
element 11 strictly greater than it.
Element 11 has element 7 strictly smaller than it and element 15 strictly
greater than it.
In total there are 2 elements having both a strictly smaller and a strictly
greater element appear in nums.
```

### Example 2

```text
Input: nums = [-3,3,3,90]
Output: 2
Explanation: The element 3 has the element -3 strictly smaller than it and the
element 90 strictly greater than it.
Since there are two elements with the value 3, in total there are 2 elements
having both a strictly smaller and a strictly greater element appear in nums.
```

### Constraints

- `1 <= nums.length <= 100`
- `-10⁵ <= nums[i] <= 10⁵`

## Hints

### Hint 1

All the elements in the array should be counted except for the minimum and
maximum elements.

### Hint 2

If the array has `n` elements, the answer will be
`n - count(min(nums)) - count(max(nums))`

### Hint 3

This formula will not work in case the array has all the elements equal, why?
