# Intersection of Multiple Arrays

## Description

Given a 2D integer array `nums` where `nums[i]` is a non-empty array of
distinct positive integers, return the list of integers that are present in
each array of `nums` sorted in ascending order.

### Example 1

```text
Input: nums = [[3,1,2,4,5],[1,2,3,4],[3,4,5,6]]
Output: [3,4]
Explanation:
The only integers present in each of nums[0] = [3,1,2,4,5], nums[1] = [1,2,3,4], and nums[2] = [3,4,5,6] are 3 and 4, so we return [3,4].
```

### Example 2

```text
Input: nums = [[1,2,3],[4,5,6]]
Output: []
Explanation:
There does not exist any integer present both in nums[0] and nums[1], so we return an empty list [].
```

### Constraints

- `1 <= nums.length <= 1000`
- `1 <= sum(nums[i].length) <= 1000`
- `1 <= nums[i][j] <= 1000`
- All the values of `nums[i]` are unique.

## Hints

### Hint 1

Keep a count of the number of times each integer occurs in nums.

### Hint 2

Since all integers of nums[i] are distinct, if an integer is present in each array, its count will be equal to the total number of arrays.
