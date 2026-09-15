# Find Missing Elements

## Description

You are given an integer array nums consisting of unique integers.

Originally, nums contained every integer within a certain range, but some of
those integers might have gone missing from it since. The smallest and
largest integers of that original range are still present in nums.

Return every integer of the original range that is missing from nums,
listed in increasing order. If no integers are missing, return an empty
list.

### Example 1

```text
Input: nums = [1,4,2,5]
Output: [3]
Explanation: The smallest integer is 1 and the largest is 5, so the full
range should be [1,2,3,4,5]. Among these integers, only 3 is missing.
```

### Example 2

```text
Input: nums = [7,8,6,9]
Output: []
Explanation: The smallest integer is 6 and the largest is 9, so the full
range is [6,7,8,9]. Every integer of the range is already present, so no
integer is missing.
```

### Example 3

```text
Input: nums = [5,1]
Output: [2,3,4]
Explanation: The smallest integer is 1 and the largest is 5, so the full
range should be [1,2,3,4,5]. The missing integers are 2, 3, and 4.
```

### Constraints

- `2 <= nums.length <= 100`
- `1 <= nums[i] <= 100`
- All values in nums are unique.

## Hints

### Hint 1

First, find the maximum and minimum elements in the array.

### Hint 2

Then, iterate over all the integers in the range [min, max] and check if
they are in the array.

### Hint 3

If an integer is not present, add it to the answer, and return the sorted
array at the end.
