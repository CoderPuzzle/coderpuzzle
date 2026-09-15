# Missing Element in Sorted Array

## Description

Given an integer array `nums` which is sorted in ascending order and all of
its elements are unique, and given an integer `k`, return the `k`th missing
number starting from the leftmost number of the array.

### Example 1

```text
Input: nums = [4,7,9,10], k = 1
Output: 5
Explanation: The first missing number is 5.
```

### Example 2

```text
Input: nums = [4,7,9,10], k = 3
Output: 8
Explanation: The missing numbers are [5,6,8,...], hence the third missing number is 8.
```

### Example 3

```text
Input: nums = [1,2,4], k = 3
Output: 6
Explanation: The missing numbers are [3,5,6,7,...], hence the third missing number is 6.
```

### Constraints

- `1 <= nums.length <= 5 * 10^4`
- `1 <= nums[i] <= 10^7`
- `nums` is sorted in ascending order, and all the elements are unique.
- `1 <= k <= 10^8`

**Follow up:** Can you find a logarithmic time complexity (i.e., `O(log(n))`) solution?

## Hints

### Hint 1

Define a function f(i) = nums[i] - nums[0] - i that counts how many numbers are missing before nums[i].

### Hint 2

Use binary search with that function to locate the kth missing element.

### Hint 3

If fewer than k numbers are missing inside the whole array, the answer lies beyond the last element.
